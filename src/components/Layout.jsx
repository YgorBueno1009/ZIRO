import { useStore } from '../store/StoreContext';
import styles from './Layout.module.css';

export default function Layout({ currentPage, onNavigate, onNavigateCat, children }) {
  const { cartCount, wishlist, user } = useStore();

  return (
    <div className={styles.root}>
      {/* ── TOPBAR ── */}
      <div className={styles.topbar}>
        <div className={styles.topbarL}>
          <span><span className={styles.dotLive}></span> Sistema online</span>
          <span>📦 +12.000 produtos em estoque</span>
          <span>🚚 Frete grátis acima de R$199</span>
        </div>
        <div className={styles.topbarR}>
          <button onClick={() => onNavigate('home')}>Rastrear pedido</button>
          <button onClick={() => onNavigate('tradein')}>Trade-in</button>
          <button onClick={() => onNavigate('builder')}>Montar PC</button>
        </div>
      </div>

      {/* ── NAV ── */}
      <nav className={styles.nav}>
        <button className={styles.logo} onClick={() => onNavigate('home')}>
          ZI<span className={styles.r}>R</span>O
          <span className={styles.logoSub}>tech store</span>
        </button>
        <div className={styles.searchBar}>
          <select>
            <option>TUDO</option><option>GPU</option><option>CPU</option>
            <option>RAM</option><option>SSD</option><option>PERIFÉRICOS</option>
          </select>
          <input type="text" placeholder="RTX 5090, Ryzen 9, monitor 4K…" />
          <button>⌕</button>
        </div>
        <div className={styles.navRight}>
          <button
            className={`${styles.navIconBtn} ${currentPage==='account'?styles.navActive:''}`}
            onClick={() => onNavigate('account')}
          >
            <span className={styles.i}>{user ? '👤' : '🔑'}</span>
            <span>{user ? user.name.split(' ')[0] : 'Conta'}</span>
          </button>

          <button
            className={`${styles.navIconBtn} ${currentPage==='wishlist'?styles.navActive:''}`}
            onClick={() => onNavigate('wishlist')}
            style={{ position:'relative' }}
          >
            <span className={styles.i}>{wishlist.length > 0 ? '❤️' : '🤍'}</span>
            <span>Desejos</span>
            {wishlist.length > 0 && (
              <span className={styles.wishBadge}>{wishlist.length}</span>
            )}
          </button>

          <button
            className={`${styles.navIconBtn} ${currentPage==='cart'?styles.navActive:''}`}
            onClick={() => onNavigate('cart')}
            style={{ position:'relative' }}
          >
            <span className={styles.i}>🛒</span>
            <span>Carrinho</span>
            {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
          </button>

          <button className="btn-outline" onClick={() => onNavigate('builder')}>⚙ Montar PC</button>
        </div>
      </nav>

      {/* ── SUBNAV ── */}
      <div className={styles.subnav}>
        <button className={`${styles.subnavLink} ${currentPage==='home'?styles.active:''}`} onClick={() => onNavigate('home')}>⚡ Destaques</button>
        <div className={styles.subnavSep} />
        <button className={currentPage==='cat-gpu'   ?styles.active:''} onClick={() => onNavigateCat('gpu')}>🎮 Placas de Vídeo</button>
        <button className={currentPage==='cat-cpu'   ?styles.active:''} onClick={() => onNavigateCat('cpu')}>⚙️ Processadores</button>
        <button className={currentPage==='cat-ram'   ?styles.active:''} onClick={() => onNavigateCat('ram')}>🧠 Memória RAM</button>
        <button className={currentPage==='cat-ssd'   ?styles.active:''} onClick={() => onNavigateCat('ssd')}>💾 Armazenamento</button>
        <button className={currentPage==='cat-psu'   ?styles.active:''} onClick={() => onNavigateCat('psu')}>🔌 Fontes</button>
        <button className={currentPage==='cat-cool'  ?styles.active:''} onClick={() => onNavigateCat('cool')}>❄️ Refrigeração</button>
        <div className={styles.subnavSep} />
        <button className={currentPage==='cat-periph'  ?styles.active:''} onClick={() => onNavigateCat('periph')}>🖱️ Periféricos</button>
        <button className={currentPage==='cat-monitor' ?styles.active:''} onClick={() => onNavigateCat('monitor')}>🖥 Monitores</button>
        <button className={currentPage==='builder'?styles.active:''} onClick={() => onNavigate('builder')}>🔧 Montar PC</button>
        <button className={currentPage==='tradein'?styles.active:''} onClick={() => onNavigate('tradein')}>♻️ Trade-in</button>
      </div>

      {/* ── PAGE CONTENT ── */}
      <main className={styles.main}>{children}</main>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div>
            <span className={styles.footerLogo}>ZI<span className={styles.r}>R</span>O</span>
            <p className={styles.footerTag}>// TECH STORE BR</p>
            <p className={styles.footerDesc}>Especialistas em hardware, periféricos e eletrônicos com curadoria técnica em cada produto.</p>
          </div>
          <div>
            <h4>Hardware</h4>
            <ul>
              {[['Placas de Vídeo','gpu'],['Processadores','cpu'],['Memória RAM','ram'],['SSD & NVMe','ssd'],['Fontes ATX','psu']].map(([l,c]) => (
                <li key={l}><button onClick={() => onNavigateCat(c)}>{l}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Ferramentas</h4>
            <ul>
              <li><button onClick={() => onNavigate('builder')}>Montador de PC</button></li>
              <li><button onClick={() => onNavigate('tradein')}>Trade-in</button></li>
              <li><button onClick={() => onNavigate('account')}>Minha Conta</button></li>
              <li><button onClick={() => onNavigate('wishlist')}>Favoritos</button></li>
              <li><button>Blog Técnico</button></li>
            </ul>
          </div>
          <div>
            <h4>Suporte</h4>
            <ul>
              {['Central de Ajuda','Rastrear Pedido','Garantia','Devoluções','Contato'].map(l => (
                <li key={l}><button>{l}</button></li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© 2026 ZIRO Tech Store — CNPJ 00.000.000/0001-00</span>
          <div className={styles.payRow}>
            {['Visa','Master','Pix','Boleto','Elo'].map(p => (
              <span key={p} className={styles.pay}>{p}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
