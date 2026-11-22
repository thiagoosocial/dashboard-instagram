// VERSÃO 2 — layout "pôster" centrado, sem pessoas, ilustrações em SVG
const { u, page, sparkle, dots } = require('./common');

const TH = {
  cream: { bg: 'radial-gradient(1300px 950px at 20% 5%,#FFFAF4 0,#FCEFE2 50%,#F5DEC8 100%)', fg: '#3A2218', acc: '#E4701C', soft: '#F8DCC3', soft2: '#F1C6A0', frame: 'rgba(228,112,28,.55)', sub: '#5a3d2e', logo: 'laranja', dark: '#C25A12' },
  peach: { bg: 'linear-gradient(170deg,#FBE3CC 0,#F6CFAE 100%)', fg: '#3A2218', acc: '#D2570B', soft: '#FFF1E3', soft2: '#F8D3B1', frame: 'rgba(210,87,11,.5)', sub: '#5a3d2e', logo: 'marrom', dark: '#A84606' },
  sun: { bg: 'linear-gradient(170deg,#FFE9C4 0,#FBC275 60%,#F5A04A 100%)', fg: '#3A2218', acc: '#C2520B', soft: '#FFF4DF', soft2: '#FFD79A', frame: 'rgba(194,82,11,.55)', sub: '#4b2e1f', logo: 'marrom', dark: '#9C400A' },
  dark: { bg: 'radial-gradient(1100px 900px at 50% 35%,#4a2c1d 0,#2f1a10 60%,#1f1008 100%)', fg: '#FBEFE0', acc: '#FF9A3C', soft: 'rgba(255,154,60,.14)', soft2: 'rgba(255,154,60,.28)', frame: 'rgba(255,154,60,.5)', sub: '#EAD6C4', logo: 'branco_laranja', dark: '#E4701C', dots: '255,200,140' },
  orange: { bg: 'linear-gradient(160deg,#F0832D 0,#DA6210 100%)', fg: '#FFFFFF', acc: '#3A2218', soft: 'rgba(255,255,255,.2)', soft2: 'rgba(255,255,255,.34)', frame: 'rgba(255,255,255,.65)', sub: '#FFF1E3', logo: 'branco', dark: '#3A2218' },
  burg: { bg: 'radial-gradient(1100px 900px at 50% 30%,#8A2140 0,#6E1830 45%,#3F0C1B 100%)', fg: '#FBEFD6', acc: '#F1D58F', soft: 'rgba(241,213,143,.13)', soft2: 'rgba(241,213,143,.26)', frame: 'rgba(212,174,90,.75)', sub: '#F6E4BE', logo: 'branco_laranja', dark: '#D4AE5A', dots: '255,236,190' },
  night: { bg: 'radial-gradient(1100px 900px at 50% 40%,#3A2214 0,#1E120C 60%,#120a06 100%)', fg: '#FBEFD6', acc: '#F1D58F', soft: 'rgba(241,213,143,.12)', soft2: 'rgba(241,213,143,.24)', frame: 'rgba(212,174,90,.75)', sub: '#F6E4BE', logo: 'branco_laranja', dark: '#D4AE5A', dots: '241,213,143' },
};

const TOOTH = 'M200 40C165 12 92 28 80 100c-9 56 18 98 28 160 6 40 20 90 44 90 22 0 22-58 48-58s26 58 48 58c24 0 38-50 44-90 10-62 37-104 28-160C308 28 235 12 200 40z';
const tooth = (fill, sc = 1, cx = 200, cy = 200, extra = '') => `<path d="${TOOTH}" fill="${fill}" ${extra} transform="translate(${cx},${cy}) scale(${sc}) translate(-200,-196)"/>`;

