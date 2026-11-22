import { useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import { EXPERTISE, type XpGroup } from '../data/content';
import { Label } from './Layout';

/* ------------------------------------------------------------------
   Expertise as a horizontal reel: the section pins to the screen and
   scrolling down slides all eight chapter cards sideways, like a film
   strip. The next cards always peek in from the right, so it never
   looks like the page has ended. A rail along the bottom tracks
   progress and jumps to any chapter.
   ------------------------------------------------------------------ */

type Chapter = XpGroup & { domain: string };
const CHAPTERS: Chapter[] = EXPERTISE.flatMap((d) => d.groups.map((g) => ({ ...g, domain: d.title })));
const N = CHAPTERS.length;
const ease = [0.16, 1, 0.3, 1] as const;

function Card({ c, i, p }: { c: Chapter; i: number; p: MotionValue<number> }) {
  // gentle parallax: the picture drifts against the card as the reel moves
  const imgX = useTransform(p, [0, 1], ['6%', '-6%']);
  return (
    <article className="xr-card">
      <div className="xr-media">
        {c.img ? (
          <motion.img src={c.img} alt="" loading="lazy" decoding="async" style={{ x: imgX }} />
        ) : (
          <div className="xr-typeframe">
            <span className="mono">{c.type?.small}</span>
            <strong>{c.type?.big}</strong>
          </div>
        )}
      </div>
      <div className="xr-meta mono">
        <span>{String(i + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}</span>
        <span>{c.domain}</span>
      </div>
      <h3 className="xr-title">{c.name}</h3>
      <p className="xr-line">{c.line}</p>
      {/* the full service list stays available to screen readers and search engines */}
      <ul className="sr-only">
        {c.items.map((it) => <li key={it.t}>{it.t}{it.note ? ` (${it.note})` : ''}</li>)}
      </ul>
    </article>
  );
}

export function ExpertiseFilm() {
  const section = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [active, setActive] = useState(0);

  // how far the strip has to travel so the last card ends at the right edge
  useLayoutEffect(() => {
    const measure = () => {
      const el = strip.current;
      if (!el) return;
      const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
      setDist(Math.max(0, el.scrollWidth - window.innerWidth + pad));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (strip.current) ro.observe(strip.current);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 });
  const x = useTransform(smooth, (v) => -v * dist);
  const rail = useTransform(smooth, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(N - 1, Math.max(0, Math.round(v * (N - 1)))));
  });

  const goTo = (i: number) => {
    const el = section.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    const y = top + travel * (i / (N - 1));
    const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number) => void } }).__lenis;
    if (lenis) lenis.scrollTo(y);
    else window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const domain = CHAPTERS[active].domain;

  return (
    <section id="expertise" className="dark xr" aria-labelledby="xr-title">
      {/* vertical scroll distance = horizontal travel, so the reel moves 1:1 with the wheel */}
      <div ref={section} className="xr-track" style={{ height: `calc(100vh + ${Math.round(dist * 1.1)}px)` }}>
        <div className="xr-stage">
          <div className="wrap xr-head">
            <div>
              <Label n="02">Expertise</Label>
              <h2 id="xr-title" className="xr-h2">Two disciplines. One desk.</h2>
            </div>
            <div className="xr-head-r mono">
              <AnimatePresence mode="wait">
                <motion.span key={domain} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35, ease }}>
                  {domain}
                </motion.span>
              </AnimatePresence>
              <span className="xr-cue">Scroll <i aria-hidden="true">→</i></span>
            </div>
          </div>

          <motion.div ref={strip} className="xr-strip" style={{ x }}>
            {CHAPTERS.map((c, i) => <Card key={c.name} c={c} i={i} p={smooth} />)}
          </motion.div>

          <div className="wrap xr-foot">
            <div className="xr-rail"><motion.span style={{ scaleX: rail }} /></div>
            <ol>
              {CHAPTERS.map((ch, i) => (
                <li key={ch.name} className={`${i === active ? 'on' : ''} ${i > 0 && CHAPTERS[i - 1].domain !== ch.domain ? 'split' : ''}`}>
                  <button onClick={() => goTo(i)} aria-current={i === active ? 'step' : undefined}>
                    <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                    <em>{ch.name}</em>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
