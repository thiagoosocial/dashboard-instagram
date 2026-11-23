# Modelo OBM Editorial (novo design do Leno)

Terceiro formato do perfil, ao lado dos **vídeos** e dos **posts estilo Twitter**.
Fundo escuro com gradiente da marca, título gigante com palavra em neon, corpo leve com negrito,
frase de impacto em itálico e cards de dado. Feito com a identidade visual da One Big Media.

## Anatomia (1080×1350)
- **Cabeçalho:** foto + @reinaldoheleno com selo azul (esq.) e contador `01/07` em pill neon (dir.).
- **Título:** DM Sans Black, caixa alta, branco, 1 palavra/trecho em Neon `#E2FC51`. 96–150 px.
- **Divisor:** barra neon curta (132×5).
- **Corpo:** DM Sans 400, 32–40 px, trechos-chave em 800. **Frase de impacto:** DM Sans Italic 600 neon.
- **Cards de dado:** vidro translúcido, número gigante em neon + legenda cinza.
- **Fonte:** linha cinza pequena (`Fonte: ...`) abaixo do texto.
- **Rodapé:** selo "powered by" + ícone One Big Media (esq.) e botão-seta (dir.). Na capa o botão é neon preenchido
  com chamada ("Vem conferir"); no último slide entra o logo branco no lugar do botão.
- **Grafismo:** ícone em linha da marca (do manual) em neon/lilás/azul, em ângulo e cortado nas bordas,
  sempre atrás do conteúdo e longe do texto.

## Cores (Manual ID Visual)
Navy `#142544` · Vibrancy Blue `#3157F7` · Bright Purple `#8140FA` · Neon Marker `#E2FC51` · Cinza `#E8E8E9`.
Fundos: `bg-navy` (navy→roxo), `bg-navy2` (navy→azul), `bg-purple` (roxo, para opinião e CTA).

## Tipografia
Manual: Cera Black/Bold (títulos) + DM Sans (corpo). Cera é paga e não está no repositório, então o modelo usa
DM Sans em todos os pesos (fonte secundária oficial). Para usar Cera: coloque os .woff2 em `fonts/` e troque
`font-family` no `CSS` do `build.py`.

## Como gerar um novo carrossel
1. Copie `build.py`, edite a lista `SLIDES` (tipos prontos: `cover`, `table`, `monetiza` (texto + visual),
   `porque` (texto + 3 cards), `regua` (números gigantes), `opiniao`, `cta`). Cada função é um layout reaproveitável.
2. `python3 build.py` → `out/slide-XX.png` e `out/carrossel.pdf`.
