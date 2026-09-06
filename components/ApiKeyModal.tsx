'use client';

import React, { useState, useEffect } from 'react';
import { X, Key, ShieldCheck, ExternalLink, Info, CheckCircle2 } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveToken: (token: string) => void;
  currentToken: string;
}

export default function ApiKeyModal({ isOpen, onClose, onSaveToken, currentToken }: ApiKeyModalProps) {
  const [tokenInput, setTokenInput] = useState(currentToken);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setTokenInput(currentToken);
  }, [currentToken]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveToken(tokenInput.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  const handleClear = () => {
    setTokenInput('');
    onSaveToken('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Duffel API Configuration</h3>
              <p className="text-xs text-slate-400">Direct airline GDS/NDC flight search engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-2.5 text-slate-300">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <p>
                <strong>Zero-Config Simulator Active:</strong> If left blank, WhichPlane automatically runs in realistic route simulation mode with real fleet schedules (Emirates A380, BA A350, LH 747-8, United 787, JetBlue neo, etc.).
              </p>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p>
                To query real-time live Duffel GDS inventory, paste your Duffel Access Token below (or set <code className="px-1 py-0.5 rounded bg-slate-800 text-sky-300">DUFFEL_ACCESS_TOKEN</code> in your environment).
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              Duffel Access Token
            </label>
            <input
              type="password"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="duffel_test_... or duffel_live_..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 font-mono"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <a
              href="https://duffel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-sky-400 hover:underline inline-flex items-center gap-1"
            >
              Get free API key on duffel.com
              <ExternalLink className="w-3 h-3" />
            </a>

            <div className="flex items-center gap-2">
              {tokenInput && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Clear Key
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors shadow-lg shadow-sky-500/20 flex items-center gap-1.5"
              >
                {savedSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-slate-950" />
                    Saved!
                  </>
                ) : (
                  'Save & Apply'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
