import os, json
B=os.path.dirname(os.path.abspath(__file__))
F=B+'/fonts/'
css_fonts=''.join(f"@font-face{{font-family:'Montserrat';font-weight:{w};src:url('file://{F}montserrat-latin-{w}-normal.woff2') format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;}}" for w in (400,600,700,800))

BASE=f"""
{css_fonts}
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:1080px;height:1350px;background:#fff;font-family:'Montserrat',sans-serif;color:#000}}
.slide{{width:1080px;height:1350px;padding:112px 100px 60px 100px;display:flex;flex-direction:column}}
.head{{display:flex;align-items:center;margin-left:-15px;height:104px;flex:none}}
.av{{width:104px;height:104px;border-radius:50%;background:url('file://{B}/img/avatar.png') center/cover;flex:none}}
.who{{margin-left:19px}}
.nm{{font-weight:800;font-size:28px;line-height:34px;display:flex;align-items:center;gap:6px}}
.hd{{font-weight:400;font-size:24px;line-height:30px;color:#4a4a4a;margin-top:2px}}
.txt{{margin-top:48px;font-weight:400;line-height:1.28;letter-spacing:-0.2px;flex:none}}
.txt b{{font-weight:700}}
.txt p{{margin:0}}
.txt .gap{{height:0.9em}}
.img{{flex:1;min-height:0;max-height:440px;margin-top:34px;border-radius:26px;overflow:hidden;position:relative;background:#0b0b10;display:flex;align-items:center;justify-content:center;width:804px}}
.red{{color:#ff2a2a}}
"""
BADGE='<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#1d9bf0"/><path d="M7 12.5l3.2 3.2L17 8.8" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'

def page(n, text, size, visual=''):
    html=f"""<!doctype html><html><head><meta charset="utf-8"><style>{BASE}
.txt{{font-size:{size}px}}</style></head><body><div class="slide">
<div class="head"><div class="av"></div><div class="who"><div class="nm">Reinaldo Heleno {BADGE}</div><div class="hd">@reinaldoheleno</div></div></div>
<div class="txt">{text}</div>
{('<div class="img">'+visual+'</div>') if visual else ''}
</div></body></html>"""
    open(f'{B}/html/s{n:02d}.html','w').write(html)

G='<div class="gap"></div>'
V_STYLE="""<style>
.v{width:100%;height:100%;position:relative;color:#fff;font-family:'Montserrat';display:flex;align-items:center;justify-content:center;
background:radial-gradient(circle at 70% 20%,#3a0a14 0%,#0b0b10 60%)}
.lab{font-size:19px;font-weight:600;color:#c9c9d3}
.card{background:#16161d;border:1.5px solid #2a2a35;border-radius:18px}
</style>"""

# ---------- visuals ----------
play='<svg width="{w}" height="{h}" viewBox="0 0 90 64"><rect width="90" height="64" rx="16" fill="#ff0000"/><path d="M36 17l24 15-24 15z" fill="#fff"/></svg>'
V1=V_STYLE+f"""<div class="v" style="gap:54px;padding:0 50px">
<div style="display:flex;flex-direction:column;align-items:center;gap:18px">{play.format(w=150,h=107)}
<div style="font-size:50px;font-weight:800;letter-spacing:-1px">1.000.000+</div><div class="lab">views</div></div>
<svg width="330" height="220" viewBox="0 0 330 220"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff2a2a" stop-opacity=".45"/><stop offset="1" stop-color="#ff2a2a" stop-opacity="0"/></linearGradient></defs>
<path d="M0 190 L50 170 L100 176 L150 120 L200 128 L250 60 L300 30 L300 220 L0 220Z" fill="url(#g)"/>
<path d="M0 190 L50 170 L100 176 L150 120 L200 128 L250 60 L300 30" stroke="#ff2a2a" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="300" cy="30" r="11" fill="#fff"/></svg></div>"""

def node(t,sub,c):
    return f'<div class="card" style="padding:22px 16px;text-align:center;width:200px;white-space:nowrap;border-color:{c}"><div style="font-size:27px;font-weight:800">{t}</div><div class="lab" style="margin-top:6px">{sub}</div></div>'
