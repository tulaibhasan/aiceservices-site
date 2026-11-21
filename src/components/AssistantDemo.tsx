import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { MessageSquareText, Mic, RotateCcw } from 'lucide-react';
import { Label, Reveal } from './Layout';

/**
 * Showcase of a custom voice + text assistant.
 * Fully scripted (no API calls), so it can never fail on the live site.
 */

type Line = { who: 'user' | 'bot'; text: string };

const SCENARIOS: { id: string; label: string; brand: string; lines: Line[] }[] = [
  {
    id: 'clinic',
    label: 'Clinic',
    brand: 'Clinic assistant',
    lines: [
      { who: 'user', text: 'Do you have an appointment tomorrow evening?' },
      { who: 'bot', text: 'Yes. Tomorrow there are slots at 6:30 pm and 7:15 pm. Shall I book one for you?' },
      { who: 'user', text: '6:30 please.' },
      { who: 'bot', text: 'Done: booked for 6:30 pm. I have sent the details to your WhatsApp.' },
    ],
  },
  {
    id: 'engineering',
    label: 'Engineering firm',
    brand: 'Project assistant',
    lines: [
      { who: 'user', text: 'What is the minimum sewer size in our design criteria?' },
      { who: 'bot', text: '225 mm for laterals and 300 mm for trunk sewers, from Design Criteria, Section 4.2. Want me to open that page?' },
      { who: 'user', text: 'Yes, and summarise the velocity limits.' },
      { who: 'bot', text: 'Opened. Self-cleansing velocity is at least 0.6 m/s, and the maximum is 3.0 m/s.' },
    ],
  },
  {
    id: 'shop',
    label: 'Online shop',
    brand: 'Store assistant',
    lines: [
      { who: 'user', text: 'Is the sand kurta available in medium?' },
      { who: 'bot', text: 'Yes, 4 left in medium. Delivery takes 2–3 working days. Add it to your cart?' },
      { who: 'user', text: 'Add it.' },
      { who: 'bot', text: 'Added. Use code WELCOME10 for 10% off your first order.' },
    ],
  },
];

export function AssistantDemo() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [scenario, setScenario] = useState(0);
  const [mode, setMode] = useState<'text' | 'voice'>('text');
  const [step, setStep] = useState(0); // number of finished lines
  const [typed, setTyped] = useState(0); // chars typed of the current line
  const [run, setRun] = useState(0);
  const lines = SCENARIOS[scenario].lines;

  // reset when the scenario / mode / replay changes
  useEffect(() => { setStep(0); setTyped(0); }, [scenario, mode, run]);

  // play the script while visible
  useEffect(() => {
    if (!inView || step >= lines.length) return;
    const line = lines[step];
    if (reduce) { const t = setTimeout(() => { setStep((s) => s + 1); setTyped(0); }, 250); return () => clearTimeout(t); }
    if (typed < line.text.length) {
      const speed = line.who === 'user' ? 22 : 28;
      const t = setTimeout(() => setTyped((c) => Math.min(line.text.length, c + 2)), speed);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setStep((s) => s + 1); setTyped(0); }, line.who === 'user' ? 500 : 1100);
    return () => clearTimeout(t);
  }, [inView, step, typed, lines, reduce]);

  const current = step < lines.length ? lines[step] : null;
  const speaking = mode === 'voice' && !!current;
  const done = step >= lines.length;

  return (
    <section id="assistants" className="sec dark assistants" aria-labelledby="assistant-title">
      <div className="wrap">
        <div className="sec-head">
          <Label n="03">AI assistants</Label>
          <h2 id="assistant-title" className="h2">Assistants that sound<br />like your business.</h2>
        </div>
        <div className="assist">
          <Reveal delay={0.15}>
            <div className="assist-panel" ref={ref}>
              <div className="assist-top">
                <div className="assist-tabs" role="tablist" aria-label="Example business">
                  {SCENARIOS.map((s, i) => (
                    <button key={s.id} role="tab" aria-selected={i === scenario} onClick={() => setScenario(i)}>{s.label}</button>
                  ))}
                </div>
                <div className="assist-mode" role="group" aria-label="Assistant mode">
                  <button aria-pressed={mode === 'text'} onClick={() => setMode('text')}><MessageSquareText size={14} aria-hidden="true" /> Text</button>
                  <button aria-pressed={mode === 'voice'} onClick={() => setMode('voice')}><Mic size={14} aria-hidden="true" /> Voice</button>
                </div>
              </div>

              <div className="assist-head mono">
                <span className={`dot ${speaking ? 'live' : ''}`} aria-hidden="true" />
                {SCENARIOS[scenario].brand} · {mode === 'voice' ? 'voice call' : 'chat'}
                <span className="assist-demo">Demo</span>
              </div>

              {mode === 'text' ? (
                <ol className="assist-chat" aria-live="polite">
                  {lines.slice(0, step).map((l, i) => (
                    <li key={`${run}-${i}`} className={`msg ${l.who}`}>{l.text}</li>
                  ))}
                  {current && (
                    <li className={`msg ${current.who} typing`}>
                      {typed === 0 && current.who === 'bot' ? <span className="dots" aria-label="typing"><i /><i /><i /></span> : current.text.slice(0, typed)}
                    </li>
                  )}
                </ol>
              ) : (
                <div className="assist-voice">
                  <div className={`wave ${speaking ? 'on' : ''} ${current?.who === 'user' ? 'user' : ''}`} aria-hidden="true">
                    {Array.from({ length: 32 }).map((_, i) => <i key={i} style={{ animationDelay: `${(i % 8) * 70}ms` }} />)}
                  </div>
                  <p className="voice-who mono">{current ? (current.who === 'user' ? 'Caller' : 'Assistant') : 'Call ended'}</p>
                  <p className="voice-caption" aria-live="polite">
                    {current ? current.text.slice(0, typed) : 'Booked, confirmed and summarised for your team.'}
                  </p>
                </div>
              )}

              <div className="assist-foot">
                <span className="mono">Scripted demo · your assistant uses your own data</span>
                {done && (
                  <button className="assist-replay mono" onClick={() => setRun((r) => r + 1)}><RotateCcw size={13} aria-hidden="true" /> Replay</button>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
