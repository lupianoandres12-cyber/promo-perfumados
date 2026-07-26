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
    nome: "Perfume Contratipo Amadeirado Intenso 100ml",
    marca: "Genérico",
    preco: 94.90,
    imagem: "https://placehold.co/300x300/f5efe8/b8895f?text=Perfume+2",
    categoria: "Masculino",
    link: "https://www.mercadolivre.com.br/SEU_LINK_AFILIADO_2"
  },
  {
    nome: "Perfume Importado Doce Frutado 75ml",
    marca: "Importado",
    preco: 149.90,
    imagem: "https://placehold.co/300x300/f5efe8/b8895f?text=Perfume+3",
    categoria: "Feminino",
    link: "https://www.mercadolivre.com.br/SEU_LINK_AFILIADO_3"
  },
  {
    nome: "Perfume Importado Amadeirado Especiado 100ml",
    marca: "Importado",
    preco: 179.90,
    imagem: "https://placehold.co/300x300/f5efe8/b8895f?text=Perfume+4",
    categoria: "Masculino",
    link: "https://www.mercadolivre.com.br/SEU_LINK_AFILIADO_4"
  },
  {
    nome: "Perfume Unissex Cítrico Refrescante 100ml",
    marca: "Genérico",
    preco: 79.90,
    imagem: "https://placehold.co/300x300/f5efe8/b8895f?text=Perfume+5",
    categoria: "Unissex",
    link: "https://www.mercadolivre.com.br/SEU_LINK_AFILIADO_5"
  },
  {
    nome: "Kit Perfume + Hidratante Corporal",
    marca: "Genérico",
    preco: 119.90,
    imagem: "https://placehold.co/300x300/f5efe8/b8895f?text=Kit",
    categoria: "Kits",
    link: "https://www.mercadolivre.com.br/SEU_LINK_AFILIADO_6"
  },
  {
    nome: "Perfume Importado Floral Suave 90ml",
    marca: "Importado",
    preco: 159.90,
    imagem: "https://placehold.co/300x300/f5efe8/b8895f?text=Perfume+7",
    categoria: "Feminino",
    link: "https://www.mercadolivre.com.br/SEU_LINK_AFILIADO_7"
  },
  {
    nome: "Perfume Contratipo Couro Amadeirado 100ml",
    marca: "Genérico",
    preco: 99.90,
    imagem: "https://placehold.co/300x300/f5efe8/b8895f?text=Perfume+8",
    categoria: "Masculino",
    link: "https://www.mercadolivre.com.br/SEU_LINK_AFILIADO_8"
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
