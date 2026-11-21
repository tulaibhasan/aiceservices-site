import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Reveal, SectionHead } from './Layout';

type Step = { t: string; ok: boolean };

const STEPS: Step[] = [
  { t: 'Key read from localStorage (this device only)', ok: true },
  { t: 'Request sent straight to generativelanguage.googleapis.com', ok: true },
  { t: 'AICE servers: 0 bytes received', ok: true },
  { t: 'Answer returned to your browser', ok: true },
];

function mask(k: string) {
  if (!k) return '';
  if (k.length <= 8) return '•'.repeat(k.length);
  return `${k.slice(0, 4)}${'•'.repeat(Math.min(16, k.length - 7))}${k.slice(-3)}`;
}

/**
 * Interactive explainer: "your key never leaves your browser".
 * Demo only: the typed value is never stored or sent anywhere.
 */
export function KeyDemo() {
  const reduce = useReducedMotion();
  const [key, setKey] = useState('');
  const [run, setRun] = useState(0);
  const [shown, setShown] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!run) return;
    timers.current.forEach(clearTimeout);
    setShown(0);
    const gap = reduce ? 0 : 520;
    timers.current = STEPS.map((_, i) => window.setTimeout(() => setShown(i + 1), gap * (i + 1)));
    return () => timers.current.forEach(clearTimeout);
  }, [run, reduce]);

  const demoKey = key || 'AIzaSyD-example-key-0000';
  const running = run > 0;

  return (
    <section id="security" className="section ink-2" data-theme="dark" aria-labelledby="security-title">
      <div className="wrap">
        <SectionHead index="02" title="Data security" />
        <div className="keydemo">
          <div>
            <Reveal>
              <h2 id="security-title" className="display h-md">Your key never leaves <span className="mark">your browser.</span></h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lede" style={{ marginTop: 20 }}>
                Every AICE tool runs client-side. Your Gemini API key is kept in your browser’s local storage and goes directly to Google. We have no key database, and our servers never see it.
              </p>
              <p className="mono" style={{ color: 'var(--muted-dark)', marginTop: 20 }}>
                Try it → type a pretend key and send a test request.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="keydemo-panel">
              <form
                className="keydemo-input"
                onSubmit={(e) => { e.preventDefault(); setRun((r) => r + 1); }}
              >
                <label htmlFor="demo-key" className="sr-only">Pretend Gemini API key (demo only, not saved or sent)</label>
                <input
                  id="demo-key"
                  type="text"
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="AIza… (pretend key)"
                  value={key}
                  onChange={(e) => setKey(e.target.value.slice(0, 60))}
                />
                <button type="submit">Send test</button>
              </form>

              <svg className="keydemo-diagram" viewBox="0 0 560 210" role="img" aria-label="Diagram: your browser talks directly to Google Gemini. The AICE server is not in the path.">
                {/* nodes */}
                <g fill="none" stroke="var(--rule-dark)">
                  <rect x="10" y="60" width="150" height="90" fill="var(--ink-2)" stroke="var(--accent-ink)" />
                  <rect x="400" y="60" width="150" height="90" fill="var(--ink-2)" stroke="var(--accent-ink)" />
                  <rect x="215" y="150" width="130" height="50" fill="var(--ink)" strokeDasharray="4 4" />
                </g>
                <g fill="var(--paper)">
                  <text x="24" y="84">Your browser</text>
                  <text x="414" y="84">Google Gemini</text>
                </g>
                <g fill="var(--muted-dark)">
                  <text x="24" y="106">localStorage</text>
                  <text x="24" y="126" style={{ textTransform: 'none' }}>{mask(demoKey).slice(0, 14)}</text>
                  <text x="414" y="106">official API</text>
                  <text x="229" y="172">AICE servers</text>
                  <text x="229" y="190">not in path</text>
                </g>
                {/* crossed AICE node */}
                <path d="M215 150 L345 200 M345 150 L215 200" stroke="#ff8a8a" strokeOpacity=".55" />
                {/* direct line */}
                <path id="kd-path" d="M160 105 H400" stroke="var(--accent-ink)" strokeDasharray="4 6" />
                {/* no line to AICE */}
                <path d="M85 150 V175 H215" stroke="var(--rule-dark)" strokeDasharray="2 6" fill="none" />
                {/* packet */}
                {running && (
                  <motion.g
                    key={run}
                    initial={{ x: 0, opacity: 0 }}
                    animate={{ x: [0, 0, 220, 220], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: reduce ? 0 : 1.6, times: [0, 0.15, 0.75, 1], ease: 'easeInOut' }}
                  >
                    <rect x="164" y="96" width="16" height="18" fill="var(--accent-ink)" />
                  </motion.g>
                )}
                <text x="230" y="96" fill="var(--accent-ink)">HTTPS · direct</text>
              </svg>

              <ul className="keydemo-log mono" aria-live="polite">
                {STEPS.slice(0, shown).map((s, i) => (
                  <motion.li key={`${run}-${i}`} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
                    <b>{s.ok ? '✓' : '×'}</b>{s.t}
                  </motion.li>
                ))}
                {!running && <li><b>›</b>Waiting for a test request…</li>}
              </ul>

              <div className="storage-peek">
                localStorage[<span>"gemini_api_key"</span>] = <span>"{mask(demoKey)}"</span>
                <br />
                <span style={{ color: 'var(--muted-dark)' }}>Demo only: nothing you type here is saved or sent.</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
