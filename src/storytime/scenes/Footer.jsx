import React from 'react';
import { IMG } from '../data';
export default function Footer() {
  return (
    <footer className="footer" id="about" data-nav="dark">
      <div className="footer__brand"><img src={IMG.star} alt="" className="nav__mark" />Storytime</div>
      <nav className="footer__links" aria-label="Footer">
        <a href="#stories">Stories</a><a href="#gifts">Gifts</a><a href="#pricing">Pricing</a><a href="#about">About</a>
      </nav>
      <div className="footer__meta">
        <label>
          <span className="sr-only">Language</span>
          <select defaultValue="en"><option value="en">English</option><option value="no">Norsk</option><option value="pt">Português</option></select>
        </label>
        <a href="#instagram" style={{ color: 'inherit', textDecoration: 'none' }}>Instagram</a>
        <a href="#tiktok" style={{ color: 'inherit', textDecoration: 'none' }}>TikTok</a>
      </div>
      <div className="footer__legal">
        <span>© {new Date().getFullYear()} Storytime · More than stories. A brighter tomorrow.</span>
        <span><a href="#privacy" style={{ color: 'inherit' }}>Privacy</a> · <a href="#terms" style={{ color: 'inherit' }}>Terms</a></span>
      </div>
    </footer>
  );
}
