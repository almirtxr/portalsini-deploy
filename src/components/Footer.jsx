import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter } from 'lucide-react';

const socials = [
  { href: 'https://instagram.com', label: 'Instagram', Icon: Instagram },
  { href: 'https://twitter.com', label: 'X (Twitter)', Icon: Twitter },
  { href: 'https://linkedin.com', label: 'LinkedIn', Icon: Linkedin },
];

const Footer = () => {
  return (
    <footer className="mt-16 bg-ink text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Marca + missão */}
          <div className="md:col-span-1">
            <img
              src="/Portal-Sini-branco-apenas-nome.png"
              alt="Portal Sîni"
              className="h-10 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-400">
              Jornalismo independente sobre educação e a valorização dos saberes indígenas.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-brand-yellow border-b border-neutral-700 pb-2">
              Navegação
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {[
                { to: '/', label: 'Início' },
                { to: '/sobre', label: 'Sobre' },
                { to: '/contato', label: 'Contato' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-neutral-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Conecte-se */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-brand-yellow border-b border-neutral-700 pb-2">
              Conecte-se
            </h4>
            <div className="mt-4 flex items-center gap-4">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-full border border-neutral-700 p-2.5 text-neutral-300 transition-colors hover:border-brand-red hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Barra de crédito */}
      <div className="border-t border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="byline text-neutral-500">
            © {new Date().getFullYear()} Portal Sîni
          </span>
          <Link to="/linkedin" className="byline text-neutral-500 transition-colors hover:text-white">
            Desenvolvido por Almir Gabriel
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
