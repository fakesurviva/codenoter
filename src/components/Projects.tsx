import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useProjects, { Project } from '../hooks/useProjects';
import ProjectModal from './ProjectModal';
import ProjectCard from './ProjectCard';
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
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            image={project.image}
            tags={project.tags}
            index={index}
            onClick={() => handleProjectClick(project)}
          />
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