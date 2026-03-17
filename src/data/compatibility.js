// ─────────────────────────────────────
//  ZIRO — Motor de Compatibilidade
//  Toda a lógica de verificação fica aqui.
//  Fácil de substituir por chamadas à API no futuro.
// ─────────────────────────────────────

/** Calcula consumo de energia de cada slot */
export function calcPowerDraw(buildState) {
  const b = buildState;
  return {
    cpu:  b.cpu  ? b.cpu.powerDraw  : 0,
    gpu:  b.gpu  ? b.gpu.powerDraw  : 0,
    ram:  b.ram  ? b.ram.powerDraw  : 0,
    ssd:  b.ssd  ? b.ssd.powerDraw  : 0,
    cool: b.cool ? b.cool.powerDraw : 5,
    misc: 30,
  };
}

export function totalPower(buildState) {
  return Object.values(calcPowerDraw(buildState)).reduce((a, v) => a + v, 0);
}

/**
 * Avalia um item para um slot, considerando o estado atual da build.
 * Retorna array de { type: 'ok'|'warn'|'err'|'rec'|'btl'|'ins', msg: string }
 */
export function evalItem(slot, item, buildState) {
  const res = [];
  const cpu  = slot === 'cpu'  ? item : buildState.cpu;
  const mb   = slot === 'mb'   ? item : buildState.mb;
  const ram  = slot === 'ram'  ? item : buildState.ram;
  const gpu  = slot === 'gpu'  ? item : buildState.gpu;
  const psu  = slot === 'psu'  ? item : buildState.psu;
  const cool = slot === 'cool' ? item : buildState.cool;
  const cas  = slot === 'case' ? item : buildState.case;
  const ssd  = slot === 'ssd'  ? item : buildState.ssd;

  // ── CPU ↔ MB: socket ──
  if (cpu && mb) {
    if (cpu.socket !== mb.socket)
      res.push({ type: 'err', msg: `Socket incompatível: CPU ${cpu.socket} ≠ MB ${mb.socket}` });
    else
      res.push({ type: 'ok', msg: `Socket ${cpu.socket} compatível` });
  }

  // ── RAM ↔ MB: tipo de memória ──
  if (ram && mb) {
    if (ram.ramType !== mb.ramType)
      res.push({ type: 'err', msg: `RAM ${ram.ramType} incompatível com MB ${mb.ramType}` });
    else
      res.push({ type: 'ok', msg: `${ram.ramType} suportado pela placa-mãe` });
  }

  // ── RAM: capacidade vs CPU ──
  if (ram && cpu && mb && ram.ramType === mb.ramType) {
    if (cpu.tdp >= 120 && ram.gb < 32)
      res.push({ type: 'warn', msg: `${ram.gb}GB pode limitar CPU de alto TDP` });
    else if (ram.gb >= 64)
      res.push({ type: 'rec', msg: `${ram.gb}GB — ideal para workstation` });
  }

  // ── SSD ↔ MB: interface ──
  if (ssd && mb) {
    if (ssd.ssdType === 'NVMe' && !mb.nvme)
      res.push({ type: 'err', msg: 'MB sem suporte NVMe' });
    else if (ssd.ssdType === 'SATA' && !mb.sata)
      res.push({ type: 'err', msg: 'MB sem suporte SATA' });
    else
      res.push({ type: 'ok', msg: `${ssd.ssdType} suportado pela MB` });
  }

  // ── Cooler ↔ CPU: socket + TDP ──
  if (cool && cpu) {
    if (!cool.sockets.includes(cpu.socket))
      res.push({ type: 'err', msg: `Cooler não suporta socket ${cpu.socket}` });
    else if (cool.tdpMax < cpu.tdp)
      res.push({ type: 'err', msg: `Cooler insuficiente: ${cool.tdpMax}W < TDP ${cpu.tdp}W` });
    else if (cool.tdpMax < cpu.tdp * 1.2)
      res.push({ type: 'warn', msg: `Cooler no limite: ${cool.tdpMax}W vs TDP ${cpu.tdp}W` });
    else
      res.push({ type: 'ok', msg: `Refrigeração OK: ${cool.tdpMax}W > TDP ${cpu.tdp}W` });
  }

  // ── Gabinete ↔ MB: form factor ──
  if (cas && mb) {
    if (mb.formFact === 'ATX' && cas.formFact === 'mATX')
      res.push({ type: 'err', msg: 'Placa ATX não cabe em gabinete mATX' });
    else
      res.push({ type: 'ok', msg: `Form factor ${mb.formFact} compatível` });
  }

  // ── PSU: margem de potência ──
  if (psu && (cpu || gpu)) {
    const draw =
      (cpu  ? cpu.powerDraw  : 0) +
      (gpu  ? gpu.powerDraw  : 0) +
      (ram  ? ram.powerDraw  : 0) +
      (ssd  ? ssd.powerDraw  : 0) +
      (cool ? cool.powerDraw : 5) + 30;
    const margin = psu.psuW - draw;
    const pct    = Math.round((draw / psu.psuW) * 100);

    if (margin < 0)
      res.push({ type: 'ins', msg: `Fonte ${psu.psuW}W insuficiente (~${draw}W necessário)` });
    else if (pct > 85)
      res.push({ type: 'warn', msg: `Fonte acima de 85% de carga (${pct}%) — risco` });
    else if (pct <= 60)
      res.push({ type: 'rec', msg: `Fonte com boa margem: ${margin}W livre` });
    else
      res.push({ type: 'ok', msg: `Fonte OK: ${margin}W livre (${pct}%)` });
  }

  // ── GPU ↔ MB: PCIe ──
  if (gpu && mb) {
    if (gpu.pcie === 'PCIe5' && mb.pcie === 'PCIe4')
      res.push({ type: 'warn', msg: 'GPU PCIe 5.0 em slot 4.0 — funciona, banda ligeiramente reduzida' });
    else
      res.push({ type: 'ok', msg: 'Interface PCIe compatível' });
  }

  // ── Gargalo CPU ↔ GPU ──
  if (cpu && gpu && gpu.tier === 'flagship' && cpu.tdp < 100)
    res.push({ type: 'btl', msg: 'Possível gargalo: CPU de baixo TDP com GPU flagship' });

  return res;
}

