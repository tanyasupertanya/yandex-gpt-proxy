export default async function handler(req, res) {
  const { prompt } = req.body;

  const response = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Api-Key ${process.env.YANDEX_API_KEY}`,
      'x-folder-id': process.env.YANDEX_FOLDER_ID
    },
    body: JSON.stringify({
      modelUri: `gpt://${process.env.YANDEX_FOLDER_ID}/yandexgpt/latest`,
      completionOptions: {
        stream: false,
        temperature: 0.7,
        maxTokens: 150
      },
      messages: [
        {
          role: 'user',
          text: prompt || 'Привет! Кто ты?'
        }
      ]
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
