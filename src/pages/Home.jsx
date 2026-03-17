import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { CATALOG } from '../data/catalog';
import styles from './Home.module.css';

// Mais vendidos — mapeados para itens reais do catálogo
const BESTSELLERS = [
  { catalogId:'g2',  catKey:'gpu',  badge:'sale', badgeLabel:'-32%',      old:'R$ 5.199,00', price:'3.539', cents:'00', install:'12x de R$294,91', stars:'★★★★★', reviews:'1.432' },
  { catalogId:'cpu5',catKey:'cpu',  badge:'hot',  badgeLabel:'TOP',        old:'R$ 3.899,00', price:'3.199', cents:'00', install:'12x de R$266,58', stars:'★★★★☆', reviews:'763'   },
  { catalogId:'c8',  catKey:'cool', badge:'sale', badgeLabel:'-30%',       old:'R$ 299,00',   price:'209',   cents:'00', install:'2x de R$104,50',  stars:'★★★★★', reviews:'3.201' },
  { catalogId:'s1',  catKey:'ssd',  badge:'hot',  badgeLabel:'TOP',        old:'R$ 1.199,00', price:'849',   cents:'00', install:'6x de R$141,50',  stars:'★★★★★', reviews:'2.341' },
  { catalogId:'r1',  catKey:'ram',  badge:'free', badgeLabel:'Frete Grátis',old:'R$ 899,00',  price:'749',   cents:'00', install:'6x de R$124,83',  stars:'★★★★★', reviews:'1.102' },
];

// Destaque da semana — card grande + 4 pequenos, todos linkados ao catálogo
const FEATURED_BIG = { catalogId:'g1', catKey:'gpu' };
const FEATURED_SMALL = [
  { catalogId:'cpu1', catKey:'cpu',  old:'R$ 4.299', price:'R$ 3.649,00' },
  { catalogId:'r1',   catKey:'ram',  old:'R$ 899',   price:'R$ 749,00'   },
  { catalogId:'s1',   catKey:'ssd',  old:'R$ 1.199', price:'R$ 849,00'   },
  { catalogId:'p1',   catKey:'psu',  old:'R$ 1.099', price:'R$ 879,00'   },
];

// Flash Sale — mapeados ao catálogo onde possível
const FLASH_SALE = [
  { catalogId:'g6',  catKey:'gpu',  discount:'-20%',  old:'R$ 12.999', price:'R$ 10.499,00' },
  { catalogId:'c3',  catKey:'cool', discount:'-20%',  old:'R$ 1.499',  price:'R$ 1.199,00'  },
  { catalogId:'r2',  catKey:'ram',  discount:'-18%',  old:'R$ 1.999',  price:'R$ 1.649,00'  },
  { catalogId:'s4',  catKey:'ssd',  discount:'-21%',  old:'R$ 1.899',  price:'R$ 1.499,00'  },
  { catalogId:'cs1', catKey:'case', discount:'-20%',  old:'R$ 1.099',  price:'R$ 879,00'    },
];

const CATEGORIES = [
  {icon:'🎮',label:'Placas de Vídeo',cat:'gpu'},
  {icon:'⚙️',label:'Processadores',  cat:'cpu'},
  {icon:'🧠',label:'Memória RAM',     cat:'ram'},
  {icon:'💾',label:'SSD & NVMe',      cat:'ssd'},
  {icon:'🖥️',label:'Monitores',       cat:'monitor'},
  {icon:'⌨️',label:'Teclados',        cat:'periph'},
  {icon:'🖱️',label:'Mouses',          cat:'periph'},
  {icon:'🎧',label:'Headsets',        cat:'periph'},
  {icon:'🔌',label:'Fontes ATX',      cat:'psu'},
];

