import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';
import { CONTACT, TOOLS } from '../data/content';
import { ContourField } from './art';

/* ---------- Small helpers ---------- */
export function Reveal({ children, delay = 0, className, as = 'div' }: { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'li' }) {
  const Comp = as === 'li' ? motion.li : motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  );
}

export function SectionHead({ index, title, sheet }: { index: string; title: string; sheet?: string }) {
  return (
    <div className="section-head">
      <span className="label"><span className="tick" aria-hidden="true" />[ {index} / {title} ]</span>
      <span className="label" aria-hidden="true">{sheet ?? `AICE.${index}`}</span>
    </div>
  );
}

export function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M8 1v14M1 8h14" />
        <circle cx="8" cy="8" r="4.5" />
      </svg>
    </span>
  );
}

/* ---------- Loader: blueprint crosshair (once per session) ---------- */
export function Loader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.location.pathname !== '/') return false;
    try {
      return !sessionStorage.getItem('aice-loaded');
    } catch {
      return true;
    }
  });
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (!show) return;
    try { sessionStorage.setItem('aice-loaded', '1'); } catch { /* ignore */ }
    if (reduce) { setShow(false); return; }
    const start = performance.now();
    const dur = 1100;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setShow(false), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [show, reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="loader"
          aria-hidden="true"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="cross-h" />
          <span className="cross-v" />
          <span className="ring" />
          <span className="coords mono">
            GRID REF 00.00<br />SHEET A-{String(pct).padStart(3, '0')}
          </span>
          <span className="brand-l mono">AICE Services</span>
          <span className="pct mono">{String(pct).padStart(3, '0')}%</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Header + full-screen menu ---------- */
const NAV = [
  { href: '/#tools', label: 'AI Tools' },
  { href: '/#consultancy', label: 'Consultancy' },
  { href: '/#automation', label: 'Custom automation' },
  { href: '/#standards', label: 'Standards' },
  { href: '/#about', label: 'About' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/#contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const location = useLocation();
  const btnRef = useRef<HTMLButtonElement>(null);

  // Close the menu on route / hash change
  useEffect(() => { setOpen(false); }, [location.pathname, location.hash]);

  // Switch header colours when it sits over a dark section
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const h = document.querySelector('.site-header') as HTMLElement | null;
      const y = (h?.offsetHeight ?? 56) + 2;
      const els = document.elementsFromPoint(window.innerWidth / 2, y);
      const sec = els.find((el) => el.closest('[data-theme]') && !el.closest('.site-header'));
      const theme = sec?.closest('[data-theme]')?.getAttribute('data-theme');
      setOnDark(theme === 'dark');
    };
    let settle = 0;
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
      // re-check once scrolling settles (covers throttled frames / smooth scroll)
      clearTimeout(settle);
      settle = window.setTimeout(check, 140);
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(settle);
    };
  }, [location.pathname]);

  // Lock scroll + Escape to close while the menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus(); } };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <>
      <header className={`site-header ${onDark || open ? 'on-dark' : ''}`}>
        <div className="inner">
          <Link to="/" className="brand" aria-label="AICE Services, home">
            <BrandMark />
            <span>AICE Services</span>
          </Link>
          <nav className="header-links" aria-label="Main">
            {NAV.slice(0, 5).map((n) => (
              <Link key={n.href} to={n.href}>{n.label}</Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link to="/#contact" className="btn btn-primary header-cta">Contact</Link>
            <button
              ref={btnRef}
              className="menu-btn"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span>{open ? 'Close' : 'Menu'}</span>
              <span className="bars" aria-hidden="true"><i /><i /></span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            className="menu-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Site index">
              <ol>
                {NAV.map((n, i) => (
                  <li key={n.href}>
                    <Link to={n.href} onClick={() => setOpen(false)}>
                      <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="menu-foot mono">
              {TOOLS.map((t) => (
                <Link key={t.id} to={t.route} onClick={() => setOpen(false)}>{t.name} ↗</Link>
              ))}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- Modal ---------- */
function Modal({ title, open, onClose, children }: { title: string; open: boolean; onClose: () => void; children: ReactNode }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-head">
          <h2 id="modal-title">{title}</h2>
          <button ref={closeRef} onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  const [privacy, setPrivacy] = useState(false);
  const [terms, setTerms] = useState(false);
  return (
    <>
      <footer className="footer ink-2" data-theme="dark">
        <ContourField className="footer-contours" />
        <div className="wrap" style={{ position: 'relative' }}>
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/" className="brand" aria-label="AICE Services, home"><BrandMark /><span>AICE Services</span></Link>
              <p style={{ color: 'var(--muted-dark)', maxWidth: '36ch', marginTop: 16 }}>
                AI + Civil Engineering for Smarter Cities. Precise AI workflows and compliance-first consultancy for complex infrastructure projects.
              </p>
            </div>
            <div>
              <h3>AI tools</h3>
              <ul>{TOOLS.map((t) => <li key={t.id}><Link to={t.route}>{t.name}</Link></li>)}</ul>
            </div>
            <div>
              <h3>Consultancy</h3>
              <ul>
                <li><Link to="/#consultancy">Design Review</Link></li>
                <li><Link to="/#consultancy">Contract &amp; Claims</Link></li>
                <li><Link to="/#consultancy">Bid Preparation</Link></li>
                <li><Link to="/#automation">Custom automation</Link></li>
              </ul>
            </div>
            <div>
              <h3>Explore</h3>
              <ul>
                <li><Link to="/#standards">Standards</Link></li>
                <li><Link to="/#about">About</Link></li>
                <li><Link to="/#faq">FAQ</Link></li>
                <li><Link to="/#contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3>Legal</h3>
              <ul>
                <li><button onClick={() => setPrivacy(true)}>Privacy Policy</button></li>
                <li><button onClick={() => setTerms(true)}>Terms of Service</button></li>
              </ul>
            </div>
          </div>
          <p className="footer-word" aria-hidden="true">AICE<span>.</span></p>
          <div className="footer-bottom mono">
            <span>© {new Date().getFullYear()} AICE Services. All rights reserved.</span>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <Link to="/#contact" className="inline-flex items-center gap-2">Start a project <ArrowRight size={14} /></Link>
          </div>
        </div>
      </footer>

      <Modal title="Privacy Policy" open={privacy} onClose={() => setPrivacy(false)}>
        <h3>Information we collect</h3>
        <p>We collect information you provide directly to us, such as when you contact us, request services, or communicate with us. This may include your name, email address, phone number, company name, and project details.</p>
        <h3>How we use information</h3>
        <ul>
          <li>Provide, maintain, and improve our services</li>
          <li>Respond to your inquiries and requests</li>
          <li>Send you technical notices and support messages</li>
          <li>Comply with legal obligations</li>
        </ul>
        <h3>AI tools and API keys</h3>
        <p>Our AI tools run in your browser. Any Gemini API key you enter is stored only in your browser’s local storage and is sent directly to Google’s Gemini API. We do not receive or store your keys.</p>
        <h3>Data security</h3>
        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
        <h3>Data sharing</h3>
        <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except as required by law.</p>
        <h3>Your rights</h3>
        <p>You have the right to access, update, or delete your personal information. Contact us to exercise these rights.</p>
        <h3>Changes to this policy</h3>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
        <h3>Contact us</h3>
        <p>If you have questions about this Privacy Policy, please contact us at {CONTACT.email}.</p>
      </Modal>

      <Modal title="Terms of Service" open={terms} onClose={() => setTerms(false)}>
        <h3>Acceptance of terms</h3>
        <p>By accessing or using AICE Services’ website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
        <h3>Services</h3>
        <p>We provide AI-powered civil engineering solutions including AICEMark, AICE Deck Edit, AICE ProScan, AICE BOQ Auditor, and traditional engineering services. Services are provided “as is” and subject to change.</p>
        <h3>User responsibilities</h3>
        <ul>
          <li>Provide accurate and complete information</li>
          <li>Maintain the security of your account and API keys</li>
          <li>Use our services only for lawful purposes</li>
          <li>Not interfere with or disrupt our services</li>
        </ul>
        <h3>Intellectual property</h3>
        <p>All content, features, and functionality on our website are owned by AICE Services and are protected by international copyright, trademark, and other intellectual property laws.</p>
        <h3>Limitation of liability</h3>
        <p>AICE Services shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.</p>
        <h3>Termination</h3>
        <p>We may terminate or suspend your access to our services immediately, without prior notice, for any reason, including breach of these Terms.</p>
        <h3>Governing law</h3>
        <p>These Terms shall be governed by and construed in accordance with the laws of Pakistan, without regard to its conflict of law provisions.</p>
        <h3>Changes to terms</h3>
        <p>We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page.</p>
        <h3>Contact us</h3>
        <p>If you have questions about these Terms of Service, please contact us at {CONTACT.email}.</p>
      </Modal>
    </>
  );
}