arrow='<svg width="44" height="24" style="flex:none"><path d="M2 12h34M26 3l12 9-12 9" stroke="#ff2a2a" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
V2=V_STYLE+f"""<div class="v" style="flex-direction:column;gap:34px">
<div style="display:flex;align-items:center;gap:6px">{node('Seu canal','criador','#2a2a35')}{arrow}{node('Network','a estrutura','#ff2a2a')}{arrow}{node('YouTube','plataforma','#2a2a35')}</div>
<div style="display:flex;gap:14px">{''.join(f'<div class="card" style="padding:12px 24px;font-weight:700;font-size:21px">{x}</div>' for x in ['Suporte','Ferramentas','Dados','Relacionamento'])}</div></div>"""

def chip(t):
    return f'<div class="card" style="display:flex;align-items:center;gap:18px;padding:24px 28px;border-color:#5a1a22"><svg width="40" height="40" viewBox="0 0 40 40" style="flex:none"><path d="M20 4L38 35H2z" fill="#ff2a2a"/><rect x="18" y="14" width="4" height="12" rx="2" fill="#fff"/><circle cx="20" cy="30" r="2.4" fill="#fff"/></svg><span style="font-size:27px;font-weight:700;line-height:1.15">{t}</span></div>'
V3=V_STYLE+f"""<div class="v" style="padding:0 40px"><div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;width:100%">{''.join(chip(t) for t in ['Strike','Queda de alcance','Direitos autorais','Monetização suspensa'])}</div></div>"""

shield='<svg width="190" height="220" viewBox="0 0 190 220"><path d="M95 8L174 38v62c0 55-34 92-79 112C50 192 16 155 16 100V38z" fill="#ff2a2a"/><path d="M60 108l26 26 46-52" stroke="#fff" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
V4=V_STYLE+f"""<div class="v" style="gap:50px;padding:0 40px">{shield}<div style="display:flex;flex-direction:column;gap:16px">{''.join(f'<div class="card" style="padding:16px 28px;font-size:25px;font-weight:700;min-width:340px"><span class="red">●</span>&nbsp; {x}</div>' for x in ['Direitos autorais','Strikes','Reivindicações indevidas'])}</div></div>"""

def bar(l,p,v):
    return f'<div style="width:100%"><div style="display:flex;justify-content:space-between;font-size:23px;font-weight:700;margin-bottom:10px"><span>{l}</span><span class="red">{v}</span></div><div style="height:16px;background:#23232c;border-radius:9px"><div style="width:{p}%;height:100%;background:linear-gradient(90deg,#ff2a2a,#ff7a59);border-radius:9px"></div></div></div>'
V5=V_STYLE+f"""<div class="v" style="padding:0 60px"><div style="display:flex;flex-direction:column;gap:30px;width:100%">{bar('Retenção',78,'78%')}{bar('Origem de tráfego',55,'Busca · Sugeridos')}{bar('Comportamento da audiência',64,'Quem assiste')}</div></div>"""

def step(n,t,c):
    return f'<div class="card" style="padding:22px 12px;text-align:center;width:200px;flex:none;border-color:{c}"><div style="font-size:38px;font-weight:800" class="red">{n}</div><div style="font-size:21px;font-weight:700;margin-top:6px;line-height:1.2">{t}</div></div>'
V6=V_STYLE+f"""<div class="v" style="gap:6px;padding:0 20px">{step('01','YouTube muda toda semana','#2a2a35')}{arrow}{step('02','Network nos treinamentos','#2a2a35')}{arrow}{step('03','Ação no seu canal','#ff2a2a')}</div>"""