const ICONS = {
  shield: (c) => `<svg width="400" height="400" viewBox="0 0 400 400">
    <path d="M200 30L340 88V196c0 92-62 152-140 184C122 348 60 288 60 196V88z" fill="${c.acc}"/>
    <path d="M200 52L320 100V196c0 76-50 128-120 158C130 324 80 272 80 196V100z" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="4"/>
    ${tooth('#fff', .5, 200, 206)}
    <circle cx="306" cy="318" r="50" fill="#fff"/>
    <path d="M306 290c-14 0-24 10-24 22 0 12 7 19 13 30l-9 26 14-6 6-12 6 12 14 6-9-26c6-11 13-18 13-30 0-12-10-22-24-22z" transform="translate(0,-4) scale(.9) translate(34,28)" fill="#D3253A"/>
  </svg>`,
  access: (c) => `<svg width="400" height="400" viewBox="0 0 400 400">
    <circle cx="200" cy="200" r="158" fill="none" stroke="${c.acc}" stroke-width="16"/>
    <circle cx="200" cy="104" r="26" fill="${c.acc}"/>
    <path d="M118 158H282M200 158V240M200 240L156 318M200 240L244 318" stroke="${c.acc}" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </svg>`,
  kit: (c) => `<svg width="400" height="400" viewBox="0 0 400 400">
    <rect x="132" y="56" width="26" height="130" rx="13" fill="#fff" stroke="${c.acc}" stroke-width="6"/>
    <rect x="122" y="40" width="46" height="40" rx="8" fill="${c.acc}"/>
    <rect x="228" y="76" width="54" height="116" rx="10" fill="#fff" stroke="${c.acc}" stroke-width="6"/>
    <rect x="238" y="56" width="34" height="24" rx="6" fill="${c.acc}"/>
    <rect x="236" y="100" width="38" height="8" rx="4" fill="${c.acc}"/>
    <rect x="62" y="176" width="276" height="54" rx="12" fill="${c.acc}"/>
    <rect x="80" y="230" width="240" height="140" rx="12" fill="#fff"/>
    <path d="M200 342c-34-24-48-40-48-58 0-14 10-24 22-24 11 0 21 6 26 16 5-10 15-16 26-16 12 0 22 10 22 24 0 18-14 34-48 58z" fill="${c.acc}"/>
  </svg>`,
  house: (c) => `<svg width="400" height="400" viewBox="0 0 400 400">
    <polygon points="40,206 200,52 360,206" fill="${c.acc}"/>
    <rect x="86" y="198" width="228" height="164" rx="10" fill="#fff"/>
    <rect x="268" y="84" width="34" height="68" fill="${c.acc}"/>
    <path d="M200 340c-46-34-64-56-64-80 0-18 14-32 30-32 14 0 28 8 34 22 6-14 20-22 34-22 16 0 30 14 30 32 0 24-18 46-64 80z" fill="${c.acc}"/>
  </svg>`,
  scales: (c) => `<svg width="400" height="400" viewBox="0 0 400 400">
    <rect x="193" y="70" width="14" height="260" rx="7" fill="${c.acc}"/>
    <rect x="130" y="322" width="140" height="22" rx="11" fill="${c.acc}"/>
    <rect x="60" y="94" width="280" height="14" rx="7" fill="${c.acc}"/>
    <circle cx="200" cy="82" r="22" fill="${c.acc}"/>
    <g stroke="${c.acc}" stroke-width="5"><path d="M80 108L40 226M80 108L120 226M320 108L280 226M320 108L360 226"/></g>
    <path d="M26 226Q80 306 134 226z" fill="${c.acc}"/>
    <path d="M266 226Q320 306 374 226z" fill="${c.acc}"/>
    ${tooth('#fff', .17, 80, 252)}${tooth('#fff', .17, 320, 252)}
  </svg>`,
  sun: (c) => {
    let rays = '';
    for (let i = 0; i < 16; i++) { const a = (i * 22.5) * Math.PI / 180, r1 = 140, r2 = i % 2 ? 168 : 184; rays += `<line x1="${200 + r1 * Math.cos(a)}" y1="${200 + r1 * Math.sin(a)}" x2="${200 + r2 * Math.cos(a)}" y2="${200 + r2 * Math.sin(a)}" stroke="${c.acc}" stroke-width="14" stroke-linecap="round"/>`; }
    return `<svg width="400" height="400" viewBox="0 0 400 400">${rays}<circle cx="200" cy="200" r="116" fill="${c.acc}"/>${tooth('#fff', .46, 200, 204)}
    <path d="M280 120l6 16 16 6-16 6-6 16-6-16-16-6 16-6z" fill="#fff"/></svg>`;
  },
  gift: (c) => `<svg width="400" height="400" viewBox="0 0 400 400">
    <path d="M200 134C150 56 84 70 112 118c18 22 62 18 88 16zM200 134c50-78 116-64 88-16-18 22-62 18-88 16z" fill="#F1D58F"/>
    <rect x="54" y="132" width="292" height="66" rx="12" fill="#F1D58F"/>
    <rect x="72" y="198" width="256" height="170" rx="12" fill="#F6E3A8"/>
    <rect x="176" y="132" width="48" height="236" fill="#C9962F"/>
    <rect x="54" y="150" width="292" height="30" rx="10" fill="#C9962F" opacity=".0"/>
    ${tooth('#8A2140', .22, 124, 284)}${tooth('#8A2140', .22, 276, 284)}
  </svg>`,
  wreath: (c) => {
    let s = '';
    for (let i = 0; i < 16; i++) { const a = i * 22.5, r = 132; s += `<ellipse cx="200" cy="${200 - r}" rx="38" ry="15" fill="${c.dark}" opacity=".85" transform="rotate(${a} 200 200)"/>`; }
    for (let i = 0; i < 8; i++) { const a = i * 45 + 22; s += `<circle cx="200" cy="${200 - 150}" r="17" fill="${i % 2 ? '#C0392B' : '#F1D58F'}" transform="rotate(${a} 200 200)"/>`; }
    return `<svg width="400" height="400" viewBox="0 0 400 400">${s}
    <path d="M200 120l14 52 52 14-52 14-14 52-14-52-52-14 52-14z" fill="${c.acc}"/></svg>`;
  },
  tree: (c) => `<svg width="400" height="400" viewBox="0 0 400 400">
    <rect x="178" y="330" width="44" height="46" rx="4" fill="#8A5A2B"/>
    <polygon points="200,92 282,190 118,190" fill="#7A1E36"/>
    <polygon points="200,150 314,268 86,268" fill="#8A2140"/>
    <polygon points="200,214 350,340 50,340" fill="#A32A4B"/>
    <path d="M200 20l11 32 32 11-32 11-11 32-11-32-32-11 32-11z" fill="#E2B754"/>
    <circle cx="170" cy="168" r="9" fill="#F1D58F"/><circle cx="226" cy="214" r="10" fill="#F1D58F"/><circle cx="150" cy="248" r="10" fill="#E4701C"/><circle cx="252" cy="300" r="11" fill="#F1D58F"/><circle cx="120" cy="318" r="10" fill="#F1D58F"/><circle cx="196" cy="290" r="9" fill="#E4701C"/>
  </svg>`,
  fireworks: (c) => {
    const burst = (cx, cy, r, col) => { let s = ''; for (let i = 0; i < 14; i++) { const a = i * (360 / 14) * Math.PI / 180; const x1 = cx + r * .32 * Math.cos(a), y1 = cy + r * .32 * Math.sin(a), x2 = cx + r * Math.cos(a), y2 = cy + r * Math.sin(a); s += `<line x1="${x1}" y1="${y1}" x2="${x2 * .9 + cx * .1}" y2="${y2 * .9 + cy * .1}" stroke="${col}" stroke-width="7" stroke-linecap="round"/><circle cx="${cx + (r + 14) * Math.cos(a)}" cy="${cy + (r + 14) * Math.sin(a)}" r="${i % 2 ? 5 : 8}" fill="${col}"/>`; } return s; };
    return `<svg width="400" height="400" viewBox="0 0 400 400">${burst(200, 150, 100, '#F1D58F')}${burst(92, 276, 62, '#E4701C')}${burst(312, 262, 70, '#FBEFD6')}
    <path d="M200 120l9 21 21 9-21 9-9 21-9-21-21-9 21-9z" fill="#F1D58F"/></svg>`;
  },
  suitcase: (c) => `<svg width="400" height="400" viewBox="0 0 400 400">
    <path d="M150 110V84a20 20 0 0120-20h60a20 20 0 0120 20v26" fill="none" stroke="${c.dark}" stroke-width="18" stroke-linecap="round"/>
    <rect x="52" y="108" width="296" height="232" rx="36" fill="${c.acc}"/>
    <rect x="112" y="108" width="26" height="232" fill="rgba(0,0,0,.18)"/><rect x="262" y="108" width="26" height="232" fill="rgba(0,0,0,.18)"/>
    ${tooth('#fff', .42, 200, 226)}
  </svg>`,
  drop: (c) => `<svg width="400" height="400" viewBox="0 0 400 400">
    <path d="M200 36C150 120 86 184 86 256a114 114 0 00228 0C314 184 250 120 200 36z" fill="${c.acc}"/>
    <path d="M142 266a60 60 0 0042 56" fill="none" stroke="#fff" stroke-width="16" stroke-linecap="round" opacity=".8"/>
    <path d="M300 60l5 14 14 5-14 5-5 14-5-14-14-5 14-5z" fill="${c.acc}"/>
  </svg>`,
  glass: (c) => `<svg width="400" height="400" viewBox="0 0 400 400">
    <path d="M232 96L270 30h54" fill="none" stroke="${c.dark}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M96 96H304L276 346a18 18 0 01-18 16H142a18 18 0 01-18-16z" fill="${c.soft}" stroke="${c.acc}" stroke-width="14" stroke-linejoin="round"/>
    <path d="M110 190H290L276 346a18 18 0 01-18 16H142a18 18 0 01-18-16z" fill="${c.acc}" opacity=".8"/>
    <rect x="146" y="150" width="56" height="56" rx="12" fill="#fff" opacity=".85" transform="rotate(-10 174 178)"/><rect x="214" y="186" width="50" height="50" rx="12" fill="#fff" opacity=".85" transform="rotate(12 239 211)"/>
  </svg>`,
  ice: (c) => `<svg width="400" height="400" viewBox="0 0 400 400">
    <circle cx="200" cy="200" r="162" fill="none" stroke="${c.acc}" stroke-width="18"/>
    <rect x="124" y="124" width="152" height="152" rx="28" fill="${c.soft}" stroke="${c.acc}" stroke-width="10" transform="rotate(12 200 200)"/>
    <path d="M170 150l26 40-24 18 28 38" fill="none" stroke="${c.acc}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M86 314L314 86" stroke="${c.acc}" stroke-width="18" stroke-linecap="round"/>
  </svg>`,
  checkup: (c) => `<svg width="400" height="400" viewBox="0 0 400 400">
    ${tooth(c.acc, .78, 160, 206)}
    <circle cx="256" cy="176" r="74" fill="rgba(255,255,255,.35)" stroke="${c.dark}" stroke-width="18"/>
    <path d="M308 230L350 280" stroke="${c.dark}" stroke-width="26" stroke-linecap="round"/>
    <path d="M232 178l16 16 32-34" fill="none" stroke="${c.dark}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  plane: (c) => `<svg width="400" height="400" viewBox="0 0 400 400">
    <polygon points="40,196 360,60 214,260" fill="${c.acc}"/>
    <polygon points="214,260 360,60 276,338" fill="${c.dark}"/>
    <polygon points="214,260 196,346 160,246" fill="${c.soft}" stroke="${c.acc}" stroke-width="4"/>
    <path d="M60 310c40-10 60 20 100 10" fill="none" stroke="${c.acc}" stroke-width="6" stroke-dasharray="4 14" stroke-linecap="round"/>
    ${tooth('#fff', .13, 300, 112)}
  </svg>`,
};

const LOGO = (v, h = 84) => `<img src="${u('logo_' + v + '.png')}" style="position:absolute;right:92px;top:88px;height:${h}px">`;

function poster(t, o) {
  const c = TH[t];
  const shape = { circle: '50%', arch: '280px 280px 30px 30px', squircle: '140px' }[o.shape || 'circle'];
  const icon = ICONS[o.icon](c);
  const css = `
  body{background:${c.bg};color:${c.fg}}
  .fr{position:absolute;inset:34px;border:2px solid ${c.frame}}
  .fr2{position:absolute;inset:48px;border:1px solid ${c.frame};opacity:.5}
  .num{font-family:Montserrat;font-weight:800;font-size:${o.numSize || 116}px;line-height:.9;color:${c.acc};letter-spacing:-.02em;font-feature-settings:'lnum' 1;font-variant-numeric:lining-nums}
  .mon{font-weight:700;font-size:21px;letter-spacing:.24em;color:${c.fg};margin-top:14px;text-transform:uppercase}
  .rule{position:absolute;left:92px;right:92px;top:240px;height:2px;background:${c.frame}}
  .lab{position:absolute;left:92px;right:92px;top:266px;text-align:center;font-weight:700;font-size:21px;letter-spacing:.22em;color:${c.acc};text-transform:uppercase}
  .med{position:absolute;left:270px;top:336px;width:540px;height:540px}
  .med .ring{position:absolute;inset:-26px;border:2px solid ${c.frame};border-radius:${shape}}
  .med .fill{position:absolute;inset:0;background:${c.soft};border-radius:${shape}}
  .med .in{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
  .txt{position:absolute;left:90px;right:90px;top:924px;text-align:center}
  .txt h1{font-size:${o.h || 76}px;line-height:1.05;color:${c.fg}}
  .txt h1 b,.txt h1 i{color:${c.acc}}
  .txt p{margin:22px auto 0;width:${o.pw || 800}px;font-size:${o.ps || 28}px;line-height:1.42;color:${c.sub}}
  .txt p b{color:${c.acc}}
  .ctaP{position:absolute;left:0;right:0;bottom:92px;text-align:center}
  .ctaP span{display:inline-block;padding:15px 40px;border-radius:999px;background:${c.acc};color:${t === 'orange' ? '#fff' : (['dark', 'burg', 'night'].includes(t) ? '#2a160d' : '#fff')};font-weight:700;font-size:25px;letter-spacing:.03em}
  `;
  return page(`
  ${c.dots ? dots(100, o.seed || 5, 1080, 1350, c.dots, 4, .1, .5) : ''}
  <div class="fr"></div><div class="fr2"></div>
  <div style="position:absolute;left:92px;top:84px"><div class="num">${o.num}</div><div class="mon">${o.mon}</div></div>
  ${LOGO(c.logo)}
  <div class="rule"></div><div class="lab">${o.label}</div>
  <div class="med"><div class="ring"></div><div class="fill"></div><div class="in">${icon}</div>
    ${sparkle(-10, 20, 38, c.acc, .9)}${sparkle(500, 70, 28, c.acc, .8)}${sparkle(470, 470, 44, c.acc, .9)}</div>
  <div class="txt"><h1>${o.h1}</h1><p>${o.p}</p></div>
  <div class="ctaP"><span>${o.cta}</span></div>`, css, '');
}

const P = (name, t, o) => [name, poster(t, o), 1080, 1350];

// ---------- cartão do vale (V2)
const cardFront2 = page(`
<div style="width:1600px;height:900px;position:relative;overflow:hidden;background:linear-gradient(135deg,#FFFAF4,#F7E2CC);font-family:Montserrat;color:#3A2218">
  <div style="position:absolute;left:0;top:0;bottom:0;width:620px;background:linear-gradient(160deg,#F0832D,#D9600F)"></div>
  <svg style="position:absolute;left:0;top:0" width="620" height="900"><g fill="none" stroke="rgba(255,255,255,.18)" stroke-width="3"><circle cx="0" cy="900" r="260"/><circle cx="0" cy="900" r="360"/><circle cx="0" cy="900" r="460"/><circle cx="620" cy="0" r="200"/><circle cx="620" cy="0" r="300"/></g></svg>
  <img src="${u('logo_branco.png')}" style="position:absolute;left:70px;top:70px;height:104px">
  <div style="position:absolute;left:110px;top:250px;width:400px;height:400px">${ICONS.gift({ acc: '#F1D58F', dark: '#C9962F', soft: '#fff' })}</div>
  <div style="position:absolute;left:700px;top:96px;font-weight:700;font-size:24px;letter-spacing:.3em;color:#C25A12">PRESENTE DE NATAL</div>
  <div style="position:absolute;left:700px;top:156px;font-family:'Playfair Display';font-weight:800;font-size:118px;line-height:1;color:#3A2218">Vale-cuidado</div>
  <div style="position:absolute;left:704px;top:290px;font-family:'Playfair Display';font-style:italic;font-weight:700;font-size:100px;line-height:1;color:#E4701C">de Natal</div>
  <div style="position:absolute;left:704px;top:436px;display:flex;gap:16px"><span style="border:2px solid #E4701C;border-radius:999px;padding:12px 28px;font-size:27px;font-weight:600;color:#C25A12">Avaliação</span><span style="border:2px solid #E4701C;border-radius:999px;padding:12px 28px;font-size:27px;font-weight:600;color:#C25A12">Limpeza</span><span style="border:2px solid #E4701C;border-radius:999px;padding:12px 28px;font-size:27px;font-weight:600;color:#C25A12">Clareamento</span></div>
  <div style="position:absolute;left:704px;bottom:96px;display:flex;gap:40px;font-size:25px;color:#5a3d2e">
    <div style="width:300px"><div style="height:2px;background:#E4701C;margin-bottom:10px"></div>Para</div>
    <div style="width:300px"><div style="height:2px;background:#E4701C;margin-bottom:10px"></div>De</div>
    <div style="width:170px"><div style="height:2px;background:#E4701C;margin-bottom:10px"></div>Válido até</div>
  </div>
</div>`, `body{width:1600px;height:900px}html{width:1600px;height:900px}`, '');

const cardBack2 = page(`
<div style="width:1600px;height:900px;position:relative;overflow:hidden;background:radial-gradient(1200px 800px at 30% 20%,#4a2c1d,#241209);font-family:Montserrat;color:#FBEFE0">
  <div style="position:absolute;inset:26px;border:2px solid rgba(255,154,60,.5)"></div>
  <img src="${u('logo_branco_laranja.png')}" style="position:absolute;left:90px;top:80px;height:100px">
  <div style="position:absolute;right:100px;top:94px;font-weight:700;font-size:24px;letter-spacing:.24em;color:#FF9A3C">Nº ______________</div>
  <div style="position:absolute;left:90px;top:236px;font-family:'Playfair Display';font-weight:800;font-size:60px">Regras de <span style="color:#FF9A3C">utilização</span></div>
  <div style="position:absolute;left:90px;top:340px;width:1420px">${[1, 2, 3, 4].map(() => `<div style="border-bottom:2px dotted rgba(251,239,224,.4);height:62px"></div>`).join('')}</div>
  <div style="position:absolute;left:90px;top:640px;font-size:28px;font-weight:600;display:flex;gap:44px;align-items:center"><span style="color:#FF9A3C">Serviço:</span><span>☐ Avaliação</span><span>☐ Limpeza</span><span>☐ Clareamento</span></div>
  <div style="position:absolute;left:90px;bottom:84px;font-size:24px;color:#EAD6C4">Agendamento: ______________________ · Cisos — Na direção do seu sorriso</div>
</div>`, `body{width:1600px;height:900px}html{width:1600px;height:900px}`, '');

const tipCards = [
  ['dark', 'suitcase', '01', 'Dica · 1/4', 'Leve o <b>básico</b> na bagagem.', 'Escova, creme dental e fio dental na necessaire: a higiene não tira férias.', 'circle'],
  ['cream', 'drop', '02', 'Dica · 2/4', 'Mantenha a <b>água</b> por perto.', 'Beber água ao longo do dia ajuda a limpar a boca e reduz o efeito de bebidas e doces.', 'arch'],
  ['peach', 'glass', '03', 'Dica · 3/4', 'Cuidado com <b>açúcar e bebidas ácidas.</b>', 'Drinks, refrigerantes e petiscos o dia todo favorecem cáries. Prefira nas refeições e enxágue a boca com água.', 'squircle'],
  ['dark', 'ice', '04', 'Dica · 4/4', 'Evite morder <b>gelo e coisas duras.</b>', 'Gelo, caroços e alimentos muito duros podem fraturar dentes e restaurações.', 'circle'],
];

module.exports = {
  list: [
    P('v2_vale-cuidado_post-feed', 'burg', { num: '01–23', numSize: 88, mon: 'Dez · Presente', label: 'Vale-cuidado de Natal', icon: 'gift', shape: 'arch', h1: 'Presenteie com <i>cuidado.</i>', p: 'Avaliação, limpeza e clareamento em um só presente, em cartão físico e digital.', cta: 'Peça o seu na recepção', seed: 2 }),
    ['v2_vale-cuidado_cartao-frente', cardFront2, 1600, 900],
    ['v2_vale-cuidado_cartao-verso', cardBack2, 1600, 900],
    P('v2_01-12_biosseguranca', 'dark', { num: '01', mon: 'Dez · Ter', label: 'Dia Mundial de Luta contra a Aids', icon: 'shield', shape: 'circle', h1: 'Biossegurança é <b>cuidado</b> com você.', p: 'Protocolos rigorosos de esterilização e proteção em cada atendimento.', cta: 'Informação é prevenção', seed: 3 }),
    P('v2_03-12_acessibilidade', 'cream', { num: '03', mon: 'Dez · Qui', label: 'Dia Internacional da Pessoa com Deficiência', icon: 'access', shape: 'arch', h1: 'Todo sorriso merece <b>ser bem cuidado.</b>', p: 'Atendimento acolhedor, respeitoso e adaptado a cada paciente.', cta: 'Conte com a nossa equipe' }),
    P('v2_05-12_acao-solidaria', 'orange', { num: '05', mon: 'Dez · Sáb', label: 'Dia Internacional do Voluntário', icon: 'kit', shape: 'squircle', h1: 'Pequenos gestos geram <b>grandes sorrisos.</b>', p: 'Ação Solidária de Natal: arrecadação de kits de higiene bucal.', cta: 'Participe' }),
    P('v2_08-12_familia', 'peach', { num: '08', mon: 'Dez · Ter', label: 'Dia Nacional da Família', icon: 'house', shape: 'circle', h1: 'Check-up em família <b>antes das férias.</b>', p: 'Agende o horário de todos e comece as férias com o sorriso em dia.', cta: 'Vale-cuidado de Natal' }),
    P('v2_10-12_direitos-humanos', 'dark', { num: '10', mon: 'Dez · Qui', label: 'Dia Internacional dos Direitos Humanos', icon: 'scales', shape: 'arch', h1: 'Cuidar do sorriso é <b>cuidar da dignidade.</b>', p: 'Em 1948, a Declaração Universal dos Direitos Humanos reconheceu o direito de todos à saúde e à dignidade.', pw: 840, ps: 27, cta: 'Respeito · Acolhimento · Cuidado', seed: 9 }),
    P('v2_21-12_verao-clareamento', 'sun', { num: '21', mon: 'Dez · Seg', label: 'Começa o verão', icon: 'sun', shape: 'circle', h1: 'Sorriso <b>pronto</b> para as festas e o verão.', p: 'Clareamento dental com avaliação profissional para brilhar nas festas e nas férias.', cta: 'Agende sua avaliação' }),
    P('v2_21-12_carrossel-viagem_1', 'sun', { num: '4', mon: 'Dicas · Viagem', label: 'Começa o verão', icon: 'plane', shape: 'arch', h1: 'Como cuidar do sorriso <b>na viagem.</b>', p: 'Guia rápido para curtir as férias sem dor de dente.', cta: 'Arraste  →' }),
    ...tipCards.map(([t, ic, n, m, h1, p, sh], i) => P(`v2_21-12_carrossel-viagem_${i + 2}`, t, { num: n, mon: m, label: `Cuidados na viagem · ${i + 2}/6`, icon: ic, shape: sh, h1, p, cta: 'Arraste  →', seed: 20 + i })),
    P('v2_21-12_carrossel-viagem_6', 'orange', { num: '6/6', numSize: 84, mon: 'Antes de viajar', label: 'Cuidados na viagem', icon: 'checkup', shape: 'squircle', h1: 'Faça um check-up e <b>viaje tranquilo.</b>', p: 'Se sentir dor ou tiver uma urgência, procure um dentista.', cta: 'Agende com a nossa equipe' }),
    P('v2_24-12_vespera-de-natal', 'burg', { num: '24', mon: 'Dez · Qui', label: 'Véspera de Natal', icon: 'wreath', shape: 'circle', h: 96, h1: 'Feliz <i>Natal</i>', p: 'Que esta noite seja de paz, amor e gratidão. Obrigado por confiar o seu sorriso a nós em 2026.', cta: 'Com carinho, equipe Cisos', seed: 14 }),
    P('v2_25-12_feliz-natal', 'cream', { num: '25', mon: 'Dez · Sex', label: 'Natal · Clínica fechada', icon: 'tree', shape: 'circle', h: 96, h1: 'Feliz <i>Natal!</i>', p: 'Hoje celebramos com quem amamos. Voltamos em breve, com o mesmo carinho de sempre.', cta: 'Clínica fechada hoje' }),
    P('v2_31-12_ano-novo-2027', 'night', { num: '31', mon: 'Dez · Qui', label: 'Feliz Ano Novo', icon: 'fireworks', shape: 'arch', h1: '2026 foi de <i>muitos sorrisos.</i>', p: 'Obrigado por fazer parte da nossa história. Vamos começar 2027 com um tratamento planejado?', cta: 'Agende sua avaliação', seed: 31 }),
  ],
};
