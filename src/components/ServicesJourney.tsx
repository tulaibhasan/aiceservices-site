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
import { SERVICES, type Service } from '../data/content';
import { ServiceArt } from './art';
import { Reveal, SectionHead } from './Layout';

/* ------------------------------------------------------------------
   Services journey.
   Desktop: a 3D corridor fly-through (sticky stage + CSS perspective;
   a world that dollies toward the viewer as you scroll, plates on the
   walls, each service hanging mid-corridor as a station).
   Phones / reduced motion: stacked panels.
   ------------------------------------------------------------------ */

const STATION = 2400;
const TRAVEL = STATION * SERVICES.length;

function useMedia(q: string) {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setM(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [q]);
  return m;
}

type PlaneSpec = { x: number; y: number; z: number; ry: number; w: number; h: number; kind: 'art' | 'spec' | 'list' };

function planesFor(s: number): PlaneSpec[] {
  const base = s * STATION;
  const flip = s % 2 === 0 ? 1 : -1;
  return [
    { x: -780 * flip, y: -20, z: -(base + 900), ry: 32 * flip, w: 640, h: 460, kind: 'art' },
    { x: 760 * flip, y: 60, z: -(base + 1450), ry: -32 * flip, w: 520, h: 360, kind: 'spec' },
    { x: -720 * flip, y: -60, z: -(base + 2150), ry: 28 * flip, w: 480, h: 340, kind: 'list' },
  ];
}

