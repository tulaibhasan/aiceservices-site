/**
 * Original line art for AICE, drawn in code (no third-party imagery).
 * Everything uses `currentColor` so it can be tinted with the accent colour.
 */
import { useId, useMemo } from 'react';

/* ---------- Topographic contour field ---------- */
function contourPaths(width: number, height: number) {
  const centres = [
    { x: width * 0.78, y: height * 0.35, rings: 16, step: 26, seed: 1.3 },
    { x: width * 0.15, y: height * 0.85, rings: 12, step: 30, seed: 4.1 },
    { x: width * 0.52, y: height * 1.05, rings: 9, step: 34, seed: 2.7 },
  ];
  const paths: string[] = [];
  for (const c of centres) {
    for (let k = 1; k <= c.rings; k++) {
      const base = k * c.step;
      const pts: string[] = [];
      const N = 96;
      for (let i = 0; i <= N; i++) {
        const a = (i / N) * Math.PI * 2;
        const wobble =
          Math.sin(a * 2 + c.seed + k * 0.18) * (6 + k * 1.6) +
          Math.sin(a * 3 - c.seed * 2 + k * 0.11) * (4 + k * 1.1) +
          Math.cos(a * 5 + c.seed * 0.5) * (2 + k * 0.5);
        const r = base + wobble;
        const x = c.x + Math.cos(a) * r * 1.25;
        const y = c.y + Math.sin(a) * r;
        pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`);
      }
      paths.push(pts.join('') + 'Z');
    }
  }
  return paths;
}

export function ContourField({ className = '' }: { className?: string }) {
  const W = 1440;
  const H = 900;
  const paths = useMemo(() => contourPaths(W, H), []);
  return (
    <svg className={className} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        {paths.map((d, i) => (
          <path key={i} d={d} strokeOpacity={i % 5 === 0 ? 1 : 0.55} strokeWidth={i % 5 === 0 ? 1.4 : 1} />
        ))}
      </g>
    </svg>
  );
}

/* ---------- Hero: water / sewer network on a plant plan ---------- */
export function NetworkPlan({ className = '', plot = false }: { className?: string; plot?: boolean }) {
  const clip = useId().replace(/:/g, '');
  const nodes: [number, number, string][] = [
    [80, 420, 'MH-01'], [210, 380, 'MH-02'], [330, 300, 'MH-03'], [470, 300, 'MH-04'],
    [330, 470, 'MH-07'], [470, 470, 'MH-08'], [600, 380, 'MH-05'], [250, 150, 'R-01'],
  ];
  return (
    <svg className={className} viewBox="0 0 820 620" fill="none" aria-hidden="true" focusable="false">
      {plot && (
        <defs>
          <clipPath id={clip}><rect className="plot-rect" width="820" height="620" /></clipPath>
        </defs>
      )}
      <g clipPath={plot ? `url(#${clip})` : undefined}>
      {/* halftone fills: treatment plant & reservoir */}
      <g className="halftone" fill="currentColor">
        <rect x="560" y="120" width="220" height="170" />
        <circle cx="250" cy="150" r="70" />
        <rect x="560" y="430" width="220" height="140" />
      </g>
      <g stroke="currentColor" strokeWidth="1.25">
        {/* trunk lines */}
        <path d="M80 420 L210 380 L330 300 L470 300 L600 380 L700 380" />
        <path d="M210 380 L330 470 L470 470 L600 380" strokeDasharray="6 5" />
        <path d="M250 220 L250 300 L330 300" />
        <path d="M330 300 L330 470" />
        <path d="M470 300 L470 470" strokeOpacity=".6" />
        {/* plant outline & clarifiers */}
        <rect x="560" y="120" width="220" height="170" />
        <circle cx="620" cy="190" r="34" />
        <circle cx="620" cy="190" r="4" fill="currentColor" />
        <circle cx="715" cy="190" r="34" />
        <circle cx="715" cy="190" r="4" fill="currentColor" />
        <rect x="560" y="430" width="220" height="140" />
        <path d="M580 460 h180 M580 490 h180 M580 520 h180 M580 550 h180" strokeOpacity=".7" />
        <circle cx="250" cy="150" r="70" />
        <circle cx="250" cy="150" r="52" strokeDasharray="3 4" />
        {/* dimension line */}
        <path d="M80 560 H470 M80 552 v16 M470 552 v16" strokeOpacity=".7" />
      </g>
      {nodes.map(([x, y, id]) => (
        <g key={id}>
          <circle cx={x} cy={y} r="7" fill="var(--paper)" stroke="currentColor" strokeWidth="1.25" />
          <text x={x + 12} y={y - 10} fill="currentColor" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing=".06em">{id}</text>
        </g>
      ))}
      <g fill="currentColor" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing=".06em">
        <text x="560" y="108">WWTP · PLAN</text>
        <text x="560" y="422">SLUDGE BEDS</text>
        <text x="255" y="575">L = 1,240 m · Ø 450 RCC</text>
        <text x="372" y="292">Ø300</text>
        <text x="372" y="462">Ø225</text>
      </g>
      </g>
      {/* plotter pen head sweeping across while the drawing is "plotted" */}
      {plot && (
        <g className="plot-pen" stroke="currentColor">
          <path d="M0 0 V620" strokeOpacity=".5" />
          <circle cx="0" cy="310" r="6" fill="var(--paper)" strokeWidth="1.5" />
        </g>
      )}
    </svg>
  );
}

/* ---------- Service visuals ---------- */
const mono = { fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '.04em' } as const;

export function ServiceArt({ id }: { id: string }) {
  switch (id) {
    case 'websites':
      return (
        <svg viewBox="0 0 400 300" fill="none" aria-hidden="true" focusable="false">
          <rect x="30" y="30" width="340" height="240" stroke="currentColor" strokeWidth="1.25" fill="var(--ink-2)" />
          <path d="M30 56 H370" stroke="currentColor" strokeWidth="1" />
          {[44, 58, 72].map((x) => <circle key={x} cx={x} cy="43" r="4" stroke="currentColor" />)}
          <rect x="52" y="78" width="160" height="16" fill="var(--paper)" />
          <rect x="52" y="102" width="120" height="16" fill="var(--paper)" />
          <rect x="52" y="130" width="140" height="5" fill="var(--muted-dark)" />
          <rect x="52" y="142" width="110" height="5" fill="var(--muted-dark)" />
          <rect x="52" y="164" width="70" height="20" fill="currentColor" />
          <rect x="232" y="78" width="116" height="106" className="halftone" fill="currentColor" />
          {[0, 1, 2].map((i) => <rect key={i} x={52 + i * 102} y="204" width="90" height="48" stroke="var(--rule-dark)" />)}
          <text x="290" y="290" style={mono} fill="currentColor">LIVE IN HOURS</text>
        </svg>
      );
    case 'assistants':
      return (
        <svg viewBox="0 0 400 300" fill="none" aria-hidden="true" focusable="false">
          <rect x="40" y="40" width="200" height="44" fill="var(--ink-3)" stroke="var(--rule-dark)" />
          <rect x="54" y="56" width="150" height="5" fill="var(--muted-dark)" />
          <rect x="54" y="68" width="100" height="5" fill="var(--muted-dark)" />
          <rect x="160" y="100" width="200" height="44" fill="currentColor" />
          <rect x="174" y="116" width="150" height="5" fill="var(--ink)" />
          <rect x="174" y="128" width="110" height="5" fill="var(--ink)" />
          <rect x="40" y="160" width="160" height="34" fill="var(--ink-3)" stroke="var(--rule-dark)" />
          <rect x="54" y="174" width="110" height="5" fill="var(--muted-dark)" />
          <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            {Array.from({ length: 26 }).map((_, i) => {
              const h = 6 + Math.abs(Math.sin(i * 0.9) * 22) + (i % 3) * 3;
              return <path key={i} d={`M${70 + i * 10} ${240 - h / 2} V${240 + h / 2}`} />;
            })}
          </g>
          <text x="40" y="290" style={mono} fill="currentColor">TEXT + VOICE</text>
        </svg>
      );
    case 'video':
      return (
        <svg viewBox="0 0 400 300" fill="none" aria-hidden="true" focusable="false">
          <rect x="110" y="24" width="180" height="128" fill="var(--ink-3)" stroke="currentColor" strokeWidth="1.25" />
          <path d="M188 70 L218 88 L188 106 Z" fill="currentColor" />
          <path d="M30 176 H370" stroke="var(--rule-dark)" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <path key={i} d={`M${30 + i * 48} 170 V182`} stroke="var(--muted-dark)" />)}
          <g>
            <rect x="30" y="192" width="120" height="22" fill="currentColor" />
            <rect x="154" y="192" width="80" height="22" fill="currentColor" opacity=".7" />
            <rect x="238" y="192" width="132" height="22" fill="currentColor" />
            <rect x="60" y="220" width="200" height="16" stroke="currentColor" />
            <rect x="30" y="242" width="340" height="16" fill="var(--ink-3)" stroke="var(--rule-dark)" />
          </g>
          <path d="M210 160 V266" stroke="var(--paper)" strokeWidth="1.5" />
          <text x="30" y="290" style={mono} fill="currentColor">CUT · CAPTION · GRADE</text>
        </svg>
      );
    default:
      return <NetworkPlan />;
  }
}
