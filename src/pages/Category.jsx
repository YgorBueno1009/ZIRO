import ProductCard from '../components/ProductCard';
import { CATALOG, PERIPH_CATALOG, MONITOR_CATALOG, getCategoryProducts } from '../data/catalog';
import styles from './Category.module.css';

const CAT_TITLES = {
  gpu:'🎮 Placas de Vídeo', cpu:'⚙️ Processadores', ram:'🧠 Memória RAM',
  ssd:'💾 Armazenamento', psu:'🔌 Fontes de Alimentação', cool:'❄️ Refrigeração',
  periph:'🖱️ Periféricos', monitor:'🖥️ Monitores',
};

// helper: find catalog array for any catKey
function getCatalogArray(catKey) {
  if (catKey === 'periph')  return PERIPH_CATALOG;
  if (catKey === 'monitor') return MONITOR_CATALOG;
  return CATALOG[catKey] || [];
}

export default function Category({ catKey, onNavigate, onNavigateCat }) {
  const title = CAT_TITLES[catKey] || 'Categoria';
  const items = getCategoryProducts(catKey);   // already have _catalogItem attached

  function handleProductClick(p) {
    if (p._catalogItem) {
      onNavigate('product', p._catalogItem, catKey);
    } else {
      onNavigate('product');
    }
  }

  return (
    <div className={`page-enter ${styles.wrap}`}>
      <div className={styles.topRow}>
        <div className={styles.breadcrumb}>
          <button onClick={() => onNavigate('home')}>Home</button>
          <span>/</span>
          <span>{title.replace(/^.{2}/,'')}</span>
        </div>
        <div className={styles.sortRow}>
          <span className={styles.count}>{items.length} produtos</span>
          <select className={styles.sort}>
            <option>Mais vendidos</option><option>Menor preço</option>
            <option>Maior preço</option><option>Mais avaliados</option>
          </select>
        </div>
      </div>

      <div className="section-head">
        <h2>{title}</h2>
      </div>

      <div className={styles.grid}>
        {items.map((p, i) => (
          <ProductCard
            key={p._catalogItem?.id || i}
            product={p}
            onNavigate={() => handleProductClick(p)}
          />
        ))}
      </div>
    </div>
  );
}
