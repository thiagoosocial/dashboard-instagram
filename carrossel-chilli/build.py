"""
Carrossel Chilli Beans — design TWITTER do Leno (Montserrat, post de texto + imagem).
Fotos: coloque photos/s1.jpg ... s8.jpg (Caito Maia / Chilli Beans). Sem foto, o espaço mostra um quadro escuro
com o dado principal do slide. Com foto, o dado vira legenda sobre a imagem.
Uso: python3 build.py -> out/slide-XX.png (1080x1350) e out/carrossel.pdf
"""
import os, subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
F = f"file://{HERE}/fonts/"
AV = f"file://{HERE}/assets/avatar.png"
RED = "#ff2a2a"

fonts = "".join(f"@font-face{{font-family:'Montserrat';font-weight:{w};src:url('{F}montserrat-latin-{w}-normal.woff2') format('woff2');}}" for w in (400, 600, 700, 800))
BASE = fonts + f"""
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:1080px;height:1350px;background:#fff;font-family:'Montserrat',sans-serif;color:#000}}
.slide{{width:1080px;height:1350px;padding:112px 100px 60px 100px;display:flex;flex-direction:column}}
.head{{display:flex;align-items:center;margin-left:-15px;height:104px;flex:none}}
.av{{width:104px;height:104px;border-radius:50%;background:url('{AV}') center/cover;flex:none}}
.who{{margin-left:19px}}
.nm{{font-weight:800;font-size:28px;line-height:34px;display:flex;align-items:center;gap:6px}}
.hd{{font-weight:400;font-size:24px;line-height:30px;color:#4a4a4a;margin-top:2px}}
.txt{{margin-top:48px;font-weight:400;line-height:1.28;letter-spacing:-0.2px;flex:none}}
.txt b{{font-weight:700}} .txt p{{margin:0}} .txt .gap{{height:.9em}}
.src{{font-size:.62em;color:#6b6b6b;margin-top:.7em;line-height:1.3}}
.img{{flex:1;min-height:0;margin-top:34px;border-radius:26px;overflow:hidden;position:relative;background:#0b0b10;width:804px}}
.img .ph{{position:absolute;inset:0;background-size:cover;background-position:center}}
.img .shade{{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.05) 35%,rgba(0,0,0,.78) 100%)}}
.img .slot{{position:absolute;inset:0;background:radial-gradient(circle at 75% 15%,#4a0d14 0,#0b0b10 62%);display:flex;align-items:center;justify-content:center}}
.img .slot span{{position:absolute;top:18px;left:22px;font-size:17px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.35)}}
.fig{{position:absolute;left:0;right:0;bottom:0;padding:22px 30px 24px;color:#fff;display:flex;align-items:flex-end;gap:22px;flex-wrap:nowrap}}
.fig .n{{font-weight:800;letter-spacing:-.03em;line-height:1}}
.fig .n.r{{color:{RED}}}
.fig .t{{font-weight:600;font-size:21px;line-height:1.25;color:rgba(255,255,255,.82);max-width:340px}}
.fig .ar{{font-size:44px;font-weight:800;color:rgba(255,255,255,.5);line-height:1;align-self:center}}
"""
BADGE = '<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#1d9bf0"/><path d="M7 12.5l3.2 3.2L17 8.8" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
G = '<div class="gap"></div>'


def fig(*parts):
    """parts: ('n','R$ 2 bi', 'legenda', red?) ou ('ar',)"""
    out = ""
    for p in parts:
        if p[0] == "ar":
            out += '<div class="ar">→</div>'
        else:
            size = p[3] if len(p) > 3 else 64
            red = " r" if (len(p) > 4 and p[4]) else ""
            out += f'<div><div class="n{red}" style="font-size:{size}px">{p[1]}</div><div class="t" style="margin-top:8px">{p[2]}</div></div>'
    return f'<div class="fig">{out}</div>'


def slide(n, text, size, visual, label):
    photo = os.path.join(HERE, "photos", f"s{n}.jpg")
    if os.path.exists(photo):
        box = f'<div class="ph" style="background-image:url(file://{photo})"></div><div class="shade"></div>{visual}'
    else:
        box = f'<div class="slot"><span>{label}</span></div>{visual}'
    html = f"""<!doctype html><html><head><meta charset="utf-8"><style>{BASE}.txt{{font-size:{size}px}}</style></head><body><div class="slide">
<div class="head"><div class="av"></div><div class="who"><div class="nm">Reinaldo Heleno {BADGE}</div><div class="hd">@reinaldoheleno</div></div></div>
<div class="txt">{text}</div><div class="img">{box}</div></div></body></html>"""
    return html


src = lambda t: f'<div class="src">Fonte: {t}</div>'
S = []
S.append((46, "<b>Anunciou R$ 2 bilhões para 2026. Em outubro, pediu recuperação extrajudicial.</b>" + G +
          "O que a Chilli Beans ensina sobre foco, expansão e o peso das metas públicas." + G +
          '<div style="font-size:.6em;color:#6b6b6b">Arrasta pro lado →</div>',
          fig(("n", "R$ 2 bi", "meta anunciada para 2026", 70), ("ar",), ("n", "Out/2026", "pedido de recuperação extrajudicial", 56, True)), "Foto · Caito Maia"))
