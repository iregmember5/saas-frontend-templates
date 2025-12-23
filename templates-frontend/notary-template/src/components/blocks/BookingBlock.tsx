import React, { useState } from 'react';
import type { BookingBlock as BookingBlockType } from '../../types/wagtail';
import { Calendar, MapPin, Video, Clock, CreditCard, CheckCircle } from 'lucide-react';
import { createAppointment } from '../../utils/api';

interface BookingBlockProps {
  block: BookingBlockType;
  notaryPageId: number;
}

export const BookingBlock: React.FC<BookingBlockProps> = ({ block, notaryPageId }) => {
  const { value } = block;
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const getBookingIcon = () => {
    switch (value.booking_type) {
      case 'office': return <MapPin className="w-6 h-6" />;
      case 'mobile': return <MapPin className="w-6 h-6" />;
      case 'remote': return <Video className="w-6 h-6" />;
      default: return <Calendar className="w-6 h-6" />;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createAppointment({
        notary_page: notaryPageId,
        client_name: clientName,
        client_email: clientEmail,
        client_phone: clientPhone,
        appointment_type: value.booking_type,
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        notes: notes,
      });
      setSuccess(true);
    } catch (err) {
      setError('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="py-20 bg-gradient-to-br from-theme-primary/10 to-theme-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-theme-text mb-4">Booking Confirmed!</h2>
            <p className="text-theme-neutral">{value.confirmation_message}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-theme-primary/10 to-theme-secondary/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-theme-primary/10 rounded-full">
              {getBookingIcon()}
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-center text-theme-text mb-4">
            Book Your Appointment
          </h2>

          <p className="text-center text-theme-neutral mb-8">
            {value.booking_type === 'office' && 'Schedule an in-office appointment'}
            {value.booking_type === 'mobile' && 'Book a mobile notary visit'}
            {value.booking_type === 'remote' && 'Schedule a remote online notarization (RON)'}
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-theme-text mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-theme-neutral/20 rounded-lg focus:border-theme-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-theme-text mb-2">
                Email *
              </label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-theme-neutral/20 rounded-lg focus:border-theme-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-theme-text mb-2">
                Phone *
              </label>
              <input
                type="tel"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-theme-neutral/20 rounded-lg focus:border-theme-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-theme-text mb-2">
                Select Date *
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-theme-neutral/20 rounded-lg focus:border-theme-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-theme-text mb-2">
                Select Time *
              </label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-theme-neutral/20 rounded-lg focus:border-theme-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-theme-text mb-2">
                Duration
              </label>
              <div className="flex gap-3">
                {value.duration_options.map((duration, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedDuration(duration)}
                    className={`flex-1 px-4 py-3 border-2 rounded-lg transition-all font-semibold ${
                      selectedDuration === duration
                        ? 'bg-theme-primary text-white border-theme-primary'
                        : 'border-theme-primary text-theme-primary hover:bg-theme-primary hover:text-white'
                    }`}
                  >
                    <Clock className="w-4 h-4 inline mr-2" />
                    {duration}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-theme-text mb-2">
                Additional Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border-2 border-theme-neutral/20 rounded-lg focus:border-theme-primary focus:outline-none"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            {value.require_payment && (
              <div className="flex items-center gap-3 p-4 bg-theme-accent/10 rounded-lg">
                <CreditCard className="w-6 h-6 text-theme-accent" />
                <p className="text-sm text-theme-text">
                  Payment required to confirm booking
                </p>
              </div>
            )}

            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="w-full px-8 py-4 bg-theme-accent text-white rounded-lg font-bold text-lg hover:opacity-90 transition-all shadow-lg disabled:opacity-50"
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
