import { useState } from 'react';
import { useStore } from '../store/StoreContext';
import styles from './Account.module.css';

const MOCK_ORDERS = [
  { id:'#ZR-2026-0042', date:'12/03/2026', status:'Entregue',   total:'R$ 8.176,00', items:['Ryzen 9 9950X','ROG X670E Hero','G.Skill DDR5 32GB'] },
  { id:'#ZR-2026-0031', date:'28/02/2026', status:'Em trânsito',total:'R$ 3.539,00', items:['RTX 4070 Ti Super ROG Strix OC'] },
  { id:'#ZR-2026-0018', date:'14/02/2026', status:'Entregue',   total:'R$ 879,00',   items:['Corsair RM1000x 1000W'] },
];

const STATUS_COLOR = { 'Entregue':'var(--green)', 'Em trânsito':'var(--yellow)', 'Cancelado':'#ef4444' };

// ── Auth Panel ──
function AuthPanel({ onLogin }) {
  const [mode, setMode]         = useState('login'); // 'login' | 'register'
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]         = useState('');
  const [error, setError]       = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) { setError('Preencha todos os campos.'); return; }
    if (mode === 'register' && !name) { setError('Informe seu nome.'); return; }
    // Futuramente: await fetch('/api/auth/login', { method:'POST', body:... })
    onLogin({
      name:   mode === 'register' ? name : email.split('@')[0],
      email,
      avatar: '👤',
      since:  '2026',
      ziroPlus: false,
    });
  }

  return (
    <div className={styles.authWrap}>
      <div className={styles.authCard}>
        <div className={styles.authLogo}>ZI<span>R</span>O</div>
        <p className={styles.authSub}>Sua conta de entusiasta</p>

        <div className={styles.authTabs}>
          <button className={mode==='login'?styles.tabActive:''} onClick={()=>{setMode('login');setError('');}}>Entrar</button>
          <button className={mode==='register'?styles.tabActive:''} onClick={()=>{setMode('register');setError('');}}>Criar conta</button>
        </div>

        <form className={styles.authForm} onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className={styles.field}>
              <label>NOME COMPLETO</label>
              <input type="text" placeholder="Seu nome" value={name} onChange={e=>setName(e.target.value)} />
            </div>
          )}
          <div className={styles.field}>
            <label>E-MAIL</label>
            <input type="email" placeholder="seu@email.com" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>SENHA</label>
            <input type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>

          {error && <p className={styles.authError}>{error}</p>}

          <button type="submit" className={`btn-primary ${styles.authBtn}`}>
            {mode === 'login' ? 'Entrar na conta' : 'Criar conta grátis'}
          </button>

          {mode === 'login' && (
            <button type="button" className={styles.forgotBtn}>Esqueci minha senha</button>
          )}
        </form>

        <div className={styles.authDivider}><span>ou continue com</span></div>
        <div className={styles.socialRow}>
          <button className={styles.socialBtn} onClick={() => onLogin({ name:'Usuário Google', email:'google@user.com', avatar:'🇬', since:'2026', ziroPlus:false })}>
            🌐 Google
          </button>
          <button className={styles.socialBtn} onClick={() => onLogin({ name:'Usuário Apple', email:'apple@user.com', avatar:'🍎', since:'2026', ziroPlus:false })}>
            🍎 Apple
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Profile Panel ──
function ProfilePanel({ onNavigate }) {
  const { user, logout, updateUser } = useStore();
  const [activeTab, setActiveTab]    = useState('overview');
  const [editMode, setEditMode]      = useState(false);
  const [form, setForm]              = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', cep: user?.cep || '' });

  function saveProfile() {
    updateUser(form);
    setEditMode(false);
  }

  const tabs = [
    { id:'overview', label:'Visão Geral',    icon:'🏠' },
    { id:'orders',   label:'Meus Pedidos',   icon:'📦' },
    { id:'profile',  label:'Dados pessoais', icon:'👤' },
    { id:'address',  label:'Endereços',      icon:'📍' },
    { id:'security', label:'Segurança',      icon:'🔒' },
    { id:'ziroplus', label:'ZIRO+',          icon:'⭐' },
  ];

  return (
    <div className={styles.profileWrap}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.userCard}>
          <div className={styles.userAvatar}>{user?.avatar || '👤'}</div>
          <div>
            <p className={styles.userName}>{user?.name}</p>
            <p className={styles.userEmail}>{user?.email}</p>
            {user?.ziroPlus && <span className={styles.ziroPlusBadge}>⭐ ZIRO+</span>}
          </div>
        </div>

        <nav className={styles.sideNav}>
          {tabs.map(t => (
            <button
              key={t.id}
              className={`${styles.sideBtn} ${activeTab===t.id ? styles.sideBtnActive : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
          <div className={styles.sideDiv} />
          <button className={`${styles.sideBtn} ${styles.logoutBtn}`} onClick={logout}>
            <span>🚪</span>Sair da conta
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className={styles.content}>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className={styles.tabContent}>
            <h2>Olá, {user?.name?.split(' ')[0]}! 👋</h2>
            <p className={styles.tabSub}>Membro ZIRO desde {user?.since}</p>

            <div className={styles.statsGrid}>
              {[
                { label:'Pedidos',       val:MOCK_ORDERS.length, icon:'📦' },
                { label:'Favoritos',     val:0,                   icon:'❤️' },
                { label:'Trade-ins',     val:2,                   icon:'♻️' },
                { label:'Cashback ZIRO', val:'R$ 0,00',           icon:'💰' },
              ].map(s => (
                <div key={s.label} className={styles.statCard}>
                  <span className={styles.statIcon}>{s.icon}</span>
                  <p className={styles.statVal}>{s.val}</p>
                  <p className={styles.statLabel}>{s.label}</p>
                </div>
              ))}
            </div>

            <h3 className={styles.sectionTitle}>Últimos pedidos</h3>
            {MOCK_ORDERS.slice(0,2).map(o => <OrderRow key={o.id} order={o} />)}
            <button className={styles.viewAllBtn} onClick={()=>setActiveTab('orders')}>Ver todos os pedidos →</button>
          </div>
        )}

        {/* ORDERS */}
        {activeTab === 'orders' && (
          <div className={styles.tabContent}>
            <h2>Meus Pedidos</h2>
            <p className={styles.tabSub}>{MOCK_ORDERS.length} pedidos realizados</p>
            <div className={styles.ordersList}>
              {MOCK_ORDERS.map(o => <OrderRow key={o.id} order={o} full />)}
            </div>
          </div>
        )}

        {/* PROFILE */}
        {activeTab === 'profile' && (
          <div className={styles.tabContent}>
            <div className={styles.tabHeader}>
              <div><h2>Dados pessoais</h2><p className={styles.tabSub}>Suas informações de conta</p></div>
              <button
                className={editMode ? 'btn-primary' : 'btn-ghost'}
                onClick={() => editMode ? saveProfile() : setEditMode(true)}
              >
                {editMode ? '💾 Salvar' : '✏️ Editar'}
              </button>
            </div>

            <div className={styles.formGrid}>
              {[
                { label:'NOME COMPLETO', key:'name',  placeholder:'Seu nome', type:'text' },
                { label:'E-MAIL',        key:'email', placeholder:'seu@email.com', type:'email' },
                { label:'TELEFONE',      key:'phone', placeholder:'(11) 99999-9999', type:'text' },
                { label:'CPF',           key:'cpf',   placeholder:'000.000.000-00', type:'text' },
              ].map(f => (
                <div key={f.key} className={styles.formField}>
                  <label>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key] || ''}
                    disabled={!editMode}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                  />
                </div>
              ))}
            </div>

            <div className={styles.dangerZone}>
              <h4>⚠️ Zona de perigo</h4>
              <p>Ações irreversíveis — prossiga com cuidado.</p>
              <button className={styles.dangerBtn}>Deletar minha conta</button>
            </div>
          </div>
        )}

        {/* ADDRESS */}
        {activeTab === 'address' && (
          <div className={styles.tabContent}>
            <h2>Meus Endereços</h2>
            <p className={styles.tabSub}>Gerencie seus endereços de entrega</p>
            <div className={styles.addressGrid}>
              <div className={`${styles.addressCard} ${styles.addressMain}`}>
                <div className={styles.addressBadge}>Principal</div>
                <p className={styles.addressName}>🏠 Casa</p>
                <p>Rua das Flores, 123</p>
                <p>Bairro Centro — São Paulo, SP</p>
                <p>CEP: 01310-100</p>
                <div className={styles.addressActions}>
                  <button className="btn-ghost" style={{padding:'8px 14px',fontSize:12}}>Editar</button>
                  <button className={styles.removeAddr}>Remover</button>
                </div>
              </div>
              <button className={styles.addAddressCard}>
                <span>+</span>
                <p>Adicionar endereço</p>
              </button>
            </div>
          </div>
        )}

        {/* SECURITY */}
        {activeTab === 'security' && (
          <div className={styles.tabContent}>
            <h2>Segurança</h2>
            <p className={styles.tabSub}>Gerencie senha e acesso</p>
            <div className={styles.secCard}>
              <h4>Alterar senha</h4>
              {['SENHA ATUAL','NOVA SENHA','CONFIRMAR NOVA SENHA'].map(label => (
                <div key={label} className={styles.formField}>
                  <label>{label}</label>
                  <input type="password" placeholder="••••••••" />
                </div>
              ))}
              <button className="btn-primary" style={{marginTop:8}}>Salvar nova senha</button>
            </div>
            <div className={styles.secCard} style={{marginTop:16}}>
              <h4>Autenticação em 2 fatores</h4>
              <p style={{color:'var(--text3)',fontSize:13,margin:'8px 0 14px'}}>Adicione uma camada extra de segurança à sua conta.</p>
              <button className="btn-ghost">Ativar 2FA</button>
            </div>
          </div>
        )}

        {/* ZIRO+ */}
        {activeTab === 'ziroplus' && (
          <div className={styles.tabContent}>
            <div className={styles.ziroPlusHero}>
              <div className={styles.ziroPlusIcon}>⭐</div>
              <h2>ZIRO+</h2>
              <p>A assinatura do entusiasta</p>
            </div>
            <div className={styles.ziroPlusGrid}>
              {[
                {icon:'💰',title:'5% Cashback',    desc:'Em todas as compras, sem limite'},
                {icon:'🚚',title:'Frete Grátis',   desc:'Ilimitado, em qualquer valor'},
                {icon:'⚡',title:'Acesso Antecipado',desc:'Promoções e lançamentos antes de todos'},
                {icon:'🎮',title:'Builds Exclusivas',desc:'Configurações premium curadas por especialistas'},
                {icon:'🔧',title:'Suporte Prioritário',desc:'Atendimento dedicado em menos de 2h'},
                {icon:'♻️',title:'Trade-in Bônus',  desc:'+15% no valor de avaliação de peças'},
              ].map(b => (
                <div key={b.title} className={styles.benefitCard}>
                  <span>{b.icon}</span>
                  <strong>{b.title}</strong>
                  <p>{b.desc}</p>
                </div>
              ))}
            </div>
            <div className={styles.ziroPlusPrice}>
              <div>
                <p className={styles.zpLabel}>PLANO MENSAL</p>
                <p className={styles.zpPrice}>R$ 24,90<span>/mês</span></p>
              </div>
              <div>
                <p className={styles.zpLabel}>PLANO ANUAL <span className={styles.zpSave}>Economize 20%</span></p>
                <p className={styles.zpPrice}>R$ 239,00<span>/ano</span></p>
              </div>
            </div>
            <button className={`btn-primary ${styles.zpBtn}`}>Assinar ZIRO+ →</button>
          </div>
        )}

      </div>
    </div>
  );
}

function OrderRow({ order, full }) {
  return (
    <div className={styles.orderRow}>
      <div className={styles.orderLeft}>
        <p className={styles.orderId}>{order.id}</p>
        <p className={styles.orderDate}>{order.date}</p>
        {full && (
          <div className={styles.orderItems}>
            {order.items.map(i => <span key={i} className={styles.orderItem}>{i}</span>)}
          </div>
        )}
      </div>
      <div className={styles.orderRight}>
        <span className={styles.orderStatus} style={{ color: STATUS_COLOR[order.status] || 'var(--text3)' }}>
          ● {order.status}
        </span>
        <p className={styles.orderTotal}>{order.total}</p>
        <button className={styles.orderBtn}>Ver detalhes</button>
      </div>
    </div>
  );
}

// ── Main Export ──
export default function Account({ onNavigate }) {
  const { user, login } = useStore();

  return (
    <div className={`page-enter ${styles.wrap}`}>
      <div className={styles.breadcrumb}>
        <button onClick={() => onNavigate('home')}>Home</button>
        <span>/</span>
        <span>Minha Conta</span>
      </div>
      {user ? <ProfilePanel onNavigate={onNavigate} /> : <AuthPanel onLogin={login} />}
    </div>
  );
}
