export const CONTACT = {
  email: 'mthasan@aiceservices.com',
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
  link?: { href: string; label: string }; // optional product page
};

export const SERVICES: Service[] = [
  {
    id: 'design',
    n: '01',
    title: 'Design',
    name: 'Water & waste engineering design',
    line: 'Water supply, wastewater, treatment plants and integrated solid waste management: designed from scratch, or reviewed.',
    plates: [
      { kind: 'img', src: '/img/plant.webp' },
      { kind: 'img', src: '/img/pipes.webp' },
    ],
  },
  {
    id: 'procurement',
    n: '02',
    title: 'Procurement',
    name: 'Bids & procurement',
    line: 'Bid documents, bid preparation and bid evaluation, plus grievance redressal. ADB, World Bank and PPRA rules.',
    plates: [
      { kind: 'img', src: '/img/synckutub.webp' },
      { kind: 'type', big: 'Bid to award', small: 'Documents · evaluation · grievances', light: true },
    ],
  },
  {
    id: 'contracts',
    n: '03',
    title: 'Contracts',
    name: 'Contract management & claims',
    line: 'Contract management, planning and scheduling, variations, extension of time, claims, disputes and arbitration.',
    plates: [
      { kind: 'img', src: '/img/aicemark.webp' },
      { kind: 'type', big: 'EOT · Claims', small: 'Variations · disputes · arbitration' },
    ],
  },
  {
    id: 'assistants',
    n: '04',
    title: 'AI Assistants',
    name: 'AI voice & chat assistants',
    line: 'Custom text and voice chatbots trained on your documents. Built for Punjab’s LG&CDD and ADB’s PICIIP programme.',
    plates: [{ kind: 'img', src: '/img/assistant.webp' }, { kind: 'chat' }],
  },
  {
    id: 'software',
    n: '05',
    title: 'Software',
    name: 'Apps, websites & Android TV',
    line: 'Custom desktop and web apps, websites live in hours, and Android TV launchers and light, high-res games for kids.',
    plates: [
      { kind: 'img', src: '/img/studio.webp' },
      { kind: 'type', big: 'Apps · Web · TV', small: 'Built in hours, not months', light: true },
    ],
  },
  {
    id: 'video',
    n: '06',
    title: 'Video',
    name: 'AI video editing',
    link: { href: '/video/', label: 'See AICE Video' },
    line: 'AI pipelines that take apart any reference video, editing style and all, and rebuild it on your footage.',
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
    href: '/synckutub/',
  },
  {
    id: 'androidtv',
    name: 'Android TV',
    line: 'Ad-free home screens and light, high-res games for kids.',
    status: 'Service',
    type: { big: 'Your TV, your rules.', small: 'Launchers · kids’ games' },
    href: '/freeyourtv/',
  },
  {
    id: 'videostudio',
    name: 'AICE Video Studio',
    line: 'An offline video editor for Windows, with 4K export.',
    status: 'In development',
    img: '/img/videostudio.webp',
    alt: 'A video editing desk with a timeline on screen and a cinema camera',
    href: '/videostudio/',
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
  {
    id: 'aicevideo',
    name: 'AICE Video',
    line: 'Send a reel you love and your raw clips. We rebuild that edit on your footage.',
    status: 'Studio',
    img: '/img/video-frames.webp',
    alt: 'Raw phone clips turned into an edited reel',
    href: '/video/',
  },
];

/* ---------- Expertise: the full list, grouped ---------- */
export type XpItem = { t: string; note?: string };
export type XpGroup = { name: string; line: string; img?: string; type?: { big: string; small: string }; items: XpItem[] };
export type XpDomain = { id: string; title: string; groups: XpGroup[] };

export const EXPERTISE: XpDomain[] = [
  {
    id: 'eng',
    title: 'Engineering',
    groups: [
      {
        name: 'Design', line: 'Water, wastewater, treatment and solid waste',
        img: '/img/plant.webp',
        items: [
          { t: 'Water supply systems' },
          { t: 'Wastewater systems' },
          { t: 'Water & wastewater treatment' },
          { t: 'Integrated solid waste management' },
          { t: 'Design review' },
        ],
      },
      {
        name: 'Procurement', line: 'Bid documents, evaluation and grievances',
        img: '/img/synckutub.webp',
        items: [{ t: 'Bid documents' }, { t: 'Bid preparation' }, { t: 'Bid evaluation' }, { t: 'Grievance redressal' }],
      },
      {
        name: 'Contracts', line: 'Variations, EOT, claims and arbitration',
        img: '/img/aicemark.webp',
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
      { name: 'Assistants', line: 'Text and voice chatbots, built for LG&CDD and PICIIP', img: '/img/assistant.webp', items: [{ t: 'Custom text & voice chatbots', note: 'Built for Punjab’s LG&CDD and ADB’s PICIIP programme' }] },
      { name: 'Applications', line: 'SyncKutub, AICEMark, AICE Video Studio', img: '/img/videostudio.webp', items: [{ t: 'Custom desktop & web apps', note: 'SyncKutub, AICEMark, AICE Video Studio' }] },
      { name: 'Video', line: 'Copies any edit’s style onto your footage', img: '/img/video-frames.webp', items: [{ t: 'AI video pipelines', note: 'Reverse-engineer any video and its editing style' }] },
      { name: 'Websites', line: 'Custom websites, live in hours', img: '/img/studio.webp', items: [{ t: 'Custom websites, live in hours' }] },
      { name: 'Android TV', line: 'Launchers and light, high-res kids’ games', type: { big: 'Your TV, your rules.', small: 'Launchers · kids’ games' }, items: [{ t: 'Launcher customisation' }, { t: 'High-res games for kids', note: 'Made to run on low-end TVs' }] },
    ],
  },
];

export const SERVICE_OPTIONS = [...SERVICES.map((s) => s.name), 'Something else'];
