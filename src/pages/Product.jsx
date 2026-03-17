import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { CATALOG, PERIPH_CATALOG, MONITOR_CATALOG } from '../data/catalog';
import { PRODUCT_SPECS } from '../data/productSpecs';
import { useStore } from '../store/StoreContext';
import styles from './Product.module.css';

const CAT_LABELS = {
  cpu:'Processadores', mb:'Placas-Mãe', ram:'Memória RAM', gpu:'Placas de Vídeo',
  ssd:'Armazenamento', psu:'Fontes', cool:'Refrigeração', case:'Gabinetes',
  periph:'Periféricos', monitor:'Monitores',
};

// All catalog items in a flat list, including periph and monitor
function getAllItems() {
  return [
    ...Object.values(CATALOG).flat(),
    ...PERIPH_CATALOG,
    ...MONITOR_CATALOG,
  ];
}

function getRelated(product, catKey) {
  // same-category items
  let catArr;
  if (catKey === 'periph')  catArr = PERIPH_CATALOG;
  else if (catKey === 'monitor') catArr = MONITOR_CATALOG;
  else catArr = CATALOG[catKey] || [];

  const sameCat = catArr.filter(i => i.id !== product.id);
  const others  = getAllItems().filter(i => i.id !== product.id && !sameCat.find(s => s.id === i.id));
  return [...sameCat, ...others].slice(0, 5).map(item => ({
    icon:      item.icon,
    brand:     item.brand,
    name:      item.name,
    badge:     'sale',
    badgeLabel:'VER',
    old:       '',
    price:     item.val.toLocaleString('pt-BR'),
    cents:     '00',
    install:   '',
    stars:     '★★★★★',
    reviews:   '—',
    _id:       item.id,
    _catKey:   catKey,
    _catalogItem: item,
  }));
}

