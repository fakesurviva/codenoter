import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  index: number;
}

const ProjectCard = ({ title, description, tags, image, link, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgSrc, setImgSrc] = useState(image);
  
  // Анимация появления карточки с помощью GSAP
  useEffect(() => {
    if (!cardRef.current) return;
    
    gsap.set(cardRef.current, { 
      opacity: 0,
      y: 50
    });
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(cardRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.1,
              ease: 'power3.out'
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(cardRef.current);
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);

  const handleImageError = () => {
    setImgSrc('/images/project-placeholder.svg');
  };

  return (
    <div className="project-card hover-lift" ref={cardRef}>
      <a href={link} target="_blank" rel="noopener noreferrer" className="project-card__link">
        <div className="project-card__image">
          <img 
            src={imgSrc} 
            alt={title} 
            loading="lazy" 
            onError={handleImageError}
          />
        </div>
        
        <div className="project-card__content">
          <h3 className="project-card__title">{title}</h3>
          <p className="project-card__description">{description}</p>
          
          <div className="project-card__tags">
            {tags.map((tag, i) => (
              <span key={i} className="project-card__tag">{tag}</span>
            ))}
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProjectCard; 