function Plane({ T, spec, svc }: { T: MotionValue<number>; spec: PlaneSpec; svc: Service }) {
  const opacity = useTransform(T, (t) => {
    const eff = spec.z + t;
    if (eff < -3400 || eff > 650) return 0;
    if (eff < -2800) return (eff + 3400) / 600;
    if (eff > 350) return 1 - (eff - 350) / 300;
    return 1;
  });
  return (
    <motion.figure
      className={`cor-plane cor-${spec.kind}`}
      style={{
        width: spec.w,
        height: spec.h,
        opacity,
        transform: `translate(-50%, -50%) translate3d(${spec.x}px, ${spec.y}px, ${spec.z}px) rotateY(${spec.ry}deg)`,
      }}
    >
      {spec.kind === 'art' && (
        <>
          <span className="mono cor-tag">{svc.code} · {svc.name}</span>
          <div className="cor-art"><ServiceArt id={svc.id} /></div>
        </>
      )}
      {spec.kind === 'spec' && (
        <div className="cor-spec">
          <span className="mono cor-tag">Spec sheet</span>
          <dl>
            {svc.spec.map(([k, v]) => (
              <Fragment key={k}><dt className="mono">{k}</dt><dd>{v}</dd></Fragment>
            ))}
          </dl>
        </div>
      )}
      {spec.kind === 'list' && (
        <div className="cor-list">
          <span className="mono cor-tag">Includes</span>
          <ul>{svc.points.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
      )}
    </motion.figure>
  );
}

function StationTitle({ T, s, svc }: { T: MotionValue<number>; s: number; svc: Service }) {
  const z = -(s * STATION + 1800);
  const opacity = useTransform(T, (t) => {
    const eff = z + t;
    if (eff < -2600 || eff > 500) return 0;
    if (eff < -2000) return (eff + 2600) / 600;
    if (eff > 200) return 1 - (eff - 200) / 300;
    return 1;
  });
  return (
    <motion.div className="cor-title" style={{ opacity, transform: `translate(-50%, -50%) translate3d(0, 0, ${z}px)` }} aria-hidden="true">
      <span className="mono">{svc.code} / {String(SERVICES.length).padStart(2, '0')} — {svc.tagline}</span>
      <strong>{svc.short}</strong>
    </motion.div>
  );
}

function Corridor() {
  const scroller = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scroller, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.35 });
  const T = useTransform(smooth, [0, 1], [0, TRAVEL]);
  const world = useTransform(T, (t) => `translate3d(0, 0, ${t}px)`);
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setActive(Math.min(SERVICES.length - 1, Math.max(0, Math.floor(p * SERVICES.length * 0.9999))));
  });

  const goTo = (i: number) => {
    const el = scroller.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + travel * ((i + 0.62) / SERVICES.length), behavior: 'smooth' });
  };

  const svc = SERVICES[active];

  return (
    <div ref={scroller} className="cor-scroller">
      <div className="cor-stick">
        <div className="cor-glow" aria-hidden="true" />
        <div className="cor-floor blueprint-grid on-dark" aria-hidden="true" />
        <motion.div className="cor-world" style={{ transform: world }} aria-hidden="true">
          {SERVICES.map((s, i) => (
            <Fragment key={s.id}>
              {planesFor(i).map((spec, k) => <Plane key={k} T={T} spec={spec} svc={s} />)}
              <StationTitle T={T} s={i} svc={s} />
            </Fragment>
          ))}
        </motion.div>

        <div className="cor-hud wrap">
          <AnimatePresence mode="wait">
            <motion.div
              key={svc.id}
              className="cor-info"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="label"><span className="tick" aria-hidden="true" />{svc.code} · {svc.tagline}</span>
              <h3 className="display h-md" style={{ margin: '10px 0 12px' }}>{svc.name}</h3>
              <p>{svc.summary}</p>
              <Link to="/#contact" className="btn btn-primary" style={{ marginTop: 18 }}>
                Start a project <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </motion.div>
          </AnimatePresence>

          <nav className="cor-stations" aria-label="Jump to a service">
            {SERVICES.map((s, i) => (
              <button key={s.id} aria-current={i === active ? 'step' : undefined} onClick={() => goTo(i)}>
                <span className="mono">{s.code}</span>
                <span className="cor-st-name">{s.short}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

function Stacked() {
  return (
    <div className="tool-stack">
      {SERVICES.map((s) => (
        <Reveal key={s.id}>
          <article className="tool-panel" aria-labelledby={`svc-${s.id}`}>
            <div className="tool-visual">
              <span className="corner tl mono">{s.code} · {s.short}</span>
              <div style={{ position: 'absolute', inset: '10% 6% 8%', color: 'var(--accent-ink)' }}>
                <ServiceArt id={s.id} />
              </div>
            </div>
            <div className="tool-copy">
              <span className="tool-tagline">{s.tagline}</span>
              <h3 id={`svc-${s.id}`} className="tool-name">{s.name}</h3>
              <p>{s.summary}</p>
              <ul className="svc-points">{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export function ServicesJourney() {
  const desktop = useMedia('(min-width: 1024px)');
  const reduce = useReducedMotion();
  const corridor = desktop && !reduce;

  return (
    <section id="services" className="section ink journey glow-section" data-theme="dark" aria-labelledby="services-title">
      <div className="wrap">
        <SectionHead index="01" title="Services" />
        <div className="grid-12" style={{ marginBottom: 'clamp(24px, 4vw, 48px)' }}>
          <Reveal className="col-span-12 lg:col-span-8">
            <h2 id="services-title" className="display h-lg">One studio, <span className="mark">four</span> ways to move faster.</h2>
          </Reveal>
          {corridor && (
            <Reveal className="col-span-12 lg:col-span-3 lg:col-start-10" delay={0.1}>
              <p className="mono" style={{ color: 'var(--accent-ink)', marginTop: 16 }}>Scroll to walk the line ↓</p>
            </Reveal>
          )}
        </div>
      </div>

      {corridor ? (
        <>
          <Corridor />
          <ul className="sr-only">
            {SERVICES.map((s) => (
              <li key={s.id}><h3>{s.name}</h3><p>{s.summary} {s.points.join('. ')}.</p></li>
            ))}
          </ul>
        </>
      ) : (
        <div className="wrap"><Stacked /></div>
      )}
    </section>
  );
}
