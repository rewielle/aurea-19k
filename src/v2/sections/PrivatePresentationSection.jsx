import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function PrivatePresentationSection({ onOpenModal }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    residence: 'Horizon Residence (Level 06–24)',
    time: 'Morning'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section
      id="presentation"
      className="relative py-32 sm:py-44 bg-[#1E2B35] text-[#FAF7F1] overflow-hidden border-t border-[#AD8557]/30"
    >
      {/* Background Dusk Tower Render */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-45 pointer-events-none filter brightness-90"
        style={{ backgroundImage: `url('/assets/building_night.jpg')` }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#1E2B35]/95 via-[#1E2B35]/80 to-[#1E2B35]/70 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-16">
        
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#D6A03B] block font-semibold">
              SECTION 09 — PRIVATE PRESENTATION
            </span>

            {/* Upright Roman Headline */}
            <h2 className="font-display text-5xl sm:text-7xl text-[#FAF7F1] leading-[0.95]">
              A new horizon <br />
              awaits.
            </h2>

            <p className="text-base sm:text-lg text-[#FAF7F1]/85 font-light leading-relaxed max-w-md">
              Discover AUREA through a private architectural presentation, floorplan review, and residence availability consultation.
            </p>

            <div className="pt-4 space-y-3 font-mono text-xs text-[#FAF7F1]/90">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D6A03B]" />
                <span>Private 1-on-1 Architectural Presentation</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D6A03B]" />
                <span>Custom Residence & Floor Plan Configuration</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D6A03B]" />
                <span>Priority Reservation Availability</span>
              </div>
            </div>
          </div>

          {/* Right Minimal Presentation Form */}
          <div className="lg:col-span-6 p-8 sm:p-12 rounded-3xl bg-[#263A46]/80 backdrop-blur-xl border border-white/15 shadow-2xl">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4 font-mono">
                <CheckCircle2 className="w-12 h-12 text-[#D6A03B] mx-auto" />
                <h3 className="font-display text-3xl text-white">Presentation Requested</h3>
                <p className="text-xs text-white/80 max-w-sm mx-auto font-light">
                  Thank you, {formData.name}. Our private advisory team will contact you shortly to schedule your presentation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-[#D6A03B] uppercase mb-2">FULL NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#D6A03B] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-[#D6A03B] uppercase mb-2">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#D6A03B] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-[#D6A03B] uppercase mb-2">PHONE NUMBER</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#D6A03B] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-[#D6A03B] uppercase mb-2">RESIDENCE INTEREST</label>
                  <select
                    value={formData.residence}
                    onChange={(e) => setFormData({ ...formData, residence: e.target.value })}
                    className="w-full bg-[#1E2B35] border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D6A03B] transition-colors"
                  >
                    <option>Horizon Residence (Level 06–24)</option>
                    <option>Sky Residence (Level 25–35)</option>
                    <option>The AUREA House Penthouse (Level 36–39)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#D6A03B] text-[#1E2B35] font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-white transition-all shadow-xl"
                >
                  <span>Schedule your private presentation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
