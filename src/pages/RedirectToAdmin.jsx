import { useEffect } from 'react';

const RedirectToAdmin = () => {
  useEffect(() => {
    window.location.href = 'http://localhost:3003';
  }, []);

  return null; // Não precisa renderizar nada
};

export default RedirectToAdmin;