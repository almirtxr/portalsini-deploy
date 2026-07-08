import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/contato', label: 'Contato' },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-paper border-b border-neutral-200">
      {/* Faixa de acento da marca */}
      <div className="h-1 w-full bg-brand-red" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
            <img src="/logo-horizontal.png" alt="Portal Sîni" className="h-10 w-auto sm:h-12" />
          </Link>

          {/* Navegação desktop */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-ink transition-colors hover:text-brand-red"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              aria-label="Área administrativa"
              className="rounded-full border border-neutral-300 p-2 text-ink transition-colors hover:border-brand-red hover:text-brand-red"
            >
              <User className="h-4 w-4" />
            </Link>
          </nav>

          {/* Botão mobile */}
          <button
            type="button"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-ink"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <nav className="border-t border-neutral-200 bg-paper md:hidden animate-fade-in">
          <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="font-mono text-sm font-bold uppercase tracking-[0.15em] text-ink py-2 transition-colors hover:text-brand-red"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="font-mono text-sm font-bold uppercase tracking-[0.15em] text-ink py-2 transition-colors hover:text-brand-red flex items-center gap-2"
            >
              <User className="h-4 w-4" /> Administração
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
