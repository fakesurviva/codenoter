import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/components/header.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Обработчик скролла для изменения стиля хедера
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Закрытие меню при изменении маршрута
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Блокировка скролла при открытом мобильном меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Проверка активного пункта меню
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header__logo">
          <Link to="/">Code and Note</Link>
        </div>
        
        <nav className={`header__nav ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <Link 
                to="/" 
                className={isActive('/') ? 'active' : ''}
              >
                Главная
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={isActive('/about') ? 'active' : ''}
              >
                Обо мне
              </Link>
            </li>
            <li>
              <Link 
                to="/projects" 
                className={isActive('/projects') ? 'active' : ''}
              >
                Проекты
              </Link>
            </li>
            <li>
              <Link 
                to="/services" 
                className={isActive('/services') ? 'active' : ''}
              >
                Услуги
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={isActive('/contact') ? 'active' : ''}
              >
                Контакты
              </Link>
            </li>
          </ul>
        </nav>
        
        <div 
          className={`header__burger ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Меню"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsMenuOpen(!isMenuOpen);
            }
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Header; 