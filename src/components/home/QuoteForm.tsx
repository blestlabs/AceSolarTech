'use client';

import { useState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle, Phone, User, Zap, MapPin, MessageSquare } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from '@/lib/i18n';

const CRM_API = 'https://api-crm.acesolartech.com';

type District = { name: string; name_mr: string; sun_hours: number };

export default function QuoteForm() {
  const t = useTranslations();
  const shouldReduceMotion = useReducedMotion();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bill, setBill] = useState('');
  const [district, setDistrict] = useState('');
  const [message, setMessage] = useState('');
  const [districts, setDistricts] = useState<District[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${CRM_API}/api/leads/public/districts`)
      .then((r) => r.json())
      .then((d) => setDistricts(d))
      .catch(() => {
        // Fallback districts
        setDistricts([
          { name: 'Dhule', name_mr: 'धुळे', sun_hours: 5.5 },
          { name: 'Nashik', name_mr: 'नाशिक', sun_hours: 5.3 },
          { name: 'Pune', name_mr: 'पुणे', sun_hours: 5.2 },
          { name: 'Mumbai', name_mr: 'मुंबई', sun_hours: 4.8 },
          { name: 'Nagpur', name_mr: 'नागपूर', sun_hours: 5.4 },
          { name: 'Jalgaon', name_mr: 'जळगाव', sun_hours: 5.4 },
        ]);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    if (phone.replace(/\D/g, '').length < 10) {
      setError(t('quote.invalidPhone'));
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`${CRM_API}/api/leads/public/quote-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          monthly_bill: bill || undefined,
          district: district || undefined,
          message: message.trim() || undefined,
          source: 'website',
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setSuccess(true);
      setName('');
      setPhone('');
      setBill('');
      setDistrict('');
      setMessage('');
    } catch {
      setError(t('quote.error'));
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <section className="bg-surface px-4 py-10" id="quote">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-md text-center"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <h3 className="text-xl font-bold text-text">{t('quote.thankYou')}</h3>
          <p className="mt-2 text-sm text-text/70">{t('quote.thankYouDesc')}</p>
          <button
            onClick={() => setSuccess(false)}
            className="mt-4 text-sm font-medium text-primary"
          >
            {t('quote.submitAnother')}
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="bg-surface px-4 py-10" id="quote">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-lg"
      >
        <div className="text-center mb-6">
          <h2 className="font-display text-xl font-bold text-text md:text-2xl">
            {t('quote.title')}
          </h2>
          <p className="mt-1 text-sm text-text/60">{t('quote.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text/40" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('quote.namePlaceholder')}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-text placeholder:text-text/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text/40" />
            <input
              type="tel"
              inputMode="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t('quote.phonePlaceholder')}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-text placeholder:text-text/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Bill + District row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <Zap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text/40" />
              <input
                type="text"
                inputMode="numeric"
                value={bill}
                onChange={(e) => setBill(e.target.value.replace(/\D/g, ''))}
                placeholder={t('quote.billPlaceholder')}
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-text placeholder:text-text/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text/40" />
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">{t('quote.districtPlaceholder')}</option>
                {districts.map((d) => (
                  <option key={d.name} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-text/40" />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('quote.messagePlaceholder')}
              rows={2}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-text placeholder:text-text/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting || !name || !phone}
            className="w-full rounded-xl bg-primary py-3.5 text-base font-semibold text-white active:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <Send className="h-4 w-4" />
                {t('quote.submit')}
              </>
            )}
          </button>

          <p className="text-center text-xs text-text/40">{t('quote.privacy')}</p>
        </form>
      </motion.div>
    </section>
  );
}
