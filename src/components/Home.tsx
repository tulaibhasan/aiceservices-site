import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Asterisk } from 'lucide-react';
import { CONTACT, FAQS, PROCESS, SERVICES, STANDARDS, TICKER, TOOLS } from '../data/content';
import { ContourField, IsoFacility, NetworkPlan } from './art';
import { Reveal, SectionHead } from './Layout';
import { ToolsJourney } from './ToolsJourney';
import { KeyDemo } from './KeyDemo';

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="home" className="hero blueprint-grid" data-theme="light" aria-labelledby="hero-title">
      <div className="hero-art" aria-hidden="true">
        <ContourField className="contours" />
        <NetworkPlan className="network" />
      </div>
      <div className="wrap" style={{ position: 'relative' }}>
        <div className="hero-top">
          <span className="label"><span className="tick" aria-hidden="true" />AI + Civil Engineering</span>
          <span className="label">Water · Sanitation · Solid waste</span>
        </div>
        <h1 id="hero-title" className="display h-xl hero-in">
          Smarter cities, <span className="hl">engineered</span> with <span className="mark">AI.</span>
        </h1>
        <div className="hero-bottom">
          <div className="hero-in d1">
            <p className="lede" style={{ color: 'var(--ink)', opacity: 0.8 }}>
              Audit-ready engineering for water, sanitation and solid-waste projects, plus free AI tools that make bid, BoQ and report work faster. Built to ADB, World Bank and PPRA standards.
            </p>
            <div className="hero-ctas" style={{ marginTop: 28 }}>
              <Link to="/#tools" className="btn btn-primary">Try the free AI tools <ArrowRight size={16} aria-hidden="true" /></Link>
              <Link to="/#contact" className="btn btn-ghost">Book a consultation</Link>
            </div>
          </div>
          <div className="hero-in d2">
            <dl className="hero-meta">
              <div><dt className="mono">Experience</dt><dd>10+ yrs</dd></div>
              <div><dt className="mono">AI tools</dt><dd>4 free</dd></div>
              <div><dt className="mono">Frameworks</dt><dd>ADB · WB · PPRA</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Ticker ---------- */
