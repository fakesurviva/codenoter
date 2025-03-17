import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/components/image-viewer.scss';

interface ImageViewerProps {
  image: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ image, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="image-viewer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <button className="image-viewer__close" onClick={onClose}>
          <span>&times;</span>
        </button>
        
        <div className="image-viewer__content" onClick={e => e.stopPropagation()}>
          <motion.img 
            src={image} 
            alt="Enlarged view"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageViewer; 