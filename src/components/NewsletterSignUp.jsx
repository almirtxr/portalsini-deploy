import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

const SUBSCRIBE_URL = 'https://portalsini-backend-deploy.fly.dev/api/subscribe/subscribe';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(SUBSCRIBE_URL, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Falha na inscrição');
      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error('Erro ao inscrever na newsletter:', err);
      setStatus('error');
    }
  };

  return (
    <div className="bg-ink text-white px-6 py-10 sm:px-10 sm:py-12">
      <h2 className="font-mono text-lg font-bold uppercase tracking-[0.12em] leading-snug text-brand-yellow">
        Receba o Portal Sîni no seu e-mail
      </h2>
      <p className="mt-2 max-w-md text-sm text-neutral-400">
        Atualizações e reportagens sobre educação e saberes indígenas, direto na sua caixa de entrada.
      </p>

      {status === 'success' ? (
        <p className="mt-6 flex items-center gap-2 font-mono text-sm uppercase tracking-wide text-brand-yellow">
          <Check className="h-4 w-4" /> Inscrição concluída!
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex max-w-md items-end gap-3">
          <div className="flex-1">
            <label htmlFor="newsletter-email" className="sr-only">
              Seu e-mail
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder="seu@email.com"
              className="w-full border-0 border-b border-neutral-600 bg-transparent px-1 py-2 text-white placeholder:text-neutral-600 focus:border-brand-yellow focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            aria-label="Inscrever-se"
            className="flex h-11 w-11 shrink-0 items-center justify-center bg-brand-red text-white transition-colors hover:bg-brand-red/90 disabled:opacity-60"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="mt-3 font-mono text-xs uppercase tracking-wide text-brand-red">
          Não foi possível inscrever. Tente novamente.
        </p>
      )}
    </div>
  );
}
