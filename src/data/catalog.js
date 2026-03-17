// ─────────────────────────────────────
//  ZIRO — Catálogo de Produtos
//  Fonte única de dados para toda a aplicação.
//  Futuramente será substituído por chamadas à API.
// ─────────────────────────────────────

export const CATALOG = {
  cpu: [
    {id:'cpu1',icon:'⚙️',brand:'AMD',   name:'Ryzen 9 9950X 16-Core 5.7GHz AM5',             specs:['AM5','DDR5','170W TDP'],     price:'R$3.649',val:3649, socket:'AM5',    ramType:'DDR5',tdp:170, formFact:'ATX', powerDraw:170},
    {id:'cpu2',icon:'⚙️',brand:'AMD',   name:'Ryzen 7 9700X 8-Core 5.5GHz AM5 65W',          specs:['AM5','DDR5','65W TDP'],      price:'R$1.599',val:1599, socket:'AM5',    ramType:'DDR5',tdp:65,  formFact:'ATX', powerDraw:65},
    {id:'cpu3',icon:'⚙️',brand:'AMD',   name:'Ryzen 5 9600X 6-Core 5.4GHz AM5',              specs:['AM5','DDR5','65W TDP'],      price:'R$1.099',val:1099, socket:'AM5',    ramType:'DDR5',tdp:65,  formFact:'ATX', powerDraw:65},
    {id:'cpu4',icon:'⚙️',brand:'AMD',   name:'Ryzen 9 7900X3D 12-Core 5.6GHz AM5 3D Cache',  specs:['AM5','DDR5','120W TDP'],     price:'R$2.449',val:2449, socket:'AM5',    ramType:'DDR5',tdp:120, formFact:'ATX', powerDraw:120},
    {id:'cpu5',icon:'⚙️',brand:'Intel', name:'Core Ultra 9 285K 24-Core 5.7GHz LGA1851',     specs:['LGA1851','DDR5','125W TDP'], price:'R$3.199',val:3199, socket:'LGA1851',ramType:'DDR5',tdp:125, formFact:'ATX', powerDraw:125},
    {id:'cpu6',icon:'⚙️',brand:'Intel', name:'Core i9-14900KF 24-Core 6.0GHz LGA1700',       specs:['LGA1700','DDR5','125W TDP'], price:'R$2.249',val:2249, socket:'LGA1700',ramType:'DDR5',tdp:125, formFact:'ATX', powerDraw:125},
    {id:'cpu7',icon:'⚙️',brand:'Intel', name:'Core i5-14600K 14-Core 5.3GHz LGA1700',        specs:['LGA1700','DDR5','125W TDP'], price:'R$1.349',val:1349, socket:'LGA1700',ramType:'DDR5',tdp:125, formFact:'ATX', powerDraw:125},
    {id:'cpu8',icon:'⚙️',brand:'Intel', name:'Core i3-14100F 4-Core 4.7GHz LGA1700',         specs:['LGA1700','DDR4','58W TDP'],  price:'R$489',  val:489,  socket:'LGA1700',ramType:'DDR4',tdp:58,  formFact:'ATX', powerDraw:58},
  ],
  mb: [
    {id:'mb1',icon:'🔲',brand:'ASUS ROG', name:'Crosshair X670E Hero ATX AM5 DDR5',           specs:['AM5','DDR5','ATX','PCIe5'], price:'R$2.899',val:2899, socket:'AM5',    ramType:'DDR5',formFact:'ATX', nvme:true, sata:true, pcie:'PCIe5'},
    {id:'mb2',icon:'🔲',brand:'MSI',      name:'MAG X670E Tomahawk WiFi ATX AM5 DDR5',        specs:['AM5','DDR5','ATX','PCIe5'], price:'R$1.599',val:1599, socket:'AM5',    ramType:'DDR5',formFact:'ATX', nvme:true, sata:true, pcie:'PCIe5'},
    {id:'mb3',icon:'🔲',brand:'Gigabyte', name:'B650 AORUS Elite AX ATX AM5 DDR5',            specs:['AM5','DDR5','ATX','PCIe4'], price:'R$1.199',val:1199, socket:'AM5',    ramType:'DDR5',formFact:'ATX', nvme:true, sata:true, pcie:'PCIe4'},
    {id:'mb4',icon:'🔲',brand:'ASUS',     name:'ROG MAXIMUS Z890 APEX ATX LGA1851 DDR5',      specs:['LGA1851','DDR5','ATX','PCIe5'],price:'R$3.499',val:3499,socket:'LGA1851',ramType:'DDR5',formFact:'ATX', nvme:true, sata:true, pcie:'PCIe5'},
    {id:'mb5',icon:'🔲',brand:'MSI',      name:'MEG Z890 ACE ATX LGA1851 DDR5',              specs:['LGA1851','DDR5','ATX','PCIe5'],price:'R$2.299',val:2299,socket:'LGA1851',ramType:'DDR5',formFact:'ATX', nvme:true, sata:true, pcie:'PCIe5'},
    {id:'mb6',icon:'🔲',brand:'Gigabyte', name:'Z790 AORUS Elite AX ATX LGA1700 DDR5',        specs:['LGA1700','DDR5','ATX','PCIe4'],price:'R$1.399',val:1399,socket:'LGA1700',ramType:'DDR5',formFact:'ATX', nvme:true, sata:true, pcie:'PCIe4'},
    {id:'mb7',icon:'🔲',brand:'ASRock',   name:'B760M Pro RS/D4 mATX LGA1700 DDR4',           specs:['LGA1700','DDR4','mATX','PCIe4'],price:'R$699',val:699, socket:'LGA1700',ramType:'DDR4',formFact:'mATX',nvme:true, sata:true, pcie:'PCIe4'},
    {id:'mb8',icon:'🔲',brand:'MSI',      name:'A620M Pro-VH mATX AM5 DDR5',                 specs:['AM5','DDR5','mATX','PCIe4'], price:'R$549', val:549,  socket:'AM5',    ramType:'DDR5',formFact:'mATX',nvme:true, sata:true, pcie:'PCIe4'},
  ],
  ram: [
    {id:'r1',icon:'🧠',brand:'G.Skill',  name:'Trident Z5 RGB DDR5 32GB 6400MHz CL32',        specs:['DDR5','32GB','6400MHz'], price:'R$749',  val:749,  ramType:'DDR5',gb:32,powerDraw:5},
    {id:'r2',icon:'🧠',brand:'Corsair',  name:'Vengeance DDR5 64GB 6000MHz CL30',             specs:['DDR5','64GB','6000MHz'], price:'R$1.649',val:1649, ramType:'DDR5',gb:64,powerDraw:8},
    {id:'r3',icon:'🧠',brand:'Kingston', name:'Fury Beast DDR5 32GB 5200MHz CL40 RGB',        specs:['DDR5','32GB','5200MHz'], price:'R$579',  val:579,  ramType:'DDR5',gb:32,powerDraw:5},
    {id:'r4',icon:'🧠',brand:'G.Skill',  name:'Ripjaws S5 DDR5 64GB 6000MHz CL30',            specs:['DDR5','64GB','6000MHz'], price:'R$1.299',val:1299, ramType:'DDR5',gb:64,powerDraw:8},
    {id:'r5',icon:'🧠',brand:'TeamGroup',name:'T-Force Delta RGB DDR5 32GB 7200MHz',          specs:['DDR5','32GB','7200MHz'], price:'R$699',  val:699,  ramType:'DDR5',gb:32,powerDraw:5},
    {id:'r6',icon:'🧠',brand:'Corsair',  name:'Dominator Titanium DDR5 32GB 7200MHz White',   specs:['DDR5','32GB','7200MHz'], price:'R$1.099',val:1099, ramType:'DDR5',gb:32,powerDraw:5},
    {id:'r7',icon:'🧠',brand:'Kingston', name:'Fury Renegade DDR5 32GB 7600MHz RGB',          specs:['DDR5','32GB','7600MHz'], price:'R$899',  val:899,  ramType:'DDR5',gb:32,powerDraw:5},
    {id:'r8',icon:'🧠',brand:'Adata',    name:'XPG Lancer RGB DDR4 16GB 3600MHz CL18',        specs:['DDR4','16GB','3600MHz'], price:'R$299',  val:299,  ramType:'DDR4',gb:16,powerDraw:3},
  ],
  gpu: [
    {id:'g1',icon:'🎮',brand:'NVIDIA',      name:'RTX 5090 32GB GDDR7 Founders Edition',      specs:['32GB GDDR7','575W','PCIe5'], price:'R$7.999', val:7999,  gpuPower:575,pcie:'PCIe5',powerDraw:575,tier:'flagship'},
    {id:'g2',icon:'🎮',brand:'ASUS/NVIDIA', name:'RTX 4070 Ti Super ROG Strix OC 16GB',       specs:['16GB GDDR6X','285W','PCIe4'],price:'R$3.539', val:3539,  gpuPower:285,pcie:'PCIe4',powerDraw:285,tier:'high'},
    {id:'g3',icon:'🎮',brand:'AMD',         name:'Radeon RX 7900 XTX 24GB GDDR6 Gaming OC',  specs:['24GB GDDR6','355W','PCIe4'], price:'R$3.299', val:3299,  gpuPower:355,pcie:'PCIe4',powerDraw:355,tier:'high'},
    {id:'g4',icon:'🎮',brand:'MSI/NVIDIA',  name:'RTX 4060 Ti Gaming X Trio 16GB GDDR6',     specs:['16GB GDDR6','165W','PCIe4'], price:'R$1.899', val:1899,  gpuPower:165,pcie:'PCIe4',powerDraw:165,tier:'mid'},
    {id:'g5',icon:'🎮',brand:'Gigabyte/AMD',name:'RX 7800 XT Gaming OC 16GB GDDR6',          specs:['16GB GDDR6','263W','PCIe4'], price:'R$1.749', val:1749,  gpuPower:263,pcie:'PCIe4',powerDraw:263,tier:'mid'},
    {id:'g6',icon:'🎮',brand:'ZOTAC/NVIDIA',name:'RTX 4090 Trinity OC 24GB GDDR6X',          specs:['24GB GDDR6X','450W','PCIe4'],price:'R$10.499',val:10499, gpuPower:450,pcie:'PCIe4',powerDraw:450,tier:'flagship'},
    {id:'g7',icon:'🎮',brand:'AMD',         name:'Radeon RX 7600 XT 16GB GDDR6',             specs:['16GB GDDR6','190W','PCIe4'], price:'R$1.199', val:1199,  gpuPower:190,pcie:'PCIe4',powerDraw:190,tier:'entry'},
    {id:'g8',icon:'🎮',brand:'Sapphire/AMD',name:'Nitro+ RX 7900 GRE 16GB GDDR6',            specs:['16GB GDDR6','260W','PCIe4'], price:'R$2.399', val:2399,  gpuPower:260,pcie:'PCIe4',powerDraw:260,tier:'high'},
  ],
  ssd: [
    {id:'s1',icon:'💾',brand:'Samsung',  name:'990 Pro NVMe M.2 2TB PCIe 4.0 — 7450MB/s',   specs:['2TB','NVMe M.2','PCIe 4.0'],price:'R$849',  val:849,  ssdType:'NVMe',powerDraw:6},
    {id:'s2',icon:'💾',brand:'WD',       name:'Black SN850X 1TB NVMe M.2 — 7300MB/s',       specs:['1TB','NVMe M.2','PCIe 4.0'],price:'R$569',  val:569,  ssdType:'NVMe',powerDraw:5},
    {id:'s3',icon:'💾',brand:'Kingston', name:'KC3000 4TB NVMe PCIe 4.0 — 7000MB/s',        specs:['4TB','NVMe M.2','PCIe 4.0'],price:'R$1.999',val:1999, ssdType:'NVMe',powerDraw:8},
    {id:'s4',icon:'💾',brand:'Crucial',  name:'T700 2TB PCIe Gen5 NVMe — 12.400MB/s',       specs:['2TB','NVMe M.2','PCIe 5.0'],price:'R$1.499',val:1499, ssdType:'NVMe',powerDraw:7},
    {id:'s5',icon:'💾',brand:'Seagate',  name:'BarraCuda 510 2TB NVMe M.2 PCIe 4.0',        specs:['2TB','NVMe M.2','PCIe 4.0'],price:'R$799',  val:799,  ssdType:'NVMe',powerDraw:5},
    {id:'s6',icon:'💾',brand:'Seagate',  name:'BarraCuda HDD 4TB 3.5" SATA 5400RPM',        specs:['4TB','HDD 3.5"','SATA'],    price:'R$399',  val:399,  ssdType:'SATA',powerDraw:10},
    {id:'s7',icon:'💾',brand:'WD',       name:'Blue 2TB 2.5" SATA SSD — 560MB/s',           specs:['2TB','SSD 2.5"','SATA'],    price:'R$549',  val:549,  ssdType:'SATA',powerDraw:3},
    {id:'s8',icon:'💾',brand:'Samsung',  name:'870 EVO 4TB 2.5" SATA SSD — 560MB/s',        specs:['4TB','SSD 2.5"','SATA'],    price:'R$1.869',val:1869, ssdType:'SATA',powerDraw:3},
  ],
  psu: [
    {id:'p1',icon:'🔌',brand:'Corsair',      name:'RM1000x 1000W 80+ Gold Full Modular ATX 3.0',specs:['1000W','80+ Gold','Full Mod.'],   price:'R$879',  val:879,  psuW:1000,cert:'Gold'},
    {id:'p2',icon:'🔌',brand:'EVGA',         name:'SuperNOVA 1000 G7 1000W 80+ Gold Modular',  specs:['1000W','80+ Gold','Full Mod.'],   price:'R$949',  val:949,  psuW:1000,cert:'Gold'},
    {id:'p3',icon:'🔌',brand:'Seasonic',     name:'Focus GX-850 850W 80+ Gold Full Modular',   specs:['850W','80+ Gold','Full Mod.'],    price:'R$749',  val:749,  psuW:850, cert:'Gold'},
    {id:'p4',icon:'🔌',brand:'be quiet!',    name:'Dark Power 13 1000W 80+ Titanium Modular',  specs:['1000W','80+ Titanium','Full Mod.'],price:'R$1.599',val:1599, psuW:1000,cert:'Titanium'},
    {id:'p5',icon:'🔌',brand:'Cooler Master',name:'V850 SFX Gold 850W 80+ Gold Full Modular',  specs:['850W','80+ Gold','SFX'],          price:'R$819',  val:819,  psuW:850, cert:'Gold'},
    {id:'p6',icon:'🔌',brand:'Corsair',      name:'SF750 750W 80+ Platinum SFX Full Modular',  specs:['750W','80+ Platinum','SFX'],      price:'R$1.099',val:1099, psuW:750, cert:'Platinum'},
    {id:'p7',icon:'🔌',brand:'Seasonic',     name:'Prime TX-1000 1000W 80+ Titanium Modular',  specs:['1000W','80+ Titanium','Full Mod.'],price:'R$1.759',val:1759, psuW:1000,cert:'Titanium'},
    {id:'p8',icon:'🔌',brand:'EVGA',         name:'BQ 600W 80+ Bronze Semi Modular',           specs:['600W','80+ Bronze','Semi Mod.'],  price:'R$374',  val:374,  psuW:600, cert:'Bronze'},
  ],
  cool: [
    {id:'c1',icon:'❄️',brand:'Corsair',     name:'iCUE H150i Elite LCD XT 360mm AIO',          specs:['360mm AIO','AM4/AM5/LGA1700','~350W'],price:'R$999', val:999,  tdpMax:350,sockets:['AM4','AM5','LGA1700','LGA1851'],powerDraw:10,type:'AIO'},
    {id:'c2',icon:'❄️',brand:'Noctua',      name:'NH-D15 Chromax Black Dual Tower',             specs:['Air Cooler','AM5/LGA1851','250W'],     price:'R$549', val:549,  tdpMax:250,sockets:['AM4','AM5','LGA1700','LGA1851'],powerDraw:0, type:'Air'},
    {id:'c3',icon:'❄️',brand:'NZXT',        name:'Kraken Elite 360 RGB 360mm AIO LCD',          specs:['360mm AIO','AM5/LGA1851','~350W'],     price:'R$1.199',val:1199,tdpMax:350,sockets:['AM4','AM5','LGA1700','LGA1851'],powerDraw:10,type:'AIO'},
    {id:'c4',icon:'❄️',brand:'be quiet!',   name:'Dark Rock Pro 5 Dual Tower 250W',             specs:['Air Cooler','AM5/LGA1851','250W'],     price:'R$509', val:509,  tdpMax:250,sockets:['AM4','AM5','LGA1700','LGA1851'],powerDraw:0, type:'Air'},
    {id:'c5',icon:'❄️',brand:'Arctic',      name:'Liquid Freezer III 360 A-RGB AIO',            specs:['360mm AIO','AM5/LGA1851','~350W'],     price:'R$559', val:559,  tdpMax:350,sockets:['AM4','AM5','LGA1700','LGA1851'],powerDraw:10,type:'AIO'},
    {id:'c6',icon:'❄️',brand:'DeepCool',    name:'AK620 Digital Dual Tower AM5',                specs:['Air Cooler','AM5/LGA1700','260W'],     price:'R$329', val:329,  tdpMax:260,sockets:['AM4','AM5','LGA1700','LGA1851'],powerDraw:0, type:'Air'},
    {id:'c7',icon:'❄️',brand:'Lian Li',     name:'Galahad II Trinity SL 360mm AIO RGB',         specs:['360mm AIO','AM5/LGA1851','~350W'],     price:'R$999', val:999,  tdpMax:350,sockets:['AM4','AM5','LGA1700','LGA1851'],powerDraw:10,type:'AIO'},
    {id:'c8',icon:'❄️',brand:'Thermalright',name:'Peerless Assassin 120 SE ARGB Dual Tower',    specs:['Air Cooler','AM5/LGA1700','280W'],     price:'R$209', val:209,  tdpMax:280,sockets:['AM4','AM5','LGA1700','LGA1851'],powerDraw:0, type:'Air'},
  ],
  case: [
    {id:'cs1',icon:'🏠',brand:'Lian Li',      name:'O11 Dynamic EVO RGB Full Tower ATX',         specs:['Full Tower','ATX/E-ATX','RGB'],  price:'R$879',val:879,  formFact:'ATX', gpuMaxLen:420,powerDraw:5},
    {id:'cs2',icon:'🏠',brand:'Fractal',       name:'Define 7 Compact Black Solid Mid Tower',     specs:['Mid Tower','ATX','Sound damp.'], price:'R$699',val:699,  formFact:'ATX', gpuMaxLen:360,powerDraw:5},
    {id:'cs3',icon:'🏠',brand:'NZXT',          name:'H9 Flow White Mid Tower Dual Chamber',       specs:['Mid Tower','ATX','Mesh'],        price:'R$849',val:849,  formFact:'ATX', gpuMaxLen:435,powerDraw:5},
    {id:'cs4',icon:'🏠',brand:'Corsair',       name:'5000D Airflow Tempered Glass Mid Tower',     specs:['Mid Tower','ATX','Mesh'],        price:'R$749',val:749,  formFact:'ATX', gpuMaxLen:420,powerDraw:5},
    {id:'cs5',icon:'🏠',brand:'Fractal',       name:'North Charcoal Black Mesh ATX',              specs:['Mid Tower','ATX','Wood accent'], price:'R$699',val:699,  formFact:'ATX', gpuMaxLen:355,powerDraw:5},
    {id:'cs6',icon:'🏠',brand:'Lian Li',       name:'LANCOOL III RGB E-ATX Mid Tower',            specs:['Mid Tower','E-ATX/ATX','RGB'],   price:'R$899',val:899,  formFact:'ATX', gpuMaxLen:435,powerDraw:5},
    {id:'cs7',icon:'🏠',brand:'NZXT',          name:'H5 Flow Compact Mid Tower ATX',              specs:['Mid Tower','ATX','Mesh'],        price:'R$499',val:499,  formFact:'ATX', gpuMaxLen:365,powerDraw:5},
    {id:'cs8',icon:'🏠',brand:'Cooler Master', name:'MasterBox Q500L mATX Mid Tower',             specs:['Mid Tower','mATX','Budget'],     price:'R$299',val:299,  formFact:'mATX',gpuMaxLen:280,powerDraw:3},
  ],
};

