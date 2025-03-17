import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdClose, IoMdChatboxes } from 'react-icons/io';
import { FiSend } from 'react-icons/fi';
import '../styles/components/support-chat.scss';

// Типы сообщений
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Заготовленные ответы на частые вопросы
const commonQuestions = [
  {
    question: 'Как с вами связаться?',
    answer: 'Вы можете связаться со мной через email или социальные сети, указанные в разделе контактов. Я стараюсь отвечать в течение 24 часов.'
  },
  {
    question: 'Какие технологии вы используете?',
    answer: 'Я работаю с современным стеком технологий, включая React, TypeScript, Node.js, Next.js, GSAP, Three.js и другие. Полный список можно найти в разделе навыков.'
  },
  {
    question: 'Вы работаете над коммерческими проектами?',
    answer: 'Да, я принимаю заказы на коммерческие проекты. Давайте обсудим ваши требования и возможности сотрудничества. Я могу предложить полный цикл разработки: от проектирования до поддержки.'
  },
  {
    question: 'Сколько стоят ваши услуги?',
    answer: 'Стоимость зависит от сложности и объема проекта. Я предлагаю гибкую систему ценообразования и индивидуальный подход к каждому клиенту. Давайте обсудим ваш проект, и я предоставлю детальную оценку.'
  },
  {
    question: 'Какие сроки выполнения проектов?',
    answer: 'Сроки разработки зависят от сложности проекта и требований. Обычно небольшие проекты занимают 2-4 недели, средние 1-2 месяца. Точные сроки определяются после детального обсуждения проекта.'
  },
  {
    question: 'Предоставляете ли вы техническую поддержку?',
    answer: 'Да, я предоставляю техническую поддержку и сопровождение проектов после запуска. Это включает исправление багов, обновление функционала и консультации по работе с системой.'
  },
  {
    question: 'Какой у вас опыт работы?',
    answer: 'У меня более 5 лет опыта в веб-разработке. За это время я успешно реализовал множество проектов различной сложности: от небольших сайтов до крупных веб-приложений. Примеры работ можно посмотреть в разделе проектов.'
  },
  {
    question: 'Можете ли вы доработать существующий проект?',
    answer: 'Да, я работаю как с новыми проектами, так и с доработкой существующих. Сначала я проведу аудит кода и предложу оптимальное решение для улучшения или расширения функционала.'
  }
];

const SupportChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: 'Привет! Я готов ответить на ваши вопросы. Чем могу помочь?',
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findAnswer = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    const match = commonQuestions.find(q => 
      lowerQuestion.includes(q.question.toLowerCase())
    );
    return match?.answer || 'Извините, я не могу ответить на этот вопрос. Попробуйте переформулировать или задать другой вопрос.';
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: findAnswer(inputValue),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuestionClick = (question: string) => {
    setInputValue(question);
    setShowQuestions(false);
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: findAnswer(question),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <>
      <motion.button
        className="support-chat-button"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <IoMdChatboxes />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="support-chat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="support-chat__header">
              <h3>Поддержка</h3>
              <button 
                className="support-chat__close"
                onClick={() => setIsOpen(false)}
              >
                <IoMdClose />
              </button>
            </div>

            <div className="support-chat__content">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  className={`support-chat__message ${message.isUser ? 'user' : 'bot'}`}
                  initial={{ opacity: 0, x: message.isUser ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="support-chat__message-text">
                    {message.text}
                  </div>
                  <div className="support-chat__message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </motion.div>
              ))}

              {showQuestions && messages.length === 1 && (
                <motion.div 
                  className="support-chat__questions"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="support-chat__questions-title">
                    Часто задаваемые вопросы:
                  </div>
                  {commonQuestions.map((q, index) => (
                    <motion.button
                      key={index}
                      className="support-chat__question-button"
                      onClick={() => handleQuestionClick(q.question)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: index * 0.1 }
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {q.question}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {isTyping && (
                <motion.div
                  className="support-chat__typing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            <div className="support-chat__input">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Введите сообщение..."
              />
              <motion.button
                onClick={handleSendMessage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiSend />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SupportChat; 