// ============================================================
// CONFIGURAÇÃO DO SITE — Promo Perfumados
// Troque os valores abaixo. Nada de estrutura precisa mexer.
// ============================================================

const SITE_CONFIG = {
  nome: "Promo Perfumados",
  tagline: "Os melhores preços de perfume, tudo num lugar só",

  // Link do grupo/canal do WhatsApp (o real, quando tiver).
  // Os cliques passam pelo rastreador (tracker) antes de chegar aqui,
  // então NÃO precisa ser o link direto — o rastreador já redireciona.
  whatsappLink: "https://chat.whatsapp.com/KZUyB03TTF44nLjjhMi6CF",

  instagramLink: "https://www.instagram.com/promosperfumados/",

  // Faixa fina no topo do site, tipo aviso/promo (inspirado em lojas de e-commerce).
  avisoTopo: "🔥 Promoções novas toda semana — direto do Mercado Livre",

  // Título centralizado que aparece acima da grade de produtos.
  tituloSecao: "Nossos Perfumes",

  // URL pública do site (essa vitrine), depois de publicada em algum hosting
  // (Netlify, GitHub Pages etc). Usada pelo linktree (landing-page/linktree/).
  siteUrl: "/site/",

  // URL do Apps Script (landing-page/tracker/Codigo.gs) implantado como Web App.
  // Mesma URL usada em pixel-preview.html.
  trackerUrl: "https://script.google.com/macros/s/AKfycbzkKT_hZZEN6S5FrQlPDiwYesRiy2IjllA7qn82Wg09hh3xtySV0CIVJbZN1koi4VQe/exec",

  // Pixel ID do Meta (Events Manager > Fontes de dados > Pixel)
  metaPixelId: "SEU_PIXEL_ID_AQUI",

  // Linha de destaque logo abaixo da grade — escrita como CTA/aviso de urgência,
  // não como texto legal (isso fica em avisoLegal, bem discreto).
  disclaimer: "As promoções relâmpago saem primeiro no grupo e no Instagram — não fica de fora.",

  // Aviso de afiliado — mantido por transparência, mas discreto (fonte bem pequena).
  avisoLegal: "Este site contém links de afiliado do Mercado Livre. Preços podem ter mudado — confira o valor final antes de comprar.",

  // Aviso sobre variação de preço, mostrado perto da grade de produtos
  // (os preços são checados 1x por dia, mas podem mudar entre uma checagem e outra).
  precoInfo: "Os preços são atualizados diariamente, mas podem variar devido a promoções relâmpago do Mercado Livre — confira o valor final na página do produto antes de comprar."
};
