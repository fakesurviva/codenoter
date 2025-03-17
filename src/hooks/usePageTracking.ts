import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../services/firebase';

/**
 * Хук для отслеживания посещений страниц с помощью Firebase Analytics
 */
const usePageTracking = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Получаем заголовок страницы
    const pageTitle = document.title;
    
    // Отслеживаем посещение страницы
    trackPageView(location.pathname, pageTitle);
    
    // Также можно добавить дополнительную логику, например,
    // отслеживание времени, проведенного на странице
  }, [location]);
};

export default usePageTracking; 