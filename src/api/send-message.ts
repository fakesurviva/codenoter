import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = request.body;

    if (!name || !email || !message) {
      return response.status(400).json({ error: 'Missing required fields' });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return response.status(500).json({ error: 'Bot configuration is missing' });
    }

    const formattedMessage = `
📨 Новое сообщение:
👤 Имя: ${name}
📧 Telegram: ${email}
💬 Сообщение: ${message}
    `.trim();

    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: formattedMessage,
        parse_mode: 'HTML',
      }),
    });

    if (!telegramResponse.ok) {
      throw new Error('Failed to send message to Telegram');
    }

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending message:', error);
    return response.status(500).json({ error: 'Failed to send message' });
  }
} 