'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'SGD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rate: number; // 1 USD = rate
  locale: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 88.5, locale: 'en-IN' },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1.0, locale: 'en-US' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92, locale: 'de-DE' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79, locale: 'en-GB' },
  AED: { code: 'AED', symbol: 'AED ', name: 'UAE Dirham', rate: 3.67, locale: 'ar-AE' },
  SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rate: 1.34, locale: 'en-SG' }
};

export function detectUserCurrency(): CurrencyCode {
  if (typeof window === 'undefined') return 'USD';
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const lang = (navigator.language || '').toUpperCase();
    if (tz.includes('Kolkata') || tz.includes('Calcutta') || lang.includes('IN')) {
      return 'INR';
    }
    if (tz.includes('London') || lang.includes('GB')) {
      return 'GBP';
    }
    if (tz.includes('Dubai') || lang.includes('AE')) {
      return 'AED';
    }
    if (tz.includes('Singapore') || lang.includes('SG')) {
      return 'SGD';
    }
    if (
      tz.includes('Europe') ||
      tz.includes('Paris') ||
      tz.includes('Berlin') ||
      tz.includes('Rome') ||
      tz.includes('Madrid') ||
      tz.includes('Amsterdam')
    ) {
      return 'EUR';
    }
  } catch (e) {
    console.warn('Could not detect currency from browser Intl:', e);
  }
  return 'USD';
}

export function detectUserTimeZone(): { timeZone: string; shortName: string } {
  if (typeof window === 'undefined') {
    return { timeZone: 'UTC', shortName: 'UTC' };
  }
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    const formatter = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short', timeZone });
    const parts = formatter.formatToParts(new Date());
    const tzPart = parts.find((p) => p.type === 'timeZoneName');
    const shortName = tzPart ? tzPart.value : timeZone.split('/').pop() || 'UTC';
    return { timeZone, shortName };
  } catch {
    return { timeZone: 'UTC', shortName: 'UTC' };
  }
}

export function formatPriceWithCurrency(amountUsd: number, currency: CurrencyCode): string {
  const conf = CURRENCIES[currency] || CURRENCIES.USD;
  const converted = Math.round(amountUsd * conf.rate);
  if (currency === 'INR') {
    return `₹${converted.toLocaleString('en-IN')}`;
  }
  return `${conf.symbol}${converted.toLocaleString()}`;
}

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountUsd: number) => string;
  userTimeZone: { timeZone: string; shortName: string };
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'USD',
  setCurrency: () => {},
  formatPrice: (amt) => `$${amt.toLocaleString()}`,
  userTimeZone: { timeZone: 'UTC', shortName: 'UTC' }
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>('USD');
  const [userTimeZone, setUserTimeZone] = useState({ timeZone: 'UTC', shortName: 'UTC' });

  useEffect(() => {
    // 1. Detect timezone
    const tz = detectUserTimeZone();
    setUserTimeZone(tz);

    // 2. Load cached preference or auto-detect based on locale
    const saved = localStorage.getItem('whichplane_currency') as CurrencyCode | null;
    if (saved && CURRENCIES[saved]) {
      setCurrencyState(saved);
    } else {
      const detected = detectUserCurrency();
      setCurrencyState(detected);
    }
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    if (CURRENCIES[code]) {
      setCurrencyState(code);
      localStorage.setItem('whichplane_currency', code);
    }
  };

  const formatPrice = (amountUsd: number) => {
    return formatPriceWithCurrency(amountUsd, currency);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, userTimeZone }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
