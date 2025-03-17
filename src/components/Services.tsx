import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/components/services.scss';
import { gsap } from 'gsap';

// Данные услуг
const servicesData = [
  {
    id: 1,
    title: 'Фронтенд-разработка',
    description: 'Создание современных, отзывчивых и интерактивных пользовательских интерфейсов с использованием React, TypeScript и GSAP.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    features: ['React/Next.js', 'TypeScript', 'GSAP/Framer Motion', 'Адаптивный дизайн']
  },
  {
    id: 2,
    title: 'Бэкенд-разработка',
    description: 'Разработка надежных и масштабируемых серверных приложений с использованием Node.js, Express и различных баз данных.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
        <line x1="6" y1="6" x2="6.01" y2="6"></line>
        <line x1="6" y1="18" x2="6.01" y2="18"></line>
      </svg>
    ),
    features: ['Node.js/Express', 'MongoDB/PostgreSQL', 'REST API', 'GraphQL']
  },
  {
    id: 3,
    title: 'Разработка Telegram-ботов',
    description: 'Создание функциональных ботов для автоматизации бизнес-процессов, обработки заказов и поддержки клиентов.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 2l-19 19"></path>
        <path d="M21.5 2l-9 9"></path>
        <path d="M3.5 14l5 5"></path>
        <path d="M9.5 8l5 5"></path>
        <path d="M17 4l2 2"></path>
        <path d="M12 19l4-4"></path>
      </svg>
    ),
    features: ['Telegram Bot API', 'Интеграция с CRM', 'Платежные системы', 'Аналитика']
  },
  {
    id: 4,
    title: 'Веб-дизайн',
    description: 'Разработка современных и минималистичных дизайнов с фокусом на пользовательский опыт и конверсию.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="4"></circle>
        <line x1="21.17" y1="8" x2="12" y2="8"></line>
        <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
        <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
      </svg>
    ),
    features: ['UI/UX дизайн', 'Figma/Adobe XD', 'Прототипирование', 'Дизайн-системы']
  },
  {
    id: 5,
    title: 'Оптимизация производительности',
    description: 'Анализ и улучшение скорости загрузки, оптимизация ресурсов и повышение общей производительности веб-приложений.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
    ),
    features: ['Lighthouse аудит', 'Оптимизация изображений', 'Кэширование', 'Lazy loading']
  },
  {
    id: 6,
    title: 'Техническая поддержка',
    description: 'Обслуживание, обновление и расширение функциональности существующих веб-проектов.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="7"></circle>
        <polyline points="12 9 12 12 13.5 13.5"></polyline>
        <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"></path>
      </svg>
    ),
    features: ['Мониторинг', 'Исправление ошибок', 'Обновление зависимостей', 'Резервное копирование']
  }
];

const Services: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Анимация заголовка и карточек услуг с помощью GSAP
  useEffect(() => {
    if (!titleRef.current) return;
    
    gsap.set(titleRef.current, { 
      opacity: 0,
      y: 30
    });
    
    serviceRefs.current.forEach((ref) => {
      if (ref) {
        gsap.set(ref, { 
          opacity: 0,
          y: 50
        });
      }
    });
    
    const observerTitle = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(titleRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out'
            });
            observerTitle.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (titleRef.current) {
      observerTitle.observe(titleRef.current);
    }
    
    const observerServices = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = serviceRefs.current.findIndex(ref => ref === entry.target);
            
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.1,
              ease: 'power3.out'
            });
            
            observerServices.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    serviceRefs.current.forEach((ref) => {
      if (ref) {
        observerServices.observe(ref);
      }
    });
    
    return () => {
      if (titleRef.current) {
        observerTitle.unobserve(titleRef.current);
      }
      
      serviceRefs.current.forEach((ref) => {
        if (ref) {
          observerServices.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    <section className="services">
      <div className="services__blur-left"></div>
      <div className="services__blur-right"></div>
      
      <div className="services__bg">
        <div className="services__bg-glow"></div>
        <div className="services__bg-frame"></div>
        <div className="services__bg-dots"></div>
        <div className="services__bg-horizon"></div>
      </div>

      <div className="services__title">
        <div className="services__title-container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Мои <span className="services__title-accent">услуги</span>
          </motion.h2>
        </div>
      </div>

      <motion.p 
        className="services__subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Я предлагаю широкий спектр услуг в области веб-разработки, мобильной разработки и дизайна, чтобы помочь вам реализовать ваши идеи.
      </motion.p>

      <div className="services__grid">
        {servicesData.map((service, index) => (
          <ServiceCard
            key={service.id}
            icon={service.icon}
            title={service.title}
            description={service.description}
            features={service.features}
            delay={0.3 + index * 0.1}
          />
        ))}
      </div>
    </section>
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

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  delay: number;
}

export default Services; 