module.exports = async (req, res) => {
  const groups = [
    { link: 'https://chat.whatsapp.com/EjSwEchxUqgAQSFlpJ2awn', membrosIniciais: 850, capacidade: 1000 },
    { link: 'https://chat.whatsapp.com/KZUyB03TTF44nLjjhMi6CF', membrosIniciais: 400, capacidade: 1000 },
    { link: 'https://chat.whatsapp.com/Juq9MTjQcVVHwpMnb58q31', membrosIniciais: 0, capacidade: 1000 },
  ];

  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

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

  res.writeHead(302, { Location: target.link });
  res.end();
};
