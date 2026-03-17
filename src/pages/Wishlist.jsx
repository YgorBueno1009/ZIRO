import { useStore } from '../store/StoreContext';
import styles from './Wishlist.module.css';

export default function Wishlist({ onNavigate }) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const [added, setAdded] = [new Set(), () => {}]; // local feedback

  function handleAddToCart(item) {
    addToCart(item);
  }

  if (wishlist.length === 0) {
    return (
      <div className={`page-enter ${styles.wrap}`}>
        <div className={styles.emptyBox}>
          <div className={styles.emptyIcon}>🤍</div>
          <h2>Sua lista de desejos está vazia</h2>
          <p>Salve produtos clicando no coração para acompanhar preços e disponibilidade.</p>
          <button className="btn-primary" onClick={() => onNavigate('home')}>Explorar produtos</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`page-enter ${styles.wrap}`}>
      <div className={styles.breadcrumb}>
        <button onClick={() => onNavigate('home')}>Home</button>
        <span>/</span>
        <span>Lista de Desejos</span>
      </div>

      <div className={styles.header}>
        <div>
          <h1>Lista de Desejos</h1>
          <p>{wishlist.length} {wishlist.length === 1 ? 'item salvo' : 'itens salvos'}</p>
        </div>
        <button
          className="btn-primary"
          onClick={() => wishlist.forEach(item => addToCart(item))}
        >
          🛒 Adicionar tudo ao carrinho
        </button>
      </div>

      <div className={styles.grid}>
        {wishlist.map(item => (
          <WishCard
            key={item.id}
            item={item}
            onNavigate={onNavigate}
            onRemove={() => toggleWishlist(item)}
            onAddToCart={() => handleAddToCart(item)}
          />
        ))}
      </div>
    </div>
  );
}

function WishCard({ item, onNavigate, onRemove, onAddToCart }) {
  const [cartFeedback, setCartFeedback] = [false, () => {}];

  function handleCart() {
    onAddToCart();
    // visual feedback handled by cart badge in nav
  }

  return (
    <div className={styles.card}>
      <button className={styles.removeWish} onClick={onRemove} title="Remover dos favoritos">❤️</button>
      <div className={styles.cardImg} onClick={() => onNavigate('product')}>
        {item.icon}
      </div>
      <div className={styles.cardBody}>
        <p className={styles.brand}>{item.brand}</p>
        <p className={styles.name} onClick={() => onNavigate('product')}>{item.name}</p>
        <div className={styles.specs}>
          {(item.specs || []).slice(0,2).map(s => <span key={s} className={styles.specTag}>{s}</span>)}
        </div>
        <div className={styles.priceRow}>
          <span className={styles.price}>{item.price}</span>
        </div>
        <div className={styles.actions}>
          <button className={styles.addBtn} onClick={handleCart}>
            🛒 Adicionar ao carrinho
          </button>
          <button className={styles.viewBtn} onClick={() => onNavigate('product')}>
            Ver produto
          </button>
        </div>
      </div>
    </div>
  );
}
