import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';

export default function PrivatePresentationModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    residence: 'Horizon Residence',
    time: 'Morning (09:00 - 12:00)',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl p-8 sm:p-12 rounded-3xl border border-[#C8A776]/40 bg-[#F4EFE5] text-[#35322E] shadow-2xl bg-grain"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full border border-[#C8A776]/30 text-[#35322E] hover:bg-[#C8A776]/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="py-12 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#D9A441]/20 border border-[#D9A441] flex items-center justify-center text-[#D9A441] mb-2 animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif-editorial text-3xl text-[#35322E]">
                Presentation Scheduled
              </h3>
              <p className="text-xs text-[#9A7552] max-w-sm">
                Thank you, {formData.name || 'Valued Guest'}. Our senior residential advisor will connect with you discreetly.
              </p>
            </div>
          ) : (
            <div>
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#D9A441] block font-mono mb-2">
                DISCREET INQUIRY
              </span>
              <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#35322E] mb-2">
                Schedule your private presentation.
              </h3>
              <p className="text-xs text-[#9A7552] mb-8 font-light">
                Experience AUREA in person or through an immersive digital walkthrough led by our architectural team.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-[#35322E] mb-1 font-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Lord / Lady / Mr. / Ms. ..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#C8A776]/40 bg-[#F7F3EC] text-xs text-[#35322E] focus:outline-none focus:border-[#D9A441]"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-[#35322E] mb-1 font-semibold">
                      Direct Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#C8A776]/40 bg-[#F7F3EC] text-xs text-[#35322E] focus:outline-none focus:border-[#D9A441]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-[#35322E] mb-1 font-semibold">
                      Telephone
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#C8A776]/40 bg-[#F7F3EC] text-xs text-[#35322E] focus:outline-none focus:border-[#D9A441]"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-[#35322E] mb-1 font-semibold">
                      Residence Interest
                    </label>
                    <select
                      value={formData.residence}
                      onChange={(e) => setFormData({ ...formData, residence: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#C8A776]/40 bg-[#F7F3EC] text-xs text-[#35322E] focus:outline-none focus:border-[#D9A441]"
                    >
                      <option value="Horizon Residence">Horizon Residence (Levels 06-27)</option>
                      <option value="Sky Residence">Sky Residence (Levels 28-39)</option>
                      <option value="The Aurea House">The Aurea House (Penthouse 40)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-[#35322E] mb-1 font-semibold">
                      Preferred Time Window
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#C8A776]/40 bg-[#F7F3EC] text-xs text-[#35322E] focus:outline-none focus:border-[#D9A441]"
                    >
                      <option value="Morning (09:00 - 12:00)">Morning (09:00 - 12:00)</option>
                      <option value="Afternoon (13:00 - 17:00)">Afternoon (13:00 - 17:00)</option>
                      <option value="Golden Hour (18:00 - 20:00)">Golden Hour (18:00 - 20:00)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-4 rounded-full bg-[#35322E] text-[#F7F3EC] font-semibold text-xs tracking-widest uppercase hover:bg-[#D9A441] hover:text-[#1E2B35] transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Confirm Reservation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
