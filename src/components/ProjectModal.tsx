import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageViewer from './ImageViewer';
import '../styles/components/project-modal.scss';

interface ProjectModalProps {
  project: {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: { id: string; name: string; }[];
    type: string;
    link: string;
    fullDescription?: string;
    features?: string[];
    technologies?: string[];
    images?: string[];
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [mainImgSrc, setMainImgSrc] = useState('');
  const [galleryImgSrcs, setGalleryImgSrcs] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (project) {
      setMainImgSrc(project.image);
      setGalleryImgSrcs(project.images || []);
    }
  }, [project]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
      setSelectedImage(null);
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  const handleImageError = (index?: number) => {
    if (typeof index === 'number') {
      setGalleryImgSrcs(prev => {
        const newSrcs = [...prev];
        newSrcs[index] = '/images/project-placeholder.svg';
        return newSrcs;
      });
    } else {
      setMainImgSrc('/images/project-placeholder.svg');
    }
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="project-modal">
          <motion.div
            className="project-modal__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <div className="project-modal__content" onClick={e => e.stopPropagation()}>
              <button className="project-modal__close" onClick={onClose}>
                <span>&times;</span>
              </button>

              <div className="project-modal__header">
                <div className="project-modal__image-container">
                  <motion.img 
                    src={mainImgSrc} 
                    alt={project.title}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    onError={() => handleImageError()}
                    onClick={() => setSelectedImage(mainImgSrc)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
                <div className="project-modal__title-container">
                  <h2>{project.title}</h2>
                  <div className="project-modal__tags">
                    {project.tags.map(tag => (
                      <span key={tag.id} className="tag">{tag.name}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="project-modal__body">
                <div className="project-modal__description">
                  <h3>О проекте</h3>
                  <p>{project.fullDescription || project.description}</p>
                </div>

                {project.features && (
                  <div className="project-modal__features">
                    <h3>Ключевые особенности</h3>
                    <ul>
                      {project.features.map((feature, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.technologies && (
                  <div className="project-modal__technologies">
                    <h3>Технологии</h3>
                    <div className="technology-list">
                      {project.technologies.map((tech, index) => (
                        <motion.span 
                          key={index}
                          className="technology-item"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}

                {project.images && (
                  <div className="project-modal__gallery">
                    <h3>Галерея</h3>
                    <div className="gallery-grid">
                      {galleryImgSrcs.map((image, index) => (
                        <motion.div 
                          key={index}
                          className="gallery-item"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          onClick={() => setSelectedImage(image)}
                        >
                          <img 
                            src={image} 
                            alt={`${project.title} ${index + 1}`} 
                            onError={() => handleImageError(index)}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <ImageViewer 
        image={selectedImage || ''} 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </AnimatePresence>
  );
};

export default ProjectModal; 