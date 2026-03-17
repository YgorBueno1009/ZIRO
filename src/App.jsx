import { useState, useCallback } from 'react';
import { StoreProvider } from './store/StoreContext';
import Layout    from './components/Layout';
import Home      from './pages/Home';
import Product   from './pages/Product';
import Category  from './pages/Category';
import Builder   from './pages/Builder';
import TradeIn   from './pages/TradeIn';
import Cart      from './pages/Cart';
import Wishlist  from './pages/Wishlist';
import Account   from './pages/Account';
import './styles/global.css';

export default function App() {
  const [page,           setPage]           = useState('home');
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentCatKey,  setCurrentCatKey]  = useState('gpu');

  const navigate = useCallback((p, product, catKey) => {
    if (p === 'product' && product) {
      setCurrentProduct(product);
      setCurrentCatKey(catKey || 'gpu');
    }
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateCat = useCallback((catKey) => {
    setPage(`cat-${catKey}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  function renderPage() {
    if (page === 'home')     return <Home     onNavigate={navigate} onNavigateCat={navigateCat} />;
    if (page === 'product')  return <Product  product={currentProduct} catKey={currentCatKey} onNavigate={navigate} onNavigateCat={navigateCat} />;
    if (page === 'builder')  return <Builder  onNavigate={navigate} />;
    if (page === 'tradein')  return <TradeIn  onNavigate={navigate} />;
    if (page === 'cart')     return <Cart     onNavigate={navigate} />;
    if (page === 'wishlist') return <Wishlist onNavigate={navigate} />;
    if (page === 'account')  return <Account  onNavigate={navigate} />;
    if (page.startsWith('cat-')) {
      return <Category catKey={page.replace('cat-','')} onNavigate={navigate} onNavigateCat={navigateCat} />;
    }
    return <Home onNavigate={navigate} onNavigateCat={navigateCat} />;
  }

  return (
    <StoreProvider>
      <Layout currentPage={page} onNavigate={navigate} onNavigateCat={navigateCat}>
        {renderPage()}
      </Layout>
    </StoreProvider>
  );
}
