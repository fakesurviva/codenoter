import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Code from './Code';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Обработчик скролла к секции проектов
  const handleScroll = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero__bg">
        <div className="hero__bg-frame"></div>
        <div className="hero__bg-corners">
          <div className="hero__bg-corners-bottom-left"></div>
          <div className="hero__bg-corners-bottom-right"></div>
        </div>
        <div className="hero__bg-circles"></div>
        <div className="hero__bg-horizon"></div>
        <div className="hero__bg-dots"></div>
      </div>
      
      <div className="hero__content">
        <div className="hero__subtitle">Фулл-стек разработчик</div>
        <h1 className="hero__title">
          Создаю <span className="hero__title-accent">современные</span> и <span className="hero__title-accent">функциональные</span> веб-решения
        </h1>
        <p className="hero__description">
          Специализируюсь на разработке лендингов, многостраничных сайтов и Telegram-ботов.
          Использую современные технологии для создания быстрых, адаптивных и удобных веб-приложений.
        </p>
        
        <div className="hero__tech">
          <div className="hero__tech-item">React</div>
          <div className="hero__tech-item">TypeScript</div>
          <div className="hero__tech-item">Node.js</div>
          <div className="hero__tech-item">GSAP</div>
          <div className="hero__tech-item">Firebase</div>
        </div>
        
        <div className="hero__cta">
          <Link to="/projects" className="btn btn-primary">Мои проекты</Link>
          <Link to="/contact" className="btn">Связаться</Link>
        </div>
      </div>
      
      <div className="hero__scroll-container">
        <div className="hero__scroll" onClick={handleScroll}>
          <span>Прокрутить вниз</span>
          <div className="hero__scroll-arrow"></div>
        </div>
      </div>
      
      {isDesktop && (
        <div className="code-block">
          <div className="code-block__header">
            <div className="code-block__dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="code-block__title">code.tsx</div>
          </div>
          <div className="code-block__content">
            <Code />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero; 