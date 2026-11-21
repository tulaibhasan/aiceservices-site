import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Asterisk } from 'lucide-react';
import { CONTACT, FAQS, PROCESS, SERVICES, STANDARDS_LINE, TICKER, WORK } from '../data/content';
import { ContourField, NetworkPlan } from './art';
import { Reveal, SectionHead } from './Layout';
import { ServicesJourney } from './ServicesJourney';
import { AssistantDemo } from './AssistantDemo';

/* ---------- Drafting crosshair: follows the pointer across the hero (desktop only) ---------- */
function DraftingCrosshair({ host }: { host: React.RefObject<HTMLElement | null> }) {
  const h = useRef<HTMLDivElement>(null);
  const v = useRef<HTMLDivElement>(null);
  const tag = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let x = 0, y = 0;
    const paint = () => {
      raf = 0;
      if (h.current) h.current.style.transform = `translateY(${y}px)`;
      if (v.current) v.current.style.transform = `translateX(${x}px)`;
      if (tag.current) {
        tag.current.style.transform = `translate(${x + 14}px, ${y + 12}px)`;
        tag.current.textContent = `X ${String(Math.round(x)).padStart(4, '0')} · Y ${String(Math.round(y)).padStart(4, '0')}`;
      }
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x = e.clientX - r.left; y = e.clientY - r.top;
      el.classList.add('xhair-on');
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const leave = () => el.classList.remove('xhair-on');
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); if (raf) cancelAnimationFrame(raf); };
  }, [host]);
  return (
    <div className="xhair" aria-hidden="true">
      <div ref={h} className="xhair-h" />
      <div ref={v} className="xhair-v" />
      <span ref={tag} className="xhair-tag mono" />
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  return (
    <section ref={ref} id="home" className="hero blueprint-grid" data-theme="light" aria-labelledby="hero-title">
      <div className="hero-art" aria-hidden="true">
        <ContourField className="contours" />
        <NetworkPlan className="network" plot />
      </div>
      <DraftingCrosshair host={ref} />
      <div className="wrap" style={{ position: 'relative' }}>
        <h1 id="hero-title" className="display h-xl hero-in">
          Engineering, <span className="hl">websites</span> &amp; AI, delivered <span className="mark">fast.</span>
        </h1>
        <div className="hero-bottom">
          <div className="hero-in d1">
            <p className="lede" style={{ color: 'var(--ink)', opacity: 0.82 }}>
              Civil engineering consultancy for donor-funded projects, plus custom websites, AI assistants and video, built with AI in hours, not weeks.
            </p>
            <div className="hero-ctas" style={{ marginTop: 28 }}>
              <Link to="/#contact" className="btn btn-primary">Start a project <ArrowRight size={16} aria-hidden="true" /></Link>
              <Link to="/#work" className="btn btn-ghost">See the work</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Ticker ---------- */
function Ticker() {
  const row = (hidden: boolean) => (
    <div style={{ display: 'flex' }} aria-hidden={hidden || undefined}>
      {TICKER.map((t) => (
        <span className="ticker-item" key={t + hidden}>{t} <Asterisk size={22} aria-hidden="true" /></span>
      ))}
    </div>
  );
  return (
    <div className="ticker" role="region" aria-label="What we do">
      <div className="ticker-track">{row(false)}{row(true)}</div>
    </div>
  );
}

/* ---------- Work ---------- */
function WorkGlyph({ id }: { id: string }) {
  switch (id) {
    case 'freemytv':
      return (
        <svg viewBox="0 0 320 180" fill="none" aria-hidden="true">
          <rect x="20" y="16" width="280" height="148" rx="6" stroke="currentColor" strokeWidth="1.5" />
          <rect x="36" y="34" width="150" height="70" fill="currentColor" opacity=".9" />
          <rect x="194" y="34" width="44" height="70" fill="currentColor" opacity=".45" />
          <rect x="246" y="34" width="38" height="70" fill="currentColor" opacity=".25" />
          <rect x="36" y="120" width="248" height="30" rx="8" stroke="currentColor" opacity=".7" />
          {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={46 + i * 48} y="126" width="38" height="18" rx="3" fill="currentColor" opacity={0.3 + i * 0.12} />)}
        </svg>
      );
    case 'synckutub':
      return (
        <svg viewBox="0 0 320 180" fill="none" aria-hidden="true">
          <rect x="30" y="20" width="120" height="140" stroke="currentColor" strokeWidth="1.5" />
          {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x="44" y={38 + i * 18} width={90 - (i % 3) * 14} height="5" fill="currentColor" opacity=".45" />)}
          <rect x="40" y="88" width="100" height="14" fill="currentColor" opacity=".35" />
          <rect x="176" y="40" width="120" height="44" stroke="currentColor" />
          <rect x="188" y="54" width="90" height="5" fill="currentColor" />
          <rect x="188" y="66" width="60" height="5" fill="currentColor" opacity=".6" />
          <text x="258" y="80" fill="currentColor" fontFamily="IBM Plex Mono, monospace" fontSize="11">[1]</text>
          <path d="M176 70 C160 80, 160 92, 142 95" stroke="currentColor" strokeDasharray="3 3" />
        </svg>
      );
    case 'videostudio':
      return (
        <svg viewBox="0 0 320 180" fill="none" aria-hidden="true">
          <rect x="90" y="14" width="140" height="80" stroke="currentColor" strokeWidth="1.5" />
          <path d="M150 40 L176 54 L150 68 Z" fill="currentColor" />
          {[0, 1, 2].map((r) => (
            <g key={r}>
              <rect x="20" y={108 + r * 22} width="280" height="16" fill="currentColor" opacity=".08" />
              <rect x={30 + r * 30} y={108 + r * 22} width={120 - r * 20} height="16" fill="currentColor" opacity={0.85 - r * 0.25} />
              <rect x={170 + r * 10} y={108 + r * 22} width={90 - r * 15} height="16" fill="currentColor" opacity={0.6 - r * 0.15} />
            </g>
          ))}
          <path d="M200 100 V172" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 320 180" fill="none" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${24 + i * 72} 30)`}>
              <rect width="60" height="80" stroke="currentColor" strokeWidth="1.5" />
              <rect x="10" y="14" width="40" height="5" fill="currentColor" />
              <rect x="10" y="26" width="30" height="4" fill="currentColor" opacity=".5" />
              <rect x="10" y="36" width="36" height="4" fill="currentColor" opacity=".5" />
              <text x="10" y="70" fill="currentColor" fontFamily="IBM Plex Mono, monospace" fontSize="10">T-0{i + 1}</text>
            </g>
          ))}
          <path d="M24 140 H292" stroke="currentColor" strokeDasharray="4 4" opacity=".6" />
        </svg>
      );
  }
}

