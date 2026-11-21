export const CONTACT = {
  email: 'contact@aiceservices.com',
  phone: '+92 301 3666088',
  phoneHref: 'tel:+923013666088',
  hours: 'Mon–Fri 09:00–18:00 · Sat 09:00–14:00 (PKT)',
};

export type Tool = {
  id: string;
  code: string;
  name: string;
  route: string;
  tagline: string;
  problem: string;
  solution: string;
  input: string;
  output: string;
  chips: string[];
};

export const TOOLS: Tool[] = [
  {
    id: 'aicemark',
    code: 'T-01',
    name: 'AICEMark',
    route: '/tools/aicemark',
    tagline: 'Markdown & LaTeX → native Word',
    problem:
      'Copy-pasting AI-generated formulas, engineering symbols and tables into Microsoft Word breaks the formatting.',
    solution:
      'AICEMark turns GFM Markdown and LaTeX into clean, natively styled Word (.docx) files, with an optional client-side AI repair pass for broken lists, tables and equations.',
    input: '.md / LaTeX',
    output: '.docx',
    chips: ['KaTeX', 'GFM tables', 'AI repair'],
  },
  {
    id: 'deckedit',
    code: 'T-02',
    name: 'AICE Deck Edit',
    route: '/tools/deckedit',
    tagline: 'NotebookLM slides → editable PPTX',
    problem:
      'Google NotebookLM produces great slides, but bakes them into flat, locked images that cannot be edited.',
    solution:
      'Deck Edit traces the text, cleans the background plates and rebuilds every slide as a native, fully editable PowerPoint (.pptx).',
    input: 'Flat slide images',
    output: '.pptx',
    chips: ['OCR', 'Inpainting', 'Layout mapping'],
  },
  {
    id: 'proscan',
    code: 'T-03',
    name: 'AICE ProScan',
    route: '/tools/proscan',
    tagline: 'Engineering-grade OCR for bids & BoQs',
    problem:
      'Scanned bids, JV agreements and dense BoQs trip up generic AI tools: units, decimals and clauses go missing.',
    solution:
      'ProScan digitises technical documents page by page, keeping m³, m², rates and currencies exact, with side-by-side verification and batch runs.',
    input: 'Scanned PDF',
    output: 'Structured Markdown',
    chips: ['Units-safe', 'Page by page', 'Batch'],
  },
  {
    id: 'boqauditor',
    code: 'T-04',
    name: 'AICE BOQ Auditor',
    route: '/tools/boqauditor',
    tagline: 'Master BOQ vs Contractor BOQ diff',
    problem:
      'Checking a contractor’s submitted Bill of Quantities against the master, line by line, is slow and error-prone.',
    solution:
      'BOQ Auditor compares the two spreadsheets automatically and flags every changed quantity, rate, item and amount.',
    input: '2 × spreadsheet',
    output: 'Difference report',
    chips: ['Line-by-line', 'Rates & qty', 'Audit trail'],
  },
];

export const SERVICES = [
  {
    code: 'S-01',
    title: 'Engineering Design Review',
    summary:
      'Comprehensive analysis, hydraulic modelling and design verification for critical public-works components.',
    points: [
      'Water supply networks and distribution systems',
      'Urban sewerage and environmental safeguards',
      'Solid waste collection, sorting and disposal planning',
    ],
    chips: ['Water supply', 'Sewerage', 'Solid waste'],
  },
  {
    code: 'S-02',
    title: 'Contract & Claims',
    summary:
      'Proactive management of donor-funded agreements for transparency, audit readiness and dispute prevention.',
    points: [
      'FIDIC-based contract review (Red, Yellow, Silver)',
      'Dispute prevention and resolution advisory',
      'Rigorous assessment of engineering claims',
    ],
    chips: ['FIDIC', 'Claims', 'Disputes'],
  },
  {
    code: 'S-03',
    title: 'Bid Preparation & Evaluation',
    summary:
      'Competitive, meticulously compliant proposals built for ADB, World Bank and PPRA requirements.',
    points: [
      'Drafting of complex technical proposals',
      'Cost estimation, pricing and index analysis',
      'Two-stage compliance and audit-readiness checks',
    ],
    chips: ['ADB', 'World Bank', 'PPRA'],
  },
];

