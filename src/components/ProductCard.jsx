import { useState } from 'react';
import { useStore } from '../store/StoreContext';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, onNavigate }) {
  const { addToCart, toggleWishlist, isWished } = useStore();
  const [added, setAdded] = useState(false);
  const wished = product._catalogItem ? isWished(product._catalogItem.id) : false;

  function handleAdd(e) {
    e.stopPropagation();
    if (product._catalogItem) addToCart(product._catalogItem);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  function handleWish(e) {
    e.stopPropagation();
    if (product._catalogItem) toggleWishlist(product._catalogItem);
  }

  return (
    <div className={styles.pcard} onClick={() => onNavigate(product)}>
      <div className="pimg">
        {product.badgeLabel && (
          <span className={`pbadge ${product.badge}`}>{product.badgeLabel}</span>
        )}
        <button
          className={`wish ${wished ? 'active' : ''}`}
          onClick={handleWish}
        >
          {wished ? '❤️' : '🤍'}
        </button>
        {product.icon}
      </div>
      <div className="pinfo">
        <p className="pbrand">{product.brand}</p>
        <p className="pname">{product.name}</p>
        <div className="pstars">{product.stars} <span>({product.reviews})</span></div>
        {product.old && <p className="pold">{product.old}</p>}
        <p className="pprice"><sup>R$</sup>{product.price}<small style={{fontSize:13}}>,{product.cents}</small></p>
        {product.install && <p className="pinstall">{product.install} <b>s/ juros</b></p>}
        <button
          className={`padd ${added ? styles.added : ''}`}
          onClick={handleAdd}
        >
          {added ? '✓ Adicionado!' : '+ Adicionar'}
        </button>
      </div>
    </div>
  );
}
