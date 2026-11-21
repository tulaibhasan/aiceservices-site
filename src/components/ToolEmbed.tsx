import { useEffect, useState } from 'react';

const ALLOW =
  'accelerometer; ambient-light-sensor; autoplay; battery; camera; document-domain; encrypted-media; fullscreen; geolocation; gyroscope; layout-animations; legacy-image-formats; magnetometer; microphone; midi; oversized-images; payment; picture-in-picture; publickey-credentials-get; sync-xhr; usb; vr ; wake-lock; xr-spatial-tracking';

export const TOOL_EMBEDS: Record<string, { src: string; title: string; loading: string; pageTitle: string }> = {
  aicemark: {
    src: 'https://tulaibhasan-aicemark-v1.hf.space',
    title: 'AICEMark Tool',
    loading: 'Loading rich document engine & live preview…',
    pageTitle: 'AICEMark — Markdown & LaTeX to Word | AICE Services',
  },
  deckedit: {
    src: 'https://tulaibhasan-aice-deck-edit-v1.hf.space',
    title: 'AICE Deck Edit Tool',
    loading: 'Loading deck retouch & vector processing…',
    pageTitle: 'AICE Deck Edit — NotebookLM slides to editable PPTX | AICE Services',
  },
  proscan: {
    src: 'https://tulaibhasan-aice-proscan.hf.space',
    title: 'AICE ProScan Tool',
    loading: 'Loading engineering document scanner & OCR…',
    pageTitle: 'AICE ProScan — Engineering OCR for bids & BoQs | AICE Services',
  },
  boqauditor: {
    src: 'https://tulaibhasan-aice-boq-auditor.hf.space',
    title: 'AICE BOQ Auditor Tool',
    loading: 'Loading BOQ auditor & spreadsheet analysis…',
    pageTitle: 'AICE BOQ Auditor — Master vs Contractor BOQ | AICE Services',
  },
};

export function ToolEmbed({ id }: { id: keyof typeof TOOL_EMBEDS }) {
  const cfg = TOOL_EMBEDS[id];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const prev = document.title;
    document.title = cfg.pageTitle;
    return () => { document.title = prev; };
  }, [cfg.pageTitle]);

  return (
    <section className="tool-page" data-theme="dark" aria-label={cfg.title}>
      <div className="tool-frame">
        {loading && (
          <div className="tool-loading" role="status">
            <div>
              <div className="spin" aria-hidden="true" />
              <p className="mono" style={{ color: 'var(--accent-ink)' }}>// Initialising {cfg.title.replace(' Tool', '')} workspace</p>
              <p className="mono" style={{ color: 'var(--muted-dark)', marginTop: 6, textTransform: 'none' }}>{cfg.loading}</p>
            </div>
          </div>
        )}
        <iframe
          src={cfg.src}
          title={cfg.title}
          onLoad={() => setLoading(false)}
          allow={ALLOW}
          sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"
        />
      </div>
    </section>
  );
}
