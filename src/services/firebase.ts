import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';

// Конфигурация Firebase
// Замените на свои реальные данные
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Функция для отслеживания посещений страниц
export const trackPageView = (pagePath: string, pageTitle: string) => {
  logEvent(analytics, 'page_view', {
    page_path: pagePath,
    page_title: pageTitle
  });
};

// Функция для отслеживания событий
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  logEvent(analytics, eventName, eventParams);
};

export { app, analytics }; 