// ── PERIFÉRICOS ──
export const PERIPH_CATALOG = [
  {id:'ph1', icon:'🖱️', brand:'Logitech',    name:'G Pro X Superlight 2 DEX Wireless 32K DPI',    specs:['Wireless','32.000 DPI','60g'],        price:'R$619',  val:619,  powerDraw:0},
  {id:'ph2', icon:'⌨️', brand:'Keychron',    name:'Q3 Max QMK Wireless Alumínio Gateron Jupiter',  specs:['75%','Alumínio','QMK/VIA'],            price:'R$879',  val:879,  powerDraw:0},
  {id:'ph3', icon:'🎧', brand:'SteelSeries', name:'Arctis Nova Pro Wireless + GameDAC Gen 2',       specs:['Wireless','Hi-Res','GameDAC'],         price:'R$1.295',val:1295, powerDraw:0},
  {id:'ph4', icon:'🖱️', brand:'Razer',       name:'DeathAdder V3 Pro Wireless 30K DPI Ergonômico', specs:['Wireless','30.000 DPI','Ergonômico'],   price:'R$599',  val:599,  powerDraw:0},
  {id:'ph5', icon:'⌨️', brand:'Corsair',     name:'K100 RGB Optical-Mechanical Cherry MX Speed',   specs:['100%','Optical-Mech','iCUE RGB'],      price:'R$1.099',val:1099, powerDraw:0},
  {id:'ph6', icon:'🎧', brand:'HyperX',      name:'Cloud Alpha Wireless 300h Battery 2.4GHz',      specs:['Wireless','300h bateria','Hi-Fi'],      price:'R$649',  val:649,  powerDraw:0},
  {id:'ph7', icon:'🖱️', brand:'Zowie',       name:'EC2-C 3360 Sensor Ergonômico Competitivo',      specs:['Com fio','3360 sensor','Sem RGB'],      price:'R$399',  val:399,  powerDraw:0},
  {id:'ph8', icon:'⌨️', brand:'Wooting',     name:'60HE Analog Hall Effect Teclado 60%',           specs:['60%','Hall Effect','Analógico'],        price:'R$1.299',val:1299, powerDraw:0},
  {id:'ph9', icon:'🎧', brand:'Beyerdynamic',name:'MMX 300 Pro Headset Estúdio Aberto 80Ω',        specs:['Com fio','80Ω','Aberto'],               price:'R$1.599',val:1599, powerDraw:0},
  {id:'ph10',icon:'🖱️', brand:'Pulsar',      name:'X2H Mini Wireless 52g 26K DPI Simétrico',       specs:['Wireless','26.000 DPI','52g'],          price:'R$499',  val:499,  powerDraw:0},
];

