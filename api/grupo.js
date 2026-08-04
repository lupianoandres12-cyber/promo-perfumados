module.exports = async (req, res) => {
  const groups = [
    { link: 'https://chat.whatsapp.com/EjSwEchxUqgAQSFlpJ2awn', membrosIniciais: 850, capacidade: 1000 },
    { link: 'https://chat.whatsapp.com/KZUyB03TTF44nLjjhMi6CF', membrosIniciais: 400, capacidade: 1000 },
    { link: 'https://chat.whatsapp.com/Juq9MTjQcVVHwpMnb58q31', membrosIniciais: 0, capacidade: 1000 },
  ];

  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

  const pixelId = process.env.META_PIXEL_ID;
  const capiToken = process.env.META_CAPI_TOKEN;

  async function kvGetClicks(index) {
    try {
      const r = await fetch(kvUrl + '/get/grupo_' + index + '_clicks', {
        headers: { Authorization: 'Bearer ' + kvToken },
      });
      const data = await r.json();
      return Number(data.result) || 0;
    } catch (e) {
      return 0;
    }
  }

  async function kvIncrClicks(index) {
    try {
      await fetch(kvUrl + '/incr/grupo_' + index + '_clicks', {
        headers: { Authorization: 'Bearer ' + kvToken },
      });
    } catch (e) {}
  }

  async function sendMetaClickEvent(req) {
    if (!pixelId || !capiToken) return;
    try {
      const eventTime = Math.floor(Date.now() / 1000);
      const forwardedFor = req.headers['x-forwarded-for'];
      const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : (req.socket && req.socket.remoteAddress);
      const userAgent = req.headers['user-agent'];
      const url = 'https://graph.facebook.com/v19.0/' + pixelId + '/events?access_token=' + capiToken;
      const body = {
        data: [
          {
            event_name: 'ClickGrupoWhatsApp',
            event_time: eventTime,
            action_source: 'website',
            event_source_url: 'https://promo-perfumados.vercel.app/api/grupo',
            user_data: {
              client_ip_address: clientIp,
              client_user_agent: userAgent,
            },
          },
        ],
      };
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 1500);
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      clearTimeout(timeout);
    } catch (e) {}
  }

  let targetIndex = groups.length - 1;
  let target = groups[targetIndex];

  for (let i = 0; i < groups.length; i++) {
    const clicks = await kvGetClicks(i);
    const estimativa = groups[i].membrosIniciais + clicks;
    if (estimativa < groups[i].capacidade) {
      target = groups[i];
      targetIndex = i;
      break;
    }
  }

  await kvIncrClicks(targetIndex);
  await sendMetaClickEvent(req);

  res.writeHead(302, { Location: target.link });
  res.end();
};
