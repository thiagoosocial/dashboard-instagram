import os
B=os.path.dirname(os.path.abspath(__file__))
src=open(B+'/build.py').read().split('# ---------- visuals')[0].replace("/html/s{n:02d}.html","/html2/s{n:02d}.html")
src=src.replace("__file__","'"+B+"/build.py'")
exec(src)
# allow auto-height image
def page2(n,text,size,visual='',auto=False):
    page(n,text,size,visual)
    if auto:
        p=f'{B}/html2/s{n:02d}.html'; h=open(p).read().replace('</style>','.img{flex:none!important;max-height:none!important;height:auto!important;background:#000}</style>',1); open(p,'w').write(h)

card='<div class="card" style="{st}">{c}</div>'
def c(st,inner): return f'<div class="card" style="{st}">{inner}</div>'
ARR='<svg width="44" height="24" style="flex:none"><path d="M2 12h34M26 3l12 9-12 9" stroke="#ff2a2a" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'

# 1 – queda de valor de mercado
V1=V_STYLE+"""<div class="v" style="flex-direction:column;gap:6px;padding:20px 50px">
<div class="lab" style="letter-spacing:2px">NVIDIA · VALOR DE MERCADO · EM UM DIA</div>
<div style="font-size:92px;font-weight:800;letter-spacing:-3px;color:#ff2a2a;line-height:1.05">−US$ 193 bi</div>
<svg width="640" height="150" viewBox="0 0 640 150"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff2a2a" stop-opacity=".4"/><stop offset="1" stop-color="#ff2a2a" stop-opacity="0"/></linearGradient></defs>
<path d="M0 20 L90 14 L180 26 L270 18 L360 30 L450 24 L520 40 L560 120 L640 130 L640 150 L0 150Z" fill="url(#g)"/>
<path d="M0 20 L90 14 L180 26 L270 18 L360 30 L450 24 L520 40 L560 120 L640 130" stroke="#ff2a2a" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="640" cy="130" r="9" fill="#fff"/></svg></div>"""
# 2 – ficha
def st(n,t): return c('padding:20px 12px;text-align:center;flex:1',f'<div class="red" style="font-size:44px;font-weight:800;letter-spacing:-1px">{n}</div><div style="font-size:19px;font-weight:700;margin-top:4px;line-height:1.2">{t}</div>')
V2=V_STYLE+f"""<div class="v" style="flex-direction:column;gap:14px;padding:16px 28px"><div style="font-size:26px;font-weight:800">Jensen Huang</div>
<div style="display:flex;gap:12px;width:100%">{st('63','anos')}{st('1993','cofundou a Nvidia')}{st('33','anos como único CEO')}</div></div>"""
# 3 – linha do tempo
def tn(d,t,hot=False): return f'<div style="flex:1;text-align:center"><div style="width:26px;height:26px;border-radius:50%;background:{"#ff2a2a" if hot else "#fff"};margin:0 auto 12px"></div><div class="red" style="font-size:34px;font-weight:800">{d}</div><div style="font-size:18px;font-weight:700;margin-top:4px;line-height:1.25">{t}</div></div>'
V3=V_STYLE+f"""<div class="v" style="flex-direction:column;padding:20px 30px"><div style="position:relative;width:100%"><div style="position:absolute;left:16%;right:16%;top:12px;height:4px;background:#3a3a46"></div>
<div style="display:flex;gap:10px;position:relative">{tn('10/11','Wachtell Lipton contratada')}{tn('11/11','Novos relatos: 2º relacionamento')}{tn('12/11','Huang deixa o comando',True)}</div></div></div>"""
# 4 – reação
def col(h,big,sub): return c('padding:18px 10px;text-align:center;flex:1',f'<div class="lab" style="letter-spacing:1.5px;font-size:16px">{h}</div><div style="font-size:30px;font-weight:800;margin:8px 0 4px" class="red">{big}</div><div style="font-size:16px;font-weight:700;line-height:1.25">{sub}</div>')
V4=V_STYLE+f"""<div class="v" style="gap:12px;padding:20px 26px">{col('MERCADO','−US$ 193 bi','em um dia (9/11)')}{col('EQUIPE','Menos engajado','nos últimos dias')}{col('GOVERNO','Explicações','parlamentares querem ouvi-lo')}</div>"""
# 5 – diligência
def pill(t): return f'<div class="card" style="padding:14px 22px;font-size:24px;font-weight:700">{t}</div>'
V5=V_STYLE+f"""<div class="v" style="flex-direction:column;gap:16px;padding:20px 30px"><div class="lab" style="letter-spacing:2px">DILIGÊNCIA = DEVER DE CUIDADO</div>
<div style="display:flex;gap:12px;align-items:center">{pill('Conduta')}<span class="red" style="font-size:34px;font-weight:800">+</span>{pill('Discernimento')}<span class="red" style="font-size:34px;font-weight:800">+</span>{pill('Atenção aos riscos')}</div>
<div class="card" style="padding:12px 24px;font-size:20px;font-weight:700;border-color:#ff2a2a">Previsto na Lei das S.A. para administradores</div></div>"""
# 7 – espelho
V7=V_STYLE+f"""<div class="v" style="flex-direction:column;gap:20px;padding:20px 30px"><div style="display:flex;align-items:center;gap:12px">
{c('padding:22px 20px;text-align:center;width:300px','<div style="font-size:28px;font-weight:800">CEO</div><div class="lab" style="margin-top:4px">da empresa</div>')}<span class="red" style="font-size:40px;font-weight:800">=</span>
{c('padding:22px 20px;text-align:center;width:340px;border-color:#ff2a2a','<div style="font-size:28px;font-weight:800">Criador</div><div class="lab" style="margin-top:4px">CEO do próprio canal</div>')}</div>
<div style="display:flex;gap:12px">{''.join(pill(x) for x in ['Imagem','Decisões','Relação com marcas'])}</div></div>"""
V8=f'<img src="file://{B}/img/oneprofile.png" style="width:100%;display:block">'


