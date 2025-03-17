import { useEffect } from 'react';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Services from '../components/Services';

const Home = () => {
  // Устанавливаем заголовок страницы
  useEffect(() => {
    document.title = 'Code and Note | Фулл-стек разработчик';
  }, []);

  return (
    <main>
      <Hero />
      <Projects />
      <Services />
    </main>
  );
};

export default Home; 