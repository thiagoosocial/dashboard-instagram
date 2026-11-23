# Modelo OBM "Marca-texto" v3 (design do Leno)

Terceiro formato do perfil, ao lado dos vídeos e dos posts estilo Twitter. Sistema próprio da One Big Media,
inspirado (sem copiar) nos carrosséis de creators/artistas das referências.

## Assinatura do modelo
- **Máscara da marca nas fotos:** a foto é recortada na forma do ícone One Big Media (manual de ID visual, "sombra sólida")
  e ganha um contorno deslocado em neon ou roxo.
- **Marca-texto neon:** a palavra-chave do título vira um bloco `#E2FC51` com texto navy (o "Neon Marker" da marca).
- **Tipografia da marca:** DM Sans (800 nos títulos, 400/700 no corpo).
- **Cabeçalho:** ícone OBM + @reinaldoheleno + tag "YouTube 2027". **Rodapé:** barra de progresso segmentada + chip "Arrasta →"
  (neon cheio na capa, sem chip no último slide, onde entra o logo).
- **Callout:** frase de impacto com barra lateral (neon no escuro, roxa no claro).
- **Blocos:** tabela em colunas com coluna destacada, cards de número gigante, chips de dado, contagem regressiva, selo/sticker.
- **Ritmo:** alterna fundo escuro (navy quase preto com grade de pontos) e claro (cinza da marca). Grafismo: ícone em linha em baixa opacidade.

## Cores (Manual ID Visual 1BMG)
Navy `#142544` · Neon `#E2FC51` · Purple `#8140FA` · Blue `#3157F7` · Azul claro `#79AAF7` · Cinza `#E8E8E9`.
Cor entra só em destaque (marca-texto, números, contornos, callouts).

## Gerar um novo carrossel
Edite os textos/fotos em `build.py` (um slide = uma função `s1`…`s7`, usadas como moldes: capa com foto em máscara,
tabela, texto+foto, chips de dado, números gigantes, citação, contagem regressiva+CTA). Fotos ficam em `assets/refs/`.
`python3 build.py` → `out/slide-XX.png` (1080×1350) e `out/carrossel.pdf`.
