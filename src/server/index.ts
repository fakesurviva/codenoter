import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

interface MessageRequest {
  name: string;
  telegram: string;
  message: string;
}

app.post('/api/send-message', async (req: Request<{}, {}, MessageRequest>, res: Response) => {
  try {
    const { name, telegram, message } = req.body;

    if (!name || !telegram || !message) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error('Missing Telegram configuration');
    }

    // Форматируем сообщение для Telegram
    const telegramMessage = `
🔔 Новая заявка с сайта!

👤 Имя: ${name}
📱 Telegram: ${telegram}

💬 Сообщение:
${message}
    `.trim();

    // Отправляем сообщение через Telegram Bot API
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send Telegram message');
    }

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 