export const STANDARDS = [
  { code: 'STD-01', name: 'FIDIC', note: 'Conditions of Contract', scope: 'International' },
  { code: 'STD-02', name: 'ADB Guidelines', note: 'Procurement & safeguards', scope: 'International' },
  { code: 'STD-03', name: 'World Bank', note: 'Procurement framework', scope: 'International' },
  { code: 'STD-04', name: 'NDA', note: 'Confidential handling', scope: 'International' },
  { code: 'STD-05', name: 'PPRA', note: 'Act and Rules', scope: 'National' },
  { code: 'STD-06', name: 'PHED', note: 'Codes & standards', scope: 'National' },
  { code: 'STD-07', name: 'EPA', note: 'Environmental guidelines', scope: 'National' },
  { code: 'STD-08', name: 'WASA', note: 'Water & sewerage standards', scope: 'National' },
  { code: 'STD-09', name: 'PEC', note: 'Engineering council guidelines', scope: 'National' },
  { code: 'STD-10', name: 'Safety & Labor', note: 'Site safety standards', scope: 'National' },
];

export const PROCESS = [
  { n: '01', title: 'Instant response', text: 'We acknowledge your enquiry promptly.' },
  { n: '02', title: 'Consultation call', text: 'A short call to understand scope, standards and deadlines.' },
  { n: '03', title: 'Proposal & timelines', text: 'A clear written proposal with deliverables and dates.' },
  { n: '04', title: 'Commencement', text: 'Work starts, with regular, audit-ready progress updates.' },
];

export const TICKER = [
  'Audit-ready deliverables',
  'ADB · World Bank · PPRA',
  'Water · Sanitation · Solid waste',
  'FIDIC contract & claims',
  'Free client-side AI tools',
  'Custom engineering automation',
];

export type FaqGroup = { category: string; items: { q: string; a: string }[] };