def photo(f,pos,overlay=''):
    return f"""<div style="position:absolute;inset:0;background:url('file://{B}/img/{f}') {pos}/cover"></div>{overlay}"""
GRAD='<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 45%,rgba(0,0,0,.82) 100%)"></div>'
def badge(big,small): return f'<div style="position:absolute;left:30px;bottom:26px;color:#fff;font-family:Montserrat"><div style="font-size:60px;font-weight:800;letter-spacing:-2px;color:#ff3b3b;line-height:1">{big}</div><div style="font-size:20px;font-weight:700;margin-top:6px">{small}</div></div>'
V1=photo('jensen1.png','center 22%',GRAD+badge('−US$ 193 bi','valor de mercado da Nvidia em um dia'))
def sx(n,t): return f'<div><div style="font-size:42px;font-weight:800;color:#ff3b3b;line-height:1">{n}</div><div style="font-size:17px;font-weight:700;margin-top:4px">{t}</div></div>'
V2=photo('jensen2.png','center 20%',GRAD+f'<div style="position:absolute;left:30px;right:30px;bottom:24px;color:#fff;font-family:Montserrat;display:flex;gap:44px">{sx("63","anos")}{sx("1993","cofundou a Nvidia")}{sx("33 anos","como único CEO")}</div>')
V4=photo('nvidia.png','center 55%','<div style="position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,0) 50%,rgba(0,0,0,.8) 100%)"></div>'+badge('−US$ 193 bi','em um dia · 9/11 · Forbes').replace('bottom:26px','top:24px'))

