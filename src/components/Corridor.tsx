import { Fragment, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { SERVICES, type Plate, type Service } from '../data/content';

/* ------------------------------------------------------------------
   Opening sequence: hero → 3D corridor through the four services.
   A sticky stage with CSS perspective holds a "world" that dollies
   toward the viewer as you scroll. Two plates per service line the
   walls; the service name hangs mid-corridor. All motion is one
   composited transform on the world plus per-plate opacity.
   ------------------------------------------------------------------ */

const INTRO = 1400;
const STATION = 2000;
// ends with the last title at reading distance, so the stage hands off cleanly
const TRAVEL = INTRO + STATION * (SERVICES.length - 1) + 1350;
// scroll length grows with the number of stations (≈18px of travel per 1vh of scroll)
const SCROLL_VH = Math.round(100 + TRAVEL / 18);

function useScale() {
  const get = () => (typeof window === 'undefined' ? 1 : Math.min(1, Math.max(0.42, window.innerWidth / 1440)));
  const [k, setK] = useState(get);
  useEffect(() => {
    const on = () => setK(get());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return k;
}

function fade(eff: number, farStart: number, farEnd: number, nearStart: number, nearEnd: number) {
  if (eff < farStart || eff > nearEnd) return 0;
  if (eff < farEnd) return (eff - farStart) / (farEnd - farStart);
  if (eff > nearStart) return 1 - (eff - nearStart) / (nearEnd - nearStart);
  return 1;
}

function PlateBody({ p }: { p: Plate }) {
  if (p.kind === 'img') return <img src={p.src} alt="" decoding="async" draggable={false} />;
  if (p.kind === 'type')
    return (
      <div className={`plate-type ${p.light ? 'light' : ''}`}>
        <span className="mono">{p.small}</span>
        <strong>{p.big}</strong>
      </div>
    );
  return (
    <div className="plate-chat">
      <span className="mono">Assistant · live</span>
      <p className="b u">Do you have a slot tomorrow evening?</p>
      <p className="b a">Yes: 6:30 or 7:15 pm. Shall I book one?</p>
      <p className="b u">6:30 please.</p>
      <div className="mini-wave" aria-hidden="true">{Array.from({ length: 24 }).map((_, i) => <i key={i} />)}</div>
    </div>
  );
}

function PlaneEl({ T, z, x, y, ry, w, h, p, early = false }: { T: MotionValue<number>; z: number; x: number; y: number; ry: number; w: number; h: number; p: Plate; early?: boolean }) {
  // `early`: leave before reaching the caption area (phones)
  const opacity = useTransform(T, (t) => (t < 350 ? 0 : early ? fade(z + t, -1300, -900, -750, -480) : fade(z + t, -1300, -800, 250, 650)));
  return (
    <motion.figure
      className={`plane plane-${p.kind}`}
      style={{ width: w, height: h, opacity, transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotateY(${ry}deg)` }}
    >
      <PlateBody p={p} />
    </motion.figure>
  );
}

function Station({ T, s, svc, k }: { T: MotionValue<number>; s: number; svc: Service; k: number }) {
  const base = INTRO + s * STATION;
  const flip = s % 2 === 0 ? 1 : -1;
  const titleZ = -(base + 1900);
  const titleOpacity = useTransform(T, (t) => fade(titleZ + t, -2300, -1800, -550, -300));
  const phone = k < 0.6;
  const W = phone ? 300 : 700 * k;
  return (
    <>
      {phone ? (
        <>
          {/* tall screens: plates fly in above and below the title */}
          <PlaneEl T={T} p={svc.plates[0]} z={-(base + 1000)} x={-40 * flip} y={-360} ry={12 * flip} w={W} h={W * 0.6} />
          <PlaneEl T={T} p={svc.plates[1]} z={-(base + 1600)} x={40 * flip} y={330} ry={-12 * flip} w={W * 0.9} h={W * 0.9 * 0.62} early />
        </>
      ) : (
        <>
          <PlaneEl T={T} p={svc.plates[0]} z={-(base + 1000)} x={-920 * k * flip} y={-30 * k} ry={30 * flip} w={W} h={W * 0.6} />
          <PlaneEl T={T} p={svc.plates[1]} z={-(base + 1600)} x={920 * k * flip} y={40 * k} ry={-30 * flip} w={W * 0.9} h={W * 0.9 * 0.62} />
        </>
      )}
      <motion.div className={`station-title ${svc.title.length > 10 ? 'long' : ''}`} style={{ opacity: titleOpacity, transform: `translate(-50%, -50%) translate3d(0, 0, ${titleZ}px)` }} aria-hidden="true">
        {svc.title}
      </motion.div>
    </>
  );
}

// If the static boot copy (index.html) is still on screen, continue its animation
// from the same moment so the handover is invisible.
const bootElapsed =
  typeof document !== 'undefined' && document.getElementById('boot')
    ? (performance.now() - ((window as unknown as { __bootT?: number }).__bootT ?? performance.now())) / 1000
    : 0;

function Lines({ text, delay = 0 }: { text: string[]; delay?: number }) {
  return (
    <>
      {text.map((t, i) => (
        <span className="mask-line" key={t}>
          <span style={{ animationDelay: `${delay + i * 0.09 - bootElapsed}s` }}>{t}</span>
        </span>
      ))}
    </>
  );
}

function Opening() {
  const scroller = useRef<HTMLDivElement>(null);
  const k = useScale();
  const { scrollYProgress } = useScroll({ target: scroller, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: 0.35 });
  const T = useTransform(smooth, [0, 1], [0, TRAVEL]);
  const world = useTransform(T, (t) => `translate3d(0, 0, ${t}px)`);
  const introOpacity = useTransform(T, [0, 700], [1, 0]);
  const introY = useTransform(T, [0, 900], [0, -60]);
  const heroOpacity = useTransform(T, [0, 300, 1300], [1, 0.9, 0]);
  const heroScale = useTransform(T, [0, 1400], [1, 1.35]);
  const [active, setActive] = useState(-1);

  useMotionValueEvent(T, 'change', (t) => {
    const i = Math.floor((t - INTRO + 500) / STATION);
    setActive(t < INTRO - 200 ? -1 : Math.min(SERVICES.length - 1, Math.max(0, i)));
  });

  const goTo = (i: number) => {
    const el = scroller.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    const t = INTRO + i * STATION + 1300;
    window.scrollTo({ top: top + travel * (t / TRAVEL), behavior: 'smooth' });
  };

  const svc = active >= 0 ? SERVICES[active] : null;

  return (
    <section id="top" className="opening" aria-labelledby="hero-title">
      <div ref={scroller} className="op-scroller" style={{ height: `${SCROLL_VH}vh` }}>
        <div className="op-stage">
          <motion.div className="op-hero" style={{ opacity: heroOpacity, scale: heroScale }} aria-hidden="true">
            <picture>
              <source media="(max-width: 700px)" srcSet="/img/hero-m.webp" />
              <img src="/img/hero.webp" alt="" fetchPriority="high" decoding="async" />
            </picture>
          </motion.div>
          <div className="op-glow" aria-hidden="true" />

          <motion.div className="op-world" style={{ transform: world }} aria-hidden="true">
            {SERVICES.map((s, i) => <Station key={s.id} T={T} s={i} svc={s} k={k} />)}
          </motion.div>

          <div className="op-vignette" aria-hidden="true" />

          <motion.div className="op-intro wrap" style={{ opacity: introOpacity, y: introY }}>
            <p className="eyebrow mono"><Lines text={['AICE Services']} /></p>
            <h1 id="hero-title" className="mega">
              <Lines text={['Engineering', '& AI studio']} delay={0} />
            </h1>
            <div className="op-intro-foot">
              <p className="hero-sub"><Lines text={['Design, bids and contracts. AI, software and video.', 'Precise, and fast.']} delay={0.25} /></p>
              <span className="scroll-cue mono">Scroll <i aria-hidden="true" /></span>
            </div>
          </motion.div>

          <div className="op-hud wrap">
            <AnimatePresence mode="wait">
              {svc && (
                <motion.div
                  key={svc.id}
                  className="op-detail"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="mono">{svc.n} / {String(SERVICES.length).padStart(2, '0')} — {svc.name}</span>
                  <p>{svc.line}</p>
                  <div className="op-links">
                    <Link to="/#contact" className="link-arrow">Start a project <ArrowRight size={15} aria-hidden="true" /></Link>
                    {svc.link && <a href={svc.link.href} className="link-arrow">{svc.link.label} <ArrowRight size={15} aria-hidden="true" /></a>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <nav className="op-index" aria-label="Services" style={{ opacity: svc ? 1 : 0 }}>
              {SERVICES.map((s, i) => (
                <button key={s.id} aria-current={i === active ? 'step' : undefined} onClick={() => goTo(i)} tabIndex={svc ? 0 : -1}>
                  <span className="mono">{s.n}</span> {s.title}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {/* full text for screen readers & search engines */}
      <ul className="sr-only">
        {SERVICES.map((s) => <li key={s.id}><h2>{s.name}</h2><p>{s.line}</p></li>)}
      </ul>
    </section>
  );
}

/* Reduced motion: a still hero and a simple list, no fly-through */
function StillOpening() {
  return (
    <section id="top" className="still" aria-labelledby="hero-title">
      <div className="op-hero still-hero" aria-hidden="true"><img src="/img/hero.webp" alt="" /></div>
      <div className="op-vignette" aria-hidden="true" />
      <div className="wrap still-inner">
        <p className="eyebrow mono">AICE Services</p>
        <h1 id="hero-title" className="mega">Engineering<br />&amp; AI studio</h1>
        <p className="hero-sub">Design, bids and contracts. AI, software and video. Precise, and fast.</p>
      </div>
      <div className="wrap still-list">
        {SERVICES.map((s) => (
          <Fragment key={s.id}>
            <div className="still-item"><span className="mono">{s.n}</span><h2>{s.name}</h2><p>{s.line}</p></div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}

export function OpeningSequence() {
  const reduce = useReducedMotion();
  return reduce ? <StillOpening /> : <Opening />;
}
