# Almeida Imports — Next.js + TypeScript

Site institucional da **Almeida Imports**, loja de eletrônicos de Buritis e
Arinos (MG), em **Next.js 16 (App Router) + TypeScript**.

O código nasceu de um site anterior (marca Carmed) e manteve a mesma
arquitetura de seções e animações — o que mudou foi a marca: design system,
tipografia, copy e imagens.

## Rodando

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção
npm run start      # serve o build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

## A marca

Referências: os perfis [@almeidaimportss_](https://www.instagram.com/almeidaimportss_/)
e [@almeidaimports.arinos](https://www.instagram.com/almeidaimports.arinos/), e a
ficha do Google Maps da loja de Buritis.

| | |
| --- | --- |
| Assinatura | Tecnologia que conecta você |
| Cor | Azul elétrico `#1E7BFF` sobre preto `#05070E` — o LED da fachada e o fundo das artes do Instagram |
| Tipografia | **Inter** no texto e nos títulos; **Saira** na assinatura e nos rótulos técnicos (desenho quadrado, como o logo) |
| Lojas | Buritis — Av. Central, 1120 · (38) 99804-0470<br>Arinos — R. Alcides Carneiro, 157, Centro · (38) 99959-7481 |
| Linhas | iPhone, Xiaomi, JBL, Starlink, Apple Watch, acessórios |
| Diferenciais | Aparelho original com garantia, parcelamento no boleto em até 24x, assistência técnica na própria loja |

O lockup **ALMEIDA / IMPORTS** é um componente de texto
(`components/brand/AlmeidaLogo.tsx`), não um bitmap: fica nítido em qualquer
tamanho e acompanha as cores do tema. Se a loja tiver o arquivo vetorial
original do logo, ele pode substituir o componente sem mexer no resto.

## Estrutura

```
src/
├─ app/
│  ├─ layout.tsx           fontes Inter e Saira (next/font), metadata, favicon
│  ├─ page.tsx             composição da página, seção por seção
│  └─ globals.css          importa o design system e as folhas de seção
│
├─ styles/                 CSS dividido em camadas
│  ├─ tokens.css           variáveis: paleta, superfícies, layout, tipografia
│  ├─ reset.css            reset, base do body, scroll-margin das âncoras
│  ├─ scrollbar.css        scrollbar customizada (Firefox + WebKit)
│  ├─ cursor.css           cursor customizado e canvas de faíscas
│  ├─ brand.css            lockup da marca e utilitário .sr-only
│  ├─ ui.css               primitivos: eyebrow, magnet, botões, títulos animados
│  └─ sections/            uma folha por seção da página
│     ├─ top-menu.css
│     ├─ showcase.css
│     ├─ brand-bar.css
│     ├─ almeida-brand.css
│     ├─ catalog.css
│     ├─ numbers.css
│     └─ footer.css
│
├─ components/
│  ├─ brand/               AlmeidaLogo
│  ├─ layout/              TopMenu, SiteFooter
│  ├─ sections/            ShowcaseHero, AlmeidaBrandBar, AlmeidaBrand,
│  │                       Catalog, CatalogCard, Numbers, StatCounter
│  ├─ effects/             CustomCursor, ClickSpark, Magnet, ScrollFloat,
│  │                       ScrollReveal, ShowcaseStageController
│  ├─ providers/           ShowcaseStageProvider (refs partilhadas entre seções)
│  └─ icons/               InstagramIcon, WhatsAppIcon
│
├─ hooks/                  useMagicBento, useShowcaseProductCycle,
│                          useShowcaseBrandHandoff
├─ lib/                    gsap (registro do ScrollTrigger), motion, showcase
├─ data/                   nav, catalog, stats, footer, showcase-products,
│                          brand-pillars
└─ types/                  tipos compartilhados
```

Os assets ficam em `public/assets/` e são referenciados por caminho absoluto
(`/assets/...`).

## Seções da página

| Seção | Componente | O que acontece |
| --- | --- | --- |
| Vitrine | `ShowcaseHero` | Palavra gigante do aparelho, celular no centro, 4 acessórios em órbita, legenda com modelo e cor, CTA magnético para o WhatsApp. Entrada coreografada; clique em qualquer lugar troca o aparelho. |
| Faixa da marca | `AlmeidaBrandBar` | Lockup + assinatura ligando as duas unidades. |
| A loja | `AlmeidaBrand` | Título letra a letra, três pilares empilhados que se abrem no scroll, orbes e aparelho com parallax. |
| Catálogo | `Catalog` | Grid Magic Bento com holofote, borda que acende por proximidade, tilt 3D e onda ao clicar. Cada card leva ao WhatsApp da loja. |
| Em números | `Numbers` | Quatro contadores que animam ao entrar na tela, sobre a malha técnica com brilho azul. |
| Rodapé | `SiteFooter` | Assinatura, catálogo, endereços das duas lojas, redes e linha legal. |

## Decisões de implementação

**GSAP direto no DOM, não via estado React.** As animações medem elementos com
`getBoundingClientRect` e trocam `src` no meio de um timeline. Passar isso por
estado React introduziria um re-render assíncrono no meio da animação. Os
componentes renderizam o estado inicial (bom para SSR) e o GSAP assume dali em
diante — o padrão usual de integração GSAP + React.

**`ShowcaseStageProvider`.** Duas animações atravessam a fronteira das seções: a
troca de aparelho (que espelha o produto ativo no slot da seção da loja) e o
handoff, em que o celular voa do hero até esse slot conforme a página rola. O
provider expõe as refs dos dois lados; o `ShowcaseStageController`, montado ao
fim da página, instala os dois efeitos.

**Cores do aparelho como custom properties.** Cada item de
`data/showcase-products.ts` traz `bg`, `accent` e `wordColor`;
`applyShowcaseProductSizes` escreve tudo em `--showcase-*` na seção. O CSS só
consome as variáveis, então acrescentar um aparelho novo é editar o array —
igual às artes do Instagram, que trocam o fundo junto com a cor do celular.

**Trava de reentrância no `syncBrandProduct`.** O `refreshInit` do ScrollTrigger
dispara a função, que ao fim pedia outro `ScrollTrigger.refresh()` — os dois se
realimentavam e a página ficava remedindo sozinha. Uma flag corta o ciclo.

**`<img>` nativas.** As animações dependem de medir e trocar imagens
imperativamente, o que o wrapper do `next/image` atrapalharia. A regra
`@next/next/no-img-element` está desligada no ESLint com essa justificativa.

**Sem `-webkit-` manual em `backdrop-filter`.** O Lightning CSS (minificador do
Next) gera os prefixos; declarar os dois manualmente fazia ele descartar a
propriedade padrão e o menu perdia o vidro fosco ao rolar.

## Imagens

Os aparelhos são PNGs com fundo transparente, todos no mesmo enquadramento
(frente e verso lado a lado), normalizados para uma tela quadrada:

| Arquivo | Conteúdo | Origem |
| --- | --- | --- |
| `p-iphone-deep-blue.png` | iPhone 17 Pro Deep Blue | `ip17.png`, a referência de estilo |
| `p-iphone-cosmic-orange.png` | iPhone 17 Pro Max Cosmic Orange | render de imprensa |
| `p-redmi-note-14.png` | Redmi Note 14 Pro | render de imprensa |
| `p-iphone-duo.png`, `p-apple-watch.png`, `p-airpods-pro.png` | linha Apple | CDN da Apple |
| `p-jbl-boombox.png` | JBL Boombox 3 | site oficial da JBL |
| `p-starlink.png` | Kit Starlink Standard | site oficial da Starlink |

São imagens de divulgação dos fabricantes. Antes de publicar, vale trocá-las por
fotos dos aparelhos da própria loja — além de evitar qualquer dúvida de uso, é o
que os perfis da Almeida já fazem.
