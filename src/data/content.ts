export const CONTACT = {
  email: 'contact@aiceservices.com',
  phone: '+92 301 3666088',
  phoneHref: 'tel:+923013666088',
  hours: 'Mon–Fri 09:00–18:00 · Sat 09:00–14:00 (PKT)',
};

/* ---------- Services (walked through in the 3D corridor) ---------- */
export type Service = {
  id: 'engineering' | 'websites' | 'assistants' | 'video';
  code: string;
  name: string;
  short: string;
  tagline: string;
  summary: string;
  points: string[];
  spec: [string, string][];
};

export const SERVICES: Service[] = [
  {
    id: 'engineering',
    code: '01',
    name: 'Engineering Consultancy',
    short: 'Engineering',
    tagline: 'Water · Sanitation · Solid waste',
    summary:
      'Design review, FIDIC contract and claims support, and bid preparation for donor-funded and public-sector projects, checked against ADB, World Bank and PPRA requirements.',
    points: [
      'Design review: water supply, sewerage, solid waste',
      'Contract & claims under FIDIC',
      'Bid preparation & evaluation (ADB · WB · PPRA)',
    ],
    spec: [['For', 'Funders · firms · authorities'], ['Standards', 'FIDIC · ADB · WB · PPRA'], ['Output', 'Audit-ready']],
  },
  {
    id: 'websites',
    code: '02',
    name: 'Custom Websites',
    short: 'Websites',
    tagline: 'Built in hours · minimal budget',
    summary:
      'Fast, modern, mobile-first websites designed and built from scratch, with SEO and analytics in place. No templates, no long timelines, no inflated budgets.',
    points: ['Design + build from scratch', 'Fast, accessible, search-ready', 'Hosting and domain set up for you'],
    spec: [['Turnaround', 'Hours, not weeks'], ['Budget', 'Minimal'], ['Score', 'Lighthouse 90+']],
  },
  {
    id: 'assistants',
    code: '03',
    name: 'AI Voice & Chat Assistants',
    short: 'AI Assistants',
    tagline: 'Custom voice + text, on your site',
    summary:
      'Branded assistants that answer customers by text or voice, trained on your own documents and services, and built into your website or app.',
    points: ['Text chat and live voice', 'Answers from your own documents', 'Hand-off to email or WhatsApp'],
    spec: [['Modes', 'Text · Voice'], ['Knowledge', 'Your documents'], ['Runs on', 'Your website']],
  },
  {
    id: 'video',
    code: '04',
    name: 'AI Video Editing',
    short: 'Video',
    tagline: 'Reels · ads · explainers',
    summary:
      'Professional edits produced with AI workflows: cuts, captions, motion graphics and sound, including matching the style of any reference video you love.',
    points: ['Short-form reels and ads', 'Captions, motion graphics, sound', 'Match any reference edit'],
    spec: [['Formats', '9:16 · 1:1 · 16:9'], ['Includes', 'Captions · motion'], ['Speed', 'Fast turnaround']],
  },
];

/* ---------- Selected work ---------- */
export type Work = {
  id: string;
  name: string;
  kind: string;
  text: string;
  status: string;
  href?: string;
  hrefLabel?: string;
  internal?: boolean;
};

export const WORK: Work[] = [
  {
    id: 'freemytv',
    name: 'Free My TV',
    kind: 'Open-source app',
    text: 'A fast, ad-free home screen for Google TV, LG and Samsung TVs: your apps on a glass shelf, trending picks, and a look that follows the sunset.',
    status: 'Live',
    href: 'https://freemytv.io',
    hrefLabel: 'freemytv.io',
  },
  {
    id: 'synckutub',
    name: 'SyncKutub',
    kind: 'Windows app',
    text: 'Ask questions of your own files and get answers with clickable citations that open the original page, highlighted. Private: it runs on your computer.',
    status: 'Released',
    href: 'https://github.com/tulaibhasan/synckutub-releases/releases',
    hrefLabel: 'Download',
  },
  {
    id: 'videostudio',
    name: 'AICE Video Studio',
    kind: 'Desktop video editor',
    text: 'An offline video editor for Windows: multi-track timeline, word-timed captions, background removal, colour tools and 4K export, all on your own computer.',
    status: 'In development',
  },
  {
    id: 'aicemark',
    name: 'AICEMark',
    kind: 'Free web tool',
    text: 'Paste an AI answer full of equations, tables and lists, and get a clean, natively formatted Word document. Runs in your browser.',
    status: 'Free',
    href: '/tools/aicemark',
    hrefLabel: 'Open AICEMark',
    internal: true,
  },
];

export const TICKER = [
  'Engineering consultancy',
  'Custom websites in hours',
  'AI voice & chat assistants',
  'AI video editing',
  'ADB · World Bank · PPRA',
];

export const STANDARDS_LINE = 'FIDIC · ADB · World Bank · PPRA · PHED · EPA · WASA · PEC';

export const PROCESS = [
  { n: '01', title: 'Tell us the goal', text: 'A short message or call about scope, budget and deadline.' },
  { n: '02', title: 'Clear proposal', text: 'Fixed deliverables, price and dates in writing.' },
  { n: '03', title: 'Fast delivery', text: 'Work starts at once, with progress you can see.' },
];

export type FaqGroup = { category: string; items: { q: string; a: string }[] };

export const FAQS: FaqGroup[] = [
  {
    category: 'General',
    items: [
      {
        q: 'What kind of engineering projects do you support?',
        a: 'Water supply, sewerage and solid-waste projects, mostly donor-funded or public-sector. We review designs and hydraulic models, support FIDIC contract administration and claims, and prepare or evaluate bids to ADB, World Bank and PPRA requirements.',
      },
      {
        q: 'How can a custom website be ready in hours, and what does it cost?',
        a: 'We design and build with modern AI-assisted workflows, so a focused business website can go from brief to live in hours rather than weeks. Because the build is fast, the budget stays minimal. Send us your brief and we will reply with a fixed price.',
      },
      {
        q: 'Can you add a voice and text assistant to my existing website?',
        a: 'Yes. We build a branded assistant that answers from your own documents and services, by text or live voice, and add it to your current website with a small embed. It can hand conversations over to email or WhatsApp.',
      },
      {
        q: 'What video editing do you offer?',
        a: 'Short-form reels, ads and explainers with captions, motion graphics and sound design. Send raw clips and, if you like, a reference video: we can match its pacing, transitions and style.',
      },
      {
        q: 'How do you handle my files and data?',
        a: 'Your files are used only for your project and are never shared with third parties. Where possible we use tools that run locally, and we can sign an NDA before work starts.',
      },
    ],
  },
];
