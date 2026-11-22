# Artes Cisos · Dezembro 2026

Formato feed: **1080×1350 px (4:5)** em `png/`. Versão para impressão em `pdf/` (texto vetorial, mesma proporção 4:5; imprima em "ajustar à página").
Cartão do vale: 1600×900 px (16:9); no PDF, reduza para o tamanho do cartão físico (ex.: 9 × 5 cm).

| Data | Arte | Arquivo |
|---|---|---|
| 01/12 a 23/12 | Vale-cuidado de Natal (post) | `vale-cuidado_post-feed` |
| 01/12 a 23/12 | Vale-cuidado de Natal (cartão físico/digital, frente e verso) | `vale-cuidado_cartao-frente`, `-verso`, `..._FRENTE-E-VERSO.pdf` |
| 01/12 | Dia Mundial de Luta contra a Aids (biossegurança) | `01-12_biosseguranca` |
| 03/12 | Dia da Pessoa com Deficiência (acessibilidade) | `03-12_acessibilidade` |
| 05/12 | Dia do Voluntário + Ação Solidária de Natal | `05-12_acao-solidaria` |
| 08/12 | Dia Nacional da Família (check-up + vale) | `08-12_familia` |
| 10/12 | Direitos Humanos (institucional) | `10-12_direitos-humanos` |
| 21/12 | Início do verão (clareamento) | `21-12_verao-clareamento` |
| 21/12 | Carrossel: 4 cuidados na viagem (6 slides) | `21-12_carrossel-viagem_1…6`, `_COMPLETO.pdf` |
| 24/12 | Mensagem de Natal da equipe | `24-12_vespera-de-natal` |
| 25/12 | Feliz Natal / clínica fechada | `25-12_feliz-natal` |
| 31/12 | Retrospectiva + convite 2027 | `31-12_ano-novo-2027` |

Logos recoloridos (fundo transparente) em `assets/`: `logo_laranja`, `logo_marrom`, `logo_branco`, `logo_branco_laranja`.

## Legendas sugeridas

**01/12** Hoje é o Dia Mundial de Luta contra a Aids. Na Cisos, biossegurança é parte de cada atendimento: protocolos rigorosos de esterilização e proteção para você sorrir com tranquilidade. Informação é prevenção: procure uma unidade de saúde para testagem e acompanhamento. #DezembroVermelho

**03/12** Todo sorriso merece ser bem cuidado. No Dia Internacional da Pessoa com Deficiência, reforçamos nosso compromisso com um atendimento acolhedor, respeitoso e adaptado a cada paciente. Tem alguma necessidade específica? Conte para a nossa equipe.

**05/12** No Dia do Voluntário, lançamos a Ação Solidária de Natal: vamos arrecadar kits de higiene bucal (escova, creme e fio dental) para quem mais precisa. Fale com a nossa equipe e participe!

**08/12** No Dia Nacional da Família, que tal cuidar do sorriso de quem você ama antes das férias? Agende o check-up de toda a família e aproveite: o Vale-cuidado de Natal também é um presente para eles.

**10/12** Há 78 anos, a Declaração Universal dos Direitos Humanos reconheceu que toda pessoa merece respeito, cuidado e acesso à saúde. Na Cisos, esse é um compromisso de todos os dias.

**21/12** Começou o verão! Quer chegar às festas e às férias com o sorriso em dia? Agende sua avaliação: o clareamento é indicado após consulta com o dentista.

**21/12 (carrossel)** 4 cuidados para manter o sorriso saudável na viagem. Salve para levar na mala e faça um check-up antes de viajar.

**24/12** Que esta noite seja de paz, amor e gratidão. Obrigado por confiar o seu sorriso a nós ao longo de 2026. Com carinho, equipe Cisos.

**25/12** Feliz Natal! Hoje a clínica está fechada para celebrarmos com quem amamos. Voltamos em breve, com o mesmo carinho de sempre.

**31/12** 2026 foi de muitos sorrisos. Obrigado por fazer parte da nossa história! Vamos começar 2027 com um tratamento planejado? Agende sua avaliação.

**Vale-cuidado** Presente de Natal que cuida: avaliação, limpeza e clareamento em um só vale. Disponível de 01 a 23/12, em cartão físico e digital. Peça o seu na recepção.

## Confirmar antes de publicar
1. **Regras do vale** (validade, serviços, transferência, agendamento): o verso do cartão está em branco para o RT preencher. Ajuste o texto do post se necessário.
2. **Ação Solidária**: confirmei só "kits de higiene bucal". Itens (escova, creme, fio), local e prazo de entrega são sugestões; ajuste se for diferente.
3. **Biossegurança e acessibilidade**: os textos são genéricos e não prometem estruturas específicas (rampa, banheiro adaptado etc.). Se a clínica tiver, vale citar.
4. **24/12 e 25/12**: não citei horários. Se quiser informar o horário do dia 24 (ponto facultativo após 13h) ou a data de retorno, é só dizer.
5. **Publicidade odontológica (CFO)**: evitei antes/depois, preço e promessa de resultado; mantenha isso nas legendas.
6. **Fotos de pessoas** foram geradas por IA (Canva). Na foto de voluntários a caixa tem a palavra "HYGIENE KIT" em inglês, quase coberta pela barra. Se preferir, trocamos por fotos reais da equipe.

## Editar
Os layouts estão em `src/` (HTML gerado por `src/designs.js`). Para regerar: `npm i playwright @fontsource/montserrat @fontsource/playfair-display` e `node src/build.js`.

## Versão 2 (layout "pôster", sem pessoas)
Mesmas 18 artes (vale, 9 datas, 6 slides do carrossel, cartão frente e verso) em outro conceito: moldura, data em destaque, ilustração central em medalhão e texto centralizado. Arquivos com prefixo `v2_` em `v2/png` e `v2/pdf`.

## Ajustes da versão 1
Fotos regeneradas em enquadramento mais aberto (cabeças inteiras) em 01/12, 03/12, 05/12, 08/12 e 21/12 (post e capa do carrossel).
