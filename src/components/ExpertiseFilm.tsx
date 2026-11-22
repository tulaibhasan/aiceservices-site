import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { EXPERTISE } from '../data/content';
import { Label } from './Layout';

/* ------------------------------------------------------------------
   Expertise as a film: the section pins to the screen and scrolling
   plays it chapter by chapter. Each chapter wipes in a new picture,
   slides its title up and staggers its services in. A film-strip
   timeline along the bottom shows where you are and lets you jump.
   ------------------------------------------------------------------ */

const CHAPTERS = EXPERTISE.flatMap((d) => d.groups.map((g) => ({ ...g, domain: d.title })));
const N = CHAPTERS.length;
const ease = [0.16, 1, 0.3, 1] as const;

export function ExpertiseFilm() {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] });
  const [active, setActive] = useState(0);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setActive(Math.min(N - 1, Math.max(0, Math.floor(p * N * 0.999))));
  });

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    const y = top + travel * ((i + 0.5) / N);
    const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number) => void } }).__lenis;
    if (lenis) lenis.scrollTo(y);
    else window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const c = CHAPTERS[active];

  return (
    <section id="expertise" className="dark xf" aria-labelledby="xf-title">
      <div ref={track} className="xf-track" style={{ height: `${100 + N * 75}vh` }}>
        <div className="xf-stage">
          <div className="wrap xf-grid">
            <div className="xf-copy">
              <div className="xf-top">
                <Label n="02">Expertise</Label>
                <h2 id="xf-title" className="sr-only">Expertise</h2>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={c.domain}
                    className="xf-domain mono"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease }}
                  >
                    {c.domain}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="xf-chapter" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.div key={active} className="xf-chapter-in" exit={{ opacity: 0, y: -24, transition: { duration: 0.28, ease } }}>
                    <span className="xf-num mono">{String(active + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}</span>
                    <h3 className="xf-title">
                      <span className="xf-mask">
                        <motion.span initial={{ y: '105%' }} animate={{ y: '0%' }} transition={{ duration: 0.75, ease }}>{c.name}</motion.span>
                      </span>
                    </h3>
                    <ul className="xf-items">
                      {c.items.map((it, j) => (
                        <motion.li
                          key={it.t}
                          initial={{ opacity: 0, x: -18 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.18 + j * 0.07, ease }}
                        >
                          <i aria-hidden="true" />
                          <span>{it.t}{it.note && <small>{it.note}</small>}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="xf-media" aria-hidden="true">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  className="xf-frame"
                  initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                  animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                  exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.35 } }}
                  transition={{ duration: 0.9, ease }}
                >
                  {c.img ? (
                    <motion.img src={c.img} alt="" initial={{ scale: 1.18 }} animate={{ scale: 1.04 }} transition={{ duration: 2.4, ease }} />
                  ) : (
                    <div className="xf-typeframe">
                      <span className="mono">{c.type?.small}</span>
                      <strong>{c.type?.big}</strong>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
              <span className="xf-frame-tag mono">{c.domain} — {c.name}</span>
            </div>
          </div>

          {/* film-strip timeline */}
          <div className="wrap xf-strip">
            <div className="xf-rail"><motion.span style={{ scaleX: bar }} /></div>
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