// ── MONITORES ──
export const MONITOR_CATALOG = [
  {id:'mn1', icon:'🖥️', brand:'ASUS ROG', name:'Swift OLED PG27AQDP 27" 360Hz 2K OLED 0.03ms',  specs:['27"','2K OLED','360Hz'],       price:'R$4.749',val:4749, powerDraw:40},
  {id:'mn2', icon:'🖥️', brand:'LG',       name:'UltraGear 27GP950-B 27" 4K 144Hz Nano IPS HDR',  specs:['27"','4K Nano IPS','144Hz'],    price:'R$2.499',val:2499, powerDraw:35},
  {id:'mn3', icon:'🖥️', brand:'Samsung',  name:'Odyssey G9 49" 32:9 240Hz Curved QLED',           specs:['49"','QLED Curved','240Hz'],    price:'R$7.499',val:7499, powerDraw:60},
  {id:'mn4', icon:'🖥️', brand:'Dell',     name:'Alienware AW2725DF 27" QD-OLED 360Hz 1ms',        specs:['27"','QD-OLED','360Hz'],       price:'R$4.299',val:4299, powerDraw:40},
  {id:'mn5', icon:'🖥️', brand:'LG',       name:'27GR95QE-B 27" OLED 240Hz 2K 0.03ms',             specs:['27"','2K OLED','240Hz'],       price:'R$2.999',val:2999, powerDraw:35},
  {id:'mn6', icon:'🖥️', brand:'AOC',      name:'AGON AG276QZD2 27" OLED 240Hz 2K HDR',             specs:['27"','OLED HDR','240Hz'],      price:'R$2.849',val:2849, powerDraw:35},
  {id:'mn7', icon:'🖥️', brand:'MSI',      name:'MAG 341CQP QD-OLED 34" 175Hz Ultrawide',           specs:['34"','QD-OLED','175Hz'],       price:'R$3.999',val:3999, powerDraw:45},
  {id:'mn8', icon:'🖥️', brand:'Gigabyte', name:'M27Q-SA 27" IPS 180Hz 2K 1ms KVM Switch',          specs:['27"','2K IPS','180Hz'],        price:'R$1.199',val:1199, powerDraw:30},
];

