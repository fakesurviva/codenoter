import { useState, useRef, FormEvent, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });

  // Обработчик изменения полей формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Валидация в реальном времени
    if (touched[name as keyof typeof touched]) {
      validateField(name as keyof typeof formData, value);
    }
  };

  // Обработчик потери фокуса
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    validateField(name as keyof typeof formData, formData[name as keyof typeof formData]);
  };

  // Валидация отдельного поля
  const validateField = (name: keyof typeof formData, value: string) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Пожалуйста, введите ваше имя';
        } else if (value.trim().length < 2) {
          error = 'Имя должно содержать не менее 2 символов';
        }
        break;
        
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          error = 'Пожалуйста, введите ваш email';
        } else if (!emailRegex.test(value)) {
          error = 'Пожалуйста, введите корректный email';
        }
        break;
        
      case 'subject':
        if (!value.trim()) {
          error = 'Пожалуйста, укажите тему сообщения';
        } else if (value.trim().length < 3) {
          error = 'Тема должна содержать не менее 3 символов';
        }
        break;
        
      case 'message':
        if (!value.trim()) {
          error = 'Пожалуйста, введите ваше сообщение';
        } else if (value.trim().length < 10) {
          error = 'Сообщение должно содержать не менее 10 символов';
        }
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
    
    return !error;
  };

  // Валидация всей формы
  const validateForm = () => {
    let isValid = true;
    
    Object.keys(formData).forEach(key => {
      const field = key as keyof typeof formData;
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
      setTouched(prev => ({
        ...prev,
        [field]: true
      }));
    });
    
    return isValid;
  };

  // Сброс формы
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setErrors({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setTouched({
      name: false,
      email: false,
      subject: false,
      message: false
    });
    setSubmitStatus('idle');
  };

  // Обработчик отправки формы
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing');
      }
      
      if (formRef.current) {
        await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
        setSubmitStatus('success');
        resetForm();
      }
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Автоматическое скрытие сообщений об успехе/ошибке
  useEffect(() => {
    if (submitStatus !== 'idle') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  return (
    <form className="contact-form" ref={formRef} onSubmit={handleSubmit} noValidate>
      <div className="contact-form__group">
        <label htmlFor="name" className="contact-form__label">Имя</label>
        <input
          type="text"
          id="name"
          name="name"
          className={`contact-form__input ${errors.name && touched.name ? 'error' : ''}`}
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          required
        />
        <AnimatePresence>
          {errors.name && touched.name && (
            <motion.div
              className="contact-form__error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {errors.name}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="contact-form__group">
        <label htmlFor="email" className="contact-form__label">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className={`contact-form__input ${errors.email && touched.email ? 'error' : ''}`}
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          required
        />
        <AnimatePresence>
          {errors.email && touched.email && (
            <motion.div
              className="contact-form__error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {errors.email}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="contact-form__group">
        <label htmlFor="subject" className="contact-form__label">Тема</label>
        <input
          type="text"
          id="subject"
          name="subject"
          className={`contact-form__input ${errors.subject && touched.subject ? 'error' : ''}`}
          value={formData.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          required
        />
        <AnimatePresence>
          {errors.subject && touched.subject && (
            <motion.div
              className="contact-form__error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {errors.subject}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="contact-form__group">
        <label htmlFor="message" className="contact-form__label">Сообщение</label>
        <textarea
          id="message"
          name="message"
          className={`contact-form__textarea ${errors.message && touched.message ? 'error' : ''}`}
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={5}
          disabled={isSubmitting}
          required
        ></textarea>
        <AnimatePresence>
          {errors.message && touched.message && (
            <motion.div
              className="contact-form__error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {errors.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <motion.button 
        type="submit" 
        className="contact-form__submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
      </motion.button>
      
      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            className="contact-form__success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            Спасибо! Ваше сообщение успешно отправлено. Я свяжусь с вами в ближайшее время.
          </motion.div>
        )}
        
        {submitStatus === 'error' && (
          <motion.div
            className="contact-form__error-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз или свяжитесь со мной другим способом.
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default ContactForm; 