import { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { config } from '../../config/config';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f';

export function ContactForm() {
  const { trl } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<{ submitted: boolean; success: boolean; message: string }>({
    submitted: false,
    success: false,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formId = config.formspreeFormId;
    if (!formId) {
      setStatus({ submitted: true, success: false, message: trl.errorMessage });
      return;
    }

    setIsSubmitting(true);
    setStatus({ submitted: false, success: false, message: '' });
    try {
      const form = e.currentTarget;
      const body = new FormData(form);
      const url = `${FORMSPREE_ENDPOINT}/${formId}`;
      const res = await fetch(url, {
        method: 'POST',
        body,
        headers: { Accept: 'application/json' },
        mode: 'cors',
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setFormData({ name: '', email: '', message: '' });
        window.location.href = '/thanks';
        return;
      }
      const errorMsg =
        (Array.isArray(data?.errors) && data.errors.length > 0)
          ? data.errors.map((err: { message?: string }) => err.message).filter(Boolean).join(', ')
          : (data?.error ?? data?.message ?? null);
      setStatus({ submitted: true, success: false, message: errorMsg || trl.errorMessage });
    } catch (err) {
      const message = err instanceof Error ? err.message : trl.errorMessage;
      setStatus({ submitted: true, success: false, message: message || trl.errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/5 bg-surface-card p-6 shadow-card backdrop-blur-sm md:p-8"
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-zinc-300">
            {trl.name}
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder={trl.namePlaceholder}
            className="w-full rounded-xl border border-zinc-700/60 bg-white/5 px-4 py-3 text-zinc-100 placeholder-zinc-500 transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-zinc-300">
            {trl.email}
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder={trl.emailPlaceholder}
            className="w-full rounded-xl border border-zinc-700/60 bg-white/5 px-4 py-3 text-zinc-100 placeholder-zinc-500 transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50"
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-zinc-300">
            {trl.message}
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            placeholder={trl.messagePlaceholder}
            className="w-full resize-none rounded-xl border border-zinc-700/60 bg-white/5 px-4 py-3 text-zinc-100 placeholder-zinc-500 transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50"
          />
        </div>
        {status.submitted && (
          <div
            className={`rounded-xl px-4 py-3 text-sm ${status.success ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}`}
          >
            {status.message}
          </div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-accent py-3 font-semibold text-zinc-950 shadow-glow-sm transition hover:bg-accent-hover hover:shadow-glow disabled:opacity-70"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {trl.sending}
            </span>
          ) : (
            trl.sendMessage
          )}
        </button>
      </div>
    </form>
  );
}
