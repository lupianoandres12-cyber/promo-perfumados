/**
 * RASTREADOR PRÓPRIO — Perfume ML
 * ================================
 * Isso substitui o pixel "cru" do navegador por um rastreamento
 * server-side: quando alguém clica pra entrar no WhatsApp, essa
 * função roda no servidor do Google (não no navegador da pessoa),
 * registra o clique numa planilha e avisa o Meta via Conversions API.
 * Isso não pode ser bloqueado por ad blocker, ao contrário do pixel
 * puro no navegador.
 *
 * ============ COMO INSTALAR (uma vez só) ============
 * 1. Crie uma Google Sheet nova (sheets.new)
 * 2. Extensões > Apps Script
 * 3. Apague o código de exemplo e cole este arquivo inteiro
 * 4. Preencha as 4 constantes abaixo (PIXEL_ID, ACCESS_TOKEN, LINK_WHATSAPP, e o nome da aba)
 * 5. Implantar > Nova implantação > tipo "Aplicativo da Web"
 *    - Executar como: Eu
 *    - Quem pode acessar: Qualquer pessoa
 * 6. Copie a URL gerada — essa é a TRACKER_URL que vai na landing page
 *
 * Onde conseguir PIXEL_ID e ACCESS_TOKEN:
 * Meta Events Manager > seu Pixel > Configurações > Conversions API
 * > Gerar token de acesso manualmente
 * ======================================================
 */

const PIXEL_ID = "SEU_PIXEL_ID_AQUI";
const ACCESS_TOKEN = "SEU_ACCESS_TOKEN_AQUI";
const LINK_WHATSAPP = "https://chat.whatsapp.com/KZUyB03TTF44nLjjhMi6CF";
const NOME_ABA = "cliques";

function doGet(e) {
  const params = e.parameter || {};
  const origem = params.origem || "direto";
  const fbp = params.fbp || "";
  const fbc = params.fbc || "";
  const ua = params.ua || "";
  const urlPagina = params.url || "";
  const eventId = params.eid || Utilities.getUuid();

  registrarNaPlanilha(origem, fbp, fbc, ua, urlPagina, eventId);
  enviarParaMeta(origem, fbp, fbc, ua, urlPagina, eventId);

  // XFrameOptionsMode.ALLOWALL é necessário aqui: sem isso, o Apps Script serve
  // a página dentro de um iframe sandboxed do próprio Google, que bloqueia
  // redirecionamento de navegação (meta refresh / window.location) pra fora
  // do domínio do Google. Com ALLOWALL a página é servida direto, sem o iframe,
  // e o redirecionamento funciona normalmente.
  return HtmlService.createHtmlOutput(
    '<html><head><meta http-equiv="refresh" content="0; url=' + LINK_WHATSAPP + '">' +
    '<script>window.location.href=' + JSON.stringify(LINK_WHATSAPP) + ';</script></head>' +
    '<body>Redirecionando...</body></html>'
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function registrarNaPlanilha(origem, fbp, fbc, ua, urlPagina, eventId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let aba = ss.getSheetByName(NOME_ABA);
  if (!aba) {
    aba = ss.insertSheet(NOME_ABA);
    aba.appendRow(["data_hora", "origem", "fbp", "fbc", "user_agent", "url_pagina", "event_id"]);
  }
  aba.appendRow([new Date(), origem, fbp, fbc, ua, urlPagina, eventId]);
}

function enviarParaMeta(origem, fbp, fbc, ua, urlPagina, eventId) {
  if (PIXEL_ID === "SEU_PIXEL_ID_AQUI" || ACCESS_TOKEN === "SEU_ACCESS_TOKEN_AQUI") {
    return; // ainda não configurado — clique só fica registrado na planilha
  }

  const userData = {};
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;
  if (ua) userData.client_user_agent = ua;

  const payload = {
    data: [{
      event_name: "Lead",
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: "website",
      event_source_url: urlPagina,
      user_data: userData,
      custom_data: { content_category: origem }
    }]
  };

  const url = "https://graph.facebook.com/v20.0/" + PIXEL_ID + "/events?access_token=" + ACCESS_TOKEN;

  try {
    UrlFetchApp.fetch(url, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });
  } catch (err) {
    // se der erro, o clique já está salvo na planilha de qualquer forma
  }
}
