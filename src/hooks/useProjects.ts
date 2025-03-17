import { useState, useEffect } from 'react';
import projectsData from '../data/projects.json';

export interface Project {
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
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setProjects(projectsData.projects);
      setLoading(false);
    } catch (err) {
      setError('Ошибка при загрузке проектов');
      setLoading(false);
    }
  }, []);

  const getProjectById = (id: string): Project | undefined => {
    return projects.find(project => project.id === id);
  };

  return {
    projects,
    loading,
    error,
    getProjectById
  };
};

export default useProjects; 