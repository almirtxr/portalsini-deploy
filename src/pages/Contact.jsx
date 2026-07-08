import React from 'react';
import { Mail } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-16 pt-28 sm:px-6">
        <p className="cat-label">Contato</p>
        <h1 className="headline mt-3 text-4xl sm:text-5xl">
          <span className="mark-yellow">
            <span className="mark-bar" aria-hidden="true" />
            <span className="mark-text">Fale conosco</span>
          </span>
        </h1>

        <div className="article-content mt-8">
          <p>
            Queremos ouvir você! Se tem dúvidas, sugestões ou deseja colaborar com o nosso
            portal, entre em contato.
          </p>
          <p>
            Nossa equipe retornará o mais breve possível. Juntos, fortalecemos a voz dos povos
            indígenas e afro-brasileiros, promovendo a diversidade, a memória e a luta por
            direitos.
          </p>
          <p>
            O Portal Sîni acredita que cada história contada ajuda a construir um amanhã mais
            justo e representativo.
          </p>
        </div>

        <a
          href="mailto:contato@portalsini.com.br"
          className="mt-8 inline-flex items-center gap-3 bg-ink px-6 py-4 text-white transition-colors hover:bg-brand-red"
        >
          <Mail className="h-5 w-5" />
          <span className="font-mono text-sm uppercase tracking-[0.12em]">
            contato@portalsini.com.br
          </span>
        </a>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