page2(1,"Um dos <b>CEOs mais poderosos do mundo</b> deixou o cargo."+G+"E em um único dia, depois que o conselho abriu uma investigação sobre ele, a Nvidia perdeu <b>US$ 193 bilhões</b> em valor de mercado."+G+"<b>Isso é o peso de um CEO.</b>",46,V1)
page2(2,"<b>Jensen Huang</b>, 63 anos, cofundou a Nvidia em 1993 e foi seu único CEO em 33 anos."+G+"Em 8 de novembro, o conselho abriu uma <b>investigação independente</b> após reportagens de que ele teria sido alvo de uma operação de inteligência estrangeira. No mesmo dia, Huang admitiu em e-mail aos funcionários um relacionamento extraconjugal."+G+"A mulher é executiva de uma empresa parceira da Nvidia em Singapura e, segundo autoridades americanas, é apontada como ligada à inteligência chinesa.",34,V2)
page2(3,"<b>10/11:</b> a Nvidia contrata o escritório Wachtell, Lipton, Rosen & Katz para conduzir a investigação."+G+"<b>11/11:</b> novos relatos apontam um segundo relacionamento, com uma executiva da própria Nvidia que se reportava a ele."+G+"<b>12/11:</b> Huang deixa o comando da empresa. A diretora financeira, Colette Kress, assume como CEO interina."+G+"Huang negou ter comprometido a segurança nacional ou segredos da Nvidia.",38,V3)
page2(4,"<b>A reação mostra o peso do cargo</b>"+G+"<b>Mercado:</b> a Nvidia perdeu US$ 193 bilhões em valor de mercado em um dia, em 9/11, segundo a Forbes."+G+"<b>Equipe:</b> segundo a Bloomberg, funcionários notaram Huang menos engajado nos últimos dias. Ele era conhecido pela atenção a detalhes, da arquitetura dos chips à remuneração dos funcionários mais juniores."+G+"<b>Governo:</b> parlamentares americanos pediram explicações e querem ouvi-lo.",34,V4)
page2(5,"<b>O que é diligência</b>"+G+"É o dever de cuidado de quem lidera: conduta, discernimento e atenção aos riscos que podem atingir a empresa. No Brasil, é um dever previsto na <b>Lei das S.A.</b> para os administradores."+G+"Segundo a Bloomberg, as revelações levantaram questionamentos sérios sobre o discernimento de Huang."+G+"O conselho reagiu com uma investigação independente. <b>É a diligência de quem fiscaliza.</b>",36,V5)
V6=photo('jensen1.png','center 30%',GRAD+'<div style="position:absolute;left:30px;right:30px;bottom:26px;color:#fff;font-family:Montserrat;font-size:30px;font-weight:700;line-height:1.25">“Uma vida inteira de sacrifício”<div style="font-size:18px;font-weight:600;color:#d0d0d8;margin-top:8px">Jensen Huang, em 2025, sobre o papel de CEO</div></div>')
page2(6,"<b>Minha leitura:</b> o CEO não é só o cargo mais alto. É o ponto onde convergem a <b>confiança do mercado, da equipe e dos parceiros.</b>"+G+"Por isso o cargo exige mais do que resultado. Exige <b>conduta, discernimento e responsabilidade</b> o tempo todo."+G+"Em 2025, o próprio Huang definia o papel como “uma vida inteira de sacrifício”. <b>Quando quem lidera vira a notícia, a empresa inteira passa a ser avaliada pelo que ele faz.</b>",36,V6)
page2(7,"<b>O espelho no mercado de creators</b>"+G+"Todo negócio tem alguém que carrega essa responsabilidade."+G+"No mercado de creators, <b>o criador é o CEO do próprio canal.</b> A imagem, as decisões e a relação com as marcas passam por ele."+G+"Quanto maior o canal, maior o peso do que o criador faz e decide.",40,V7)
page2(8,"Quem lidera um canal grande <b>carrega o peso de um CEO.</b>"+G+"A <b>One Big Media</b> ajuda canais com audiência a profissionalizar a operação, com dados, estratégia de crescimento e gestão comercial, para que quem lidera decida com mais informação."+G+"<b>Faça parte da nossa network. Vem com a gente.</b>",42,V8,auto=True)