export const CATEGORY_DISPLAY = {
  gpu:     { title:'🎮 Placas de Vídeo',        products: [] },
  cpu:     { title:'⚙️ Processadores',           products: [] },
  ram:     { title:'🧠 Memória RAM',             products: [] },
  ssd:     { title:'💾 Armazenamento',           products: [] },
  psu:     { title:'🔌 Fontes de Alimentação',   products: [] },
  cool:    { title:'❄️ Refrigeração',            products: [] },
  periph:  { title:'🖱️ Periféricos',             products: [] },
  monitor: { title:'🖥️ Monitores',               products: [] },
};

// Helper: converte um item do catálogo em card de produto para exibição
function toCard(item, badge='sale', badgeLabel='', old='', install='', stars='★★★★★', reviews='—') {
  return {
    icon:         item.icon,
    brand:        item.brand,
    name:         item.name,
    badge,
    badgeLabel,
    old,
    price:        item.val.toLocaleString('pt-BR'),
    cents:        '00',
    install,
    stars,
    reviews,
    _catalogItem: item,
  };
}

const PERIPH_META = [
  { badge:'hot', badgeLabel:'TOP',          old:'R$ 799,00',   install:'6x de R$103,16',   stars:'★★★★★', reviews:'2.109' },
  { badge:'new', badgeLabel:'NOVO',         old:'R$ 1.099,00', install:'6x de R$146,50',   stars:'★★★★★', reviews:'498'   },
  { badge:'sale',badgeLabel:'-28%',         old:'R$ 1.799,00', install:'10x de R$129,50',  stars:'★★★★☆', reviews:'671'   },
  { badge:'sale',badgeLabel:'-15%',         old:'R$ 699,00',   install:'6x de R$99,83',    stars:'★★★★★', reviews:'1.543' },
  { badge:'hot', badgeLabel:'TOP',          old:'R$ 1.299,00', install:'6x de R$183,16',   stars:'★★★★☆', reviews:'876'   },
  { badge:'free',badgeLabel:'Frete Grátis', old:'R$ 799,00',   install:'6x de R$108,16',   stars:'★★★★★', reviews:'2.341' },
  { badge:'sale',badgeLabel:'-10%',         old:'R$ 449,00',   install:'3x de R$133,00',   stars:'★★★★★', reviews:'1.087' },
  { badge:'new', badgeLabel:'NOVO',         old:'R$ 1.499,00', install:'12x de R$108,25',  stars:'★★★★★', reviews:'234'   },
  { badge:'sale',badgeLabel:'-20%',         old:'R$ 1.999,00', install:'12x de R$133,25',  stars:'★★★★★', reviews:'187'   },
  { badge:'hot', badgeLabel:'TOP',          old:'R$ 599,00',   install:'3x de R$166,33',   stars:'★★★★★', reviews:'654'   },
];