/** Status geral: 'ok' | 'warn' | 'err' */
export function overallStatus(evals) {
  if (evals.some(e => e.type === 'err' || e.type === 'ins')) return 'err';
  if (evals.some(e => e.type === 'warn' || e.type === 'btl')) return 'warn';
  return 'ok';
}

/** Badge principal para exibir no modal */
export function getBadge(slot, item, evals, status) {
  if (slot === 'psu') {
    if (evals.some(e => e.type === 'ins'))  return { cls: 'ins', label: '⚡ Potência insuficiente' };
    if (evals.some(e => e.type === 'warn')) return { cls: 'warn', label: '⚠ Atenção' };
    if (evals.some(e => e.type === 'rec'))  return { cls: 'rec', label: '★ Recomendado' };
    return { cls: 'ok', label: '✓ Compatível' };
  }
  if (status === 'err')                     return { cls: 'err', label: '✕ Incompatível' };
  if (evals.some(e => e.type === 'btl'))    return { cls: 'btl', label: '⚡ Possível gargalo' };
  if (evals.some(e => e.type === 'rec'))    return { cls: 'rec', label: '★ Recomendado' };
  if (status === 'warn')                    return { cls: 'warn', label: '⚠ Atenção' };
  return { cls: 'ok', label: '✓ Compatível' };
}

/** Linhas do painel de compatibilidade na sidebar */
export function buildCompatLines(buildState) {
  const b = buildState;
  const lines = [];

  const add = (dot, cls, text) => lines.push({ dot, cls, text });

  // Socket
  if (!b.cpu || !b.mb)
    add('empty', '', 'Socket CPU/MB — aguardando seleção');
  else if (b.cpu.socket !== b.mb.socket)
    add('err', 'err-line', `Socket incompatível: ${b.cpu.socket} ≠ ${b.mb.socket}`);
  else
    add('ok', 'ok-line', `Socket ${b.cpu.socket} — Compatível`);

  // RAM
  if (!b.ram || !b.mb)
    add('empty', '', 'RAM — aguardando seleção');
  else if (b.ram.ramType !== b.mb.ramType)
    add('err', 'err-line', `RAM ${b.ram.ramType} ≠ MB ${b.mb.ramType}`);
  else
    add('ok', 'ok-line', `${b.ram.ramType} ${b.ram.gb}GB — Compatível`);

  // SSD
  if (!b.ssd)
    add('empty', '', 'Armazenamento — aguardando seleção');
  else if (b.mb && b.ssd.ssdType === 'NVMe' && !b.mb.nvme)
    add('err', 'err-line', 'MB sem suporte NVMe');
  else
    add('ok', 'ok-line', `${b.ssd.ssdType} — Compatível com MB`);

  // PSU
  if (!b.psu)
    add('empty', '', 'Fonte — aguardando seleção');
  else {
    const draw   = totalPower(b);
    const margin = b.psu.psuW - draw;
    const pct    = Math.round((draw / b.psu.psuW) * 100);
    if (margin < 0)
      add('err', 'err-line', `Fonte ${b.psu.psuW}W insuficiente (~${draw}W)`);
    else if (pct > 85)
      add('warn', 'warn-line', `Fonte acima de 85% (${pct}%) — risco`);
    else
      add('ok', 'ok-line', `Fonte ${b.psu.psuW}W — ${margin}W de margem`);
  }

  // Cooler
  if (!b.cool)
    add('empty', '', 'Cooler — aguardando seleção');
  else if (!b.cpu)
    add('empty', '', 'Cooler — selecione CPU para verificar');
  else if (!b.cool.sockets.includes(b.cpu.socket))
    add('err', 'err-line', `Cooler não suporta ${b.cpu.socket}`);
  else if (b.cool.tdpMax < b.cpu.tdp)
    add('err', 'err-line', `Cooler insuficiente: ${b.cool.tdpMax}W < TDP ${b.cpu.tdp}W`);
  else if (b.cool.tdpMax < b.cpu.tdp * 1.2)
    add('warn', 'warn-line', `Cooler no limite para TDP ${b.cpu.tdp}W`);
  else
    add('ok', 'ok-line', `Cooler OK: ${b.cool.tdpMax}W > TDP ${b.cpu.tdp}W`);

  // Case
  if (!b.case)
    add('empty', '', 'Gabinete — aguardando seleção');
  else if (b.mb && b.mb.formFact === 'ATX' && b.case.formFact === 'mATX')
    add('err', 'err-line', 'Placa ATX não cabe em gabinete mATX');
  else
    add('ok', 'ok-line', `Gabinete — ${b.mb ? b.mb.formFact : 'ATX'} compatível`);

  // GPU
  if (!b.gpu)
    add('empty', '', 'GPU — aguardando seleção');
  else if (b.cpu && b.gpu.tier === 'flagship' && b.cpu.tdp < 100)
    add('warn', 'warn-line', 'Possível gargalo: CPU pode limitar GPU flagship');
  else if (b.mb && b.gpu.pcie === 'PCIe5' && b.mb.pcie === 'PCIe4')
    add('warn', 'warn-line', 'GPU PCIe 5.0 em slot 4.0 — funcional');
  else
    add('ok', 'ok-line', 'GPU — Sem gargalos detectados');

  return lines;
}
