import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ContactForm from './ContactForm';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  // Анимация элементов с помощью GSAP
  useEffect(() => {
    if (!titleRef.current || !contentRef.current || !infoRef.current) return;
    
    gsap.set([titleRef.current, contentRef.current, infoRef.current], { 
      opacity: 0,
      y: 30
    });
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = gsap.timeline();
            
            tl.to(titleRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out'
            })
            .to(contentRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out'
            }, '-=0.6')
            .to(infoRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out'
            }, '-=0.6');
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="contact section" id="contact" ref={sectionRef}>
      <div className="container">
        <h2 className="contact__title text-center" ref={titleRef}>Связаться со мной</h2>
        
        <div className="contact__content">
          <div className="contact__form" ref={contentRef}>
            <ContactForm />
          </div>
          
          <div className="contact__info" ref={infoRef}>
            <div className="contact__info-item">
              <div className="contact__info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className="contact__info-text">
                <h3>Email</h3>
                <a href="mailto:fakesurvival12@gmail.com">fakesurvival12@gmail.com</a>
              </div>
            </div>
            
            <div className="contact__info-item">
              <div className="contact__info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="contact__info-text">
                <h3>Телефон</h3>
                <a href="tel:+79001234567">+7 (900) 123-45-67</a>
              </div>
            </div>
            
            <div className="contact__info-item">
              <div className="contact__info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className="contact__info-text">
                <h3>Адрес</h3>
                <p>Москва, Россия</p>
              </div>
            </div>
            
            <div className="contact__social">
              <a href="https://t.me/codenoter" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm2.692 14.889c.161.115.368.143.553.073.185-.07.322-.228.354-.419.291-1.749 1.001-6.178 1.267-7.798.026-.167-.012-.317-.109-.428-.096-.111-.237-.159-.369-.145-.144.016-2.974.7-3.894.915l-2.561.6c-.2.047-.364.185-.429.373-.065.187-.027.395.095.553.124.157.314.254.521.254.925 0 1.854-.042 2.755-.12l.312-.032c.7.019-.094.096-.275.233-.181.137-2.145 1.602-2.145 1.602-.193.143-.314.366-.327.603-.014.237.086.469.269.63l1.55 1.368c.193.17.452.25.708.217.256-.034.487-.184.626-.406.069-.11.712-1.078.93-1.45.7.004.122-.061.156-.141.034-.08.025-.173-.023-.246-.048-.074-.13-.119-.219-.12-.089-.002-.17.04-.22.112-.152.216-.238.471-.248.734-.01.264.056.525.19.756.134.232.332.425.57.557z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 