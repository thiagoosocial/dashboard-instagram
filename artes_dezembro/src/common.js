// Estilos e componentes compartilhados — identidade visual Cisos
const path = require('path');
const A = path.resolve(__dirname, '../assets');
const u = (f) => 'file://' + path.join(A, f);

const FONTS = `
@font-face{font-family:Montserrat;font-weight:400;src:url(${u('fonts/montserrat-latin-400-normal.woff2')})}
@font-face{font-family:Montserrat;font-weight:500;src:url(${u('fonts/montserrat-latin-500-normal.woff2')})}
@font-face{font-family:Montserrat;font-weight:600;src:url(${u('fonts/montserrat-latin-600-normal.woff2')})}
@font-face{font-family:Montserrat;font-weight:700;src:url(${u('fonts/montserrat-latin-700-normal.woff2')})}
@font-face{font-family:Montserrat;font-weight:800;src:url(${u('fonts/montserrat-latin-800-normal.woff2')})}
@font-face{font-family:'Playfair Display';font-weight:400;src:url(${u('fonts/playfair-display-latin-400-normal.woff2')})}
@font-face{font-family:'Playfair Display';font-weight:700;src:url(${u('fonts/playfair-display-latin-700-normal.woff2')})}
@font-face{font-family:'Playfair Display';font-weight:800;src:url(${u('fonts/playfair-display-latin-800-normal.woff2')})}
@font-face{font-family:'Playfair Display';font-weight:400;font-style:italic;src:url(${u('fonts/playfair-display-latin-400-italic.woff2')})}
@font-face{font-family:'Playfair Display';font-weight:700;font-style:italic;src:url(${u('fonts/playfair-display-latin-700-italic.woff2')})}
`;

const BASE = `
:root{--o:#E4701C;--od:#C25A12;--b:#3A2218;--c:#FBF3EA;--p:#F6DFC9;--burg:#6E1830;--burg2:#4A0F20;--gold:#D4AE5A;--gold2:#F1D58F}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1350px}
body{position:relative;overflow:hidden;font-family:Montserrat,sans-serif;color:var(--b);-webkit-font-smoothing:antialiased}
.cream{background:radial-gradient(1300px 950px at 15% 5%,#FFFAF4 0,#FCEFE2 50%,#F5DEC8 100%)}
.arc{position:absolute;border:2px solid rgba(228,112,28,.5);border-radius:50%}
.logo{position:absolute;left:50%;transform:translateX(-50%);top:56px;height:110px}
.tag{display:inline-flex;align-items:center;gap:14px;border:2px solid var(--o);color:var(--od);border-radius:999px;padding:13px 30px;font-weight:600;font-size:21px;letter-spacing:.11em;text-transform:uppercase;background:rgba(255,255,255,.35)}
h1{font-family:'Playfair Display',serif;font-weight:400;font-size:84px;line-height:1.03;letter-spacing:-.012em;color:var(--b)}
h1 b{font-weight:800;color:var(--o)}
h1 i{font-style:italic;font-weight:700;color:var(--o)}
.sub{font-size:31px;line-height:1.45;font-weight:400;color:#4b3226}
.sub b{font-weight:700;color:var(--od)}
.photo{position:absolute;left:0;right:0;bottom:0;background-repeat:no-repeat}
.fade{-webkit-mask-image:linear-gradient(to bottom,transparent 0,#000 10%);mask-image:linear-gradient(to bottom,transparent 0,#000 10%)}
.bar{position:absolute;left:56px;right:56px;bottom:48px;display:flex;align-items:center;gap:22px;background:rgba(253,246,238,.94);border-radius:26px;padding:22px 30px;box-shadow:0 10px 30px rgba(80,40,10,.16)}
.bar .t{font-size:26px;line-height:1.36;flex:1;color:#4b3226}
.bar .t b{color:var(--od);font-weight:700}
.chk{width:58px;height:58px;flex:none;border:2px solid var(--o);border-radius:50%;display:flex;align-items:center;justify-content:center}
.cta{flex:none;border:2px solid var(--o);color:var(--od);border-radius:999px;padding:14px 30px;font-size:25px;font-weight:600;display:flex;align-items:center;gap:12px;background:#fff8}
.chip{display:inline-block;border:2px solid var(--o);color:var(--od);border-radius:999px;padding:11px 26px;font-size:24px;font-weight:500;background:rgba(255,255,255,.5)}
.chip.solid{background:var(--o);color:#fff;border-color:var(--o);font-weight:600}
`;

const ICON = {
  check: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#E4701C" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg>`,
  arrow: `<svg width="34" height="20" viewBox="0 0 34 20" fill="none" stroke="#C25A12" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 10h28M22 2l8 8-8 8"/></svg>`,
  ribbon: (c = '#D3253A', s = 30) => `<svg width="${s}" height="${s * 1.25}" viewBox="0 0 24 30" fill="none"><path d="M12 2c-3.6 0-6.2 2.6-6.2 6 0 3.2 1.6 5.2 3.2 8.2L5 27l4-1.6 3-5 3 5 4 1.6-4-10.8c1.6-3 3.2-5 3.2-8.2C18.2 4.6 15.6 2 12 2z" fill="${c}"/></svg>`,
};

// Estrela/brilho decorativo
const sparkle = (x, y, s = 30, c = '#F1D58F', o = 1) =>
  `<svg style="position:absolute;left:${x}px;top:${y}px;opacity:${o}" width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M12 0c.8 6.5 4.5 10.2 12 12-7.5 1.8-11.2 5.5-12 12-.8-6.5-4.5-10.2-12-12 7.5-1.8 11.2-5.5 12-12z" fill="${c}"/></svg>`;

// Bolinhas (neve / bokeh) com semente determinística
function dots(n, seed, w, h, color = '255,255,255', maxR = 5, minA = .15, maxA = .6) {
  let s = seed, out = '';
  const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < n; i++) {
    const rad = 1 + r() * maxR, a = minA + r() * (maxA - minA);
    out += `<i style="position:absolute;left:${(r() * w).toFixed(0)}px;top:${(r() * h).toFixed(0)}px;width:${rad * 2}px;height:${rad * 2}px;border-radius:50%;background:rgba(${color},${a.toFixed(2)})"></i>`;
  }
  return out;
}

// Bola de Natal (SVG)
const bauble = (x, y, r, c1 = '#F1D58F', c2 = '#B8862B', string = 0) => `
<svg style="position:absolute;left:${x - r}px;top:${y - r - string}px" width="${r * 2}" height="${r * 2 + string}" viewBox="0 0 ${r * 2} ${r * 2 + string}">
  <defs><radialGradient id="g${x}${y}" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fff6d8"/><stop offset=".25" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient></defs>
  ${string ? `<line x1="${r}" y1="0" x2="${r}" y2="${string}" stroke="${c1}" stroke-width="2"/>` : ''}
  <rect x="${r - r * .16}" y="${string - 2}" width="${r * .32}" height="${r * .2}" rx="3" fill="${c2}"/>
  <circle cx="${r}" cy="${string + r}" r="${r}" fill="url(#g${x}${y})"/>
</svg>`;

function page(body, css = '', bodyClass = 'cream') {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>${FONTS}${BASE}${css}</style></head><body class="${bodyClass}">${body}</body></html>`;
}

module.exports = { u, A, page, ICON, sparkle, dots, bauble, FONTS, BASE };
