import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { CONTACT, EXPERTISE, SERVICE_OPTIONS, WORK, type Work } from '../data/content';
import { Bloom, Label, Reveal } from './Layout';
import { OpeningSequence } from './Corridor';
import { AssistantDemo } from './AssistantDemo';

/* ---------- Statement: pinned while it lights up a few words at a time ---------- */
const STATEMENT = [
  'Ten years of',
  'donor-funded engineering,',
  'now moving at',
  'the speed of AI.',
  'We review designs,',
  'win bids,',
  'and build the websites,',
  'assistants and films',
  'that move a business forward.',
];

function Chunk({ text, k, n, p }: { text: string; k: number; n: number; p: MotionValue<number> }) {
  // each phrase owns an equal slice of the pinned scroll, lights over the first 60% of it
  const span = 0.86 / n;
  const start = 0.04 + k * span;
  // dimmed words stay above 3:1 contrast (large text)
  const opacity = useTransform(p, [start, start + span * 0.6], [0.46, 1]);
  return <motion.span style={{ opacity }}>{text} </motion.span>;
}

function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <section className="light statement" aria-label="About AICE">
      <div ref={ref} className="statement-track" style={{ height: `${100 + STATEMENT.length * 22}vh` }}>
        <div className="statement-pin">
          <div className="wrap">
            <Label n="01">Studio</Label>
            <p className="statement-text">
              {STATEMENT.map((t, k) => <Chunk key={k} text={t} k={k} n={STATEMENT.length} p={scrollYProgress} />)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Expertise: the full service list, grouped ---------- */
function Expertise() {
  return (
    <section id="expertise" className="sec dark expertise" aria-labelledby="xp-title">
      <div className="wrap">
        <div className="sec-head">
          <Label n="02">Expertise</Label>
          <h2 id="xp-title" className="h2">Two disciplines.<br />One desk.</h2>
        </div>
        <div className="xp-grid">
          {EXPERTISE.map((d) => (
            <div key={d.id} className="xp-domain">
              <Reveal className="xp-head">
                <h3>{d.title}</h3>
                <span className="mono">{String(d.groups.reduce((n, g) => n + g.items.length, 0)).padStart(2, '0')}</span>
              </Reveal>
              {d.groups.map((g, i) => (
                <Reveal key={g.name} delay={i * 0.06} className="xp-group">
                  <p className="mono">{g.name}</p>
                  <ul className="xp-items">
                    {g.items.map((it) => (
                      <li key={it.t}>{it.t}{it.note && <small>{it.note}</small>}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Work ---------- */
function Tile({ w }: { w: Work }) {
  const media = w.img ? (
    <img src={w.img} alt={w.alt ?? `${w.name} screenshot`} loading="lazy" decoding="async" />
  ) : (
    <div className="type-tile">
      <span className="mono">{w.type?.small}</span>
      <strong>{w.type?.big}</strong>
    </div>
  );
  const inner = (
    <>
      <Bloom className="tile-media">{media}</Bloom>
      <div className="tile-cap">
        <h3>{w.name}</h3>
        <span className="mono tile-status">{w.status}</span>
      </div>
      <p className="tile-line">{w.line}{w.href && <ArrowUpRight size={16} aria-hidden="true" className="tile-arrow" />}</p>
    </>
  );
  if (!w.href) return <div className="tile">{inner}</div>;
  return w.internal
    ? <Link to={w.href} className="tile">{inner}</Link>
    : <a href={w.href} className="tile" target="_blank" rel="noopener noreferrer">{inner}</a>;
}

function WorkSection() {
  return (
    <section id="work" className="sec light work" aria-labelledby="work-title">
      <div className="wrap">
        <div className="sec-head">
          <Label n="03">Selected work</Label>
          <h2 id="work-title" className="h2">Built here.<br />Used out there.</h2>
        </div>
        <ul className="tiles">
          {WORK.map((w, i) => (
            <Reveal as="li" key={w.id} delay={(i % 2) * 0.08} className={`tile-li t${i}`}>
              <Tile w={w} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <section id="about" className="sec light about" aria-labelledby="about-title">
      <div className="wrap about-grid">
        <Label n="05">About</Label>
        <Reveal className="about-photo">
          <img src="/Muhammad-Tulaib-Hasan-Picture.jpg" alt="Muhammad Tulaib Hasan, founder of AICE Services" width={240} height={300} loading="lazy" decoding="async" />
        </Reveal>
        <div>
          <Reveal>
            <h2 id="about-title" className="about-text">
              Founded by Muhammad Tulaib Hasan, a water and sanitation engineer with ten years on ADB, World Bank and Government of Punjab projects.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="facts mono">
              <li>FIDIC</li><li>ADB</li><li>World Bank</li><li>PPRA</li><li>PEC</li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
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
    <section id="contact" className="sec dark contact" aria-labelledby="contact-title">
      <div className="wrap">
        <Label n="06">Contact</Label>
        <h2 id="contact-title" className="mega contact-mega">
          <span className="mask-line in-view"><span>Let’s talk.</span></span>
        </h2>
        <div className="contact-grid">
          <div className="contact-direct">
            <a href={`mailto:${CONTACT.email}`} className="big-link">{CONTACT.email}</a>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="mono">WhatsApp {CONTACT.phone} ↗</a>
          </div>
          <form className="form" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit}>
            <input type="hidden" name="form-name" value="contact" />
            <p className="sr-only"><label>Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="you@company.com" required autoComplete="email" />
            </div>
            <div className="field">
              <label htmlFor="service">Service</label>
              <select id="service" name="service" required defaultValue="">
                <option value="" disabled>Choose one</option>
                {SERVICE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="details">Project</label>
              <textarea
                id="details" name="details" rows={4} maxLength={1000}
                placeholder="What you need, budget and deadline" required
                value={details} onChange={(e) => setDetails(e.target.value)} aria-describedby="details-count"
              />
              <small id="details-count" className={`count mono ${details.length > 950 ? 'warn' : ''}`}>{details.length}/1000</small>
            </div>
            <button type="submit" className="btn" disabled={state === 'sending'}>
              {state === 'sending' ? 'Sending…' : 'Send'} <ArrowRight size={16} aria-hidden="true" />
            </button>
            <div aria-live="polite">
              {state === 'ok' && <p className="form-status mono">Thank you. We’ll be in touch shortly.</p>}
              {state === 'err' && <p className="form-status err mono">That didn’t send. Please email {CONTACT.email}.</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <OpeningSequence />
      <Statement />
      <Expertise />
      <WorkSection />
      <AssistantDemo />
      <About />
      <Contact />
    </>
  );
}
