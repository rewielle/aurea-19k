import React, { useEffect, useState } from 'react';
import { Arrow } from '../ui.jsx';

const copy = {
  playbook: {
    label: '01 — Free playbook',
    title: ['The 10-Hour', 'AI Week.'],
    body: 'Seven practical systems to remove repetitive work from your week. One email, one PDF. No sequence, no spam.',
    cta: 'Send me the playbook',
    done: ['It’s on its way.', 'Check your inbox in the next few minutes.'],
  },
  workshop: {
    label: '02 — Live workshop',
    title: ['Build a week that', 'needs less of you.'],
    body: 'Reserve a seat for the next live session. You’ll get the date, the link and a short prep note. Nothing else.',
    cta: 'Reserve my seat',
    done: ['Seat reserved.', 'You’ll get the date and link by email.'],
  },
  coaching: {
    label: '03 — Private AI implementation',
    title: ['Your work.', 'Your system.'],
    body: 'Tell Eirik a little about how your week currently works. He reads every application personally.',
    cta: 'Apply for coaching',
    done: ['Application received.', 'Eirik will reply personally within a few days.'],
  },
};

export default function Drawer({ mode, onClose }) {
  const [sent, setSent] = useState(false);
  const c = copy[mode] || copy.playbook;

  useEffect(() => {
    if (!mode) return;
    setSent(false);
    const l = window.__lenis; l?.stop();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => { l?.start(); window.removeEventListener('keydown', onKey); };
  }, [mode, onClose]);

  if (!mode) return null;

  const submit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label={c.label}>
        <div className="p-8 md:p-12 min-h-full flex flex-col">
          <div className="flex items-center justify-between">
            <span className="eyebrow">{c.label}</span>
            <button onClick={onClose} className="eyebrow ink hover:text-[var(--blue)]">Close</button>
          </div>

          {!sent ? (
            <form onSubmit={submit} className="mt-16 flex-1 flex flex-col">
              <h2 className="display-m">{c.title[0]}<br />{c.title[1]}</h2>
              <p className="body mt-6 max-w-[22rem]">{c.body}</p>

              <div className="mt-12 flex flex-col gap-2">
                <label className="eyebrow" htmlFor="rc-name">Name</label>
                <input id="rc-name" className="field" required placeholder="Your name" autoComplete="name" />
                <label className="eyebrow mt-6" htmlFor="rc-email">Email</label>
                <input id="rc-email" className="field" type="email" required placeholder="you@company.com" autoComplete="email" />
                {mode === 'coaching' && (
                  <>
                    <label className="eyebrow mt-6" htmlFor="rc-week">Where does your time go?</label>
                    <textarea id="rc-week" className="field" rows={3} placeholder="A few lines about your week and what repeats." />
                  </>
                )}
              </div>

              <div className="mt-10">
                <button type="submit" className="btn btn-primary w-full justify-between">{c.cta} <Arrow /></button>
                <p className="eyebrow mt-5" style={{ fontSize: '0.6rem' }}>Less work. More life. Unsubscribe anytime.</p>
              </div>
            </form>
          ) : (
            <div className="mt-16 flex-1 flex flex-col justify-between">
              <div>
                <div className="w-10 h-px bg-[var(--blue)] mb-8" />
                <h2 className="display-m">{c.done[0]}</h2>
                <p className="body mt-6 max-w-[20rem]">{c.done[1]}</p>
              </div>
              <button onClick={onClose} className="link-line self-start">Back to the site <Arrow /></button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
