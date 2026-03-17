# ZIRO Tech Store — React Frontend

E-commerce de hardware e periféricos, convertido de HTML/JS para React com CSS Modules.

## 🚀 Instalação e uso

```bash
cd ziro-react
npm install
npm run dev
# Abre em http://localhost:3000
```

## 📁 Estrutura do projeto

```
ziro-react/
├── index.html                  # Entry HTML
├── vite.config.js              # Config do Vite
├── package.json
└── src/
    ├── main.jsx                # Entry point React
    ├── App.jsx                 # Router principal (SPA)
    │
    ├── styles/
    │   ├── global.css          # Estilos globais + CSS variables
    │   └── theme.js            # Design tokens (cores, fontes)
    │
    ├── data/
    │   ├── catalog.js          # Catálogo completo de produtos (fonte única)
    │   └── compatibility.js   # Motor de compatibilidade do PC Builder
    │
    ├── components/
    │   ├── Layout.jsx          # Topbar + Nav + Subnav + Footer
    │   ├── Layout.module.css
    │   ├── ProductCard.jsx     # Card reutilizável de produto
    │   └── ProductCard.module.css
    │
    └── pages/
        ├── Home.jsx            # Página inicial (hero, cats, produtos, flash sale)
        ├── Home.module.css
        ├── Product.jsx         # Página de produto individual
        ├── Product.module.css
        ├── Category.jsx        # Listagem por categoria
        ├── Category.module.css
        ├── Builder.jsx         # Montador de PC (motor de compatibilidade completo)
        ├── Builder.module.css
        ├── TradeIn.jsx         # Sistema de trade-in com estimativa de valor
        └── TradeIn.module.css
```

## 🎨 Design Tokens — como mudar cores

Todas as variáveis de cor ficam em **`src/styles/global.css`** (`:root`) e **`src/styles/theme.js`**.

Para mudar o tema, edite em `global.css`:
```css
:root {
  --accent:  #FF4D1C;   /* cor principal (laranja) */
  --green:   #22C55E;   /* compatível / sucesso */
  --yellow:  #F59E0B;   /* atenção / aviso */
  --blue:    #3B82F6;   /* recomendado / destaque */
  --bg:      #0A0A0A;   /* fundo geral */
  --surface: #111111;   /* cards e superfícies */
  /* ... */
}
```

## 🔌 Preparado para backend

### Dados
Toda a lógica de dados está isolada em `src/data/`:
- **`catalog.js`** → substitua os arrays pelo resultado de `GET /api/products?category=gpu`
- **`compatibility.js`** → toda a lógica fica no front (ou mova para `POST /api/builder/check`)

### Roteamento
O `App.jsx` usa `useState` simples. Para adicionar React Router:
```bash
npm install react-router-dom
```
Substitua o `useState(page)` por `useNavigate` / `<Routes>` / `<Route>`.

### API calls (exemplo)
```js
// src/data/api.js  (criar)
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function getProducts(category) {
  const res = await fetch(`${BASE}/api/products?category=${category}`);
  return res.json();
}

export async function checkCompatibility(build) {
  const res = await fetch(`${BASE}/api/builder/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(build),
  });
  return res.json();
}
```

## 🧩 Páginas

| Página    | Arquivo             | Descrição |
|-----------|---------------------|-----------|
| Home      | `pages/Home.jsx`    | Hero, categorias, destaques, flash sale, banners |
| Produto   | `pages/Product.jsx` | Galeria, info, specs, relacionados |
| Categoria | `pages/Category.jsx`| Grid de produtos por categoria |
| Builder   | `pages/Builder.jsx` | Montador com compatibilidade em tempo real |
| Trade-in  | `pages/TradeIn.jsx` | Formulário + estimativa de crédito |

## ⚙️ Motor de Compatibilidade

O `src/data/compatibility.js` exporta:

```js
evalItem(slot, item, buildState)  // → [{type, msg}] por peça
overallStatus(evals)              // → 'ok' | 'warn' | 'err'
getBadge(slot, item, evals, status) // → {cls, label} para o modal
buildCompatLines(buildState)      // → linhas do painel lateral
calcPowerDraw(buildState)         // → {cpu, gpu, ram, ssd, cool, misc}
totalPower(buildState)            // → watts totais
```

Verificações implementadas:
- ✅ Socket CPU ↔ Placa-mãe (AM5, LGA1700, LGA1851)
- ✅ Tipo de RAM ↔ MB + CPU (DDR4 / DDR5)
- ✅ Interface SSD ↔ MB (NVMe / SATA)
- ✅ Cooler ↔ Socket + TDP da CPU
- ✅ Form factor Placa-mãe ↔ Gabinete (ATX / mATX)
- ✅ Margem de potência PSU (com cálculo por componente)
- ✅ Gargalo CPU ↔ GPU tier
- ✅ PCIe 5.0 em slot 4.0

## 📦 Build para produção

```bash
npm run build
# Gera /dist — pronto para deploy (Vercel, Netlify, S3...)
```
