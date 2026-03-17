import { useState } from 'react';
import styles from './TradeIn.module.css';

const ESTIMATES = {
  gpu:      { 2024:2800,2023:1600,2022:900,2021:600,2020:350 },
  cpu:      { 2024:1800,2023:1100,2022:700,2021:450,2020:250 },
  ram:      { 2024:350, 2023:220, 2022:150,2021:100,2020:60  },
  ssd:      { 2024:280, 2023:180, 2022:120,2021:80, 2020:50  },
  notebook: { 2024:3200,2023:2000,2022:1200,2021:800,2020:500},
  monitor:  { 2024:900, 2023:600, 2022:400,2021:250,2020:150 },
  periph:   { 2024:200, 2023:140, 2022:90, 2021:60, 2020:40  },
};
const COND_MULT = { perfeito:1, bom:.8, regular:.6, ruim:.35 };

const HISTORY = [
  { icon:'🎮', name:'NVIDIA RTX 3080 10GB Founders Edition', date:'Jan 2026', credit:'R$ 1.280,00', status:'done' },
  { icon:'⚙️', name:'Intel Core i7-12700K LGA1700',          date:'Dez 2025', credit:'R$ 640,00',  status:'done' },
  { icon:'🧠', name:'G.Skill DDR4 32GB 3600MHz',              date:'Nov 2025', credit:'R$ 160,00',  status:'pend' },
];

