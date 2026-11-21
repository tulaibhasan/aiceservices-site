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
import { TOOLS, type Tool } from '../data/content';
import { NetworkPlan, ToolArt } from './art';
import { Reveal, SectionHead } from './Layout';

/* ------------------------------------------------------------------
   Four-tool journey.
   Desktop: a 3D "corridor" fly-through. A sticky stage with CSS
   perspective holds a world that dollies toward the viewer as you
   scroll; drawing plates sit on the left/right walls and each tool's
   name hangs in the middle of the corridor as a station.
   Mobile / reduced motion: four stacked panels.
   ------------------------------------------------------------------ */

const STATION = 2400; // world depth between stations (px)
const TRAVEL = STATION * TOOLS.length;

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

type PlaneSpec = { x: number; y: number; z: number; ry: number; w: number; h: number; kind: 'art' | 'spec' | 'plate' };

function planesFor(s: number): PlaneSpec[] {
  const base = s * STATION;
  const flip = s % 2 === 0 ? 1 : -1; // alternate walls per station
  return [
    { x: -780 * flip, y: -20, z: -(base + 900), ry: 32 * flip, w: 640, h: 460, kind: 'art' },
    { x: 760 * flip, y: 60, z: -(base + 1450), ry: -32 * flip, w: 520, h: 360, kind: 'spec' },
    { x: -720 * flip, y: -60, z: -(base + 2150), ry: 28 * flip, w: 480, h: 340, kind: 'plate' },
  ];
}

function Plane({ T, spec, tool }: { T: MotionValue<number>; spec: PlaneSpec; tool: Tool }) {
  // fade in from far away, fade out just before it passes the camera
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
          <span className="mono cor-tag">{tool.code} · {tool.name}</span>
          <div className="cor-art"><ToolArt id={tool.id} /></div>
        </>
      )}
      {spec.kind === 'spec' && (
        <div className="cor-spec">
          <span className="mono cor-tag">Spec sheet</span>
          <dl>
            <dt className="mono">Input</dt><dd>{tool.input}</dd>
            <dt className="mono">Output</dt><dd>{tool.output}</dd>
            <dt className="mono">Runs</dt><dd>In your browser</dd>
          </dl>
          <div className="chips">{tool.chips.map((c) => <span key={c} className="chip">{c}</span>)}</div>
        </div>
      )}
      {spec.kind === 'plate' && (
        <div className="cor-plate">
          <NetworkPlan className="cor-plate-art" />
          <span className="mono cor-tag">Sheet {tool.code}-A</span>
        </div>
      )}
    </motion.figure>
  );
}

