export const CONTACT = {
  email: 'contact@aiceservices.com',
  phone: '+92 301 3666088',
  phoneHref: 'tel:+923013666088',
  whatsapp: 'https://wa.me/923013666088',
};

/* ---------- Services: the stations of the opening corridor ---------- */
export type Plate =
  | { kind: 'img'; src: string }
  | { kind: 'type'; big: string; small: string; light?: boolean }
  | { kind: 'chat' };

export type Service = {
  id: string;
  n: string;
  title: string; // shown huge in the corridor
  name: string;
  line: string; // one short sentence
  plates: [Plate, Plate];
};

export const SERVICES: Service[] = [
  {
    id: 'engineering',
    n: '01',
    title: 'Engineering',
    name: 'Engineering consultancy',
    line: 'Design review, FIDIC claims and bids for water, sanitation and solid-waste projects. ADB, World Bank, PPRA.',
    plates: [
      { kind: 'img', src: '/img/plant.webp' },
      { kind: 'img', src: '/img/pipes.webp' },
    ],
  },
  {
    id: 'websites',
    n: '02',
    title: 'Websites',
    name: 'Custom websites',
    line: 'Designed and built from scratch in hours, on a minimal budget. Fast, search-ready, yours.',
    plates: [
      { kind: 'img', src: '/img/web-freemytv.webp' },
      { kind: 'type', big: 'Live in hours', small: 'Design · build · launch', light: true },
    ],
  },
  {
    id: 'assistants',
    n: '03',
    title: 'AI Assistants',
    name: 'AI voice & chat assistants',
    line: 'Assistants that answer your customers by text or voice, from your own documents, on your website.',
    plates: [{ kind: 'chat' }, { kind: 'type', big: 'Text + Voice', small: 'Trained on your data' }],
  },
  {
    id: 'video',
    n: '04',
    title: 'Video',
    name: 'AI video editing',
    line: 'Reels, ads and explainers: cut, captioned and graded, even matched to a reference you love.',
    plates: [
      { kind: 'img', src: '/img/video-frames.webp' },
      { kind: 'img', src: '/img/video-clips.webp' },
    ],
  },
];

/* ---------- Work ---------- */
export type Work = {
  id: string;
  name: string;
  line: string;
  status: string;
  img?: string;
  type?: { big: string; small: string };
  href?: string;
  internal?: boolean;
};

export const WORK: Work[] = [
  {
    id: 'freemytv',
    name: 'Free My TV',
    line: 'An ad-free home screen for Google TV, LG and Samsung.',
    status: 'Live',
    img: '/img/freemytv.webp',
    href: 'https://freemytv.io',
  },
  {
    id: 'synckutub',
    name: 'SyncKutub',
    line: 'Ask your own files. Answers with clickable citations.',
    status: 'Released',
    type: { big: 'Ask your files.', small: 'Windows · private · offline' },
    href: 'https://github.com/tulaibhasan/synckutub-releases/releases',
  },
  {
    id: 'videostudio',
    name: 'AICE Video Studio',
    line: 'An offline video editor for Windows, with 4K export.',
    status: 'In development',
    type: { big: 'Cut. Caption. Export.', small: 'Offline desktop editor' },
  },
  {
    id: 'aicemark',
    name: 'AICEMark',
    line: 'AI answers with maths and tables, into clean Word files.',
    status: 'Free tool',
    type: { big: '.md → .docx', small: 'Runs in your browser' },
    href: '/tools/aicemark',
    internal: true,
  },
];

export const SERVICE_OPTIONS = [...SERVICES.map((s) => s.name), 'Something else'];
