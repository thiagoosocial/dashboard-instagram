/* Monta logo, ícones, máscaras, fundo contínuo e chrome (paginação/“arrasta”) */
(function(){
const S=window.BR_SVG;
const logo=()=>`<svg viewBox="${S.logoVB}" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor">${S.logoPaths}</g></svg>`;
const icon=()=>`<svg viewBox="${S.iconVB}" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" fill-rule="nonzero" d="${S.iconD}"/></svg>`;
const solid=()=>`<svg viewBox="${S.iconVB}" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="${S.iconOuterD}"/></svg>`;
const line=(sw)=>`<svg viewBox="${S.iconVB}" xmlns="http://www.w3.org/2000/svg" overflow="visible"><path fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linejoin="round" fill-rule="nonzero" d="${S.iconD}"/></svg>`;
const lineOuter=(sw)=>`<svg viewBox="${S.iconVB}" xmlns="http://www.w3.org/2000/svg" overflow="visible"><path fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linejoin="round" d="${S.iconOuterD}"/></svg>`;
const arrow=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M13 5l7 7-7 7"/></svg>`;
window.BR={logo,icon,solid,line,arrow};

let uid=0;
function photoMask(el){
  const id='pm'+(uid++);
  const src=el.dataset.src, pos=el.dataset.pos||'xMidYMid';
  const stroke=el.dataset.stroke, sw=el.dataset.sw||6;
  const ix=+(el.dataset.ix||0), iy=+(el.dataset.iy||0), iw=+(el.dataset.iw||100), ih=+(el.dataset.ih||100);
  const [x,y,w,h]=S.iconVB.split(' ').map(Number);
  el.classList.add('pm');
  el.innerHTML=`<svg viewBox="${S.iconVB}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
   <defs><clipPath id="${id}"><path d="${S.iconOuterD}"/></clipPath></defs>
   <g clip-path="url(#${id})">
     ${el.dataset.bg?`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${el.dataset.bg}"/>`:''}
     <image href="${src}" x="${x+w*ix/100}" y="${y+h*iy/100}" width="${w*iw/100}" height="${h*ih/100}" preserveAspectRatio="${pos} slice"/>
   </g>
   ${stroke?`<path d="${S.iconOuterD}" fill="none" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/>`:''}</svg>`;
}

function build(){
  document.querySelectorAll('[data-logo]').forEach(e=>e.innerHTML=logo());
  document.querySelectorAll('[data-icon]').forEach(e=>e.innerHTML=icon());
  document.querySelectorAll('[data-icon-solid]').forEach(e=>e.innerHTML=solid());
  document.querySelectorAll('[data-icon-line]').forEach(e=>e.innerHTML=line(e.dataset.sw||3));
  document.querySelectorAll('[data-icon-outer]').forEach(e=>e.innerHTML=lineOuter(e.dataset.sw||3));
  document.querySelectorAll('[data-arrow]').forEach(e=>e.innerHTML=arrow);
  document.querySelectorAll('[data-pm]').forEach(photoMask);
  document.querySelectorAll('[data-wave]').forEach(e=>{ // ondas de áudio
    const n=+e.dataset.wave,h=+(e.dataset.h||100);let out='';
    for(let k=0;k<n;k++){const a=Math.abs(Math.sin(k*.52)*Math.cos(k*.17+1.3))*.75+Math.abs(Math.sin(k*1.9))*.25;
      out+=`<i style="height:${Math.max(.08,a)*h}px;opacity:${.45+.55*a}"></i>`}
    e.innerHTML=out;e.style.cssText+=`display:flex;align-items:center;gap:${e.dataset.gap||9}px;height:${h}px`;
  });

  const slides=[...document.querySelectorAll('.slide')];
  const n=slides.length;
  const tpl=document.getElementById('strip');
  slides.forEach((s,i)=>{
    if(tpl && !s.hasAttribute('data-nostrip')){
      const w=document.createElement('div');w.className='strip';
      w.style.width=(n*1080)+'px';w.style.height='1350px';w.style.left=(-i*1080)+'px';
      w.innerHTML=tpl.innerHTML.replace(/\{N\}/g,n*1080).replace(/\{ICOND\}/g,S.iconD).replace(/\{OUTERD\}/g,S.iconOuterD);
      s.insertBefore(w,s.firstChild);
    }
    if(s.hasAttribute('data-chrome')){
      const top=document.createElement('div');top.className='chrome-top';
      let ticks='';for(let k=0;k<n;k++)ticks+=`<i class="${k===i?'on':''}"></i>`;
      top.innerHTML=`<div class="c-logo">${logo()}</div><div class="pager"><div class="ticks">${ticks}</div><span>${String(i+1).padStart(2,'0')}/${String(n).padStart(2,'0')}</span></div>`;
      s.appendChild(top);
      if(!s.hasAttribute('data-last')){
        const bot=document.createElement('div');bot.className='chrome-bot';
        bot.innerHTML=`<span class="handle">${s.dataset.handle===undefined?'':'<span style="width:34px">'+icon()+'</span>@1bigmedia'}</span><span class="swipe">ARRASTA PARA O LADO<span class="ar">${arrow}</span></span>`;
        s.appendChild(bot);
      }
    }
  });
}
document.addEventListener('DOMContentLoaded',build);
})();
