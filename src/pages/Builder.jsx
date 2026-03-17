import { useState, useCallback } from 'react';
import { CATALOG, MODAL_TITLES } from '../data/catalog';
import { evalItem, overallStatus, getBadge, buildCompatLines, calcPowerDraw, totalPower } from '../data/compatibility';
import { useStore } from '../store/StoreContext';
import styles from './Builder.module.css';

const SLOT_META = [
  {key:'cpu',  num:'01', icon:'⚙️', label:'PROCESSADOR',        empty:'Selecionar processador →'},
  {key:'mb',   num:'02', icon:'🔲', label:'PLACA-MÃE',           empty:'Selecionar placa-mãe →'},
  {key:'ram',  num:'03', icon:'🧠', label:'MEMÓRIA RAM',          empty:'Selecionar memória RAM →'},
  {key:'gpu',  num:'04', icon:'🎮', label:'PLACA DE VÍDEO',       empty:'Selecionar placa de vídeo →'},
  {key:'ssd',  num:'05', icon:'💾', label:'ARMAZENAMENTO',        empty:'Selecionar SSD / HDD →'},
  {key:'psu',  num:'06', icon:'🔌', label:'FONTE DE ALIMENTAÇÃO', empty:'Selecionar fonte →'},
  {key:'cool', num:'07', icon:'❄️', label:'COOLER / REFRIGERAÇÃO',empty:'Selecionar cooler →'},
  {key:'case', num:'08', icon:'🏠', label:'GABINETE',             empty:'Selecionar gabinete →'},
];

const INITIAL_BUILD = {
  cpu:  CATALOG.cpu[0],
  mb:   CATALOG.mb[0],
  ram:  CATALOG.ram[0],
  gpu:  null, ssd: null,
  psu:  CATALOG.psu[0],
  cool: null, case: null,
};

// ── Badge pill component ──
function CompatBadge({ type, msg }) {
  const icons = { ok:'✓', warn:'⚠', err:'✕', rec:'★', btl:'⚡', ins:'⚡' };
  return (
    <span className={`${styles.badge} ${styles['badge_' + type]}`}>
      {icons[type] || '·'} {msg}
    </span>
  );
}

// ── Modal item badge ──
function MiBadge({ cls, label }) {
  return <span className={`${styles.miBadge} ${styles['miBadge_' + cls]}`}>{label}</span>;
}