S.append((29.5, "A <b>Chilli Beans</b>, fundada por Caito Maia em 1997, é a maior rede de óculos escuros da América Latina, com cerca de <b>900 franquias em 14 países</b>." + G +
          "Em 2019, abriu a primeira ótica. O grau passou de 20% das vendas até 2020 para 50% na pandemia. Em dezembro de 2021, com 7 óticas no início de 2020, anunciou cerca de 850 novas e a <b>meta de R$ 2 bilhões em 2026</b>, o triplo dos R$ 650 milhões estimados para 2021." + src("NeoFeed e Istoé Dinheiro"),
          fig(("n", "900", "franquias em 14 países", 60), ("n", "R$ 650 mi", "estimados para 2021", 44), ("ar",), ("n", "R$ 2 bi", "meta para 2026", 52, True)), "Foto · Chilli Beans"))
S.append((35, "Em 2024, com cerca de 300 óticas, só 10% delas na rua, lançou o <b>Plano 400</b>: abrir 400 óticas de rua até o fim de 2025, com investimento a partir de R$ 190 mil por franquia." + G +
          "As óticas pesavam 30% a 35% do faturamento projetado de R$ 1,4 bilhão. A meta era chegar a <b>50% em quatro anos</b>." + src("Mercado&Consumo"),
          fig(("n", "400", "óticas de rua até o fim de 2025", 70, True), ("n", "R$ 190 mil", "investimento mínimo por franquia", 46), ("n", "30-35% → 50%", "peso das óticas no faturamento", 40)), "Foto · Plano 400"))
S.append((35, "Segundo documentos da emissão de debêntures, a <b>dívida bruta passou de R$ 216 milhões em 2023 para R$ 290 milhões em 2024</b>, alta de cerca de 34%." + G +
          "Em fevereiro de 2025, a holding controladora captou R$ 100 milhões em debêntures, a CDI mais 3,9% ao ano, com <b>Caito Maia como avalista</b>." + src("Times Brasil e NeoFeed"),
          fig(("n", "R$ 216 mi", "dívida bruta em 2023", 44), ("ar",), ("n", "R$ 290 mi", "em 2024 (+34%)", 54, True), ("n", "R$ 100 mi", "debêntures em fev/2025", 40)), "Foto · Caito Maia"))
S.append((35, "As parcelas de julho e agosto de 2026, que somavam <b>R$ 16,5 milhões, não foram pagas</b>. Em 30 de setembro, a Vert declarou o vencimento antecipado de cerca de <b>R$ 89 milhões</b>." + G +
          "Em 2 de outubro, os credores suspenderam os efeitos da cobrança até 26 de outubro para buscar um acordo." + src("NeoFeed e Exame"),
          fig(("n", "R$ 16,5 mi", "parcelas não pagas (jul e ago/2026)", 50), ("ar",), ("n", "R$ 89 mi", "vencimento antecipado, 30/09", 54, True)), "Foto · Chilli Beans"))
S.append((28.5, "Em 30 de outubro, a Chilli Beans pediu <b>recuperação extrajudicial</b> para renegociar <b>R$ 340 milhões</b> em dívidas bancárias. O plano prevê aporte de até R$ 50 milhões, financiado pelos credores (Itaú, Akron e Vega). Fornecedores e funcionários ficam fora. O acordo ainda depende da Justiça." + G +
          "A versão da empresa: juros altos e inadimplência da rede franqueada, que, segundo Caito Maia, foi de cerca de 3% para cerca de 22% no pós-pandemia e hoje está perto de 4%." + src("Exame, Central do Varejo e NeoFeed"),
          fig(("n", "R$ 340 mi", "dívidas bancárias a renegociar", 48, True), ("n", "3% → 22% → 4%", "inadimplência da rede, segundo Caito", 34)), "Foto · Caito Maia"))
S.append((29.5, "<b>Foco não é fazer uma coisa só.</b> É escolher a fronteira que a empresa consegue financiar e operar. O pico da pandemia, em que o grau foi de 20% a 50% das vendas, virou premissa de um plano de cinco anos. <b>Dado extraordinário é sinal, só vira tese quando se repete.</b>" + G +
          "E <b>meta pública vira compromisso</b>. Quando o CEO anuncia R$ 2 bilhões, o número passa a pesar para franqueados, equipe, credores e mercado. Em expansão por franquia, <b>a saúde do franqueado é a saúde do caixa</b>.",
          fig(("n", "Sinal ≠ tese", "dado extraordinário só vira tese quando se repete", 44), ("n", "Meta pública", "pesa para franqueados, equipe, credores e mercado", 44, True)), "Foto · Caito Maia"))
S.append((40, "A pergunta do CEO vale para qualquer setor, inclusive mídia e creator economy: <b>o que está crescendo é margem ou só tamanho?</b>" + G +
          "<b>Compartilhe com o sócio que está fechando o planejamento de 2027.</b> Envie para quem decide com você.",
          fig(("n", "Margem", "ou", 66, True), ("n", "Tamanho?", "o que está crescendo?", 66)), "Foto · Caito Maia"))


def main():
    out = os.path.join(HERE, "out"); tmp = os.path.join(out, "_html")
    os.makedirs(tmp, exist_ok=True)
    for i, (size, text, vis, label) in enumerate(S, 1):
        open(f"{tmp}/s{i:02d}.html", "w").write(slide(i, text, size, vis, label))
    env = {**os.environ, "NODE_PATH": subprocess.check_output(["npm", "root", "-g"]).decode().strip()}
    subprocess.check_call(["node", os.path.join(HERE, "shot.js"), tmp, out], env=env)
    from PIL import Image
    ims = [Image.open(f"{out}/slide-{i:02d}.png").convert("RGB") for i in range(1, len(S) + 1)]
    ims[0].save(f"{out}/carrossel.pdf", save_all=True, append_images=ims[1:], resolution=150)


if __name__ == "__main__":
    main()
