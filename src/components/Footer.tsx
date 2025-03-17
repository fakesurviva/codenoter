import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/footer.scss';

const Footer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [visitorCount, setVisitorCount] = useState(0);
  
  // Обновление времени каждую секунду
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  // Имитация счетчика посещений (в реальном проекте будет использоваться Firebase)
  useEffect(() => {
    // Получаем текущее значение из localStorage или устанавливаем начальное
    const storedCount = localStorage.getItem('visitorCount');
    const initialCount = storedCount ? parseInt(storedCount, 10) : 0;
    
    // Увеличиваем счетчик на 1 при каждом посещении
    const newCount = initialCount + 1;
    setVisitorCount(newCount);
    
    // Сохраняем новое значение в localStorage
    localStorage.setItem('visitorCount', newCount.toString());
  }, []);
  
  // Форматирование времени в формате HH:MM:SS
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <footer className="footer">
      {/* Фоновые элементы */}
      <div className="footer__bg">
        <div className="footer__bg-grid"></div>
        <div className="footer__bg-border"></div>
      </div>
      
      <div className="container">
        <div className="footer__left">
          <div className="footer__logo">
            <Link to="/">Code and Note</Link>
          </div>
          
          <nav className="footer__nav">
            <ul>
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/about">Обо мне</Link></li>
              <li><Link to="/projects">Проекты</Link></li>
              <li><Link to="/services">Услуги</Link></li>
              <li><Link to="/contact">Контакты</Link></li>
            </ul>
          </nav>
          
          <div className="footer__social">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://t.me/" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm2.692 14.889c.161.115.368.143.553.073.185-.07.322-.228.354-.419.291-1.749 1.001-6.178 1.267-7.798.026-.167-.012-.317-.109-.428-.096-.111-.237-.159-.369-.145-.144.016-2.974.7-3.894.915l-2.561.6c-.2.047-.364.185-.429.373-.065.187-.027.395.095.553.124.157.314.254.521.254.925 0 1.854-.042 2.755-.12l.312-.032c.7.019-.094.096-.275.233-.181.137-2.145 1.602-2.145 1.602-.193.143-.314.366-.327.603-.014.237.086.469.269.63l1.55 1.368c.193.17.452.25.708.217.256-.034.487-.184.626-.406.069-.11.712-1.078.93-1.45.7.004.122-.061.156-.141.034-.08.025-.173-.023-.246-.048-.074-.13-.119-.219-.12-.089-.002-.17.04-.22.112-.152.216-.238.471-.248.734-.01.264.056.525.19.756.134.232.332.425.57.557z"/>
              </svg>
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
          
          <div className="footer__copyright">
            &copy; {currentTime.getFullYear()} Code and Note. Все права защищены.
          </div>
        </div>
        
        <div className="footer__right">
          <div className="footer__terminal">
            <div className="footer__terminal-header">
              <div className="dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="title">terminal</div>
            </div>
            <div className="footer__terminal-content">
              <div className="line">
                <div className="prompt">$</div>
                <div className="command">whoami</div>
              </div>
              <div className="output">full-stack developer</div>
              
              <div className="line">
                <div className="prompt">$</div>
                <div className="command">date</div>
              </div>
              <div className="output">{currentTime.toLocaleDateString('ru-RU')}</div>
              
              <div className="line">
                <div className="prompt">$</div>
                <div className="command">time</div>
              </div>
              <div className="output">{formatTime(currentTime)}</div>
              
              <div className="line">
                <div className="prompt">$</div>
                <div className="command">visitors</div>
              </div>
              <div className="output">{visitorCount}</div>
              
              <div className="line">
                <div className="prompt">$</div>
                <div className="command">_</div>
                <span className="terminal-cursor"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 