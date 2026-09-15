import React, { useRef, useState } from 'react';
import Magnetic from './Magnetic';
import Img from './Img';
import { Arrow, Mic } from './icons';

/**
 * The Story Creator — the visual protagonist.
 * Shared between the hero and the final chapter (different surroundings, same object).
 */
export default function Composer({
  placeholder = 'Tell me about someone you love…',
  value,
  readOnly = false,
  onFocusChange,
  onTypingChange,
  ctaClass = 'btn--ivory',
  id,
  compact = false,
}) {
  const ref = useRef(null);
  const [text, setText] = useState(value ?? '');
  const [live, setLive] = useState(false);
  const [drag, setDrag] = useState(false);
  const [photo, setPhoto] = useState(null);
  const fileRef = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const handleFiles = (files) => {
    const f = files?.[0];
    if (!f || !f.type.startsWith('image/')) return;
    setPhoto({ url: URL.createObjectURL(f), name: f.name });
  };

  return (
    <form
      ref={ref}
      id={id}
      className={`composer ${drag ? 'is-dragging' : ''}`}
      onMouseMove={onMove}
      onSubmit={(e) => e.preventDefault()}
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files); }}
      aria-label="Story creator"
    >
      <label className="sr-only" htmlFor={`${id}-field`}>Describe the story you want to create</label>
      <textarea
        id={`${id}-field`}
        className="composer__field"
        placeholder={placeholder}
        rows={compact ? 2 : 3}
        value={readOnly ? value : text}
        readOnly={readOnly}
        onChange={(e) => { setText(e.target.value); onTypingChange?.(e.target.value.length > 0); }}
        onFocus={() => onFocusChange?.(true)}
        onBlur={() => onFocusChange?.(false)}
      />
      {photo && (
        <div className="composer__photo">
          <Img src={photo.url} alt="" eager />
          <span>{photo.name}</span>
        </div>
      )}
      <div className="composer__bar">
        <button type="button" className="composer__tool" onClick={() => fileRef.current?.click()}>
          <span className="plus">+</span>
          <span className="label">Add a person</span>
        </button>
        <button type="button" className="composer__tool" onClick={() => fileRef.current?.click()}>
          <span className="label">Add photo</span>
        </button>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => handleFiles(e.target.files)} />
        <div className="composer__spacer" />
        <button
          type="button"
          className={`composer__mic ${live ? 'is-live' : ''}`}
          aria-pressed={live}
          aria-label="Dictate your story"
          onClick={() => setLive((v) => !v)}
        >
          <Mic />
          <span className="composer__wave" aria-hidden="true"><i /><i /><i /><i /></span>
        </button>
        <Magnetic strength={0.25}>
          <button type="submit" className={`btn ${ctaClass}`}>Create story <Arrow /></button>
        </Magnetic>
      </div>
    </form>
  );
}
