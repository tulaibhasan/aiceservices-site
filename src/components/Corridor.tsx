import { Fragment, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import { SERVICES, VALUES, type Plate, type Service, type Value } from '../data/content';

/* ------------------------------------------------------------------
   Opening film: hero → a 3D fly-through of the services.
   A sticky stage with CSS perspective holds a "world" that dollies
   toward the viewer as you scroll. Each service is a cluster of
   pictures at different depths around its name: some behind the
   title, some in front, all growing until they leave past the edges
   of the screen. Between services, short "value" beats put a caption
   in a corner instead, so the text moves left, centre and right.
   ------------------------------------------------------------------ */

type Beat = { kind: 'svc'; svc: Service } | { kind: 'val'; val: Value };
// Design · Precision · Procurement · Contracts · One desk · Assistants · Software · Speed · Video
const BEATS: Beat[] = [
  { kind: 'svc', svc: SERVICES[0] },
  { kind: 'val', val: VALUES[0] },
  { kind: 'svc', svc: SERVICES[1] },
  { kind: 'svc', svc: SERVICES[2] },
  { kind: 'val', val: VALUES[1] },
  { kind: 'svc', svc: SERVICES[3] },
  { kind: 'svc', svc: SERVICES[4] },
  { kind: 'val', val: VALUES[2] },
  { kind: 'svc', svc: SERVICES[5] },
];

const INTRO = 1400;
const STEP = 1500;
const TITLE_DZ = 1900;
// ends with the last title at reading distance, so the stage hands off cleanly
const TRAVEL = INTRO + STEP * (BEATS.length - 1) + 1300;
// ~40px of travel per 1vh of scroll on desktop, ~50 on phones: the film plays in a few flicks
const scrollVh = (phone: boolean) => Math.round(100 + TRAVEL / (phone ? 50 : 40));

/* Where the pictures sit around each beat (desktop units at 1440px wide; dz = depth beyond the beat) */
type Slot = { x: number; y: number; dz: number; w: number; ry: number };
const SVC_SLOTS: Slot[] = [
  { x: -560, y: 100, dz: 1500, w: 560, ry: 18 }, // in front of the title, lower left
  { x: 270, y: -130, dz: 2250, w: 360, ry: -8 }, // behind the title, upper right
  { x: 770, y: 30, dz: 1100, w: 640, ry: -20 }, // early, sweeps out to the right
];
const VAL_SLOTS: Slot[] = [
  { x: -600, y: 40, dz: 1250, w: 720, ry: 20 },
  { x: 430, y: -70, dz: 1750, w: 520, ry: -16 },
];
// phones: a tall screen, so pictures sit above and below the title instead of beside it
const SVC_SLOTS_PHONE: Slot[] = [
  { x: -80, y: 215, dz: 1500, w: 250, ry: 14 },
  { x: 80, y: -205, dz: 2250, w: 190, ry: -8 },
  { x: 150, y: -30, dz: 1100, w: 260, ry: -18 },
];
const VAL_SLOTS_PHONE: Slot[] = [
  { x: -70, y: 190, dz: 1250, w: 290, ry: 16 },
  { x: 70, y: -195, dz: 1750, w: 230, ry: -12 },
];

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

/* A picture in the world: it fades in far away, then simply keeps coming until it has left the screen */
function PlaneEl({ T, base, slot, flip, p, phone, k }: { T: MotionValue<number>; base: number; slot: Slot; flip: number; p: Plate; phone: boolean; k: number }) {
  const z = -(base + slot.dz);
  const s = phone ? 1 : k;
  const w = slot.w * s;
  const h = w * (p.kind === 'chat' ? 0.78 : 0.66);
  const opacity = useTransform(T, (t) => (t < 300 ? 0 : fade(z + t, -2700, -2100, 880, 1060)));
  return (
    <motion.figure
      className={`plane plane-${p.kind}`}
      style={{
        width: w, height: h, opacity,
        transform: `translate(-50%, -50%) translate3d(${slot.x * s * flip}px, ${slot.y * (phone ? 1 : k)}px, ${z}px) rotateY(${slot.ry * flip}deg)`,
      }}
    >
      <PlateBody p={p} />
    </motion.figure>
  );
}

/* Service beat: name, label and one line, hanging in the world so it flies past too */
function ServiceTitle({ T, base, svc }: { T: MotionValue<number>; base: number; svc: Service }) {
  const z = -(base + TITLE_DZ);
  const opacity = useTransform(T, (t) => fade(z + t, -1850, -1500, -420, -120));
  return (
    <motion.div className="station" style={{ opacity, transform: `translate(-50%, -50%) translate3d(0, 0, ${z}px)` }} aria-hidden="true">
      <span className="station-eyebrow mono">{svc.n} — {svc.name}</span>
      <span className={`station-title ${svc.title.length > 10 ? 'long' : ''}`}>{svc.title}</span>
      <span className="station-sub">{svc.line}</span>
    </motion.div>
  );
}

/* Value beat: a caption that slides into a corner of the screen while its pictures fly by */
function ValueCaption({ T, base, val }: { T: MotionValue<number>; base: number; val: Value }) {
  const opacity = useTransform(T, (t) => fade(t - base, 250, 550, 1250, 1550));
  const y = useTransform(T, [base + 250, base + 900], [24, 0]);
  return (
    <motion.div className={`op-caption wrap ${val.side}`} style={{ opacity }} aria-hidden="true">
      <motion.div className="op-caption-in" style={{ y }}>
        <span className="mono">{val.n}</span>
        <strong>{val.title}</strong>
        <p>{val.line}</p>
      </motion.div>
    </motion.div>
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
  const phone = k < 0.6;
  const { scrollYProgress } = useScroll({ target: scroller, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 170, damping: 30, mass: 0.3 });
  const T = useTransform(smooth, [0, 1], [0, TRAVEL]);
  const world = useTransform(T, (t) => `translate3d(0, 0, ${t}px)`);
  // the headline itself flies toward you and dissolves as the first pictures sweep over it
  const introOpacity = useTransform(T, [0, 650], [1, 0]);
  const introScale = useTransform(T, [0, 900], [1, 1.22]);
  const heroOpacity = useTransform(T, [0, 300, 1300], [1, 0.9, 0]);
  const heroScale = useTransform(T, [0, 1400], [1, 1.35]);
  const vignette = useTransform(T, [0, 1000], [1, 0.45]);

  return (
    <section id="top" className="opening" aria-labelledby="hero-title">
      <div ref={scroller} className="op-scroller" style={{ height: `${scrollVh(phone)}vh` }}>
        <div className="op-stage">
          <motion.div className="op-hero" style={{ opacity: heroOpacity, scale: heroScale }} aria-hidden="true">
            <picture>
              <source media="(max-width: 700px)" srcSet="/img/hero-m.webp" />
              <img src="/img/hero.webp" alt="" fetchPriority="high" decoding="async" />
            </picture>
          </motion.div>
          <div className="op-glow" aria-hidden="true" />

          <motion.div className="op-world" style={{ transform: world }} aria-hidden="true">
            {BEATS.map((b, i) => {
              const base = INTRO + i * STEP;
              const flip = i % 2 === 0 ? 1 : -1;
              if (b.kind === 'svc') {
                const plates: Plate[] = [b.svc.plates[0], b.svc.plates[1], b.svc.extra ?? b.svc.plates[0]];
                const slots = phone ? SVC_SLOTS_PHONE : SVC_SLOTS;
                return (
                  <Fragment key={`s${i}`}>
                    {slots.map((sl, j) => <PlaneEl key={j} T={T} base={base} slot={sl} flip={flip} p={plates[j]} phone={phone} k={k} />)}
                  </Fragment>
                );
              }
              const slots = phone ? VAL_SLOTS_PHONE : VAL_SLOTS;
              return (
                <Fragment key={`v${i}`}>
                  {slots.map((sl, j) => <PlaneEl key={j} T={T} base={base} slot={sl} flip={flip} p={b.val.plates[j]} phone={phone} k={k} />)}
                </Fragment>
              );
            })}
          </motion.div>

          <motion.div className="op-vignette" style={{ opacity: vignette }} aria-hidden="true" />

          {/* titles fly in their own layer, so a picture passing in front never hides the words */}
          <motion.div className="op-world" style={{ transform: world }} aria-hidden="true">
            {BEATS.map((b, i) => (b.kind === 'svc' ? <ServiceTitle key={i} T={T} base={INTRO + i * STEP} svc={b.svc} /> : null))}
          </motion.div>

          {BEATS.map((b, i) => (b.kind === 'val' ? <ValueCaption key={i} T={T} base={INTRO + i * STEP} val={b.val} /> : null))}

          <motion.div className="op-intro wrap" style={{ opacity: introOpacity, scale: introScale }}>
            <p className="eyebrow mono"><Lines text={['AICE Services']} /></p>
            <h1 id="hero-title" className="mega">
              <Lines text={['Engineering', '& AI studio']} delay={0} />
            </h1>
            <div className="op-intro-foot">
              <p className="hero-sub"><Lines text={['Design, bids and contracts. AI, software and video.', 'Precise, and fast.']} delay={0.25} /></p>
              <span className="scroll-cue mono">Scroll <i aria-hidden="true" /></span>
            </div>
          </motion.div>
        </div>
      </div>
      {/* full text for screen readers & search engines */}
      <ul className="sr-only">
        {SERVICES.map((s) => <li key={s.id}><h2>{s.name}</h2><p>{s.line}</p></li>)}
        {VALUES.map((v) => <li key={v.n}><strong>{v.title}</strong>: {v.line}</li>)}
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
