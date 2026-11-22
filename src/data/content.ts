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
      { kind: 'img', src: '/img/studio.webp' },
      { kind: 'type', big: 'Live in hours', small: 'Design · build · launch', light: true },
    ],
  },
  {
    id: 'assistants',
    n: '03',
    title: 'AI Assistants',
    name: 'AI voice & chat assistants',
    line: 'Assistants that answer your customers by text or voice, from your own documents, on your website.',
    plates: [{ kind: 'img', src: '/img/assistant.webp' }, { kind: 'chat' }],
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
  alt?: string;
  type?: { big: string; small: string };
  href?: string;
  internal?: boolean;
};

export const WORK: Work[] = [
  {
    id: 'synckutub',
    name: 'SyncKutub',
    line: 'Ask your own files. Answers with clickable citations.',
    status: 'Released',
    img: '/img/synckutub.webp',
    alt: 'Stacks of engineering reports and binders beside a laptop',
    href: 'https://github.com/tulaibhasan/synckutub-releases/releases',
  },
  {
    id: 'androidtv',
    name: 'Android TV',
    line: 'Ad-free home screens and light, high-res games for kids.',
    status: 'Service',
    type: { big: 'Your TV, your rules.', small: 'Launchers · kids’ games' },
  },
  {
    id: 'videostudio',
    name: 'AICE Video Studio',
    line: 'An offline video editor for Windows, with 4K export.',
    status: 'In development',
    img: '/img/videostudio.webp',
    alt: 'A video editing desk with a timeline on screen and a cinema camera',
  },
  {
    id: 'aicemark',
    name: 'AICEMark',
    line: 'AI answers with maths and tables, into clean Word files.',
    status: 'Free tool',
    img: '/img/aicemark.webp',
    alt: 'A printed report page with tables and an equation',
    href: '/tools/aicemark',
    internal: true,
  },
];

/* ---------- Expertise: the full list, grouped ---------- */
export type XpItem = { t: string; note?: string };
export type XpDomain = { id: string; title: string; groups: { name: string; items: XpItem[] }[] };

export const EXPERTISE: XpDomain[] = [
  {
    id: 'eng',
    title: 'Engineering',
    groups: [
      {
        name: 'Design',
        items: [
          { t: 'Water supply systems' },
          { t: 'Wastewater systems' },
          { t: 'Water & wastewater treatment' },
          { t: 'Integrated solid waste management' },
          { t: 'Design review' },
        ],
      },
      {
        name: 'Procurement',
        items: [{ t: 'Bid documents' }, { t: 'Bid preparation' }, { t: 'Bid evaluation' }, { t: 'Grievance redressal' }],
      },
      {
        name: 'Contracts',
        items: [
          { t: 'Contract management' },
          { t: 'Planning, scheduling & control' },
          { t: 'Variations & extension of time' },
          { t: 'Claims, disputes & arbitration' },
        ],
      },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Software',
    groups: [
      { name: 'Assistants', items: [{ t: 'Custom text & voice chatbots', note: 'Built for Punjab’s LG&CDD and ADB’s PICIIP programme' }] },
      { name: 'Applications', items: [{ t: 'Custom desktop & web apps', note: 'SyncKutub, AICEMark, AICE Video Studio' }] },
      { name: 'Video', items: [{ t: 'AI video pipelines', note: 'Reverse-engineer any video and its editing style' }] },
      { name: 'Websites', items: [{ t: 'Custom websites, live in hours' }] },
      { name: 'Android TV', items: [{ t: 'Launcher customisation' }, { t: 'High-res games for kids', note: 'Made to run on low-end TVs' }] },
    ],
  },
];

export const SERVICE_OPTIONS = [...SERVICES.map((s) => s.name), 'Android TV customisation', 'Something else'];
