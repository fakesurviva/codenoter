import { motion } from 'framer-motion';

<section className="about__cta">
  <div className="cta-shape top">
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
      <path d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z" />
    </svg>
  </div>
  
  <div className="container">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="cta-content"
    >
      <motion.div 
        className="cta-glow"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <h3>Готовы начать проект?</h3>
      <p>Давайте обсудим ваши идеи и создадим что-то amazing вместе. Я помогу воплотить ваше видение в реальность.</p>
      
      <div className="cta-actions">
        <motion.div
          className="cta-decoration left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" className="circle-decoration" />
            <path d="M40 60h40" className="line-decoration" />
            <path d="M60 40v40" className="line-decoration" />
          </svg>
        </motion.div>

        <motion.a
          href="/contact"
          className="btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Связаться со мной
        </motion.a>

        <motion.div
          className="cta-decoration right"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" className="circle-decoration" />
            <path d="M60 40l-20 40h40z" className="triangle-decoration" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  </div>

  <div className="cta-shape bottom">
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
      <path d="M0,120 C480,0 960,0 1440,120 L1440,120 L0,120 Z" />
    </svg>
  </div>
</section> 