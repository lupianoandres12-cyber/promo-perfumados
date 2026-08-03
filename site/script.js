// ============================================================
// LÓGICA DO SITE — não precisa mexer aqui pra trocar produtos,
// nome do site ou links (isso fica em config.js e products-data.js)
// ============================================================

document.getElementById("site-name").textContent = SITE_CONFIG.nome;
document.getElementById("site-tagline").textContent = SITE_CONFIG.tagline;
document.getElementById("disclaimer").textContent = SITE_CONFIG.disclaimer;
document.getElementById("price-note").textContent = SITE_CONFIG.precoInfo;
document.getElementById("legal-note").textContent = SITE_CONFIG.avisoLegal;
document.getElementById("announcement-bar").textContent = SITE_CONFIG.avisoTopo;
document.getElementById("section-title").textContent = SITE_CONFIG.tituloSecao;

// --- Faixa "Siga no Instagram" ---
const instagramHandle = "@" + SITE_CONFIG.instagramLink.replace(/\/$/, "").split("/").pop();
document.getElementById("instagram-handle").textContent = instagramHandle;
document.getElementById("instagram-band-btn").href = SITE_CONFIG.instagramLink;

// --- Captura de origem (qual anúncio/criativo trouxe a pessoa) ---
function getParam(nome) {
  const params = new URLSearchParams(window.location.search);
  return params.get(nome) || "direto";
}
function getCookie(nome) {
  const match = document.cookie.match("(^|;)\\s*" + nome + "\\s*=\\s*([^;]+)");
  return match ? match.pop() : "";
}
const origem = getParam("origem");

// --- Botões flutuantes (WhatsApp / Instagram) ---
const whatsappFab = document.getElementById("whatsapp-fab");
const instagramFab = document.getElementById("instagram-fab");
const whatsappCta = document.getElementById("whatsapp-cta");
const instagramCta = document.getElementById("instagram-cta");
instagramFab.href = SITE_CONFIG.instagramLink;
instagramCta.href = SITE_CONFIG.instagramLink;

whatsappFab.addEventListener("click", function (e) {
  e.preventDefault();
  irParaWhatsapp("botao_flutuante");
});

whatsappCta.addEventListener("click", function (e) {
  e.preventDefault();
  irParaWhatsapp("cta_secao");
});

function irParaWhatsapp(origemClique) {
  const eventId = "ev_" + Date.now() + "_" + Math.random().toString(36).slice(2);

  if (typeof fbq === "function") {
    fbq("track", "Lead", { content_category: origemClique }, { eventID: eventId });
  }

  const params = new URLSearchParams({
    origem: origem + "__" + origemClique,
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc"),
    ua: navigator.userAgent,
    url: window.location.href,
    eid: eventId
  });

  // Dispara o rastreador (planilha + Meta Conversions API) em segundo plano,
  // sem navegar até lá. keepalive garante que a chamada complete mesmo com a
  // página saindo; mode:no-cors porque não precisamos ler a resposta.
  // Importante: NÃO navegamos para a URL do Apps Script — a página que ele
  // retorna vive dentro de um iframe sandboxed do Google que pode bloquear
  // redirecionamento automático (exige clique novo do usuário lá dentro).
  // Redirecionando direto para o link real, esse problema nunca acontece.
  try {
    fetch(SITE_CONFIG.trackerUrl + "?" + params.toString(), { mode: "no-cors", keepalive: true });
  } catch (err) {
    // se o rastreador falhar, o usuário ainda tem que ser redirecionado
  }

  window.location.href = SITE_CONFIG.whatsappLink;
}

// --- Categorias ---
const categorias = ["Todos", ...new Set(PRODUCTS.map(p => p.categoria))];
const categoriesEl = document.getElementById("categories");
let categoriaAtiva = "Todos";
let termoBusca = "";

categorias.forEach(cat => {
  const btn = document.createElement("button");
  btn.className = "category-btn" + (cat === categoriaAtiva ? " active" : "");
  btn.textContent = cat;
  btn.addEventListener("click", () => {
    categoriaAtiva = cat;
    document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderizar();
  });
  categoriesEl.appendChild(btn);
});

// --- Busca ---
document.getElementById("search").addEventListener("input", (e) => {
  termoBusca = e.target.value.trim().toLowerCase();
  renderizar();
});

// --- Grade de produtos ---
const gridEl = document.getElementById("grid");
const resultsCountEl = document.getElementById("results-count");

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function renderizar() {
  const filtrados = PRODUCTS.filter(p => {
    const passaCategoria = categoriaAtiva === "Todos" || p.categoria === categoriaAtiva;
    const passaBusca = !termoBusca ||
      p.nome.toLowerCase().includes(termoBusca) ||
      p.marca.toLowerCase().includes(termoBusca);
    return passaCategoria && passaBusca;
  });

  resultsCountEl.textContent = filtrados.length + " produto" + (filtrados.length !== 1 ? "s" : "");

  gridEl.innerHTML = "";

  if (filtrados.length === 0) {
    gridEl.innerHTML = '<div class="no-results">Nenhum produto encontrado.</div>';
    return;
  }

  filtrados.forEach(p => {
    const card = document.createElement("a");
    card.className = "card";
    card.href = p.link;
    card.target = "_blank";
    card.rel = "noopener sponsored";

    let badge = "";
    let precoOriginalHtml = "";
    if (p.precoOriginal && p.precoOriginal > p.preco) {
      const desconto = Math.round((1 - p.preco / p.precoOriginal) * 100);
      badge = '<div class="card-badge">' + desconto + '% OFF</div>';
      precoOriginalHtml = '<span class="card-price-original">' + formatarPreco(p.precoOriginal) + '</span>';
    }

    card.innerHTML =
      '<div class="card-image-wrap">' +
      '<img src="' + p.imagem + '" alt="' + p.nome + '" loading="lazy">' +
      badge +
      '</div>' +
      '<div class="card-body">' +
      '<div class="card-brand">' + p.marca + '</div>' +
      '<div class="card-name">' + p.nome + '</div>' +
      '<div class="card-price-row">' + precoOriginalHtml +
      '<span class="card-price">' + formatarPreco(p.preco) + '</span>' +
      '</div>' +
      '</div>';
    gridEl.appendChild(card);
  });
}

renderizar();
