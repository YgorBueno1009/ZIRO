import { useState } from 'react';
import { useStore } from '../store/StoreContext';
import styles from './Cart.module.css';

const SHIPPING_OPTIONS = [
  { id: 'pac',     label: 'PAC',            days: '5–8 dias úteis', price: 0,    badge: 'Grátis' },
  { id: 'sedex',   label: 'SEDEX',          days: '1–3 dias úteis', price: 2490, badge: null },
  { id: 'express', label: 'ZIRO Express',   days: 'Hoje até 22h',   price: 3990, badge: 'Novo' },
];

function fmt(val) {
  return 'R$ ' + (val / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

export default function Cart({ onNavigate }) {
  const { cartItems, removeFromCart, updateQty, clearCart, cartTotal } = useStore();
  const [shipping, setShipping]   = useState('pac');
  const [coupon,   setCoupon]     = useState('');
  const [discount, setDiscount]   = useState(0);
  const [couponMsg,setCouponMsg]  = useState('');
  const [step,     setStep]       = useState('cart'); // 'cart' | 'checkout' | 'success'

  const shippingPrice = SHIPPING_OPTIONS.find(s => s.id === shipping)?.price || 0;
  const subtotal      = cartTotal * 100;           // em centavos
  const discountAmt   = Math.round(subtotal * discount);
  const total         = subtotal - discountAmt + shippingPrice;
  const pixTotal      = Math.round(total * 0.95);

  function applyCoupon() {
    const c = coupon.trim().toUpperCase();
    if (c === 'ZIRO10')  { setDiscount(0.10); setCouponMsg('✓ 10% de desconto aplicado!'); }
    else if (c === 'ZIRO20') { setDiscount(0.20); setCouponMsg('✓ 20% de desconto aplicado!'); }
    else                 { setDiscount(0);    setCouponMsg('✕ Cupom inválido'); }
  }

  if (step === 'success') {
    return (
      <div className={`page-enter ${styles.wrap}`}>
        <div className={styles.successBox}>
          <div className={styles.successIcon}>✓</div>
          <h1>Pedido realizado!</h1>
          <p>Você receberá um e-mail de confirmação em breve.<br />Acompanhe seu pedido na seção <strong>Conta → Pedidos</strong>.</p>
          <div className={styles.successActions}>
            <button className="btn-primary" onClick={() => onNavigate('home')}>Continuar comprando</button>
            <button className="btn-ghost"   onClick={() => onNavigate('account')}>Ver meus pedidos</button>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className={`page-enter ${styles.wrap}`}>
        <div className={styles.emptyBox}>
          <div className={styles.emptyIcon}>🛒</div>
          <h2>Seu carrinho está vazio</h2>
          <p>Adicione produtos para continuar comprando.</p>
          <button className="btn-primary" onClick={() => onNavigate('home')}>Ver produtos</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`page-enter ${styles.wrap}`}>
      <div className={styles.breadcrumb}>
        <button onClick={() => onNavigate('home')}>Home</button>
        <span>/</span>
        <span>Carrinho</span>
      </div>

      <div className={styles.header}>
        <h1>Carrinho <span>({cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'})</span></h1>
        <button className={styles.clearBtn} onClick={clearCart}>Limpar carrinho</button>
      </div>

      <div className={styles.layout}>
        {/* LEFT — Items */}
        <div className={styles.itemsCol}>

          {/* Progress bar */}
          {subtotal < 19900 && (
            <div className={styles.freeShipBanner}>
              <span>🚚 Frete grátis a partir de <strong>R$ 199,00</strong> — faltam {fmt(19900 - subtotal)}</span>
              <div className={styles.freeShipBar}><div className={styles.freeShipFill} style={{ width: `${Math.min(100,(subtotal/19900)*100)}%` }} /></div>
            </div>
          )}
          {subtotal >= 19900 && (
            <div className={`${styles.freeShipBanner} ${styles.freeShipDone}`}>
              <span>🎉 Você ganhou <strong>frete grátis!</strong></span>
            </div>
          )}

          {cartItems.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.itemImg}>{item.icon}</div>
              <div className={styles.itemInfo}>
                <p className={styles.itemBrand}>{item.brand}</p>
                <p className={styles.itemName}>{item.name}</p>
                <div className={styles.itemSpecs}>
                  {(item.specs || []).slice(0,3).map(s => <span key={s} className={styles.specTag}>{s}</span>)}
                </div>
              </div>
              <div className={styles.itemActions}>
                <div className={styles.qtyControl}>
                  <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                </div>
                <p className={styles.itemPrice}>
                  {fmt(item.val * item.qty * 100)}
                </p>
                <p className={styles.itemUnitPrice}>
                  {item.qty > 1 ? `${fmt(item.val * 100)} cada` : ''}
                </p>
                <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                  🗑 Remover
                </button>
              </div>
            </div>
          ))}

          {/* Shipping */}
          <div className={styles.sectionCard}>
            <h3>Frete</h3>
            <div className={styles.cepRow}>
              <input type="text" placeholder="Digite seu CEP" className={styles.cepInput} />
              <button className={styles.cepBtn}>Calcular</button>
            </div>
            <div className={styles.shippingOptions}>
              {SHIPPING_OPTIONS.map(opt => (
                <label key={opt.id} className={`${styles.shipOpt} ${shipping === opt.id ? styles.shipOptActive : ''}`}>
                  <input type="radio" name="shipping" value={opt.id} checked={shipping === opt.id} onChange={() => setShipping(opt.id)} />
                  <div className={styles.shipOptInfo}>
                    <span className={styles.shipLabel}>{opt.label} {opt.badge && <span className={styles.shipBadge}>{opt.badge}</span>}</span>
                    <span className={styles.shipDays}>{opt.days}</span>
                  </div>
                  <span className={styles.shipPrice}>{opt.price === 0 ? 'Grátis' : fmt(opt.price)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Coupon */}
          <div className={styles.sectionCard}>
            <h3>Cupom de desconto</h3>
            <div className={styles.couponRow}>
              <input
                type="text" placeholder="Ex: ZIRO10"
                value={coupon} onChange={e => setCoupon(e.target.value)}
                className={styles.couponInput}
                onKeyDown={e => e.key === 'Enter' && applyCoupon()}
              />
              <button className={styles.couponBtn} onClick={applyCoupon}>Aplicar</button>
            </div>
            {couponMsg && (
              <p className={`${styles.couponMsg} ${couponMsg.startsWith('✓') ? styles.couponOk : styles.couponErr}`}>
                {couponMsg}
              </p>
            )}
            <p className={styles.couponHint}>Tente: ZIRO10 ou ZIRO20</p>
          </div>
        </div>

        {/* RIGHT — Summary */}
        <div className={styles.summaryCol}>
          <div className={styles.summaryCard}>
            <h3>Resumo do pedido</h3>

            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <span>Subtotal ({cartItems.length} {cartItems.length===1?'item':'itens'})</span>
                <span>{fmt(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className={`${styles.summaryRow} ${styles.discountRow}`}>
                  <span>Desconto ({discount * 100}%)</span>
                  <span>− {fmt(discountAmt)}</span>
                </div>
              )}
              <div className={styles.summaryRow}>
                <span>Frete</span>
                <span>{shippingPrice === 0 ? <span className={styles.freeLabel}>Grátis</span> : fmt(shippingPrice)}</span>
              </div>
            </div>

            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>{fmt(total)}</span>
            </div>
            <p className={styles.pixNote}>💚 {fmt(pixTotal)} no Pix (5% off)</p>
            <p className={styles.installNote}>
              ou {fmt(Math.round(total / 12))} /mês em 12x sem juros
            </p>

            <button
              className={`btn-primary ${styles.checkoutBtn}`}
              onClick={() => { clearCart(); setStep('success'); }}
            >
              Finalizar compra →
            </button>
            <button className={`btn-ghost ${styles.continueBtn}`} onClick={() => onNavigate('home')}>
              Continuar comprando
            </button>

            <div className={styles.secureRow}>
              <span>🔒 Compra 100% segura</span>
              <span>🛡️ Dados protegidos</span>
            </div>
          </div>

          <div className={styles.paymentCard}>
            <p className={styles.payLabel}>Formas de pagamento aceitas</p>
            <div className={styles.payIcons}>
              {['Visa','Master','Pix','Boleto','Elo','AmEx'].map(p => (
                <span key={p} className={styles.payIcon}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
