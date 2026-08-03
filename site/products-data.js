// ============================================================
// PRODUTOS — troque pelos perfumes reais do Mercado Livre.
// Cada item precisa de: nome, marca, preco, imagem, categoria, link (afiliado).
// precoOriginal é opcional — se preenchido, mostra o preço riscado e o % OFF.
// As imagens placehold.co são placeholder; produtos reais usam a imagem do
// próprio anúncio do Mercado Livre.
// ============================================================

const PRODUCTS = [
  {
    nome: "Perfume Lattafa Asad 100ml Eau De Parfum Original Árabe",
    marca: "Lattafa",
    preco: 167.20,
    precoOriginal: 289.99,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_828592-MLB85561391893_062025-O.webp",
    categoria: "Masculino",
    link: "https://meli.la/2PbtsRn"
  },
  {
    nome: "Perfume Jean Paul Gaultier Le Beau Eau de Toilette 125ml Masculino",
    marca: "Jean Paul Gaultier",
    preco: 477.63,
    precoOriginal: 729,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_928871-MLA100387480541_122025-O.webp",
    categoria: "Masculino",
    link: "https://meli.la/1kj1wee"
  },
  {
    nome: "Kit 2x Perfumes Colônia Miniatura Cebolinha Turma Da Mônica Jequiti 25ml",
    marca: "Jequiti",
    preco: 39.90,
    precoOriginal: 70,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_991788-MLU79118018725_092024-O.webp",
    categoria: "Kits",
    link: "https://meli.la/1a2MStx"
  },
  {
    nome: "Club 6 Voyage Eudora Deo Colônia 95ml",
    marca: "Eudora",
    preco: 100.05,
    precoOriginal: 199,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_938312-MLA91937050310_092025-O.webp",
    categoria: "Masculino",
    link: "https://meli.la/2TiohcV"
  },
  {
    nome: "Perfume Liquid Brun French Avenue Eau de Parfum 100ml",
    marca: "French Avenue",
    preco: 298,
    precoOriginal: 399,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_730977-MLA114768510823_072026-O.webp",
    categoria: "Masculino",
    link: "https://meli.la/1ErqNJe"
  },
  {
    nome: "Body Splash Masculino Barbarius 200ml",
    marca: "Primacial",
    preco: 33.05,
    precoOriginal: 69.90,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_678849-MLA88887060350_082025-O.webp",
    categoria: "Masculino",
    link: "https://meli.la/1Q4UQyU"
  },
  {
    nome: "Perfume Rabanne 1 Million Eau de Toilette 200ml Masculino",
    marca: "Rabanne",
    preco: 541.49,
    precoOriginal: 1028,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_727987-MLA94570272613_102025-O.webp",
    categoria: "Masculino",
    link: "https://meli.la/11CVYgN"
  },
  {
    nome: "Perfume Masculino Árabe Salvo Eau de Parfum Alhambra 100ml Original",
    marca: "Maison Alhambra",
    preco: 155.12,
    precoOriginal: 277.90,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_863228-MLB90084898734_082025-O-perfume-masculino-arabe-salvo-eua-de-parfum-alhmabra-100ml-original-c-nf.webp",
    categoria: "Masculino",
    link: "https://meli.la/1NsUsMR"
  },
  {
    nome: "Perfume Rabanne Phantom Eau de Toilette 100ml Masculino",
    marca: "Rabanne",
    preco: 572.14,
    precoOriginal: 769,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_723681-MLA72822029202_112023-O.webp",
    categoria: "Masculino",
    link: "https://meli.la/2PibxcH"
  },
  {
    nome: "Perfume Árabe Lattafa Fakhar Gold Extrait Eau de Parfum 100ml",
    marca: "Lattafa",
    preco: 150.82,
    precoOriginal: 229.90,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_733502-MLA109315971804_042026-O.webp",
    categoria: "Masculino",
    link: "https://meli.la/2XKxiJw"
  },
  {
    nome: "Perfume Calvin Klein CK One 200ml",
    marca: "Calvin Klein",
    preco: 258.19,
    precoOriginal: 699,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_664018-MLA84852950065_052025-O.webp",
    categoria: "Masculino",
    link: "https://meli.la/1pdRVAi"
  },
  {
    nome: "Perfume Árabe Musamam White Intense Eau de Parfum 100ml Original Lipx",
    marca: "Lattafa",
    preco: 277.73,
    precoOriginal: 397.90,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_973277-MLA108710760415_032026-O.webp",
    categoria: "Masculino",
    link: "https://meli.la/2WwC7Fe"
  },
  {
    nome: "Essencial Atrai Deo Parfum Masculino 100ml",
    marca: "Natura",
    preco: 135,
    precoOriginal: 157.90,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_631357-MLA87101490476_072025-O.webp",
    categoria: "Masculino",
    link: "https://meli.la/1mwLN8L"
  },
  {
    nome: "Perfume Armaf Club De Nuit Intense 105ml EDT",
    marca: "Armaf",
    preco: 222.69,
    precoOriginal: 399.90,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_701465-MLA109483577626_042026-O.webp",
    categoria: "Masculino",
    link: "https://meli.la/1LKZRFg"
  },
  {
    nome: "Perfume Árabe Maktub La Vie Bidaya Eau de Parfum 100ml",
    marca: "Bidaya",
    preco: 199.20,
    precoOriginal: 349.90,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_743031-MLA96399378979_102025-O.webp",
    categoria: "Masculino",
    link: "https://meli.la/2AtHGxm"
  },
  {
    nome: "Effervescent Perfume Lab 8 Niche 100ml",
    marca: "Lab 8",
    preco: 179.42,
    precoOriginal: 218.80,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_606063-MLA106576635141_022026-O.webp",
    categoria: "Masculino",
    link: "https://meli.la/1aC8zTy"
  },
  {
    nome: "Perfume Árabe Attar Al Wesal Gold EDP Masculino 100ml Com NF",
    marca: "Al Wataniah",
    preco: 223.24,
    precoOriginal: 234.99,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_843463-MLA111347632558_052026-O-perfume-arabe-attar-al-wesal-gold-edp-masculino-100ml-com-nf.webp",
    categoria: "Masculino",
    link: "https://meli.la/2T3HsEa"
  },
  {
    nome: "Perfume Khadlaj Shiyaaka Shadow Eau de Parfum 100ml",
    marca: "Khadlaj",
    preco: 255,
    precoOriginal: 399.90,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_987260-MLA91289573871_082025-O.webp",
    categoria: "Masculino",
    link: "https://meli.la/1izXviv"
  },
  {
    nome: "Perfume Maison Alhambra Sceptre Bronzite EDP 100ml",
    marca: "Maison Alhambra",
    preco: 168.90,
    precoOriginal: 290.73,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_958094-MLA86753698300_072025-O.webp",
    categoria: "Masculino",
    link: "https://meli.la/2askJSg"
  }
];