export default function Builder({ onNavigate }) {
  const { addToCart } = useStore();
  const [build, setBuild]         = useState(INITIAL_BUILD);
  const [modal, setModal]       = useState(null);   // slot key or null
  const [cartAdded, setCartAdded] = useState(false);

  // Compute derived values
  const total     = Object.values(build).reduce((a, b) => a + (b ? b.val : 0), 0);
  const breakdown = calcPowerDraw(build);
  const power     = totalPower(build);
  const psuW      = build.psu ? build.psu.psuW : 0;
  const powerPct  = psuW ? Math.min(100, Math.round((power / psuW) * 100)) : 0;
  const margin    = psuW ? psuW - power : 0;
  const barColor  = powerPct > 85 ? 'var(--red)' : powerPct > 65 ? 'var(--yellow)' : 'var(--green)';
  const slotCount = Object.values(build).filter(Boolean).length;
  const compatLines = buildCompatLines(build);

  const selectComponent = useCallback((slot, item) => {
    setBuild(prev => ({ ...prev, [slot]: item }));
    setModal(null);
  }, []);

  const removeSlot = useCallback((slot) => {
    setBuild(prev => ({ ...prev, [slot]: null }));
  }, []);

  function handleCart() {
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
  }

  return (
    <div className={`page-enter ${styles.wrap}`}>

      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.heroChip}>⚙ MONTADOR DE PC · ZIRO</div>
        <h1 className={styles.heroH1}>Monte seu PC.<br /><span>Compatibilidade</span> garantida.</h1>
        <p className={styles.heroP}>
          Selecione os componentes do catálogo ZIRO. O sistema verifica compatibilidade, consumo energético
          e gargalos em tempo real — antes de você comprar.
        </p>
        <div className={styles.statsRow}>
          <div className={styles.bstat}><span className={`${styles.bstatVal} ${styles.accent}`}>R$ {total.toLocaleString('pt-BR')}</span><span className={styles.bstatLbl}>TOTAL DA BUILD</span></div>
          <div className={styles.bstat}><span className={styles.bstatVal}>{power}W</span><span className={styles.bstatLbl}>CONSUMO EST.</span></div>
          <div className={styles.bstat}><span className={`${styles.bstatVal} ${styles.green}`} style={{color: powerPct>85?'var(--accent)':powerPct>65?'var(--yellow)':'var(--green)'}}>{psuW ? `+${margin}W` : '—'}</span><span className={styles.bstatLbl}>MARGEM FONTE</span></div>
          <div className={styles.bstat}><span className={styles.bstatVal}>{slotCount}/8</span><span className={styles.bstatLbl}>PEÇAS SELECIONADAS</span></div>
        </div>
      </div>

      <div className={styles.layout}>
        {/* SLOTS */}
        <div className={styles.slots}>
          {SLOT_META.map(({ key, num, icon, label, empty }) => {
            const item   = build[key];
            const evals  = item ? evalItem(key, item, build) : [];
            const status = item ? overallStatus(evals) : 'empty';

            return (
              <div
                key={key}
                className={`${styles.slot} ${item ? styles.filled : ''} ${status === 'err' ? styles.slotError : status === 'warn' ? styles.slotWarn : ''}`}
              >
                <div className={styles.slotHeader} onClick={() => setModal(key)}>
                  <span className={styles.slotNum}>{num}</span>
                  <div className={`${styles.slotIcon} ${item ? styles.slotIconFilled : ''} ${status === 'err' ? styles.slotIconErr : ''}`}>{icon}</div>
                  <div className={styles.slotMeta}>
                    <p className={styles.slotCat}>{label}</p>
                    {item
                      ? <p className={styles.slotName}>{item.name}</p>
                      : <p className={styles.slotEmpty}>{empty}</p>
                    }
                  </div>
                  <span className={styles.slotPrice} style={{ color: item ? '' : 'var(--text3)' }}>
                    {item ? item.price : '—'}
                  </span>
                  {item
                    ? <button className={`${styles.slotAction} ${styles.rem}`} onClick={e => { e.stopPropagation(); removeSlot(key); }}>✕</button>
                    : <button className={`${styles.slotAction} ${styles.add}`} onClick={e => { e.stopPropagation(); setModal(key); }}>+</button>
                  }
                </div>

                {/* Compat strip */}
                {item && evals.length > 0 && (
                  <div className={`${styles.slotCompat} ${styles['sc_' + status]}`}>
                    {evals.slice(0, 3).map((e, i) => (
                      <CompatBadge key={i} type={e.type} msg={e.msg} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* SIDEBAR */}
        <div className={styles.sidebar}>

          {/* Budget */}
          <div className={styles.sideCard}>
            <h3><span className={styles.accentBar} /> Orçamento</h3>
            <p className={styles.budgetLabel}>TOTAL ESTIMADO</p>
            <p className={styles.budgetTotal}>R$ {total.toLocaleString('pt-BR')},00</p>
            <div className={styles.budgetItems}>
              {SLOT_META.map(({ key, label }) => {
                const item = build[key];
                const evals = item ? evalItem(key, item, build) : [];
                const dot = item ? overallStatus(evals) : 'empty';
                return (
                  <div key={key} className={styles.bitem}>
                    <span className={styles.bitemName}>
                      <span className={`${styles.bdot} ${styles['bdot_' + dot]}`} />
                      {label.split(' ')[0]}
                    </span>
                    <span className={`${styles.bitemPrice} ${item ? '' : styles.bitemEmpty}`}>
                      {item ? item.price : '—'}
                    </span>
                  </div>
                );
              })}
            </div>
            <button
              className={`btn-primary ${styles.buyBtn} ${cartAdded ? styles.buyBtnAdded : ''}`}
              onClick={() => {
                Object.values(build).filter(Boolean).forEach(item => addToCart(item));
                handleCart();
                setTimeout(() => onNavigate && onNavigate('cart'), 1200);
              }}
            >
              {cartAdded ? '✓ Adicionado ao carrinho!' : '🛒 Comprar tudo junto'}
            </button>
            <button className="btn-ghost" style={{ width:'100%', marginTop:8, textAlign:'center' }}>💾 Salvar build</button>
          </div>

          {/* Power */}
          <div className={styles.sideCard}>
            <h3><span className={styles.accentBar} style={{ background: 'var(--yellow)' }} /> Consumo Energético</h3>
            <div className={styles.powerRow}>
              <span className={styles.powerVal}>{power}W</span>
              <span className={styles.powerPsu}>Fonte: {psuW ? `${psuW}W` : '—'}</span>
            </div>
            <div className={styles.powerBarTrack}>
              <div className={styles.powerBarFill} style={{ width: `${powerPct}%`, background: barColor }} />
            </div>
            <div className={styles.powerMeta}>
              <span>{psuW ? `${powerPct}% utilizado` : '— selecione a fonte'}</span>
              <span style={{ color: barColor }}>{psuW ? `${margin}W livre` : ''}</span>
            </div>
            <div className={styles.breakdown}>
              {Object.entries(breakdown).filter(([, v]) => v > 0).map(([k, v]) => (
                <div key={k} className={styles.breakdownRow}>
                  <span>{{cpu:'CPU',gpu:'GPU',ram:'RAM',ssd:'SSD',cool:'Cooler',misc:'Misc'}[k]}</span>
                  <span>{v}W</span>
                </div>
              ))}
              <div className={`${styles.breakdownRow} ${styles.breakdownTotal}`}>
                <span>TOTAL</span><span>{power}W</span>
              </div>
            </div>
          </div>

          {/* Compat panel */}
          <div className={styles.sideCard}>
            <h3><span className={styles.accentBar} style={{ background: 'var(--green)' }} /> Compatibilidade</h3>
            <div className={styles.compatPanel}>
              {compatLines.map((line, i) => (
                <div key={i} className={`${styles.compatLine} ${styles[line.cls] || ''}`}>
                  <span className={`${styles.compatDot} ${styles['cdot_' + line.dot]}`} />
                  <span className={`${styles.clLabel} ${styles['clLabel_' + line.dot]}`}>{line.text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* MODAL */}
      {modal && (
        <div className={styles.modalOverlay} onClick={e => { if (e.target === e.currentTarget) setModal(null); }}>
          <div className={styles.modal}>
            <div className={styles.modalHead}>
              <div style={{ flex: 1 }}>
                <h2 className={styles.modalTitle}>{MODAL_TITLES[modal]}</h2>
                <p className={styles.modalSub}>{CATALOG[modal]?.length} peças no catálogo ZIRO</p>
              </div>
              <div className={styles.modalLegend}>
                {[['var(--green)','Compatível'],['var(--yellow)','Atenção'],['#ef4444','Incompatível'],['var(--blue)','Recomendado']].map(([c, l]) => (
                  <span key={l} className={styles.legendItem}><span className={styles.legendDot} style={{ background: c }} />{l}</span>
                ))}
              </div>
              <button className={styles.modalClose} onClick={() => setModal(null)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              {(CATALOG[modal] || []).map(item => {
                const evals  = evalItem(modal, item, build);
                const status = overallStatus(evals);
                const badge  = getBadge(modal, item, evals, status);
                const isIncompat = evals.some(e => e.type === 'err' || e.type === 'ins');
                const isRec      = evals.some(e => e.type === 'rec') && !isIncompat;
                const reason     = evals.length ? evals[0].msg : '';

                return (
                  <div
                    key={item.id}
                    className={`${styles.modalItem} ${isIncompat ? styles.miIncompat : ''} ${isRec ? styles.miRec : ''}`}
                    onClick={() => selectComponent(modal, item)}
                  >
                    <div className={styles.miIcon}>{item.icon}</div>
                    <div className={styles.miInfo}>
                      <p className={styles.miBrand}>{item.brand}</p>
                      <p className={styles.miName}>{item.name}</p>
                      <div className={styles.miSpecs}>
                        {item.specs.map(s => <span key={s} className="sc">{s}</span>)}
                      </div>
                    </div>
                    <div className={styles.miRight}>
                      <div style={{display:'flex',alignItems:'center',gap:8}}>
                        <span className={styles.miPrice}>{item.price}</span>
                        <button
                          className={styles.miInfoBtn}
                          title="Ver página do produto"
                          onClick={e => { e.stopPropagation(); onNavigate && onNavigate('product', item, modal); }}
                        >↗</button>
                      </div>
                      <MiBadge cls={badge.cls} label={badge.label} />
                      {reason && <span className={styles.miReason}>{reason}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
