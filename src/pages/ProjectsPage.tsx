import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Projects from '../components/Projects';
import '../styles/pages/projects-page.scss';

const ProjectsPage = () => {
  // Устанавливаем заголовок страницы
  useEffect(() => {
    document.title = 'Проекты | Code and Note';
  }, []);

  return (
    <div className="page projects-page">
      <div className="section-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>
              <span className="highlight">Портфолио</span> проектов
            </h1>
            <p>
              Исследуйте коллекцию моих работ в области веб-разработки, где каждый проект — это уникальное решение современных задач
            </p>
          </motion.div>
        </div>
      </div>
      <Projects />
    </div>
  );
};

export default ProjectsPage; 