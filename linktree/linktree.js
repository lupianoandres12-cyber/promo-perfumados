// ============================================================
// LÓGICA DO LINKTREE — usa o mesmo SITE_CONFIG de ../site/config.js
// ============================================================

document.getElementById("site-name").textContent = SITE_CONFIG.nome;
document.getElementById("legal-note").textContent = SITE_CONFIG.avisoLegal;

document.getElementById("link-site").href = SITE_CONFIG.siteUrl;

function getCookie(nome) {
  const match = document.cookie.match("(^|;)\\s*" + nome + "\\s*=\\s*([^;]+)");
  return match ? match.pop() : "";
}

document.getElementById("link-whatsapp").addEventListener("click", function (e) {
  e.preventDefault();

  const eventId = "ev_" + Date.now() + "_" + Math.random().toString(36).slice(2);

  if (typeof fbq === "function") {
    fbq("track", "Lead", { content_category: "linktree" }, { eventID: eventId });
  }

  const params = new URLSearchParams({
    origem: "linktree",
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc"),
    ua: navigator.userAgent,
    url: window.location.href,
    eid: eventId
  });

  // Mesmo padrão do site: dispara o rastreador em segundo plano (keepalive
  // garante que completa mesmo com a página saindo) e navega direto pro link
  // real do WhatsApp, sem passar pela página sandboxed do Apps Script.
  try {
    fetch(SITE_CONFIG.trackerUrl + "?" + params.toString(), { mode: "no-cors", keepalive: true });
  } catch (err) {
    // se o rastreador falhar, o usuário ainda tem que ser redirecionado
  }

  window.location.href = SITE_CONFIG.whatsappLink;
});
