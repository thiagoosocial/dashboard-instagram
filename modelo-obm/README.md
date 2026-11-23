# Modelo "Caderno do Leno" v4 (perfil pessoal)

Terceiro formato do perfil, ao lado dos vídeos e dos posts estilo Twitter. Cara de página de caderno / feed pessoal,
sem elementos institucionais (sem tag, barra de progresso ou selo; logo pequeno só no último slide).

## Assinatura
- **Polaroides** presas com fita, levemente tortas (fotos e prints), em vez de formas/máscaras de marca.
- **Anotações à mão** (Caveat) e rabiscos: círculos em volta dos números, sublinhados, setas, "arrasta →".
- **Marca-texto neon** de verdade nas palavras-chave do título (Bricolage Grotesque 800).
- **Post-its neon** para dados curtos; **folha pautada** para tabela; **balão de fala** com a foto dele na opinião.
- **Cabeçalho pessoal:** foto grande + nome + @ + página escrita à mão ("3/7").
- Alterna **papel** (#F2EEE5) e **fundo escuro** (navy quase preto). Cor da marca só em destaques e rabiscos
  (Neon #E2FC51, Purple #8140FA, Navy #142544).

## Gerar
Edite textos/fotos em `build.py` (um slide = uma função `s1`…`s7`). Fotos em `assets/refs/`, foto dele em `assets/avatar.png`
(use uma foto de rosto maior para a capa/opinião, melhora muito). `python3 build.py` → `out/slide-XX.png` e `out/carrossel.pdf`.
