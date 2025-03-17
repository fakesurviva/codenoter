import React from 'react';
import { motion } from 'framer-motion';
import '../styles/components/services-page.scss';

const ServicesPageContent = () => {
  return (
    <div className="services-page">
      {/* Фоновые элементы */}
      <div className="services-page__bg">
        <div className="services-page__bg-grid"></div>
        <div className="services-page__bg-glow services-page__bg-glow--1"></div>
        <div className="services-page__bg-glow services-page__bg-glow--2"></div>
      </div>

      <div className="services-page__header">
        <motion.h1 
          className="services-page__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Мои <span className="services-page__title-accent">услуги</span>
        </motion.h1>
        <motion.p 
          className="services-page__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Я предлагаю широкий спектр услуг в области веб-разработки, мобильной разработки и дизайна, 
          чтобы помочь вам реализовать ваши идеи.
        </motion.p>
      </div>

      <div className="services-page__grid">
        <ServiceCard
          icon={<CodeIcon />}
          title="Фронтенд-разработка"
          description="Создание современных, отзывчивых и интерактивных пользовательских интерфейсов с использованием React, TypeScript и GSAP."
          features={['React/Next.js', 'TypeScript', 'GSAP/Framer Motion', 'Адаптивный дизайн']}
          delay={0.3}
        />

        <ServiceCard
          icon={<ServerIcon />}
          title="Бэкенд-разработка"
          description="Разработка надежных и масштабируемых серверных приложений с использованием Node.js, Express и различных баз данных."
          features={['Node.js/Express', 'MongoDB/PostgreSQL', 'REST API', 'GraphQL']}
          delay={0.4}
        />

        <ServiceCard
          icon={<BotIcon />}
          title="Разработка Telegram-ботов"
          description="Создание функциональных ботов для автоматизации бизнес-процессов, обработки заказов и поддержки клиентов."
          features={['Telegram Bot API', 'Интеграция с CRM', 'Платежные системы', 'Аналитика']}
          delay={0.5}
        />

        <ServiceCard
          icon={<DesignIcon />}
          title="Веб-дизайн"
          description="Разработка современных и минималистичных дизайнов с фокусом на пользовательский опыт и конверсию."
          features={['UI/UX дизайн', 'Figma/Adobe XD', 'Прототипирование', 'Дизайн-системы']}
          delay={0.6}
        />

        <ServiceCard
          icon={<SpeedIcon />}
          title="Оптимизация производительности"
          description="Анализ и улучшение скорости загрузки, оптимизация ресурсов и повышение общей производительности веб-приложений."
          features={['Lighthouse аудит', 'Оптимизация изображений', 'Кэширование', 'Lazy loading']}
          delay={0.7}
        />

        <ServiceCard
          icon={<SupportIcon />}
          title="Техническая поддержка"
          description="Обслуживание, обновление и расширение функциональности существующих веб-проектов."
          features={['Мониторинг', 'Исправление ошибок', 'Обновление зависимостей', 'Резервное копирование']}
          delay={0.8}
        />
      </div>
    </div>
  );
};

const ServiceCard = ({ icon, title, description, features, delay }: ServiceCardProps) => {
  return (
    <motion.div
      className="service-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="service-card__icon">{icon}</div>
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__description">{description}</p>
      <ul className="service-card__features">
        {features.map((feature, index) => (
          <li key={index} className="service-card__feature">
            <span className="service-card__feature-bullet"></span>
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

// Иконки компонентов
const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 18L22 12L16 6" />
    <path d="M8 6L2 12L8 18" />
  </svg>
);

const ServerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="8" rx="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" />
  </svg>
);

const BotIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9" y2="9" />
    <line x1="15" y1="9" x2="15" y2="9" />
  </svg>
);

const DesignIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.586 7.586" />
  </svg>
);

const SpeedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);

const SupportIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12" y2="17" />
  </svg>
);

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  delay: number;
}

export default ServicesPageContent; 