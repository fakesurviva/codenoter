import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/components/contact-page.scss';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    telegram: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    document.title = 'Контакты | Code and Note';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.telegram,
          message: formData.message
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке сообщения');
      }

      setStatus({
        type: 'success',
        message: 'Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.'
      });
      setFormData({ name: '', telegram: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="contact-page">
      {/* Фоновые элементы */}
      <div className="contact-page__bg">
        <div className="contact-page__bg-grid"></div>
        <div className="contact-page__bg-glow contact-page__bg-glow--1"></div>
        <div className="contact-page__bg-glow contact-page__bg-glow--2"></div>
        <div className="contact-page__bg-noise"></div>
      </div>

      <div className="contact-page__content">
        <div className="contact-page__header">
          <motion.h1 
            className="contact-page__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="contact-page__title-accent">Свяжитесь</span> со мной
          </motion.h1>
          <motion.p 
            className="contact-page__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Готов обсудить ваш проект и предложить оптимальное решение для вашего бизнеса
          </motion.p>
        </div>

        <div className="contact-page__grid">
          <div className="contact-page__info">
            <h2 className="contact-page__info-title">Контактная информация</h2>
            <p className="contact-page__info-text">
              Вы можете связаться со мной любым удобным способом. Я всегда открыт для новых проектов, 
              идей и возможностей сотрудничества.
            </p>

            <ul className="contact-page__links">
              <li className="contact-page__links-item">
                <a href="mailto:fakesurvival12@gmail.com" className="contact-page__links-link">
                  <EmailIcon className="contact-page__links-icon" />
                  <span className="contact-page__links-text">fakesurvival12@gmail.com</span>
                </a>
              </li>
              <li className="contact-page__links-item">
                <a href="https://t.me/codenoter" className="contact-page__links-link" target="_blank" rel="noopener noreferrer">
                  <TelegramIcon className="contact-page__links-icon" />
                  <span className="contact-page__links-text">@codenoter</span>
                </a>
              </li>
            </ul>
          </div>

          <motion.div 
            className="contact-page__form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="contact-page__form-title">Отправить сообщение</h2>
            <form onSubmit={handleSubmit}>
              <div className="contact-page__form-group">
                <label htmlFor="name" className="contact-page__form-label">Имя</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="contact-page__form-input" 
                  placeholder="Ваше имя"
                  required
                />
              </div>
              <div className="contact-page__form-group">
                <label htmlFor="telegram" className="contact-page__form-label">Telegram</label>
                <input 
                  type="text" 
                  id="telegram"
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleChange}
                  className="contact-page__form-input" 
                  placeholder="@ваш_телеграм"
                  required
                />
              </div>
              <div className="contact-page__form-group">
                <label htmlFor="message" className="contact-page__form-label">Сообщение</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="contact-page__form-textarea" 
                  placeholder="Опишите ваш проект или идею"
                  required
                ></textarea>
              </div>
              {status.message && (
                <div className={`contact-page__form-status contact-page__form-status--${status.type}`}>
                  {status.message}
                </div>
              )}
              <div className="contact-page__form-group">
                <button 
                  type="submit" 
                  className="contact-page__form-button"
                  disabled={isLoading}
                >
                  {isLoading ? 'Отправка...' : 'Отправить сообщение'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Иконки
const EmailIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21.5 4.5L2.5 10.5 9.5 12.5 16.5 8.5 11.5 14.5 17.5 19.5 21.5 4.5Z"></path>
  </svg>
);

export default ContactPage; 