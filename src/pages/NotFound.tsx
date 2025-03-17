import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  // Устанавливаем заголовок страницы
  useEffect(() => {
    document.title = 'Страница не найдена | Code and Note';
  }, []);

  return (
    <main className="not-found">
      <div className="container">
        <div className="not-found__content">
          <h1 className="not-found__title">404</h1>
          <h2 className="not-found__subtitle">Страница не найдена</h2>
          <p className="not-found__text">
            Извините, запрашиваемая страница не существует или была перемещена.
          </p>
          <Link to="/" className="btn btn-primary">
            Вернуться на главную
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound; 