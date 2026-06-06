import { useState, type FormEvent } from 'react';
import { FadeInSection } from './FadeInSection';

export function ServicesDetailed() {
  return (
    <FadeInSection id="services" className="services-detailed">
      <div className="container">
        <h2>Specialist Engineering Consultancy</h2>
        
        <div className="traditional-services-detailed" style={{ marginTop: '2rem' }}>
          <div className="solution-card service-detail" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', padding: 'var(--spacing-lg)', textAlign: 'center' }}>
            <div>
              <div className="card-icon"><i className="fas fa-drafting-compass"></i></div>
              <h3 style={{ marginBottom: 'var(--spacing-sm)', fontSize: '1.5rem' }}>Engineering Design Review</h3>
              <p style={{ textAlign: 'justify', marginBottom: '1.5rem', lineHeight: '1.7', color: 'rgb(209, 213, 219)' }}>
                Comprehensive analysis, hydraulic modeling, and engineering design verification for crucial public work components.
              </p>
              <ul style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)', marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-xs)' }}>
                  <i className="fas fa-check-circle" style={{ color: 'var(--secondary)', marginTop: '0.25rem' }}></i>
                  <span>Water supply network and distribution systems</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-xs)' }}>
                  <i className="fas fa-check-circle" style={{ color: 'var(--secondary)', marginTop: '0.25rem' }}></i>
                  <span>Urban sewerage grids and environmental safeguards</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-xs)' }}>
                  <i className="fas fa-check-circle" style={{ color: 'var(--secondary)', marginTop: '0.25rem' }}></i>
                  <span>Direct solid waste sorting and disposal planning</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="solution-card service-detail" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', padding: 'var(--spacing-lg)', textAlign: 'center' }}>
            <div>
              <div className="card-icon"><i className="fas fa-file-signature"></i></div>
              <h3 style={{ marginBottom: 'var(--spacing-sm)', fontSize: '1.5rem' }}>Contract &amp; Claims</h3>
              <p style={{ textAlign: 'justify', marginBottom: '1.5rem', lineHeight: '1.7', color: 'rgb(209, 213, 219)' }}>
                Proactive management of donor-funded agreements to maximize transparency, audit readiness, and prevent disputes.
              </p>
              <ul style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)', marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-xs)' }}>
                  <i className="fas fa-check-circle" style={{ color: 'var(--secondary)', marginTop: '0.25rem' }}></i>
                  <span>Comprehensive FIDIC-based contract review</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-xs)' }}>
                  <i className="fas fa-check-circle" style={{ color: 'var(--secondary)', marginTop: '0.25rem' }}></i>
                  <span>Project dispute prevention &amp; resolution advisory</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-xs)' }}>
                  <i className="fas fa-check-circle" style={{ color: 'var(--secondary)', marginTop: '0.25rem' }}></i>
                  <span>Rigid assessment &amp; resolution of engineering claims</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="solution-card service-detail" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', padding: 'var(--spacing-lg)', textAlign: 'center' }}>
            <div>
              <div className="card-icon"><i className="fas fa-file-invoice"></i></div>
              <h3 style={{ marginBottom: 'var(--spacing-sm)', fontSize: '1.5rem' }}>Bid Preparation &amp; Evaluation</h3>
              <p style={{ textAlign: 'justify', marginBottom: '1.5rem', lineHeight: '1.7', color: 'rgb(209, 213, 219)' }}>
                Highly competitive and meticulously compliant proposals tailored specifically for ADB, World Bank, and PPRA standards.
              </p>
              <ul style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)', marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-xs)' }}>
                  <i className="fas fa-check-circle" style={{ color: 'var(--secondary)', marginTop: '0.25rem' }}></i>
                  <span>Meticulous drafting of complex technical proposals</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-xs)' }}>
                  <i className="fas fa-check-circle" style={{ color: 'var(--secondary)', marginTop: '0.25rem' }}></i>
                  <span>Dynamic cost estimation, pricing, and index analyses</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-xs)' }}>
                  <i className="fas fa-check-circle" style={{ color: 'var(--secondary)', marginTop: '0.25rem' }}></i>
                  <span>Double-stage compliance and audit readiness checks</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="services-cta">
          <a href="#contact" className="btn btn-primary">Request Expert Consultation</a>
        </div>
      </div>
    </FadeInSection>
  );
}

