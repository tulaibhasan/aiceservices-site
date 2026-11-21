/**
 * Original line art for AICE, drawn in code (no third-party imagery).
 * Everything uses `currentColor` so it can be tinted with the accent colour.
 */
import { useMemo } from 'react';

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
export function NetworkPlan({ className = '' }: { className?: string }) {
  const nodes: [number, number, string][] = [
    [80, 420, 'MH-01'], [210, 380, 'MH-02'], [330, 300, 'MH-03'], [470, 300, 'MH-04'],
    [330, 470, 'MH-07'], [470, 470, 'MH-08'], [600, 380, 'MH-05'], [250, 150, 'R-01'],
  ];
  return (
    <svg className={className} viewBox="0 0 820 620" fill="none" aria-hidden="true" focusable="false">
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
    </svg>
  );
}

/* ---------- Tool visuals ---------- */
const mono = { fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '.04em' } as const;

export function ToolArt({ id }: { id: string }) {
  switch (id) {
    case 'aicemark':
      return (
        <svg viewBox="0 0 400 300" fill="none" aria-hidden="true" focusable="false">
          <g style={mono} fill="var(--muted-dark)">
            <text x="24" y="62">## Pipe sizing</text>
            <text x="24" y="86">$$Q = V \cdot A$$</text>
            <text x="24" y="110">| Ø | Q (l/s) |</text>
            <text x="24" y="130">|---|---|</text>
            <text x="24" y="150">| 300 | 62.4 |</text>
            <text x="24" y="170">| 450 | 140.1 |</text>
            <text x="24" y="194">- [x] PHED check</text>
          </g>
          <path d="M180 150 h34 m-8 -6 l8 6 l-8 6" stroke="currentColor" strokeWidth="1.25" />
          <rect x="228" y="40" width="148" height="196" fill="var(--paper)" />
          <g fill="var(--ink)">
            <rect x="244" y="58" width="76" height="7" />
            <text x="262" y="96" fontFamily="Georgia, serif" fontStyle="italic" fontSize="16">Q = V·A</text>
          </g>
          <g stroke="var(--ink)" strokeWidth="1">
            <rect x="244" y="116" width="116" height="60" />
            <path d="M244 136 h116 M244 156 h116 M290 116 v60" />
          </g>
          <rect x="244" y="116" width="116" height="20" fill="currentColor" opacity=".9" />
          <rect x="244" y="192" width="100" height="5" fill="var(--ink)" opacity=".4" />
          <rect x="244" y="204" width="80" height="5" fill="var(--ink)" opacity=".4" />
          <text x="296" y="230" style={mono} fill="var(--ink)">.DOCX</text>
        </svg>
      );
    case 'deckedit':
      return (
        <svg viewBox="0 0 400 300" fill="none" aria-hidden="true" focusable="false">
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${70 + i * 26} ${70 - i * 18})`} opacity={1 - i * 0.25}>
              <rect width="220" height="140" stroke="currentColor" strokeWidth="1.25" fill="var(--ink-2)" />
            </g>
          ))}
          <g transform="translate(70 70)">
            <rect width="220" height="140" fill="var(--ink-3)" stroke="currentColor" strokeWidth="1.25" />
            <rect x="18" y="20" width="120" height="12" fill="var(--paper)" />
            <rect x="18" y="44" width="90" height="6" fill="var(--muted-dark)" />
            <rect x="18" y="58" width="100" height="6" fill="var(--muted-dark)" />
            <rect x="150" y="40" width="54" height="72" className="halftone" fill="currentColor" />
            <rect x="14" y="16" width="128" height="20" stroke="currentColor" strokeDasharray="3 3" />
            <rect x="14" y="40" width="108" height="28" stroke="currentColor" strokeDasharray="3 3" />
          </g>
          <g style={mono} fill="var(--muted-dark)">
            <text x="70" y="240">LAYER 3 · TEXT (EDITABLE)</text>
            <text x="70" y="258">LAYER 2 · GRAPHICS</text>
            <text x="70" y="276">LAYER 1 · CLEAN PLATE</text>
          </g>
        </svg>
      );
    case 'proscan':
      return (
        <svg viewBox="0 0 400 300" fill="none" aria-hidden="true" focusable="false">
          <g transform="rotate(-4 110 150)">
            <rect x="34" y="44" width="150" height="200" fill="var(--paper)" opacity=".92" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <rect key={i} x="48" y={66 + i * 20} width={110 - (i % 3) * 18} height="5" fill="var(--ink)" opacity=".35" />
            ))}
            <circle cx="150" cy="214" r="18" stroke="var(--accent)" strokeWidth="1.5" />
          </g>
          <path d="M34 150 H184" stroke="currentColor" strokeWidth="1.5" />
          <path d="M200 150 h22 m-8 -6 l8 6 l-8 6" stroke="currentColor" strokeWidth="1.25" />
          <g style={mono}>
            <rect x="236" y="56" width="140" height="190" stroke="currentColor" strokeWidth="1" />
            <text x="246" y="80" fill="currentColor">ITEM   QTY   UNIT</text>
            {[
              ['2.01', '1,240', 'm'],
              ['2.04', '86.5', 'm³'],
              ['3.10', '412', 'm²'],
              ['4.02', '9,800', 'kg'],
              ['5.07', '24', 'No.'],
            ].map(([a, b, c], i) => (
              <g key={a} fill="var(--paper)">
                <text x="246" y={110 + i * 26}>{a}</text>
                <text x="290" y={110 + i * 26}>{b}</text>
                <text x="340" y={110 + i * 26} fill="currentColor">{c}</text>
              </g>
            ))}
          </g>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 400 300" fill="none" aria-hidden="true" focusable="false">
          <g style={mono}>
            <text x="30" y="46" fill="var(--muted-dark)">MASTER BOQ</text>
            <text x="214" y="46" fill="var(--muted-dark)">CONTRACTOR BOQ</text>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => {
              const diff = i === 2 || i === 5;
              return (
                <g key={i}>
                  <rect x="30" y={60 + i * 30} width="156" height="22" stroke="var(--rule-dark)" fill="var(--ink-2)" />
                  <rect x="214" y={60 + i * 30} width="156" height="22" stroke={diff ? 'currentColor' : 'var(--rule-dark)'} fill={diff ? 'rgba(227,161,59,.16)' : 'var(--ink-2)'} />
                  <rect x="40" y={69 + i * 30} width={70 - (i % 3) * 12} height="4" fill="var(--muted-dark)" />
                  <rect x="224" y={69 + i * 30} width={70 - (i % 3) * 12} height="4" fill="var(--muted-dark)" />
                  <text x="150" y={75 + i * 30} fill="var(--paper)">{(i + 1) * 12}</text>
                  <text x="334" y={75 + i * 30} fill={diff ? 'currentColor' : 'var(--paper)'}>{diff ? (i + 1) * 12 + 7 : (i + 1) * 12}</text>
                  {diff && <text x="378" y={75 + i * 30} fill="currentColor">Δ</text>}
                </g>
              );
            })}
          </g>
        </svg>
      );
  }
}

/* ---------- Automation: isometric facility ---------- */
export function IsoFacility({ className = '' }: { className?: string }) {
  // simple isometric helper
  const iso = (x: number, y: number, z = 0) => {
    const X = 260 + (x - y) * 0.866 * 1;
    const Y = 120 + (x + y) * 0.5 - z;
    return `${X.toFixed(1)},${Y.toFixed(1)}`;
  };
  const box = (x: number, y: number, w: number, d: number, h: number) => {
    const top = [iso(x, y, h), iso(x + w, y, h), iso(x + w, y + d, h), iso(x, y + d, h)].join(' ');
    const left = [iso(x, y + d, 0), iso(x, y + d, h), iso(x + w, y + d, h), iso(x + w, y + d, 0)].join(' ');
    const right = [iso(x + w, y, 0), iso(x + w, y, h), iso(x + w, y + d, h), iso(x + w, y + d, 0)].join(' ');
    return { top, left, right };
  };
  const slab = box(0, 0, 220, 180, 0);
  const b1 = box(20, 20, 90, 60, 60);
  const b2 = box(130, 30, 70, 50, 36);
  const b3 = box(30, 110, 60, 50, 24);
  return (
    <svg className={className} viewBox="0 0 520 380" fill="none" aria-hidden="true" focusable="false">
      <polygon points={slab.top} stroke="currentColor" strokeDasharray="4 4" strokeOpacity=".6" />
      {[b1, b2, b3].map((b, i) => (
        <g key={i} stroke="currentColor" strokeWidth="1.2">
          <polygon points={b.left} fill="var(--ink-2)" />
          <polygon points={b.right} fill="var(--ink-3)" />
          <polygon points={b.top} className={i === 0 ? 'halftone' : undefined} fill={i === 0 ? 'currentColor' : 'var(--ink)'} />
          <polygon points={b.top} />
        </g>
      ))}
      {/* tanks */}
      {[ [150, 120], [185, 145] ].map(([x, y], i) => {
        const [cx, cy] = iso(x, y, 0).split(',').map(Number);
        return (
          <g key={i} stroke="currentColor" strokeWidth="1.2">
            <ellipse cx={cx} cy={cy - 30} rx="22" ry="11" fill="var(--ink-2)" />
            <path d={`M${cx - 22} ${cy - 30} V${cy} M${cx + 22} ${cy - 30} V${cy}`} />
            <path d={`M${cx - 22} ${cy} A22 11 0 0 0 ${cx + 22} ${cy}`} />
          </g>
        );
      })}
      {/* data lines */}
      <g stroke="currentColor" strokeDasharray="2 4" strokeOpacity=".8">
        <path d={`M${iso(65, 50, 60)} L${iso(65, 50, 140)}`} />
        <path d={`M${iso(165, 55, 36)} L${iso(165, 55, 120)}`} />
      </g>
      <g fill="currentColor" style={mono}>
        <text x={Number(iso(65, 50, 150).split(',')[0]) - 30} y={Number(iso(65, 50, 150).split(',')[1])}>QA PIPELINE</text>
        <text x={Number(iso(165, 55, 130).split(',')[0]) - 20} y={Number(iso(165, 55, 130).split(',')[1])}>BOQ API</text>
      </g>
    </svg>
  );
}