function useCountdown(initialSeconds) {
  const [time, setTime] = useState(initialSeconds);
  useEffect(() => {
    const id = setInterval(() => setTime(t => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const h = Math.floor(time / 3600);
  const m = Math.floor((time % 3600) / 60);
  const s = time % 60;
  return [h, m, s].map(v => String(v).padStart(2, '0'));
}

// Helper: find item in catalog by id
function findItem(id) {
  return Object.values(CATALOG).flat().find(i => i.id === id) || null;
}

export default function Home({ onNavigate, onNavigateCat }) {
  const [hh, mm, ss] = useCountdown(5 * 3600 + 47 * 60 + 22);

  function goProduct(catalogId, catKey) {
    const item = findItem(catalogId);
    if (item) onNavigate('product', item, catKey);
  }

  // Build ProductCard-compatible objects from catalog
  const bestsellerCards = BESTSELLERS.map(b => {
    const item = findItem(b.catalogId);
    if (!item) return null;
    return {
      icon:        item.icon,
      brand:       item.brand,
      name:        item.name,
      badge:       b.badge,
      badgeLabel:  b.badgeLabel,
      old:         b.old,
      price:       b.price,
      cents:       b.cents,
      install:     b.install,
      stars:       b.stars,
      reviews:     b.reviews,
      _catalogItem: item,
      _catKey:     b.catKey,
    };
  }).filter(Boolean);

  const featuredBigItem  = findItem(FEATURED_BIG.catalogId);
  const featuredSmallItems = FEATURED_SMALL.map(f => ({ ...f, item: findItem(f.catalogId) })).filter(f => f.item);
  const flashItems = FLASH_SALE.map(f => ({ ...f, item: findItem(f.catalogId) })).filter(f => f.item);

  return (
    <div className={`page-enter ${styles.wrap}`}>

      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroLeft}>
          <div className={styles.heroChip}>Lançamento 2026</div>
          <h1 className={styles.heroH1}>
            <span className={styles.heroSm}>NVIDIA</span><br />
            RTX <span className={styles.heroHl}>5090</span><br />
            chegou.
          </h1>
          <div className={styles.heroMeta}>
            <span>32GB GDDR7</span><span>575W TDP</span><span>DLSS 4.0</span>
          </div>
          <div className={styles.heroActions}>
            <button className="btn-primary" onClick={() => goProduct('g1','gpu')}>Ver produto →</button>
            <button className="btn-ghost"   onClick={() => onNavigate('builder')}>Montar build</button>
          </div>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.heroMock}>🎮</div>
          <div className={styles.heroPtag}><span>a partir de</span>R$ 7.999</div>
        </div>
        <div className={styles.heroDots}>
          <div className={`${styles.dot} ${styles.active}`} /><div className={styles.dot} /><div className={styles.dot} /><div className={styles.dot} />
        </div>
      </div>

      {/* STATS */}
      <div className={styles.stats}>
        {[
          {icon:'🚚',title:'Frete Grátis',    sub:'Acima de R$199'},
          {icon:'💳',title:'12x Sem Juros',   sub:'Visa, Master, Elo'},
          {icon:'🛡️',title:'Garantia +12m',   sub:'Em todos os produtos'},
          {icon:'⚡',title:'Envio Rápido',     sub:'Pedidos até 18h saem hoje'},
        ].map(s => (
          <div key={s.title} className={styles.stat}>
            <div className={styles.statIcon}>{s.icon}</div>
            <div className={styles.statText}><strong>{s.title}</strong><span>{s.sub}</span></div>
          </div>
        ))}
      </div>

      {/* CATEGORIES */}
      <div className="section-head">
        <h2>Categorias <span className="stag">// 09 segmentos</span></h2>
        <button className="see-all">Ver todas →</button>
      </div>
      <div className={styles.cats}>
        {CATEGORIES.map((c, i) => (
          <div key={i} className={styles.cat} onClick={() => onNavigateCat(c.cat)}>
            <div className={styles.catIcon}>{c.icon}</div>
            <span className={styles.catLabel}>{c.label}</span>
          </div>
        ))}
      </div>

      {/* FEATURED — Destaque da semana */}
      <div className="section-head"><h2>Destaque da semana</h2><button className="see-all">Ver todos →</button></div>
      <div className={styles.featuredRow}>

        {/* big card */}
        {featuredBigItem && (
          <div className={styles.fbig} onClick={() => goProduct(FEATURED_BIG.catalogId, FEATURED_BIG.catKey)}>
            <div className={styles.fbigImg}>
              {featuredBigItem.icon}<div className={styles.fbigRibbon}>DESTAQUE</div>
            </div>
            <div className={styles.fbigInfo}>
              <p className={styles.fbigBrand}>{featuredBigItem.brand}</p>
              <h3>{featuredBigItem.name}</h3>
              <div style={{display:'flex',gap:5,flexWrap:'wrap',marginBottom:12}}>
                {featuredBigItem.specs.map(s => <span key={s} className="sc">{s}</span>)}
              </div>
              <p className={styles.fbigOld}>R$ 9.499,00</p>
              <p className={styles.fbigPrice}>{featuredBigItem.price}</p>
              <button
                className="btn-primary"
                onClick={e => { e.stopPropagation(); goProduct(FEATURED_BIG.catalogId, FEATURED_BIG.catKey); }}
              >Ver produto →</button>
            </div>
          </div>
        )}

        {/* small cards */}
        <div className={styles.fsmallGrid}>
          {featuredSmallItems.map((f, i) => (
            <div key={i} className={styles.fsmall} onClick={() => goProduct(f.catalogId, f.catKey)}>
              <div className={styles.fsmallImg}>{f.item.icon}</div>
              <div className={styles.fsmallInfo}>
                <p className={styles.fsmallBrand}>{f.item.brand}</p>
                <h4>{f.item.name}</h4>
                <p className={styles.fold}>{f.old}</p>
                <p className={styles.fprice}>{f.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BESTSELLERS — Mais vendidos */}
      <div className="section-head"><h2>Mais vendidos</h2><button className="see-all">Ver todos →</button></div>
      <div className="products" style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:12,margin:'0 32px 32px'}}>
        {bestsellerCards.map((p, i) => (
          <ProductCard
            key={i}
            product={p}
            onNavigate={() => goProduct(p._catalogItem.id, p._catKey)}
          />
        ))}
      </div>

      {/* FLASH SALE */}
      <div className={styles.flashWrap}>
        <div className={styles.flashHead}>
          <div className={styles.flashTitle}><span>⚡</span> Flash Sale</div>
          <div className={styles.flashTimer}>
            <span className={styles.ftlabel}>ENCERRA EM</span>
            <div className={styles.tblock}>{hh}</div><span className={styles.tsep}>:</span>
            <div className={styles.tblock}>{mm}</div><span className={styles.tsep}>:</span>
            <div className={styles.tblock}>{ss}</div>
          </div>
        </div>
        <div className={styles.flashGrid}>
          {flashItems.map((f, i) => (
            <div key={i} className={styles.fcard} onClick={() => goProduct(f.catalogId, f.catKey)}>
              <div className={styles.fcardImg}>
                {f.item.icon}
                <div className={styles.fdiscount}>{f.discount}</div>
              </div>
              <div className={styles.fcardInfo}>
                <p className={styles.fcardName}>{f.item.name}</p>
                <p className={styles.fcardOld}>{f.old}</p>
                <p className={styles.fcardPrice}>{f.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BANNERS */}
      <div className={styles.banners}>
        <div className={`${styles.banner} ${styles.b1}`} onClick={() => onNavigate('builder')}>
          <div><p className={styles.bannerTag}>// EXCLUSIVO ZIRO</p><h3>Monte seu PC customizado</h3><p>Verificação de compatibilidade em tempo real.</p></div>
          <button className={styles.bannerCta}>Iniciar montagem →</button>
          <span className={styles.bannerIcon}>🔧</span>
        </div>
        <div className={`${styles.banner} ${styles.b2}`} onClick={() => onNavigate('tradein')}>
          <div><p className={styles.bannerTag}>// TRADE-IN</p><h3>Troque hardware antigo por crédito</h3><p>Avalie seu componente e receba crédito.</p></div>
          <button className={styles.bannerCta}>Fazer Trade-in →</button>
          <span className={styles.bannerIcon}>♻️</span>
        </div>
        <div className={`${styles.banner} ${styles.b3}`}>
          <div><p className={styles.bannerTag}>// ZIRO+</p><h3>Cashback em tudo</h3><p>5% de volta, frete grátis ilimitado e acesso antecipado.</p></div>
          <button className={styles.bannerCta}>Assinar por R$24,90/mês →</button>
          <span className={styles.bannerIcon}>⭐</span>
        </div>
      </div>

    </div>
  );
}