function StationTitle({ T, s, tool }: { T: MotionValue<number>; s: number; tool: Tool }) {
  const z = -(s * STATION + 1800);
  const opacity = useTransform(T, (t) => {
    const eff = z + t;
    if (eff < -2600 || eff > 500) return 0;
    if (eff < -2000) return (eff + 2600) / 600;
    if (eff > 200) return 1 - (eff - 200) / 300;
    return 1;
  });
  return (
    <motion.div
      className="cor-title"
      style={{ opacity, transform: `translate(-50%, -50%) translate3d(0, 0, ${z}px)` }}
      aria-hidden="true"
    >
      <span className="mono">{String(s + 1).padStart(2, '0')} / {String(TOOLS.length).padStart(2, '0')} — {tool.tagline}</span>
      <strong>{tool.name.replace('AICE ', '')}</strong>
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
    setActive(Math.min(TOOLS.length - 1, Math.max(0, Math.floor(p * TOOLS.length * 0.9999))));
  });

  const goTo = (i: number) => {
    const el = scroller.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + travel * ((i + 0.62) / TOOLS.length), behavior: 'smooth' });
  };

  const t = TOOLS[active];

  return (
    <div ref={scroller} className="cor-scroller">
      <div className="cor-stick">
        <div className="cor-glow" aria-hidden="true" />
        <div className="cor-floor blueprint-grid on-dark" aria-hidden="true" />
        <motion.div className="cor-world" style={{ transform: world }} aria-hidden="true">
          {TOOLS.map((tool, s) => (
            <Fragment key={tool.id}>
              {planesFor(s).map((spec, k) => <Plane key={k} T={T} spec={spec} tool={tool} />)}
              <StationTitle T={T} s={s} tool={tool} />
            </Fragment>
          ))}
        </motion.div>

        {/* readable layer: details for the station you are at */}
        <div className="cor-hud wrap">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              className="cor-info"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="label"><span className="tick" aria-hidden="true" />{t.code} · {t.tagline}</span>
              <h3 className="display h-md" style={{ margin: '10px 0 12px' }}>{t.name}</h3>
              <p>{t.solution}</p>
              <Link to={t.route} className="btn btn-primary" style={{ marginTop: 18 }}>
                Open {t.name} — free <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </motion.div>
          </AnimatePresence>

          <nav className="cor-stations" aria-label="Jump to a tool">
            {TOOLS.map((tool, i) => (
              <button key={tool.id} aria-current={i === active ? 'step' : undefined} onClick={() => goTo(i)}>
                <span className="mono">{tool.code}</span>
                <span className="cor-st-name">{tool.name.replace('AICE ', '')}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

function StackedTools() {
  return (
    <div className="tool-stack">
      {TOOLS.map((t, i) => (
        <Reveal key={t.id}>
          <article className="tool-panel" aria-labelledby={`tool-${t.id}`}>
            <div className="tool-visual">
              <span className="corner tl mono">{t.code} · {t.name}</span>
              <span className="corner br mono">{String(i + 1).padStart(2, '0')} / 04</span>
              <div style={{ position: 'absolute', inset: '10% 6% 8%', color: 'var(--accent-ink)' }}>
                <ToolArt id={t.id} />
              </div>
            </div>
            <div className="tool-copy">
              <span className="tool-tagline">{t.tagline}</span>
              <h3 id={`tool-${t.id}`} className="tool-name">{t.name}</h3>
              <p><strong>The problem.</strong> {t.problem}</p>
              <p><strong>What it does.</strong> {t.solution}</p>
              <div className="tool-io mono" aria-label={`Input ${t.input}, output ${t.output}`}>
                <div><span style={{ color: 'var(--muted-dark)' }}>Input</span><b>{t.input}</b></div>
                <ArrowRight size={18} aria-hidden="true" />
                <div><span style={{ color: 'var(--muted-dark)' }}>Output</span><b>{t.output}</b></div>
              </div>
              <div className="chips" style={{ marginBottom: 24, color: 'var(--muted-dark)' }}>
                {t.chips.map((c) => <span className="chip" key={c}>{c}</span>)}
              </div>
              <Link to={t.route} className="btn btn-primary">Open {t.name} — free <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export function ToolsJourney() {
  const desktop = useMedia('(min-width: 1024px)');
  const reduce = useReducedMotion();
  const corridor = desktop && !reduce;

  return (
    <section id="tools" className="section ink journey glow-section" data-theme="dark" aria-labelledby="tools-title">
      <div className="wrap">
        <SectionHead index="01" title="Free AI tools" />
        <div className="grid-12" style={{ marginBottom: 'clamp(24px, 4vw, 48px)' }}>
          <Reveal className="col-span-12 lg:col-span-7">
            <h2 id="tools-title" className="display h-lg">Four tools. One promise: <span className="mark">precise</span> output.</h2>
          </Reveal>
          <Reveal className="col-span-12 lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="lede" style={{ marginTop: 8 }}>
              Built in-house for engineers who live in Word, PowerPoint, PDFs and BoQs. Free to use, running in your browser with your own Gemini key.
              {corridor && <span className="mono" style={{ display: 'block', marginTop: 16, color: 'var(--accent-ink)' }}>Scroll to walk the line ↓</span>}
            </p>
          </Reveal>
        </div>
      </div>

      {corridor ? (
        <>
          <Corridor />
          {/* full text for screen readers & search engines */}
          <ul className="sr-only">
            {TOOLS.map((t) => (
              <li key={t.id}>
                <h3>{t.name}</h3>
                <p>{t.problem} {t.solution}</p>
                <Link to={t.route} tabIndex={-1}>Open {t.name}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="wrap"><StackedTools /></div>
      )}
    </section>
  );
}