export const FAQS: FaqGroup[] = [
  {
    category: 'Specialist consultancy & regulatory frameworks',
    items: [
      {
        q: 'How does AICE manage master planning, hydraulic modelling and design verification for municipal water supply and sewerage networks?',
        a: 'Our engineering design reviews cover full hydraulic simulations, water distribution balancing and sewer network staging. All master planning deliverables align with WASA and PHED (Public Health Engineering Department) codes, so pressure thresholds, environmental safeguards, flow velocities and urban growth models satisfy local government requirements and EPA (Environmental Protection Agency) guidelines.',
      },
      {
        q: 'What FIDIC contract administration, advisory and dispute resolution services do you provide?',
        a: 'AICE provides audit-ready administration support under FIDIC Conditions of Contract (including the Red, Yellow and Silver books). We review complex international and national tender dossiers, handle claims under FIDIC Clause 20.1 (such as extensions of time, unforeseen physical conditions and cost index adjustments), and prepare comprehensive evidence packs to support dispute resolution and audits.',
      },
      {
        q: 'How do you prepare bid proposals that meet ADB, World Bank and PPRA compliance standards?',
        a: 'We use a two-stage compliance process. Stage one checks eligibility, Joint Venture (JV) formatting and tender guidelines such as the PPRA Act and Rules. Stage two focuses on technical bid writing: engineering method statements, work schedules, cash-flow curves and detailed Bill of Quantities (BoQ) itemisation, aiming for zero technical non-responsiveness and well-structured pricing under donor-funded criteria.',
      },
    ],
  },
  {
    category: 'AICEMark: math, GFM & Word formatting',
    items: [
      {
        q: 'Why does copy-pasting equations and tables from AI chat tools (ChatGPT, Gemini, Claude, DeepSeek, Grok) into Word break the layout?',
        a: 'AI chat platforms render their answers as HTML built from raw Markdown. When pasted into Microsoft Word, GFM (GitHub Flavored Markdown) tables, LaTeX formulas and inline equations do not translate properly: you get raw code, broken list indents, detached table columns and missing symbols. AICEMark converts the raw Markdown into a properly typeset, Calibri-styled Word (.docx) document with clean margins and table borders.',
      },
      {
        q: 'How does AICEMark’s Smart AI Repair fix rendering problems, subscripts and nested lists?',
        a: 'If the copied text has malformed structure, AICEMark’s repair engine detects the layout breaks. Using Gemini through the official @google/genai SDK, it balances unclosed emphasis, fixes nested list indents, restores split GFM columns and converts flat multi-line equations into KaTeX-compliant syntax ($ for inline, $$ for blocks) before exporting.',
      },
      {
        q: 'Does AICEMark support equations and inline scientific formulas?',
        a: 'Yes. AICEMark integrates KaTeX through remark-math and rehype-katex. It parses both LaTeX math blocks and inline notation, shows them typeset in the live preview, and writes them into a clean Word document without dropped or overlapping characters.',
      },
    ],
  },
  {
    category: 'AICE Deck Edit: editable NotebookLM presentations',
    items: [
      {
        q: 'Why are NotebookLM slides flat images, and how does Deck Edit make them editable?',
        a: 'NotebookLM’s slide pipeline renders the final layout with an image model, baking colours, icons, boxes and text into one flat pixel layer. AICE Deck Edit uses Gemini’s OCR to trace text boxes, inpaints the background to create clean templates, and rebuilds everything as native, editable PowerPoint (.pptx) slides with text fields at the original coordinates.',
      },
      {
        q: 'Can I erase backgrounds and clean slide templates manually?',
        a: 'Yes. Deck Edit has a zoom-and-focus workspace with automatic OCR erasure and manual selection boxes. Draw boxes on a slide to remove artefacts, placeholder text or flat graphics. An undo history and status badges (original vs cleaned) keep you in full control.',
      },
      {
        q: 'Does Deck Edit change fonts, formatting or margins when exporting to PPTX?',
        a: 'No. Coordinate-translation keeps box widths, heights, margins and proportions aligned with the original slide, and font sizes are matched so text sits on the clean background without overlapping key content.',
      },
    ],
  },
  {
    category: 'AICE ProScan: engineering OCR, JV agreements & BoQs',
    items: [
      {
        q: 'Why do signed bids, JV agreements and scanned PDFs cause errors in generic AI tools, and how does ProScan help?',
        a: 'Scanned contracts and dense tables are often skewed or watermarked, and generic tools read them as flat lines, missing items such as JV agreements or liability clauses. ProScan processes documents page by page, mapping stamps, seals, signatures and dense schedules into clear, readable Markdown.',
      },
      {
        q: 'How does ProScan protect units (m³, m², kg) and currencies from rounding errors and hallucinations?',
        a: 'General OCR often misreads exponents, decimals and units (for example m³ as m). ProScan uses specialised prompts that treat BoQs and schedules as strict numeric tables, so units, rates, PKR/USD values and calculations are captured without rounding.',
      },
      {
        q: 'What is ProScan’s Anti-Recitation Safeguard for legal agreements?',
        a: 'Language models sometimes refuse to reproduce legal boilerplate from contracts, bonds or stamp papers. ProScan rephrases standard structural clauses without changing names, dates, amounts or binding specifications, producing an editable working draft for review.',
      },
      {
        q: 'Does ProScan support batch processing, model switching and side-by-side checking?',
        a: 'Yes. Compare the source page and the draft side by side, process single pages or whole dossiers in batch, choose the Gemini model to suit document complexity, edit drafts in workspace tabs and export everything as one combined Markdown (.md) file.',
      },
    ],
  },
  {
    category: 'Data security & API keys',
    items: [
      {
        q: 'How does AICE handle my Gemini API key? Is my data shared with third parties?',
        a: 'The tools run client-side in your browser. Your Gemini API key is stored only in your browser’s local storage (localStorage) on your device and is sent directly to Google’s official Gemini API. AICE has no database for keys, our servers never receive or store them, and your documents are not shared with third parties.',
      },
      {
        q: 'How do I update, swap or delete my stored Gemini key?',
        a: 'Key entry stays hidden by default. Once a key is saved, a small key icon appears near the workspace controls; it opens the Key Manager, where you can clear the stored key from localStorage or replace it at any time.',
      },
    ],
  },
];
