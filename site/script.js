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
document.getElementById("hero-title").textContent = SITE_CONFIG.heroTitulo;
document.getElementById("hero-subtitle").textContent = SITE_CONFIG.heroSubtitulo;
document.getElementById("hero-btn").textContent = SITE_CONFIG.heroBotao;
document.getElementById("hero-stat").textContent = "✨ " + PRODUCTS.length + " perfumes com desconto agora";

// --- Hero: carrossel de fotos com crossfade (nossos próprios produtos,
// já que não temos vídeo próprio — dá o efeito de "algo passando" sem
// depender de material de terceiros) ---
(function montarHeroSlides() {
  const heroSlidesEl = document.getElementById("hero-slides");
  const imagens = PRODUCTS.filter((_, i) => i % 3 === 0).slice(0, 6).map(p => p.imagem);
  if (imagens.length === 0) return;

  imagens.forEach((src, i) => {
    const slide = document.createElement("div");
    slide.className = "hero-slide" + (i === 0 ? " active" : "");
    slide.style.backgroundImage = "url('" + src + "')";
    heroSlidesEl.appendChild(slide);
  });

  if (imagens.length > 1) {
    let indiceAtual = 0;
    setInterval(() => {
      const slides = heroSlidesEl.querySelectorAll(".hero-slide");
      slides[indiceAtual].classList.remove("active");
      indiceAtual = (indiceAtual + 1) % slides.length;
      slides[indiceAtual].classList.add("active");
    }, 4000);
  }
})();

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
  btn.addEventListener("click", () => {
    categoriaAtiva = cat;
    document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderizar();
  });

  const circle = document.createElement("span");
  circle.className = "category-circle";
  if (cat === "Todos") {
    circle.classList.add("category-circle-all");
    circle.textContent = "✨";
  } else {
    const amostra = PRODUCTS.find(p => p.categoria === cat);
    if (amostra) circle.style.backgroundImage = "url('" + amostra.imagem + "')";
  }

  const label = document.createElement("span");
  label.className = "category-label";
  label.textContent = cat;

  btn.appendChild(circle);
  btn.appendChild(label);
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

  observarCards();
}

// --- Cards aparecem com fade suave conforme entram na tela ---
const cardObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 })
  : null;

function observarCards() {
  if (!cardObserver) {
    // navegador sem suporte a IntersectionObserver: mostra tudo direto
    document.querySelectorAll(".card").forEach(card => card.classList.add("in-view"));
    return;
  }
  document.querySelectorAll(".card:not(.in-view)").forEach(card => cardObserver.observe(card));
}

renderizar();
