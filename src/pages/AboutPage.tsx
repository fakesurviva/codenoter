import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import '../styles/pages/about-page.scss';

const AboutPage = () => {
  useEffect(() => {
    document.title = 'Обо мне | Code and Note';
  }, []);

  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  };

  const staggerChildren: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="page about-page">
      <div className="page-header">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="highlight">Обо</span> мне
          </motion.h1>
          <motion.p 
            className="header-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Создаю современные веб-решения, которые помогают бизнесу расти и развиваться
          </motion.p>
        </div>
      </div>

      <section className="about">
        <div className="container">
          <motion.div 
            className="about__content"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <motion.div 
              className="about__intro" 
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <h2>Привет, я веб-разработчик</h2>
              <p>
                Специализируюсь на создании современных веб-приложений с использованием 
                передовых технологий. Мой подход сочетает технические навыки с глубоким 
                пониманием бизнес-потребностей клиентов.
              </p>
            </motion.div>

            <motion.div 
              className="about__stats"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <div className="about__stats-item">
                <div className="number">5+</div>
                <div className="label">Лет опыта</div>
              </div>
              <div className="about__stats-item">
                <div className="number">50+</div>
                <div className="label">Проектов</div>
              </div>
              <div className="about__stats-item">
                <div className="number">30+</div>
                <div className="label">Клиентов</div>
              </div>
              <div className="about__stats-item">
                <div className="number">100%</div>
                <div className="label">Успешных проектов</div>
              </div>
            </motion.div>

            <motion.div 
              className="about__skills" 
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <h3>Мои навыки</h3>
              <div className="skills-grid">
                <div className="skill-card">
                  <div className="skill-card__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>
                    </svg>
                  </div>
                  <h4>Frontend Разработка</h4>
                  <p>React, TypeScript, SCSS</p>
                </div>

                <div className="skill-card">
                  <div className="skill-card__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 16V4H8"/>
                      <path d="M4 20l16-16"/>
                    </svg>
                  </div>
                  <h4>Backend Разработка</h4>
                  <p>Node.js, Express, MongoDB</p>
                </div>

                <div className="skill-card">
                  <div className="skill-card__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                      <line x1="8" y1="21" x2="16" y2="21"/>
                      <line x1="12" y1="17" x2="12" y2="21"/>
                    </svg>
                  </div>
                  <h4>UI/UX Дизайн</h4>
                  <p>Figma, Adobe XD</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="about__services" 
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <h3>Чем я могу помочь</h3>
              <div className="services-grid">
                <div className="service-item">
                  <h4>Разработка веб-приложений</h4>
                  <p>
                    Создание современных, быстрых и масштабируемых веб-приложений 
                    с использованием передовых технологий и лучших практик разработки.
                  </p>
                </div>

                <div className="service-item">
                  <h4>Оптимизация производительности</h4>
                  <p>
                    Анализ и улучшение производительности существующих веб-приложений, 
                    оптимизация загрузки и отзывчивости интерфейса.
                  </p>
                </div>

                <div className="service-item">
                  <h4>Техническое консультирование</h4>
                  <p>
                    Помощь в выборе технологического стека, архитектурные решения 
                    и консультации по лучшим практикам разработки.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="about__timeline" 
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <h3>Мой путь</h3>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-content">
                    <div className="date">2018</div>
                    <h4>Начало пути</h4>
                    <p>Начал изучать веб-разработку и создал свои первые проекты</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-content">
                    <div className="date">2019</div>
                    <h4>Первый опыт работы</h4>
                    <p>Присоединился к команде разработчиков и начал работать над коммерческими проектами</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-content">
                    <div className="date">2020</div>
                    <h4>Рост и развитие</h4>
                    <p>Освоил новые технологии и начал работать над более сложными проектами</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-content">
                    <div className="date">2023</div>
                    <h4>Сегодняшний день</h4>
                    <p>Продолжаю развиваться и помогать клиентам создавать успешные веб-проекты</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="about__cta"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <h3>Готовы начать проект?</h3>
              <p>
                Давайте обсудим ваши идеи и создадим что-то amazing вместе. 
                Я помогу воплотить ваше видение в реальность.
              </p>
              <Link to="/contact" className="btn">
                Связаться со мной
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 