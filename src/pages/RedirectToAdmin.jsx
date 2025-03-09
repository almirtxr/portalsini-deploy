import { useEffect } from 'react';

const RedirectToAdmin = () => {
  useEffect(() => {
    window.location.href = 'https://admin-portalsini.netlify.app';
  }, []);

  return null; // Não precisa renderizar nada
};

export default RedirectToAdmin;