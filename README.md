# Code and Note - Портфолио фулл-стек разработчика

Профессиональный многостраничный веб-сайт-портфолио для фулл-стек разработчика с акцентом на лендинги, многостраничные сайты и Telegram-ботов.

## Технологии

- **Frontend**: React.js + TypeScript, GSAP, Three.js, Sass, Vite
- **Backend**: Firebase для аналитики, EmailJS для отправки сообщений
- **Дизайн**: Строгий черно-белый минимализм с анимациями

## Особенности

- Адаптивный дизайн для всех устройств
- Анимации с использованием GSAP
- Параллакс-эффект с использованием Three.js
- Интерактивный терминал в футере
- Форма обратной связи с валидацией
- Счетчик посещений с использованием Firebase Analytics

## Структура проекта

```
src/
├── assets/         # Статические ресурсы (изображения, шрифты)
├── components/     # React-компоненты
├── context/        # React Context API
├── hooks/          # Пользовательские хуки
├── pages/          # Страницы приложения
├── services/       # Сервисы (Firebase, API)
├── styles/         # SCSS стили
└── utils/          # Вспомогательные функции
```

## Установка и запуск

1. Клонируйте репозиторий:
```bash
git clone https://github.com/yourusername/codenoter.git
cd codenoter
```

2. Установите зависимости:
```bash
npm install
```

3. Настройте Firebase:
   - Создайте проект в [Firebase Console](https://console.firebase.google.com/)
   - Получите конфигурацию Firebase
   - Обновите файл `src/services/firebase.ts` с вашими данными

4. Настройте EmailJS:
   - Зарегистрируйтесь на [EmailJS](https://www.emailjs.com/)
   - Создайте сервис и шаблон
   - Обновите ID сервиса, шаблона и публичный ключ в `src/components/ContactForm.tsx`

5. Запустите проект в режиме разработки:
```bash
npm run dev
```

6. Для сборки проекта:
```bash
npm run build
```

## Деплой

Проект готов к деплою на Vercel, Netlify или другие платформы:

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

## Кастомизация

### Изменение контента
- Данные проектов: `src/components/Projects.tsx`
- Данные услуг: `src/components/Services.tsx`
- Контактная информация: `src/components/Contact.tsx`

### Изменение стилей
- Цветовая схема и переменные: `src/styles/variables.scss`
- Глобальные стили: `src/styles/global.scss`
- Компонентные стили: `src/styles/components/`

## Лицензия

MIT
