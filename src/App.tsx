import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import Header from './components/Header';
import Footer from './components/Footer';
import SupportChat from './components/SupportChat';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';
import usePageTracking from './hooks/usePageTracking';
import './styles/index.scss';

function App() {
  const location = useLocation();
  
  // Используем хук для отслеживания посещений
  usePageTracking();
  
  // Прокрутка страницы вверх при изменении маршрута
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  // Инициализация GSAP и анимации шума
  useEffect(() => {
    // Добавляем элемент шума
    const noiseElement = document.createElement('div');
    noiseElement.className = 'noise';
    document.body.appendChild(noiseElement);
    
    // Анимация шума
    gsap.to(noiseElement, {
      opacity: 0.03,
      duration: 1,
      ease: 'power1.inOut'
    });
    
    return () => {
      document.body.removeChild(noiseElement);
    };
  }, []);

  return (
    <>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <Footer />
      <SupportChat />
    </>
  );
}

export default App;
