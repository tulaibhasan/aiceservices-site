import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { X } from 'lucide-react';
import { CONTACT } from '../data/content';

/* ---------- Reveal: rise + fade once in view ---------- */
export function Reveal({ children, delay = 0, className, as = 'div' }: { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'li' }) {
  const Comp = as === 'li' ? motion.li : motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  );
}

/* ---------- Halftone bloom: an image arrives as dots that grow until they merge ---------- */
export function Bloom({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  return <div ref={ref} className={`bloom ${inView ? 'in' : ''} ${className}`}>{children}</div>;
}

export function Label({ n, children }: { n: string; children: string }) {
  return <p className="label mono"><span>({n})</span>{children}</p>;
}

export function Wordmark() {
  return (
    <span className="wordmark">
      AICE<span className="wm-dot" aria-hidden="true" />
    </span>
  );
}

/* ---------- Header: one colour, inverted over whatever is beneath ---------- */
const NAV = [
  { href: '/#expertise', label: 'Expertise' },
  { href: '/#work', label: 'Work' },
  { href: '/#assistants', label: 'Assistants' },
  { href: '/#about', label: 'About' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location.pathname, location.hash]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className="hdr">
        <Link to="/" className="hdr-brand" aria-label="AICE Services, home"><Wordmark /></Link>
        <nav className="hdr-nav" aria-label="Main">
          {NAV.map((n) => <Link key={n.href} to={n.href}>{n.label}</Link>)}
          <Link to="/#contact" className="hdr-cta">Let’s talk</Link>
        </nav>
        <button className="hdr-menu" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((o) => !o)}>
          {open ? 'Close' : 'Menu'}
        </button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu"
            className="menu"
            aria-label="Menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {[...NAV, { href: '/#contact', label: 'Contact' }].map((n) => (
              <Link key={n.href} to={n.href}>{n.label}</Link>
            ))}
            <a className="menu-mail mono" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </motion.nav>
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
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal-bg" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} data-lenis-prevent>
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
      <footer className="ftr">
        <span className="mono">© {new Date().getFullYear()} AICE Services · Lahore, Pakistan</span>
        <a className="mono" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        <span className="ftr-legal">
          <button className="mono" onClick={() => setPrivacy(true)}>Privacy</button>
          <button className="mono" onClick={() => setTerms(true)}>Terms</button>
        </span>
      </footer>

      <Modal title="Privacy Policy" open={privacy} onClose={() => setPrivacy(false)}>
        <h3>Information we collect</h3>
        <p>We collect the information you send us, such as your email address and project details when you use the contact form or email us.</p>
        <h3>How we use it</h3>
        <p>Only to reply to you, deliver the services you ask for, and meet legal obligations. We do not sell or share your information with third parties, except where the law requires it.</p>
        <h3>AICEMark and API keys</h3>
        <p>AICEMark runs in your browser. Any Gemini API key you enter is stored only in your browser and sent directly to Google. We never receive or store it.</p>
        <h3>Your rights</h3>
        <p>You can ask us to access, update or delete your information at any time by emailing {CONTACT.email}.</p>
      </Modal>

      <Modal title="Terms of Service" open={terms} onClose={() => setTerms(false)}>
        <h3>Services</h3>
        <p>AICE Services provides engineering consultancy, website design and development, AI assistants, video editing and the free AICEMark tool. Free tools are provided as is.</p>
        <h3>Your responsibilities</h3>
        <p>Provide accurate information, keep your API keys safe, and use our services lawfully.</p>
        <h3>Intellectual property</h3>
        <p>Content on this website belongs to AICE Services. Deliverables are licensed to clients as agreed in each proposal.</p>
        <h3>Liability</h3>
        <p>AICE Services is not liable for indirect or consequential damages arising from the use of this website or its free tools.</p>
        <h3>Governing law</h3>
        <p>These terms are governed by the laws of Pakistan. Questions: {CONTACT.email}.</p>
      </Modal>
    </>
  );
}
