import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: Array<{ id: string; name: string }>;
  link: string;
  index: number;
  onClick: () => void;
}

const ProjectCard = ({ title, description, tags, image, link, index, onClick }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick();
  };

  return (
    <div className="project-card hover-lift" ref={cardRef} onClick={handleClick}>
      <div className="project-card__image">
        <img 
          src={image} 
          alt={title} 
          loading="lazy"
        />
      </div>
      
      <div className="project-card__content">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__description">{description}</p>
        
        <div className="project-card__tags">
          {tags.map((tag) => (
            <span key={tag.id} className="tag">{tag.name}</span>
          ))}
        </div>

        <button className="project-card__button">
          Подробнее
        </button>
      </div>
    </div>
  );
};

export default ProjectCard; 