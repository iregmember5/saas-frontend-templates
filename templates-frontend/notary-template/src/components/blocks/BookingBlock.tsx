import React, { useState } from 'react';
import type { BookingBlock as BookingBlockType } from '../../types/wagtail';
import { Calendar, MapPin, Video, Clock, CreditCard } from 'lucide-react';

interface BookingBlockProps {
  block: BookingBlockType;
}

export const BookingBlock: React.FC<BookingBlockProps> = ({ block }) => {
  const { value } = block;
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const getBookingIcon = () => {
    switch (value.booking_type) {
      case 'office': return <MapPin className="w-6 h-6" />;
      case 'mobile': return <MapPin className="w-6 h-6" />;
      case 'remote': return <Video className="w-6 h-6" />;
      default: return <Calendar className="w-6 h-6" />;
    }
  };

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
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 border-2 border-theme-neutral/20 rounded-lg focus:border-theme-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-theme-text mb-2">
                Select Time
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-4 py-3 border-2 border-theme-neutral/20 rounded-lg focus:border-theme-primary focus:outline-none"
              >
                <option value="">Choose a time slot</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-theme-text mb-2">
                Duration
              </label>
              <div className="flex gap-3">
                {value.duration_options.map((duration, index) => (
                  <button
                    key={index}
                    className="flex-1 px-4 py-3 border-2 border-theme-primary text-theme-primary rounded-lg hover:bg-theme-primary hover:text-white transition-all font-semibold"
                  >
                    <Clock className="w-4 h-4 inline mr-2" />
                    {duration}
                  </button>
                ))}
              </div>
            </div>

            {value.require_payment && (
              <div className="flex items-center gap-3 p-4 bg-theme-accent/10 rounded-lg">
                <CreditCard className="w-6 h-6 text-theme-accent" />
                <p className="text-sm text-theme-text">
                  Payment required to confirm booking
                </p>
              </div>
            )}

            <button className="w-full px-8 py-4 bg-theme-accent text-white rounded-lg font-bold text-lg hover:opacity-90 transition-all shadow-lg">
              Confirm Booking
            </button>

            {value.confirmation_message && (
              <p className="text-center text-sm text-theme-neutral mt-4">
                {value.confirmation_message}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
