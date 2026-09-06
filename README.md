# Carmed by Solid Tech — Next.js + TypeScript

Port do site Carmed (originalmente um `index.html` único com CSS e JS embutidos)
para **Next.js 16 (App Router) + TypeScript**, dividido em seções, com paridade
visual e de animação com o original.

## Rodando

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção
npm run start      # serve o build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

## Estrutura

```
src/
├─ app/
│  ├─ layout.tsx           fonte Poppins (next/font), metadata, favicon
│  ├─ page.tsx             composição da página, seção por seção
│  └─ globals.css          importa o design system e as folhas de seção
│
├─ styles/                 CSS dividido em camadas
│  ├─ tokens.css           variáveis: paleta, superfícies, layout, tipografia
│  ├─ reset.css            reset, base do body, grain, scroll-margin das âncoras
│  ├─ scrollbar.css        scrollbar customizada (Firefox + WebKit)
│  ├─ cursor.css           cursor customizado e canvas de faíscas
│  ├─ ui.css               primitivos: eyebrow, magnet, botões, títulos animados
│  └─ sections/            uma folha por seção da página
│     ├─ top-menu.css
│     ├─ carmed-fini.css
│     ├─ brand-bar.css
│     ├─ carmed-brand.css
│     ├─ team.css
│     ├─ numbers.css
│     ├─ footer.css
│     └─ fini-hero-legacy.css   (estilos do hero antigo, sem DOM correspondente)
│
├─ components/
│  ├─ layout/              TopMenu, SiteFooter
│  ├─ sections/            CarmedFiniHero, CarmedBrandBar, CarmedBrand,
│  │                       Team, TeamCard, Numbers, StatCounter
│  ├─ effects/             CustomCursor, ClickSpark, Magnet, ScrollFloat,
│  │                       ScrollReveal, FiniStageController
│  ├─ providers/           FiniStageProvider (refs partilhadas entre seções)
│  └─ icons/               InstagramIcon
│
├─ hooks/                  useMagicBento, useFiniFlavorCycle, useFiniBrandHandoff
├─ lib/                    gsap (registro do ScrollTrigger), motion, fini
├─ data/                   nav, team, stats, footer, fini-flavors, brand-pillars
└─ types/                  tipos compartilhados
```

Os assets ficam em `public/assets/` e são referenciados por caminho absoluto
(`/assets/...`).

## Seções da página

| Seção | Componente | O que acontece |
| --- | --- | --- |
| Vitrine Fini | `CarmedFiniHero` | Palavra gigante do sabor, produto central, 4 doces em órbita, CTA magnético. Entrada coreografada; clique em qualquer lugar troca o sabor. |
| Faixa da marca | `CarmedBrandBar` | Logo + assinatura ligando Carmed ao Grupo Cimed. |
| A marca | `CarmedBrand` | Título letra a letra, três pilares empilhados que se abrem no scroll, orbes e produto com parallax. |
| O time | `Team` | Grid Magic Bento com holofote, borda que acende por proximidade, tilt 3D e onda ao clicar. |
| Em números | `Numbers` | Quatro contadores que animam ao entrar na tela, sobre a foto da fábrica. |
| Rodapé | `SiteFooter` | Assinatura, colunas de navegação e linha legal. |

## Decisões de implementação

**GSAP direto no DOM, não via estado React.** As animações medem elementos com
`getBoundingClientRect` e trocam `src` no meio de um timeline. Passar isso por
estado React introduziria um re-render assíncrono no meio da animação. Os
componentes renderizam o estado inicial (bom para SSR) e o GSAP assume dali em
diante — o padrão usual de integração GSAP + React.

**`FiniStageProvider`.** Duas animações atravessam a fronteira das seções: a
troca de sabor (que espelha o produto ativo no slot da seção da marca) e o
handoff, em que o produto voa do hero até esse slot conforme a página rola. O
provider expõe as refs dos dois lados; o `FiniStageController`, montado ao fim
da página, instala os dois efeitos.

**`<img>` nativas.** As animações dependem de medir e trocar imagens
imperativamente, o que o wrapper do `next/image` atrapalharia. A regra
`@next/next/no-img-element` está desligada no ESLint com essa justificativa.

**Sem `-webkit-` manual em `backdrop-filter`.** O Lightning CSS (minificador do
Next) gera os prefixos; declarar os dois manualmente fazia ele descartar a
propriedade padrão e o menu perdia o vidro fosco ao rolar.

**Tipografia via `next/font`.** Poppins é servida self-hosted e exposta como
`--font-poppins`; o design system usa `--font-sans` em cima dela.

## Paridade com o original

Verificado em Chrome headless a 1440×900 e 390×844, comparando com o
`index.html` original servido em paralelo:

- altura total da página idêntica (4722 px desktop, 7080 px mobile);
- altura de cada seção idêntica ao subpixel;
- ciclo dos três sabores idêntico (cor, palavra, produto, doce, custom
  properties de tamanho e espelhamento no slot da marca);
- contadores, grid do time, rodapé e handoff do produto conferidos posição a
  posição;
- diferença de pixels ≤ 0,33% nas capturas, restrita a anti-aliasing de texto e
  à fase das animações CSS infinitas no instante da captura;
- nenhum erro de console em dev ou produção.
