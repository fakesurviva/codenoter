import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useProjects, { Project } from '../hooks/useProjects';
import ProjectModal from './ProjectModal';
import '../styles/components/projects.scss';
import '../styles/components/project-card.scss';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { projects } = useProjects();

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <section className="projects">
      <motion.div
        className="projects__grid"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="project-card"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleProjectClick(project)}
          >
            <div className="project-card__image">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="project-card__content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-card__tags">
                {project.tags.map((tag) => (
                  <span key={tag.id} className="tag">
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={true}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default Projects; 