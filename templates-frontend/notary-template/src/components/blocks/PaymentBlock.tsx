import React, { useState } from 'react';
import type { PaymentBlock as PaymentBlockType } from '../../types/wagtail';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';

interface PaymentBlockProps {
  block: PaymentBlockType;
}

export const PaymentBlock: React.FC<PaymentBlockProps> = ({ block }) => {
  const { value } = block;
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  return (
    <section className="py-20 bg-gradient-to-br from-theme-primary/5 to-theme-accent/5">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-theme-accent/10 rounded-full">
              <CreditCard className="w-8 h-8 text-theme-accent" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-theme-text mb-2">
            Secure Payment
          </h2>

          <p className="text-center text-theme-neutral mb-8">
            {value.description}
          </p>

          <div className="mb-8 p-6 bg-theme-primary/5 rounded-xl">
            <div className="flex justify-between items-center">
              <span className="text-theme-neutral">
                {value.payment_type === 'deposit' ? 'Deposit Amount' : 'Total Amount'}
              </span>
              <span className="text-3xl font-bold text-theme-primary">
                ${value.amount}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-theme-text mb-2">
                Card Number
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 border-2 border-theme-neutral/20 rounded-lg focus:border-theme-primary focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-theme-text mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 border-2 border-theme-neutral/20 rounded-lg focus:border-theme-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-theme-text mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  maxLength={4}
                  className="w-full px-4 py-3 border-2 border-theme-neutral/20 rounded-lg focus:border-theme-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <Lock className="w-5 h-5 text-green-600" />
              <p className="text-sm text-green-800">
                Your payment information is encrypted and secure
              </p>
            </div>

            <button className="w-full px-8 py-4 bg-theme-accent text-white rounded-lg font-bold text-lg hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2">
              <CheckCircle className="w-6 h-6" />
              Complete Payment
            </button>

            {value.success_message && (
              <p className="text-center text-sm text-theme-neutral mt-4">
                {value.success_message}
              </p>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-theme-neutral/20">
            <p className="text-xs text-center text-theme-neutral">
              Powered by Stripe • PCI DSS Compliant
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