function Ticker() {
  const items = [...TICKER];
  const row = (hidden: boolean) => (
    <div style={{ display: 'flex' }} aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <span className="ticker-item" key={t + hidden}>
          {t} <Asterisk size={22} aria-hidden="true" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="ticker" role="region" aria-label="Highlights">
      <div className="ticker-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/* ---------- Consultancy ---------- */
function Consultancy() {
  return (
    <section id="consultancy" className="section" data-theme="light" aria-labelledby="consultancy-title">
      <div className="col-rules" aria-hidden="true"><span /><span /><span /><span /></div>
      <div className="wrap" style={{ position: 'relative' }}>
        <SectionHead index="03" title="Specialist consultancy" />
        <div className="grid-12" style={{ marginBottom: 'clamp(40px, 6vw, 72px)' }}>
          <Reveal className="col-span-12 lg:col-span-8">
            <h2 id="consultancy-title" className="display h-lg">Engineering judgement for <span className="mark">donor-funded</span> projects.</h2>
          </Reveal>
          <Reveal className="col-span-12 lg:col-span-4" delay={0.1}>
            <p className="lede" style={{ marginTop: 8 }}>
              Hands-on reviews, contract support and bid work from a team that has delivered on ADB, World Bank and Government of Punjab programmes.
            </p>
          </Reveal>
        </div>
        <div className="services">
          {SERVICES.map((s, i) => (
            <Reveal key={s.code} delay={i * 0.06}>
              <article className="service">
                <span className="mono service-code">{s.code}</span>
                <div>
                  <h3 className="display h-md">{s.title}</h3>
                  <p style={{ marginTop: 14 }}>{s.summary}</p>
                  <div className="chips" style={{ marginTop: 18, color: 'var(--muted)' }}>
                    {s.chips.map((c) => <span key={c} className="chip">{c}</span>)}
                  </div>
                </div>
                <ul>
                  {s.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <Link to="/#contact" className="btn btn-primary">Request expert consultation <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Custom automation ---------- */
const BUILDS = [
  ['Client-side AI engines', 'Private · in-browser'],
  ['Automated QA pipelines', 'Reports · drawings'],
  ['PDF-to-BoQ scrapers', 'Tenders · schedules'],
  ['Project dashboards', 'Progress · compliance'],
];

function Automation() {
  return (
    <section id="automation" className="section ink glow-section" data-theme="dark" aria-labelledby="automation-title">
      <div className="wrap">
        <SectionHead index="04" title="Custom automation" />
        <div className="automation">
          <div>
            <Reveal>
              <h2 id="automation-title" className="display h-lg">Need a tool built <span className="mark">for your project?</span></h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lede" style={{ marginTop: 24 }}>
                The free tools show what we build in-house. For engineering firms, consultancies and public authorities, we design and deploy private automation, shaped to your guidelines and your data.
              </p>
              <table className="spec-table">
                <caption className="sr-only">What we build</caption>
                <thead className="sr-only"><tr><th scope="col">Deliverable</th><th scope="col">Typical use</th></tr></thead>
                <tbody>
                  {BUILDS.map(([a, b], i) => (
                    <tr key={a}>
                      <th scope="row">{String(i + 1).padStart(2, '0')}</th>
                      <td>{a}</td>
                      <td>{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: 36 }}>
                <Link to="/#contact" className="btn btn-primary">Hire us for custom work <ArrowRight size={16} aria-hidden="true" /></Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <IsoFacility className="iso" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Standards ---------- */
function Standards() {
  return (
    <section id="standards" className="section paper-2" data-theme="light" aria-labelledby="standards-title">
      <div className="wrap">
        <SectionHead index="05" title="Compliance standards" />
        <div className="grid-12" style={{ marginBottom: 'clamp(32px, 5vw, 56px)' }}>
          <Reveal className="col-span-12 lg:col-span-7">
            <h2 id="standards-title" className="display h-md">Every deliverable is checked against the frameworks your funder and regulator use.</h2>
          </Reveal>
        </div>
        <Reveal>
          <ul className="standards-grid" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {STANDARDS.map((s) => (
              <li className="std" key={s.code}>
                <div className="std-top">
                  <span className="label">{s.code}</span>
                  <span className="label">{s.scope === 'International' ? 'INTL' : 'PK'}</span>
                </div>
                <div>
                  <div className="std-name">{s.name}</div>
                  <div className="std-note">{s.note}</div>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <section id="about" className="section" data-theme="light" aria-labelledby="about-title">
      <div className="wrap">
        <SectionHead index="06" title="About" />
        <div className="about">
          <Reveal>
            <figure className="portrait" style={{ margin: 0 }}>
              <span className="crop tl" /><span className="crop tr" /><span className="crop bl" /><span className="crop br" />
              <div className="frame">
                <img
                  src="/Muhammad-Tulaib-Hasan-Picture.jpg"
                  alt="Portrait of Muhammad Tulaib Hasan, founder of AICE Services"
                  width={460}
                  height={575}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="mono">
                <span>Muhammad Tulaib Hasan</span>
                <span style={{ color: 'var(--muted)' }}>Founder</span>
              </figcaption>
            </figure>
          </Reveal>
          <div>
            <Reveal>
              <h2 id="about-title" className="display h-lg">A decade in water, sanitation and <span className="mark">solid waste.</span></h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lede" style={{ marginTop: 24 }}>
                Led by water and sanitation expert Muhammad Tulaib Hasan, AICE Services brings donor-funded compliance and AI engineering workflows together. We pair our own AI tools with hands-on engineering review, so complex infrastructure projects get compliant, audit-ready deliverables, faster.
              </p>
              <div className="about-stats">
                <div><b>10+</b><span className="mono" style={{ color: 'var(--muted)' }}>Years</span></div>
                <div><b>3</b><span className="mono" style={{ color: 'var(--muted)' }}>Funders: ADB · WB · GoPb</span></div>
                <div><b>4</b><span className="mono" style={{ color: 'var(--muted)' }}>Free AI tools</span></div>
              </div>
            </Reveal>
            <div style={{ display: 'grid', gap: 32, marginTop: 48 }}>
              <Reveal>
                <blockquote className="quote">
                  <span className="label">Vision</span>
                  <p>“Our vision is to transform how projects are delivered — by integrating AI and engineering to achieve efficiency, transparency, and resilience for the future.”</p>
                </blockquote>
              </Reveal>
              <Reveal delay={0.1}>
                <blockquote className="quote">
                  <span className="label">Founder’s note</span>
                  <p>“As the founder of AICE Services, I believe the fusion of engineering and AI is not just about speeding up processes. It’s about enabling smarter decisions, ensuring accountability, and creating sustainable outcomes.”</p>
                </blockquote>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */
function Process() {
  return (
    <section id="process" className="section ink glow-section" data-theme="dark" aria-labelledby="process-title">
      <div className="wrap">
        <SectionHead index="07" title="How we work" />
        <Reveal>
          <h2 id="process-title" className="display h-lg" style={{ marginBottom: 'clamp(40px, 6vw, 72px)', maxWidth: '14ch' }}>
            From first message to <span className="mark">site.</span>
          </h2>
        </Reveal>
        <ol className="process" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {PROCESS.map((p, i) => (
            <Reveal as="li" className="step" key={p.n} delay={i * 0.08}>
              <span className="n">{p.n} ——</span>
              <div>
                <h3 className="display h-sm">{p.title}</h3>
                <p style={{ marginTop: 10 }}>{p.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  return (
    <section id="faq" className="section" data-theme="light" aria-labelledby="faq-title">
      <div className="wrap">
        <SectionHead index="08" title="FAQ" />
        <div className="faq">
          <div className="faq-aside">
            <h2 id="faq-title" className="display h-lg">Questions, <span className="mark">answered.</span></h2>
            <p className="lede" style={{ marginTop: 20 }}>
              About our consultancy, each AI tool, and how we handle your data and API keys.
            </p>
            <div style={{ marginTop: 28 }}>
              <Link to="/#contact" className="btn-split"><span>Ask us directly</span><span><ArrowUpRight size={14} aria-hidden="true" /></span></Link>
            </div>
          </div>
          <div>
            {FAQS.map((g) => (
              <div className="faq-group" key={g.category}>
                <h3 className="label">{g.category}</h3>
                {g.items.map((it) => (
                  <details key={it.q}>
                    <summary>
                      <span>{it.q}</span>
                      <span className="pm" aria-hidden="true" />
                    </summary>
                    <p>{it.a}</p>
                  </details>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
const SERVICE_OPTIONS = [
  ...TOOLS.map((t) => t.name),
  'Engineering Design Review',
  'Contract & Claims',
  'Bid Preparation & Evaluation',
  'Custom automation / Other',
];

function Contact() {
  const [details, setDetails] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setState('sending');
    try {
      const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
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
    <section id="contact" className="section ink" data-theme="dark" aria-labelledby="contact-title" style={{ overflow: 'hidden' }}>
      <ContourField className="contact-contours" />
      <div className="wrap" style={{ position: 'relative' }}>
        <SectionHead index="09" title="Contact" />
        <div className="contact">
          <div>
            <Reveal>
              <h2 id="contact-title" className="display h-lg">Tell us about <span className="mark">the project.</span></h2>
              <p className="lede" style={{ marginTop: 20 }}>A design review, a claim, a tender deadline or a tool you wish existed. We respond promptly.</p>
            </Reveal>
            <div className="contact-direct">
              <a href={`mailto:${CONTACT.email}`}><span className="mono" style={{ color: 'var(--muted-dark)' }}>Email</span><span className="v">{CONTACT.email}</span></a>
              <a href={CONTACT.phoneHref}><span className="mono" style={{ color: 'var(--muted-dark)' }}>Phone</span><span className="v">{CONTACT.phone}</span></a>
              <div><span className="mono" style={{ color: 'var(--muted-dark)' }}>Hours</span><span className="v" style={{ fontSize: 16 }}>{CONTACT.hours}</span></div>
            </div>
          </div>

          <Reveal delay={0.1}>
            <form
              className="form"
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={onSubmit}
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="sr-only"><label>Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
              <div className="field">
                <label htmlFor="email">Your email *</label>
                <input type="email" id="email" name="email" placeholder="name@organisation.com" required autoComplete="email" />
              </div>
              <div className="field">
                <label htmlFor="service">Service or tool *</label>
                <select id="service" name="service" required defaultValue="">
                  <option value="" disabled>Choose a service or tool</option>
                  {SERVICE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="details">How can we help? *</label>
                <textarea
                  id="details"
                  name="details"
                  rows={6}
                  maxLength={1000}
                  placeholder="Describe the challenge, standards involved and any deadlines…"
                  required
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  aria-describedby="details-count"
                />
                <small id="details-count" className={`count ${details.length > 950 ? 'warn' : ''}`}>{details.length}/1000</small>
              </div>
              <div>
                <button type="submit" className="btn btn-primary" disabled={state === 'sending'}>
                  {state === 'sending' ? 'Sending…' : 'Send message'} <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
              <div aria-live="polite">
                {state === 'ok' && <p className="form-status ok">Thank you. Your message is in, and we will contact you shortly.</p>}
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
      <ToolsJourney />
      <KeyDemo />
      <Consultancy />
      <Automation />
      <Standards />
      <About />
      <Process />
      <FAQ />
      <Contact />
    </>
  );
}