export function StandardsDetailed() {
  return (
    <FadeInSection id="standards" className="standards-detailed">
      <div className="container">
        <h2>Compliance Standards</h2>
        
        <h3>International Standards</h3>
        <div className="standards-grid">
          <div className="standard-card"><i className="fas fa-shield-alt"></i><span>NDA</span></div>
          <div className="standard-card"><i className="fas fa-gavel"></i><span>FIDIC</span></div>
          <div className="standard-card"><i className="fas fa-building"></i><span>ADB Guidelines</span></div>
          <div className="standard-card"><i className="fas fa-globe"></i><span>World Bank Standards</span></div>
        </div>
        
        <h3>National Standards</h3>
        <div className="national-standards">
          <ul>
            <li><i className="fas fa-check"></i> PPRA Act and Rules</li>
            <li><i className="fas fa-check"></i> PHED Codes &amp; Standards</li>
            <li><i className="fas fa-check"></i> EPA Guidelines</li>
            <li><i className="fas fa-check"></i> WASA Standards</li>
            <li><i className="fas fa-check"></i> PEC Guidelines</li>
            <li><i className="fas fa-check"></i> Safety &amp; Labor Standards</li>
          </ul>
        </div>
      </div>
    </FadeInSection>
  );
}

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    { category: "Specialist Civil Engineering Consultancy & Regulatory Frameworks", items: [
      { 
        q: "How does AICE manage master planning, hydraulic modeling, and engineering design verification for municipal water supply and urban sewerage networks?", 
        a: "Our engineering design reviews cover full hydraulic simulations, water distribution balancing, and sewer network staging. All master planning deliverables align strictly with WASA and PHED (Public Health Engineering Department) codes, ensuring pressure thresholds, environmental safeguards, flow velocities, and urban growth models satisfy local government requirements and EPA (Environmental Protection Agency) guidelines." 
      },
      { 
        q: "What types of FIDIC contract administration, advisory, and dispute resolution services do you provide?", 
        a: "AICE provides active, audit-ready administration support under FIDIC Conditions of Contract (including Red, Yellow, and Silver books). We specialize in reviewing complex international and national tender dossiers, handling claims under FIDIC Clause 20.1 (such as extensions of time, unexpected site physical conditions, and cost index adjustments), and preparing comprehensive evidence packets to support dispute resolution proceedings and audit checks." 
      },
      { 
        q: "How do you prepare competitive bid proposals to meet the strict compliance standards of the ADB, World Bank, and PPRA?", 
        a: "We deploy a double-stage compliance verification process. Stage one checks strict eligibility, Joint Venture (JV) formatting, and standard tender guidelines (such as PPRA Act and Rules). Stage two centers on technical bid writing, including clear engineering method statements, comprehensive work schedules, cash flow curves, and detailed Bill of Quantities (BoQ) itemization. This ensures 100% compliance, zero technical non-responsiveness, and optimized pricing structures under donor-funded criteria." 
      }
    ]},
    { category: "AICEMark: Math, GFM & Word Formatting", items: [
      { 
        q: "Why does copy-pasting mathematical equations, formulas, and complex tables from AI chat platforms (like OpenAI, Gemini, ChatGPT, DeepSeek, Grok, or Claude) into Microsoft Word corrupt the layouts?", 
        a: "AI platforms render their responses as interactive HTML elements processed from raw Markdown. When users copy-paste directly into Microsoft Word, Word fails to translate GFM (GitHub Flavored Markdown) tables, LaTeX formulas, and inline mathematical equations properly. The result is plain english text showing raw code, broken list indents, detached table columns, and completely missing symbols. AICEMark solves this by natively converting raw Markdown strings into beautifully typeset, Calibri-styled Microsoft Word (.docx) documents with perfect margins and table borders." 
      },
      { 
        q: "How does AICEMark's interactive Smart AI Repair engine fix rendering anomalies, math subscripts, and nested list indents?", 
        a: "If an AI chat output is copied with malformed structures, AICEMark's smart AI repair engine detects layout breaks in real-time. Driven by gemini-3.1-flash-lite via the professional @google/genai SDK, it programmatically scans the text to balance unclosed emphasis tags, fix broken nested indented lists, restore split GFM columns, and convert flat multi-line equations into pristine KaTeX-compliant syntax ($ for inline, $$ for blocks) before compiling your clean export." 
      },
      { 
        q: "Does AICEMark support math symbol typesetting such as equations and inline scientific formulas?", 
        a: "Yes. AICEMark features complete KaTeX integration through remark-math and rehype-katex. It immediately parses both absolute LaTeX math blocks and inline mathematical notations. These equations are beautifully typeset in your interactive live-preview pane and translated directly into a clean Word document layout without characters dropping or overlapping." 
      }
    ]},
    { category: "AICE Deck Edit: Unlocking Google NotebookLM Presentations", items: [
      { 
        q: "Why are presentation slides exported from Google NotebookLM flat, locked images, and how does AICE Deck Edit make them editable?", 
        a: "Google NotebookLM is excellent for synthesizing source uploads, but its slide generation pipeline is flat and uneditable. Gemini reads your inputs, maps the outline, and commands an advanced multimodal image model (Nano Banana) to render the final visual layout. This bakes colors, icons, layout boxes, and slide copy together into a single flat pixel layer. AICE Deck Edit liberates these locked templates. It leverages Gemini's OCR capabilities to trace text coordinate boxes, inpaint/erase backplates to create clean background templates, and rebuilds everything into native, fully editable PowerPoint (.pptx) slides with responsive text fields mapped with pixel-perfect coordinates." 
      },
      { 
        q: "How does AICE Deck Edit allow users to erase slide backgrounds and manually clean complex presentation templates?", 
        a: "AICE Deck Edit provides an interactive zoom-and-focus workspace equipped with automatic OCR erasure and manual drawing boxes. Users can draw selection boxes directly onto slide images to wipe out background artifacts, placeholder texts, or flat graphical elements. The application maintains an undo history layer and overlays floating status badges that indicate original vs cleaned layers, ensuring you maintain 100% control over slide templates." 
      },
      { 
        q: "Does AICE Deck Edit alter slide formatting, fonts, or margin alignments during PPTX export?", 
        a: "No. The system uses coordinate-translation algorithms that align bounding box widths, heights, margins, and layout proportions precisely to the original flat slide. When compiling back to PowerPoint, AICE Deck Edit matches font measurements exactly, ensuring your text containers reside on top of clean, inpainted backplates without overlapping key content." 
      }
    ]},
    { category: "AICE ProScan: Engineering OCR, JV Agreements & BoQ Translation", items: [
      { 
        q: "Why do signed bid documents, Joint Venture (JV) agreements, and scanned PDFs trigger errors or omissions in generic AI tools, and how does AICE ProScan resolve this?", 
        a: "Scanned contract agreements, signed bids, and dense tables are often heavily skewed or watermarked. Standard AI assistants or tools like NotebookLM try to extract these as basic flat lines, leading to critical omissions—like failing to detect JV agreements or missing complex liability clauses entirely. AICE ProScan provides an engineering-grade OCR workspace designed for page-by-page processing. Under tight sandbox security, it scans documents skew-by-skew and maps stamps, administrative seals, signatures, and dense schedules into clear, readable Markdown structures." 
      },
      { 
        q: "How does AICE ProScan protect complex civil engineering units (m³, m², kg) and currency lists from rounding errors and hallucinations?", 
        a: "Standard LLMs frequently misread exponents, decimals, index points, or volumetric units (e.g., misinterpreting m³ as m or ignoring square-meter metrics entirely) during general OCR. AICE ProScan applies rigorous, specialized system prompts to restrict numerical transcription. It treats Bills of Quantities (BoQs) and physical schedules as absolute numeric tables, ensuring all units, rates, PKR/USD values, and calculations are captured without rounding compromises." 
      },
      { 
        q: "What is AICE ProScan’s Anti-Recitation Safeguard for legal contract agreements in technical bidding?", 
        a: "Traditional LLMs frequently trigger safety and recitation blocks when asked to reproduce legal boilerplate text from uploaded contracts, surety bonds, or registry stamp papers. AICE ProScan bypasses these filters using its intelligent anti-recitation safeguard. It reformulates standard structural legal clauses dynamically without altering names, dates, amounts, calculation guidelines, or binding specifications, producing an editable work draft optimized for risk queries." 
      },
      { 
        q: "Does AICE ProScan support batch document processing, model switching, and side-by-side verification?", 
        a: "Yes. Users can audit pages in a side-by-side split screen comparing source PDF high-resolution graphics with active drafts. You can target individual pages or run structured background batch processes across complete dossiers. ProScan also supports dropdown model selections (including Gemini 2.5 Flash and Pro) depending on document complexity, allowing you to edit drafts in customizable Workspace tabs before exporting everything as a single combined Markdown (.md) file." 
      }
    ]},
    { category: "Data Security & Sandboxed API Key Management", items: [
      { 
        q: "How does AICE manage my personal Gemini API keys, and is my data shared with third parties?", 
        a: "AICE operates under strict offline-first and client-side sandbox architectures. When you input your Gemini API Key in AICEMark, AICE Deck Edit, or AICE ProScan, the key is strictly cached in your local browser sandbox (localStorage) and transmitted directly to Google's official Gemini endpoint APIs. We do not maintain secondary databases, our servers never store your API keys, and your data remains private and invisible to any third-party." 
      },
      { 
        q: "How do I update, swap, or delete my stored Gemini keys in the workspace tools?", 
        a: "To protect your secrets, key entry forms remain hidden by default. Storing a key activates a subtle key management icon near workspace controls. Clicking this icon opens the Key Manager, allowing you to instantly clear cached keys from `localStorage` or swap them when shifting from high-agility (Gemini 2.5 Flash) to high-precision (Gemini 2.5 Pro) workflows." 
      }
    ]}
  ];

  let globalIndex = 0;

  return (
    <FadeInSection id="faq" className="faq">
      <div className="container">
        <h2>Frequently Asked Questions</h2>
        {faqs.map((cat, catIndex) => (
          <div key={catIndex} className="faq-category">
            <h3>{cat.category}</h3>
            {cat.items.map((item, itemIndex) => {
              const currentIndex = globalIndex++;
              const isActive = activeIndex === currentIndex;
              return (
                <div key={itemIndex} className={`faq-item ${isActive ? 'active' : ''}`}>
                  <button className="faq-question" onClick={() => toggleFAQ(currentIndex)}>
                    {item.q}
                    <i className={`fas fa-chevron-down ${isActive ? 'transform rotate-180' : ''}`} style={{ transition: 'transform 0.3s' }}></i>
                  </button>
                  <div className="faq-answer" style={{ 
                      maxHeight: isActive ? '1200px' : '0', 
                      padding: isActive ? '1rem' : '0 1rem', 
                      overflow: 'hidden', 
                      transition: 'all 0.3s' 
                    }}>
                    <p style={{ lineHeight: '1.6', fontSize: '0.85rem' }}>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div className="faq-ctas">
          <a href="#contact" className="btn btn-primary">Contact Our Team</a>
          <a href="https://wa.me/923013666088" target="_blank" rel="noreferrer" className="btn btn-secondary">WhatsApp Support</a>
        </div>
      </div>
    </FadeInSection>
  );
}

export function Contact() {
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString()
      });
      alert('Thank you for your message! We will contact you shortly.');
      form.reset();
      setDetails('');
    } catch (error) {
      alert('There was an error submitting the form. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FadeInSection id="contact" className="contact">
      <div className="container">
        <h2>Contact Us</h2>
        <div className="contact-content">
          <div className="contact-form-section">
            <form id="contact-form" className="contact-form" name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value="contact" />
              <div className="form-group">
                <label htmlFor="email">Your Email *</label>
                <input type="email" id="email" name="email" placeholder="example@domain.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="service">Select Workspace/Service *</label>
                <select id="service" name="service" required defaultValue="">
                  <option value="" disabled>Choose a service or tool</option>
                  <option value="AICEMark">AICEMark Document Editor</option>
                  <option value="AICE Deck Edit">AICE Deck Edit</option>
                  <option value="AICE ProScan">AICE ProScan OCR</option>
                  <option value="Engineering Design">Engineering Design</option>
                  <option value="Contract & Claims">Contract & Claims</option>
                  <option value="Bid Preparation & Evaluation">Bid Preparation & Evaluation</option>
                  <option value="Multiple">Multiple / Other Automation</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="details">How can we help? *</label>
                <textarea id="details" name="details" rows={6} maxLength={1000} placeholder="Describe your challenge or project scope..." required value={details} onChange={(e) => setDetails(e.target.value)}></textarea>
                <small className="char-count"><span style={{ color: details.length > 950 ? '#f44336' : 'inherit' }}>{details.length}</span>/1000 characters</small>
              </div>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
            </form>
          </div>
          <div className="contact-info">
            <h3>Direct Contact</h3>
            <div className="contact-detail">
              <i className="fas fa-envelope"></i>
              <span>contact@aiceservices.com</span>
            </div>
            <div className="contact-detail">
              <i className="fab fa-whatsapp"></i>
              <span>+92 301 3666088</span>
            </div>
            <div className="contact-detail">
              <i className="fas fa-clock"></i>
              <span>Mon–Fri 9-18, Sat 9-14 (PST)</span>
            </div>
            
            <h3>Our Process</h3>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <p>Instant response</p>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <p>Consultation call</p>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <p>Proposal &amp; Timelines</p>
              </div>
              <div className="process-step">
                <div className="step-number">4</div>
                <p>Commencement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}