V7=V_STYLE+"""<div class="v" style="flex-direction:column;gap:14px;padding:0 50px">
<svg width="700" height="230" viewBox="0 0 700 230"><path d="M0 190 L120 175 L240 160 L360 140 L480 120 L600 100 L700 85" stroke="#6b6b7a" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M0 200 L120 195 L240 170 L360 120 L480 70 L600 38 L700 12" stroke="#ff2a2a" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="700" cy="12" r="10" fill="#fff"/></svg>
<div style="display:flex;gap:34px;font-size:22px;font-weight:700"><span style="color:#9a9aa8">▬ Audiência</span><span class="red">▬ Receita</span></div>
<div style="display:flex;gap:12px;margin-top:6px">"""+''.join(f'<div class="card" style="padding:10px 20px;font-size:19px;font-weight:700">{x}</div>' for x in ['Parcerias','Patrocinadores','Monetização'])+"</div></div>"

def stat(n,t):
    return f'<div class="card" style="padding:26px 24px;text-align:center"><div style="font-size:54px;font-weight:800;letter-spacing:-1px" class="red">{n}</div><div style="font-size:22px;font-weight:700;margin-top:6px;line-height:1.25">{t}</div></div>'
V10=V_STYLE+f"""<div class="v" style="flex-direction:column;gap:22px;padding:24px 36px"><div style="font-size:34px;font-weight:800;letter-spacing:-0.5px">One Big Media</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;width:100%">{stat('8 anos','de mercado')}{stat('300+','canais próprios')}{stat('80+','canais de grupos de mídia parceiros')}{stat('1','gerente dedicado no YouTube')}</div></div>"""

page(1,"Seu canal tem <b>milhões de views.</b>"+G+"Se algo der errado amanhã, <b>quem resolve?</b>",60,V1)
page(2,"<b>Network de YouTube</b> é uma empresa parceira da plataforma que apoia canais com suporte, ferramentas, dados e gestão de relacionamento com o YouTube."+G+"Não é agência. Não é produtora. <b>É a estrutura que fica por trás do canal.</b>",46,V2)
page(3,"A maioria dos criadores só procura uma network <b>quando já tem um problema.</b>"+G+"Strike. Queda de alcance. Direitos autorais. Monetização suspensa."+G+"Essa é a hora <b>mais cara</b> de descobrir que você estava sozinho.",46,V3)
page(4,"<b>Pilar 1: Proteção</b>"+G+"Canal grande é alvo. Direitos autorais, strikes e reivindicações indevidas podem derrubar anos de trabalho em poucos dias."+G+"Com uma network, existe <b>um time que conhece o processo</b> e fala com o YouTube.",46,V4)
page(5,"<b>Pilar 2: Dados e estratégia</b>"+G+"Todo canal tem dados. <b>Poucos sabem lê-los.</b>"+G+"Retenção, origem de tráfego e comportamento da audiência só viram decisão quando alguém interpreta.",48,V5)
page(6,"<b>Pilar 3: Growth e consultoria</b>"+G+"O YouTube muda toda semana. Quem não acompanha cada atualização <b>fica para trás sem perceber.</b>"+G+"Uma network que participa dos treinamentos da plataforma traz a mudança <b>traduzida em ação</b> para o seu canal.",43,V6)
page(7,"<b>Pilar 4: Estratégia comercial</b>"+G+"Crescer em audiência é uma coisa. <b>Crescer em receita é outra.</b>"+G+"Novas parcerias, patrocinadores e formas de monetização exigem estrutura comercial que a maioria dos canais não tem internamente.",43,V7)
page(8,"<b>Minha leitura:</b> quanto maior o canal, menos ele pode se dar ao luxo de operar sozinho."+G+"O criador pequeno erra e recomeça."+G+"<b>O criador grande erra e perde um patrimônio.</b>",64)
page(9,"<b>Como escolher uma network</b>"+G+"Três perguntas antes de assinar com qualquer uma:"+G+"<b>1.</b> Tem relação direta com o YouTube ou só repassa informação?"+G+"<b>2.</b> Gerencia canais próprios, ou só intermedia os dos outros?"+G+"<b>3.</b> A equipe é especialista em YouTube ou em marketing digital em geral?",50)
page(10,"A <b>One Big Media</b> tem 8 anos de mercado, gestão de mais de 300 canais próprios, mais de 80 canais de grupos de mídia parceiros e gerente dedicado no YouTube."+G+"<b>Faça parte da nossa network. Vem com a gente.</b>",44,V10)
