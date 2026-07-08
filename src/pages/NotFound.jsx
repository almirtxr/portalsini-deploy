import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404: rota inexistente acessada:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-4 text-center">
      <img src="/logo-redonda.png" alt="Portal Sîni" className="h-28 w-28" />
      <p className="headline mt-8 text-7xl text-brand-red sm:text-8xl">404</p>
      <h1 className="headline mt-2 text-2xl sm:text-3xl">Página não encontrada</h1>
      <p className="mt-3 max-w-md text-neutral-600">
        A onça farejou, mas não encontrou esta página. Ela pode ter sido movida ou nunca ter
        existido.
      </p>
      <Link
        to="/"
        className="mt-8 bg-ink px-6 py-3 font-mono text-sm uppercase tracking-[0.12em] text-white transition-colors hover:bg-brand-red"
      >
        Voltar ao início
      </Link>
    </div>
  );
};

export default NotFound;
