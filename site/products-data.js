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
    categoria: "Feminino",
    link: "https://meli.la/2TiohcV"
  },
  {
    nome: "Perfume Liquid Brun French Avenue Eau de Parfum 100ml",
    marca: "French Avenue",
    preco: 298,
    precoOriginal: 399,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_730977-MLA114768510823_072026-O.webp",
    categoria: "Unissex",
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
    nome: "Kit Perfume + Desodorante Antitranspirante",
    marca: "Genérico",
    preco: 89.90,
    imagem: "https://placehold.co/300x300/f5efe8/b8895f?text=Kit+2",
    categoria: "Kits",
    link: "https://www.mercadolivre.com.br/SEU_LINK_AFILIADO_9"
  }
];