export default function TradeIn({ onNavigate }) {
  const [cat,   setCat]   = useState('');
  const [year,  setYear]  = useState('');
  const [model, setModel] = useState('');
  const [cond,  setCond]  = useState('perfeito');
  const [submitted, setSubmitted] = useState(false);

  const base  = (ESTIMATES[cat] && year) ? (ESTIMATES[cat][year] || 500) : 0;
  const value = base ? Math.round(base * COND_MULT[cond]) : 0;
  const pct   = base ? Math.min(95, Math.round((value / base) * 100)) : 0;

  const COND_MSGS = {
    perfeito:'Excelente estado — valor máximo',
    bom:     'Bom estado — ótimo valor',
    regular: 'Estado regular — valor reduzido',
    ruim:    'Com defeito — valor mínimo',
  };

  function handleSubmit() {
    if (!cat || !year || !model) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className={`page-enter ${styles.wrap}`}>

      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.heroChip}>♻️ TRADE-IN</div>
          <h1>Troque hardware <span>antigo</span><br />por crédito.</h1>
          <p>Avalie seu componente em minutos e receba crédito ZIRO para usar no seu próximo upgrade.</p>
          <div className={styles.heroSteps}>
            {[
              { n:'01', title:'Preencha o formulário', sub:'Categoria, modelo e estado' },
              { n:'02', title:'Receba a estimativa',   sub:'Calculada na hora' },
              { n:'03', title:'Envie o produto',       sub:'Frete pago pela ZIRO' },
              { n:'04', title:'Crédito na conta',      sub:'Em até 3 dias úteis' },
            ].map(s => (
              <div key={s.n} className={styles.heroStep}>
                <div className={styles.stepNum}>{s.n}</div>
                <div><strong>{s.title}</strong><span>{s.sub}</span></div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.heroRightInner}>
            {[['♻️','Trade-in aprovado'],['⚡','Crédito instantâneo'],['🚚','Frete grátis'],['🛡️','Avaliação justa']].map(([i, t]) => (
              <div key={t} className={styles.heroFeature}><span>{i}</span><span>{t}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.flow}>
        {/* LEFT — Form */}
        <div className={styles.left}>

          <div className={styles.tcard}>
            <h3>Informações do produto</h3>
            <div className={styles.formRow}>
              <label>CATEGORIA</label>
              <select value={cat} onChange={e => setCat(e.target.value)}>
                <option value="">Selecione a categoria</option>
                <option value="gpu">Placa de Vídeo (GPU)</option>
                <option value="cpu">Processador (CPU)</option>
                <option value="ram">Memória RAM</option>
                <option value="ssd">SSD / HD</option>
                <option value="notebook">Notebook</option>
                <option value="monitor">Monitor</option>
                <option value="periph">Periférico</option>
              </select>
            </div>
            <div className={styles.formRow}>
              <label>MARCA E MODELO</label>
              <input
                type="text" placeholder="Ex: NVIDIA RTX 3080 Founders Edition"
                value={model} onChange={e => setModel(e.target.value)}
              />
            </div>
            <div className={styles.formRow}>
              <label>ANO DE COMPRA</label>
              <select value={year} onChange={e => setYear(e.target.value)}>
                <option value="">Selecione o ano</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020 ou anterior</option>
              </select>
            </div>
            <div className={styles.formRow}>
              <label>ESTADO DO PRODUTO</label>
              <div className={styles.condChips}>
                {[
                  ['perfeito','✨ Perfeito','Sem riscos ou defeitos'],
                  ['bom',     '👍 Bom',     'Marcas leves de uso'],
                  ['regular', '⚠️ Regular',  'Visíveis, funciona'],
                  ['ruim',    '🔧 Com defeito','Falhas ou danos'],
                ].map(([v, label, sub]) => (
                  <div
                    key={v}
                    className={`${styles.condChip} ${cond === v ? styles.condActive : ''}`}
                    onClick={() => setCond(v)}
                  >
                    <strong>{label}</strong><span>{sub}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.formRow}>
              <label>OBSERVAÇÕES (OPCIONAL)</label>
              <textarea placeholder="Descreva qualquer detalhe relevante sobre o produto…" rows={3} />
            </div>
          </div>

          <div className={styles.tcard}>
            <h3>Informações de envio</h3>
            <div className={styles.formRow}>
              <label>CEP</label>
              <input type="text" placeholder="00000-000" />
            </div>
            <div className={styles.formGrid}>
              <div className={styles.formRow}>
                <label>NOME</label>
                <input type="text" placeholder="Seu nome completo" />
              </div>
              <div className={styles.formRow}>
                <label>TELEFONE</label>
                <input type="text" placeholder="(11) 99999-9999" />
              </div>
            </div>
            <button
              className={`${styles.submitBtn} ${submitted ? styles.submitted : ''}`}
              onClick={handleSubmit}
            >
              {submitted ? '✓ Solicitação enviada!' : 'Confirmar Trade-in →'}
            </button>
          </div>

        </div>

        {/* RIGHT — Estimate + History */}
        <div className={styles.right}>

          <div className={styles.valuePreview}>
            <p className={styles.vpLabel}>ESTIMATIVA DE CRÉDITO</p>
            <p className={styles.vpVal} style={{ color: value ? 'var(--green)' : 'var(--text3)' }}>
              {value ? `R$ ${value.toLocaleString('pt-BR')},00` : 'R$ —'}
            </p>
            <p className={styles.vpSub}>
              {cat && year && model
                ? COND_MSGS[cond]
                : 'Preencha o formulário para ver a estimativa'}
            </p>
            <div className={styles.vpBar}><div className={styles.vpFill} style={{ width: `${pct}%` }} /></div>
            {value > 0 && (
              <div className={styles.vpDetails}>
                <div className={styles.vpRow}><span>Valor base ({year})</span><span>R$ {base.toLocaleString('pt-BR')},00</span></div>
                <div className={styles.vpRow}><span>Multiplicador ({cond})</span><span>×{COND_MULT[cond]}</span></div>
                <div className={`${styles.vpRow} ${styles.vpRowTotal}`}><span>Crédito estimado</span><span>R$ {value.toLocaleString('pt-BR')},00</span></div>
              </div>
            )}
          </div>

          <div className={styles.infoBox}>
            <h3>Como funciona o crédito?</h3>
            {[
              ['💳','Crédito ZIRO',     'Válido por 12 meses na loja'],
              ['🔗','Acumulável',       'Junte créditos de vários trade-ins'],
              ['⚡','Instantâneo',      'Liberado após avaliação presencial'],
              ['📦','Sem burocracia',   'Caixa e embalagem por conta da ZIRO'],
            ].map(([i, t, d]) => (
              <div key={t} className={styles.infoRow}>
                <span className={styles.infoIcon}>{i}</span>
                <div><strong>{t}</strong><span>{d}</span></div>
              </div>
            ))}
          </div>

          <div className={styles.history}>
            <h3>Histórico de trade-ins</h3>
            {HISTORY.map((h, i) => (
              <div key={i} className={styles.histItem}>
                <div className={styles.histIcon}>{h.icon}</div>
                <div className={styles.histInfo}>
                  <strong>{h.name}</strong>
                  <span>{h.date}</span>
                </div>
                <span className={styles.histCredit}>{h.credit}</span>
                <span className={`${styles.histStatus} ${h.status === 'done' ? styles.statusDone : styles.statusPend}`}>
                  {h.status === 'done' ? '✓ Concluído' : '⏳ Pendente'}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