function WorkSection() {
  return (
    <section id="work" className="section" data-theme="light" aria-labelledby="work-title">
      <div className="wrap">
        <SectionHead index="03" title="Selected work" />
        <Reveal>
          <h2 id="work-title" className="display h-lg" style={{ maxWidth: '16ch', marginBottom: 'clamp(36px, 5vw, 64px)' }}>
            Built here, <span className="mark">used</span> out there.
          </h2>
        </Reveal>
        <ul className="work-grid">
          {WORK.map((w, i) => {
            const body = (
              <>
                <div className="work-visual"><WorkGlyph id={w.id} /></div>
                <div className="work-meta">
                  <span className="label">{w.kind}</span>
                  <span className={`work-status ${w.status === 'In development' ? 'dev' : ''}`}>{w.status}</span>
                </div>
                <h3 className="display h-sm">{w.name}</h3>
                <p>{w.text}</p>
                {w.href && <span className="work-link mono">{w.hrefLabel} <ArrowUpRight size={14} aria-hidden="true" /></span>}
              </>
            );
            return (
              <Reveal as="li" key={w.id} delay={i * 0.06} className="work-card">
                {w.href ? (
                  w.internal ? <Link to={w.href} className="work-inner">{body}</Link>
                    : <a href={w.href} className="work-inner" target="_blank" rel="noopener noreferrer">{body}</a>
                ) : <div className="work-inner">{body}</div>}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------- About (compact) ---------- */
function About() {
  return (
    <section id="about" className="section paper-2" data-theme="light" aria-labelledby="about-title">
      <div className="wrap">
        <SectionHead index="04" title="About" />
        <div className="about2">
          <Reveal>
            <figure className="avatar">
              <img src="/Muhammad-Tulaib-Hasan-Picture.jpg" alt="Muhammad Tulaib Hasan" width={168} height={210} loading="lazy" decoding="async" />
            </figure>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="about-title" className="display h-md">Muhammad Tulaib Hasan</h2>
            <p className="label" style={{ marginTop: 8 }}>Founder · Water &amp; sanitation engineer</p>
            <p className="lede" style={{ marginTop: 18 }}>
              A decade on ADB, World Bank and Government of Punjab projects in water, sanitation and solid waste, now pairing that engineering discipline with AI to ship work faster.
            </p>
            <p className="mono" style={{ marginTop: 18, color: 'var(--muted)' }}>{STANDARDS_LINE}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <dl className="about-nums">
              <div><dt className="mono">Years</dt><dd>10+</dd></div>
              <div><dt className="mono">Services</dt><dd>{SERVICES.length}</dd></div>
              <div><dt className="mono">Products</dt><dd>{WORK.length}</dd></div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  return (
    <section id="faq" className="section" data-theme="light" aria-labelledby="faq-title">
      <div className="wrap">
        <SectionHead index="05" title="FAQ" />
        <div className="faq">
          <div className="faq-aside">
            <h2 id="faq-title" className="display h-lg">Good <span className="mark">questions.</span></h2>
            <div style={{ marginTop: 28 }}>
              <Link to="/#contact" className="btn-split"><span>Ask us directly</span><span><ArrowUpRight size={14} aria-hidden="true" /></span></Link>
            </div>
          </div>
          <div>
            {FAQS.flatMap((g) => g.items).map((it) => (
              <details key={it.q}>
                <summary><span>{it.q}</span><span className="pm" aria-hidden="true" /></summary>
                <p>{it.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
const SERVICE_OPTIONS = [...SERVICES.map((s) => s.name), 'Something else'];

function Contact() {
  const [details, setDetails] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setState('sending');
    try {
      const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setDetails('');
      setState('ok');
    } catch (err) {
      console.error('Form submission error:', err);
      setState('err');
    }
  };

  return (
    <section id="contact" className="section ink glow-section" data-theme="dark" aria-labelledby="contact-title" style={{ overflow: 'hidden' }}>
      <ContourField className="contact-contours" />
      <div className="wrap" style={{ position: 'relative' }}>
        <SectionHead index="06" title="Contact" />
        <div className="contact">
          <div>
            <Reveal>
              <h2 id="contact-title" className="display h-lg">Tell us what you <span className="mark">need.</span></h2>
            </Reveal>
            <ol className="steps3">
              {PROCESS.map((p) => (
                <li key={p.n}><span className="mono">{p.n}</span><div><b>{p.title}</b><p>{p.text}</p></div></li>
              ))}
            </ol>
            <div className="contact-direct">
              <a href={`mailto:${CONTACT.email}`}><span className="mono" style={{ color: 'var(--muted-dark)' }}>Email</span><span className="v">{CONTACT.email}</span></a>
              <a href={CONTACT.phoneHref}><span className="mono" style={{ color: 'var(--muted-dark)' }}>Phone / WhatsApp</span><span className="v">{CONTACT.phone}</span></a>
              <div><span className="mono" style={{ color: 'var(--muted-dark)' }}>Hours</span><span className="v" style={{ fontSize: 16 }}>{CONTACT.hours}</span></div>
            </div>
          </div>

          <Reveal delay={0.1}>
            <form className="form" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit}>
              <input type="hidden" name="form-name" value="contact" />
              <p className="sr-only"><label>Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
              <div className="field">
                <label htmlFor="email">Your email *</label>
                <input type="email" id="email" name="email" placeholder="name@company.com" required autoComplete="email" />
              </div>
              <div className="field">
                <label htmlFor="service">What do you need? *</label>
                <select id="service" name="service" required defaultValue="">
                  <option value="" disabled>Choose a service</option>
                  {SERVICE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="details">Project details *</label>
                <textarea
                  id="details" name="details" rows={6} maxLength={1000}
                  placeholder="What you need, budget and deadline…" required
                  value={details} onChange={(e) => setDetails(e.target.value)} aria-describedby="details-count"
                />
                <small id="details-count" className={`count ${details.length > 950 ? 'warn' : ''}`}>{details.length}/1000</small>
              </div>
              <div>
                <button type="submit" className="btn btn-primary" disabled={state === 'sending'}>
                  {state === 'sending' ? 'Sending…' : 'Send message'} <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
              <div aria-live="polite">
                {state === 'ok' && <p className="form-status ok">Thank you. Your message is in, and we will reply shortly.</p>}
                {state === 'err' && <p className="form-status err">Something went wrong. Please try again, or email {CONTACT.email}.</p>}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <ServicesJourney />
      <AssistantDemo />
      <WorkSection />
      <About />
      <FAQ />
      <Contact />
    </>
  );
}