const MONITOR_META = [
  { badge:'hot', badgeLabel:'TOP',          old:'R$ 5.999,00', install:'12x de R$395,75',  stars:'★★★★★', reviews:'543'   },
  { badge:'sale',badgeLabel:'-24%',         old:'R$ 3.299,00', install:'12x de R$208,25',  stars:'★★★★☆', reviews:'1.203' },
  { badge:'new', badgeLabel:'NOVO',         old:'R$ 8.999,00', install:'12x de R$624,91',  stars:'★★★★★', reviews:'312'   },
  { badge:'hot', badgeLabel:'TOP',          old:'R$ 5.499,00', install:'12x de R$358,25',  stars:'★★★★★', reviews:'432'   },
  { badge:'sale',badgeLabel:'-20%',         old:'R$ 3.799,00', install:'12x de R$249,91',  stars:'★★★★★', reviews:'876'   },
  { badge:'free',badgeLabel:'Frete Grátis', old:'R$ 3.499,00', install:'12x de R$237,41',  stars:'★★★★☆', reviews:'234'   },
  { badge:'new', badgeLabel:'NOVO',         old:'R$ 4.999,00', install:'12x de R$333,25',  stars:'★★★★★', reviews:'187'   },
  { badge:'sale',badgeLabel:'-25%',         old:'R$ 1.599,00', install:'12x de R$99,91',   stars:'★★★★☆', reviews:'765'   },
];

export function getCategoryProducts(catKey) {
  if (catKey === 'periph') {
    return PERIPH_CATALOG.map((item, i) => {
      const m = PERIPH_META[i] || {};
      return toCard(item, m.badge, m.badgeLabel, m.old, m.install, m.stars, m.reviews);
    });
  }
  if (catKey === 'monitor') {
    return MONITOR_CATALOG.map((item, i) => {
      const m = MONITOR_META[i] || {};
      return toCard(item, m.badge, m.badgeLabel, m.old, m.install, m.stars, m.reviews);
    });
  }
  return (CATALOG[catKey] || []).map(item => toCard(item));
}

export const MODAL_TITLES = {
  cpu:'Selecionar Processador', mb:'Selecionar Placa-Mãe', ram:'Selecionar Memória RAM',
  gpu:'Selecionar Placa de Vídeo', ssd:'Selecionar Armazenamento',
  psu:'Selecionar Fonte de Alimentação', cool:'Selecionar Cooler', case:'Selecionar Gabinete',
};
