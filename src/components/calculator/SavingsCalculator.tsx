'use client';

import { useState, useMemo } from 'react';
import { Home, Sprout, Building2, MessageCircle } from 'lucide-react';
import { useLocale, useTranslations, getLocalizedField } from '@/lib/i18n';
import { calculatorInquiry } from '@/lib/whatsapp';
import { DISTRICTS, calculate } from '@/lib/solar-calc';

const PROPERTY_TYPES = [
  { key: 'residential', icon: Home },
  { key: 'farm', icon: Sprout },
  { key: 'commercial', icon: Building2 },
] as const;

export default function SavingsCalculator() {
  const locale = useLocale();
  const t = useTranslations();

  const [bill, setBill] = useState(3000);
  const [propertyType, setPropertyType] = useState<string>('residential');
  const [districtKey, setDistrictKey] = useState('dhule');

  const result = useMemo(
    () => calculate(bill, propertyType, districtKey),
    [bill, propertyType, districtKey],
  );

  const districtName = getLocalizedField(
    DISTRICTS[districtKey]?.name ?? DISTRICTS.other.name,
    locale,
  );

  return (
    <div className="space-y-6">
      {/* ── Monthly Bill Slider ── */}
      <div>
        <label htmlFor="bill-slider" className="text-sm text-text-secondary">{t('calculator.monthlyBill')}</label>
        <p className="mt-1 text-2xl font-bold text-primary">
          ₹{bill.toLocaleString('en-IN')}
          <span className="text-base font-normal text-text-secondary">
            {t('calculator.perMonth')}
          </span>
        </p>
        <input
          id="bill-slider"
          type="range"
          min={500}
          max={50000}
          step={500}
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
          className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-border accent-primary [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary"
        />
        <div className="mt-1 flex justify-between text-xs text-text-muted">
          <span>₹500</span>
          <span>₹50,000</span>
        </div>
      </div>

      {/* ── Property Type Cards ── */}
      <fieldset>
        <legend className="text-sm text-text-secondary">{t('calculator.propertyType')}</legend>
        <div className="mt-2 grid grid-cols-3 gap-3">
          {PROPERTY_TYPES.map(({ key, icon: Icon }) => {
            const selected = propertyType === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setPropertyType(key)}
                className={`flex min-h-[44px] flex-col items-center justify-center gap-1 rounded-lg border p-3 text-sm font-medium transition-colors ${
                  selected
                    ? 'border-primary bg-primary-light text-primary'
                    : 'border-border bg-white text-text-secondary'
                }`}
              >
                <Icon size={20} />
                {t(`calculator.${key}`)}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* ── District Dropdown ── */}
      <div>
        <label htmlFor="district-select" className="text-sm text-text-secondary">{t('calculator.district')}</label>
        <select
          id="district-select"
          value={districtKey}
          onChange={(e) => setDistrictKey(e.target.value)}
          className="mt-2 w-full min-h-[44px] rounded-lg border border-border bg-white p-3 text-text"
        >
          {Object.entries(DISTRICTS).map(([key, d]) => (
            <option key={key} value={key}>
              {getLocalizedField(d.name, locale)}
            </option>
          ))}
        </select>
      </div>

      {/* ── Results Panel ── */}
      <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
        <ResultRow label={t('calculator.systemSize')} value={`${result.systemSizeKw} kW`} />
        <ResultRow
          label={t('calculator.monthlySavings')}
          value={`₹${result.monthlySavings.toLocaleString('en-IN')}`}
          valueClass="text-success"
        />
        <ResultRow
          label={t('calculator.annualSavings')}
          value={`₹${result.annualSavings.toLocaleString('en-IN')}`}
          valueClass="text-success"
        />
        {propertyType === 'residential' && (
          <ResultRow
            label={t('calculator.subsidy')}
            value={
              result.subsidy > 0
                ? `₹${result.subsidy.toLocaleString('en-IN')}`
                : '\u2014'
            }
            valueClass={result.subsidy > 0 ? 'text-success' : undefined}
          />
        )}

        <hr className="my-3 border-border" />

        <ResultRow
          label={propertyType === 'residential' ? t('calculator.netCost') : t('calculator.estimatedCost')}
          value={`₹${result.netCost.toLocaleString('en-IN')}`}
          valueClass="text-primary font-bold"
        />
        <ResultRow
          label={t('calculator.payback')}
          value={`${result.paybackYears} ${t('calculator.years')}`}
        />
      </div>

      {/* ── WhatsApp CTA ── */}
      <a
        href={calculatorInquiry(result.systemSizeKw, districtName, bill, locale)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-whatsapp text-base font-semibold text-white active:bg-whatsapp-dark"
      >
        <MessageCircle size={20} />
        {t('calculator.getQuote')}
      </a>
    </div>
  );
}

/* ── Tiny helper for result rows ── */
function ResultRow({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm text-text-secondary">{label}</span>
      <span className={`text-lg font-semibold ${valueClass ?? ''}`}>{value}</span>
    </div>
  );
}