export default function Product({ product, catKey, onNavigate, onNavigateCat }) {
  const { addToCart, toggleWishlist, isWished } = useStore();
  const spec = PRODUCT_SPECS[product?.id] || {};

  const displayName  = spec.fullName    || product?.name    || 'Produto';
  const displayOld   = spec.oldPrice    || product?.price   || '';
  const displayPrice = product?.price   || 'R$0';
  const displayPix   = spec.pix         || '';
  const displayInst  = spec.installment || '';
  const description  = spec.description || 'Produto disponível no catálogo ZIRO com curadoria técnica.';
  const specs        = spec.specs       || (product?.specs || []).map(s => ['', s]);
  const options      = spec.options     || {};
  const rating       = spec.rating      || 4.8;
  const reviews      = spec.reviews     || '—';
  const badge        = spec.badge       || 'sale';
  const badgeLabel   = spec.badgeLabel  || 'DISPONÍVEL';

  const [mainImg, setMainImg] = useState(product?.icon || '📦');
  const [selected, setSelected] = useState(
    Object.fromEntries(Object.entries(options).map(([k, v]) => [k, v[0]]))
  );

  const related = product ? getRelated(product, catKey) : [];

  function handleRelatedClick(p) {
    const item = getAllItems().find(i => i.id === (p._id || p._catalogItem?.id));
    if (item) onNavigate('product', item, p._catKey || catKey);
  }

  if (!product) {
    return (
      <div style={{ padding:60, textAlign:'center', color:'var(--text3)', fontFamily:'var(--mono)' }}>
        Produto não encontrado. <button className="btn-ghost" onClick={() => onNavigate('home')}>Voltar</button>
      </div>
    );
  }

  return (
    <div className={`page-enter ${styles.wrap}`}>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <button onClick={() => onNavigate('home')}>Home</button>
        <span>/</span>
        <button onClick={() => onNavigateCat(catKey)}>{CAT_LABELS[catKey] || 'Categoria'}</button>
        <span>/</span>
        <span>{displayName}</span>
      </div>

      <div className={styles.layout}>
        {/* Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImg}>
            <span className={styles.mainImgEmoji}>{mainImg}</span>
            <div className={styles.mainImgGlow} />
          </div>
          <div className={styles.thumbRow}>
            {[product.icon, '📦', '🔌', '📊'].map((ico, i) => (
              <div
                key={i}
                className={`${styles.thumb} ${mainImg === ico ? styles.thumbActive : ''}`}
                onClick={() => setMainImg(ico)}
              >{ico}</div>
            ))}
          </div>
        </div>

        {/* Info column */}
        <div className={styles.infoCol}>
          <div className={styles.badgeRow}>
            <span className={styles.badgeAvail}>● Em estoque</span>
            <span className={`${styles.badgeType} ${styles['badge_' + badge]}`}>{badgeLabel}</span>
          </div>

          <p className={styles.prodBrand}>{product.brand}</p>
          <h1 className={styles.prodTitle}>{displayName}</h1>

          <div className={styles.prodRating}>
            <span className={styles.starsLg}>{'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}</span>
            <span className={styles.ratingNum}>{rating}</span>
            <span className={styles.ratingCount}>{reviews} avaliações</span>
          </div>

          <p className={styles.description}>{description}</p>

          {/* Specs chips from catalog */}
          <div className={styles.specChips}>
            {product.specs.map(s => <span key={s} className="sc">{s}</span>)}
          </div>

          <div className={styles.priceBox}>
            {displayOld && <p className={styles.prodOld}>{displayOld}</p>}
            <p className={styles.prodPrice}>{displayPrice}</p>
            {displayPix  && <p className={styles.prodPix}>💚 {displayPix} no Pix (5% off)</p>}
            {displayInst && <div className={styles.prodInstall}>{displayInst} <b>sem juros</b> no cartão</div>}
          </div>

          {/* Options (model, color, etc.) */}
          {Object.entries(options).map(([label, opts]) => (
            <div key={label} className={styles.prodOptions}>
              <label>{label}</label>
              <div className={styles.chips}>
                {opts.map(opt => (
                  <span
                    key={opt}
                    className={`${styles.chip} ${selected[label] === opt ? styles.chipActive : ''}`}
                    onClick={() => setSelected(prev => ({ ...prev, [label]: opt }))}
                  >{opt}</span>
                ))}
              </div>
            </div>
          ))}

          {/* Actions */}
          <div className={styles.actions}>
            <button
              className="btn-primary"
              style={{ textAlign:'center', padding:14 }}
              onClick={() => product && addToCart(product)}
            >
              🛒 Adicionar ao carrinho
            </button>
            <button
              className={`btn-ghost ${product && isWished(product.id) ? styles.wishedBtn : ''}`}
              style={{ textAlign:'center', padding:13 }}
              onClick={() => product && toggleWishlist(product)}
            >
              {product && isWished(product.id) ? '❤️ Salvo nos favoritos' : '🤍 Salvar nos favoritos'}
            </button>
            <button
              className="btn-ghost"
              style={{ textAlign:'center', padding:11, fontSize:12 }}
              onClick={() => onNavigate('builder')}
            >
              ⚙ Adicionar ao Montador de PC
            </button>
          </div>

          {/* Shipping */}
          <div className={styles.shipping}>
            <h4>ENVIO & GARANTIA</h4>
            {[
              { icon:'🚚', title:'Frete Grátis',     sub:<>Entrega em <b>até 3 dias úteis</b></> },
              { icon:'🛡️', title:'Garantia inclusa', sub:'Conforme especificação do fabricante' },
              { icon:'↩️', title:'Devolução grátis', sub:'30 dias sem perguntas' },
            ].map(r => (
              <div key={r.title} className={styles.shipRow}>
                <span className={styles.shipIcon}>{r.icon}</span>
                <div className={styles.shipInfo}><strong>{r.title}</strong><span>{r.sub}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical specs table */}
      <div className={styles.specsSection}>
        <h2>Especificações técnicas</h2>
        <div className={styles.specsTable}>
          {specs.map(([k, v], i) => (
            <div key={i} className={styles.specRow}>
              <span className={styles.specKey}>{k}</span>
              <span className={styles.specVal}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Related products */}
      <div className={styles.relatedSection}>
        <div className="section-head" style={{ margin:'0 0 16px' }}>
          <h2>Você também pode gostar</h2>
          <button className="see-all" onClick={() => onNavigateCat(catKey)}>Ver todos →</button>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:12 }}>
          {related.map((p, i) => (
            <ProductCard
              key={i}
              product={p}
              onNavigate={() => handleRelatedClick(p)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
