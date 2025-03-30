import { useEffect } from 'react';

const RedirectToAdmin = () => {
  useEffect(() => {
    window.location.href = 'https://admin-portalsini.netlify.app';
  }, []);

  return null; // Não precisa renderizar nada
};

const RedirectToLinkedin = () => {
  useEffect(() => {
    window.location.href = 'https://www.linkedin.com/in/almirgabriel/';
  }, []);

  return null; // Não precisa renderizar nada
}

export { RedirectToAdmin, RedirectToLinkedin };