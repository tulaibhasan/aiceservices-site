import { useState } from 'react';
import { FadeInSection } from './FadeInSection';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <FadeInSection id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>AI + Civil Engineering for Smarter Cities</h1>
          <p>Delivering audit-ready engineering solutions that meet ADB and World Bank standards through cutting-edge AI technology.</p>
          <div className="hero-ctas">
            <a href="#services" className="btn btn-primary">Explore Our Services</a>
            <a href="#contact" className="btn btn-secondary">Get Started Today</a>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

export function AISolutions() {
  return (
    <FadeInSection id="ai-solutions" className="ai-solutions">
      <div className="container">
        <h2>AI-Powered Solutions</h2>
        <div className="solutions-grid">
          <div className="solution-card">
            <div className="card-icon"><i className="fas fa-file-contract"></i></div>
            <h3>AICEMark</h3>
            <p>Live-preview Markdown editor for strictly formatted academic and professional documents.</p>
            <Link to="/tools/aicemark" className="btn btn-outline">Try Now</Link>
          </div>
          <div className="solution-card">
            <div className="card-icon"><i className="fas fa-file-powerpoint"></i></div>
            <h3>AICE Deck Edit</h3>
            <p>Deconstruct, purify backgrounds, and rebuild PDF decks into editable PowerPoint slides.</p>
            <Link to="/tools/deckedit" className="btn btn-outline">Try Now</Link>
          </div>
          <div className="solution-card">
            <div className="card-icon"><i className="fas fa-search"></i></div>
            <h3>AICE ProScan</h3>
            <p>Scan, parse, and OCR-process dense civil engineering bids, contracts, BoQs, and certificates.</p>
            <Link to="/tools/proscan" className="btn btn-outline">Try Now</Link>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

export function TraditionalServices() {
  return (
    <FadeInSection className="traditional-services">
      <div className="container">
        <h2>Traditional Engineering Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="card-icon"><i className="fas fa-drafting-compass"></i></div>
            <h3>Engineering Design</h3>
            <p>Water supply, sewerage, solid waste management</p>
            <a href="#services" className="btn btn-outline">Learn More</a>
          </div>
          <div className="service-card">
            <div className="card-icon"><i className="fas fa-file-signature"></i></div>
            <h3>Contracts &amp; Claims</h3>
            <p>Contract management and claims resolution</p>
            <a href="#services" className="btn btn-outline">Learn More</a>
          </div>
          <div className="service-card">
            <div className="card-icon"><i className="fas fa-file-invoice"></i></div>
            <h3>Bid Preparation</h3>
            <p>Competitive, compliant proposals</p>
            <a href="#services" className="btn btn-outline">Learn More</a>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

export function Standards() {
  return (
    <FadeInSection className="standards">
      <div className="container">
        <h2>Standards Compliance</h2>
        <div className="standards-icons">
          <div className="standard-icon"><i className="fas fa-shield-alt"></i><span>NDA</span></div>
          <div className="standard-icon"><i className="fas fa-gavel"></i><span>FIDIC</span></div>
          <div className="standard-icon"><i className="fas fa-building"></i><span>ADB</span></div>
          <div className="standard-icon"><i className="fas fa-globe"></i><span>World Bank</span></div>
        </div>
      </div>
    </FadeInSection>
  );
}

export function About() {
  return (
    <FadeInSection className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-heading">About Us</h2>
            <div className="founder-info">
              <div className="founder-image">
                <img src="/Muhammad-Tulaib-Hasan-Picture.jpg" alt="Muhammad Tulaib Hasan" />
              </div>
              <h3>Muhammad Tulaib Hasan</h3>
              <p>Founder - AICE Services</p>
              <p>8+ years in ADB/World Bank/Govt projects especially related to Water, Sanitation and Solid Waste.</p>
            </div>
            <div className="founder-details">
              <p>AICE Services is a founder-led initiative created by Muhammad Tulaib Hasan, a Water &amp; Sanitation Expert with over 8 years of experience in donor-funded and government projects. He has contributed to major programs financed by the Asian Development Bank, World Bank, and the Government of Punjab, where he led cost optimization, contract administration, engineering design reviews, and AI-driven automation.</p>
              <p>At AICE Services, we combine cutting-edge AI tools with hands-on engineering expertise to deliver faster reviews, compliant outputs, and audit-ready deliverables for complex projects.</p>
            </div>
            <div className="vision">
              <h3>Vision</h3>
              <p>“Our vision is to transform how projects are delivered — by integrating AI and engineering to achieve efficiency, transparency, and resilience for the future.”</p>
            </div>
            <div className="founder-note">
              <h3>Founder's Note</h3>
              <p>“As the founder of AICE Services, I believe the fusion of engineering and AI is not just about speeding up processes. It's about enabling smarter decisions, ensuring accountability, and creating sustainable outcomes.”</p>
            </div>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

export function AIToolEmbed() {
  return (
    <FadeInSection className="ai-tool-embed" id="ai-tool">
      <div className="container" style={{ maxWidth: '1400px' }}>
        <h2 className="text-center mb-8 text-3xl font-light">AICEMark Document Editor</h2>
        <p className="text-center mb-8 text-gray-600" style={{ maxWidth: '800px', margin: '0 auto 2rem' }}>
          A single-screen, live-preview Markdown editor specifically designed for drafting strictly formatted academic and professional documents. Experience true-to-format Word export and advanced syntax support directly in your browser.
        </p>
        <div className="w-full relative shadow-lg rounded-lg overflow-hidden border border-gray-100" style={{ height: '850px', backgroundColor: '#fff' }}>
          <iframe
            src="https://tulaibhasan-aicemark.hf.space"
            className="w-full h-full border-none"
            title="AICEMark Tool"
            allow="accelerometer; ambient-light-sensor; autoplay; battery; camera; document-domain; encrypted-media; fullscreen; geolocation; gyroscope; layout-animations; legacy-image-formats; magnetometer; microphone; midi; oversized-images; payment; picture-in-picture; publickey-credentials-get; sync-xhr; usb; vr ; wake-lock; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"
          ></iframe>
        </div>
      </div>
    </FadeInSection>
  );
}

export function DeckEditEmbed() {
  const [activeTab, setActiveTab] = useState<'flow' | 'planes' | 'engines'>('flow');

  return (
    <FadeInSection className="ai-tool-embed" id="deck-edit-tool">
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-light mb-4 tracking-tight">AICE Deck Edit</h2>
          <p className="text-gray-400 font-light mx-auto" style={{ maxWidth: '800px', fontSize: '15px' }}>
            A high-fidelity desktop web application designed to deconstruct static PDF slide decks, purify and inpaint their backgrounds, and reconstitute them into fully editable, visually immaculate PowerPoint presentations using Gemini Multi-Modal AI.
          </p>
        </div>

        {/* Secure Workstation Launcher */}
        <div style={{
          backgroundColor: '#121212',
          border: '1px solid #222222',
          padding: '3rem 2rem',
          textAlign: 'center',
          marginBottom: '3.5rem'
        }}>
          <div className="font-mono text-xs tracking-widest text-[#A0A0A0] mb-3">
            <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: '#4ade80', borderRadius: '50%', marginRight: '8px' }}></span>
            SYSTEM ACCESS CONTEXT DIRECTIVE // STANDALONE READY
          </div>
          <h3 className="text-2xl font-light mb-4 tracking-tight">Launch Dedicated App Workspace</h3>
          <p className="text-gray-400 font-light mx-auto mb-8" style={{ maxWidth: '700px', fontSize: '14px', lineHeight: '1.6' }}>
            To comply with Google Cloud's secure iframe sandboxing policies and enable full GPU accelerated processing, high-resolution rendering, and native PowerPoint exports, the interactive tool operates securely in a direct browser context.
          </p>

          <a
            href="https://ai.studio/apps/caa00651-c278-4279-b798-8c906372e374?fullscreenApplet=true"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary inline-flex items-center gap-2"
            style={{
              padding: '1rem 2.5rem',
              fontSize: '11px',
              letterSpacing: '3px',
              backgroundColor: '#fff',
              color: '#000',
              fontWeight: '600'
            }}
          >
            Launch Interactive Workspace <i className="fas fa-external-link-alt ml-2"></i>
          </a>

          <div className="font-mono text-[11px] text-gray-500 mt-6">
            Sandbox Client Authorization: Verified and Secure via Google AI Studio Platform
          </div>
        </div>

        {/* Interactive System Specifications Panel */}
        <div style={{ border: '1px solid #1A1A1A', backgroundColor: '#0D0D0D', padding: '2rem' }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#222] pb-4 mb-6" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 className="text-lg font-light tracking-tight text-white mb-1">Architecture & Operational Blueprint</h4>
              <p className="text-xs text-gray-500 font-mono">EXPLORE DETAILED DESIGN MODULES AND FUNCTIONAL PIANO LAYOUTS</p>
            </div>
            
            <div className="flex gap-2 mt-4 md:mt-0" style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setActiveTab('flow')}
                style={{
                  padding: '6px 14px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  border: '1px solid',
                  borderColor: activeTab === 'flow' ? '#fff' : '#222',
                  backgroundColor: activeTab === 'flow' ? '#1A1A1A' : 'transparent',
                  color: activeTab === 'flow' ? '#fff' : '#888',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                1. SYSTEM FLOW
              </button>
              <button
                onClick={() => setActiveTab('planes')}
                style={{
                  padding: '6px 14px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  border: '1px solid',
                  borderColor: activeTab === 'planes' ? '#fff' : '#222',
                  backgroundColor: activeTab === 'planes' ? '#1A1A1A' : 'transparent',
                  color: activeTab === 'planes' ? '#fff' : '#888',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                2. USER PLANES
              </button>
              <button
                onClick={() => setActiveTab('engines')}
                style={{
                  padding: '6px 14px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  border: '1px solid',
                  borderColor: activeTab === 'engines' ? '#fff' : '#222',
                  backgroundColor: activeTab === 'engines' ? '#1A1A1A' : 'transparent',
                  color: activeTab === 'engines' ? '#fff' : '#888',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                3. SUB-SERVICES
              </button>
            </div>
          </div>

          {/* Tab 1: System Flow */}
          {activeTab === 'flow' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
              <div style={{ padding: '1.5rem', backgroundColor: '#111', border: '1px solid #1A1A1A' }}>
                <div className="font-mono text-xs text-gray-500 mb-2">STAGE 01 // FRONT-END</div>
                <h5 className="text-sm font-medium text-white mb-2">PDF LOCAL EXTRACTION</h5>
                <p className="text-xs text-gray-400 font-light" style={{ lineHeight: '1.6' }}>
                  Harnesses client-side <code>pdf.js</code> locally in your browser. It renders individual vector PDF slides onto high-definition HTML5 canvas components, generating lightweight and secure source material.
                </p>
              </div>

              <div style={{ padding: '1.5rem', backgroundColor: '#111', border: '1px solid #1A1A1A' }}>
                <div className="font-mono text-xs text-gray-500 mb-2">STAGE 02 // COGNITIVE CORE</div>
                <h5 className="text-sm font-medium text-white mb-2">GEMINI INPAINTING PIPELINE</h5>
                <p className="text-xs text-gray-400 font-light" style={{ lineHeight: '1.6' }}>
                  Invokes Gemini Multi-Modal vision capabilities on-demand to run sequence-aware analysis. It extracts layout matrices, isolates absolute text coordinates, and inpaints backgrounds to scrub baked-in graphics.
                </p>
              </div>

              <div style={{ padding: '1.5rem', backgroundColor: '#111', border: '1px solid #1A1A1A' }}>
                <div className="font-mono text-xs text-gray-500 mb-2">STAGE 03 // COMPILER</div>
                <h5 className="text-sm font-medium text-white mb-2">NATIVE PPTX EXPORTER</h5>
                <p className="text-xs text-gray-400 font-light" style={{ lineHeight: '1.6' }}>
                  Reassembles the parsed coordinates and pure inpainted backdrop assets inside <code>pptxgenjs</code>. Synthesizes fully-editable PowerPoint decks matching original metrics perfectly.
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: User Planes */}
          {activeTab === 'planes' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
              <div style={{ padding: '1.5rem', backgroundColor: '#111', border: '1px solid #1A1A1A' }}>
                <div className="font-mono text-xs text-gray-500 mb-2">INTERFACE COLUMN A</div>
                <h5 className="text-sm font-medium text-white mb-2">SLIDE NAVIGATION STRIP</h5>
                <p className="text-xs text-gray-400 font-light" style={{ lineHeight: '1.6' }}>
                  A clean explorer sideview representing the layout chronology. Beautiful state signals track slide operations (Original, Running, Refined, or Failure) across the workflow.
                </p>
              </div>

              <div style={{ padding: '1.5rem', backgroundColor: '#111', border: '1px solid #1A1A1A' }}>
                <div className="font-mono text-xs text-gray-500 mb-2">INTERFACE COLUMN B</div>
                <h5 className="text-sm font-medium text-white mb-2">ACTIVE VECTOR CANVAS</h5>
                <p className="text-xs text-gray-400 font-light" style={{ lineHeight: '1.6' }}>
                  Interactive canvas superimposing absolute coordinates on slide visuals. Toggles original layouts vs. cleaned background graphics, enabling live manual adjustments.
                </p>
              </div>

              <div style={{ padding: '1.5rem', backgroundColor: '#111', border: '1px solid #1A1A1A' }}>
                <div className="font-mono text-xs text-gray-500 mb-2">INTERFACE COLUMN C</div>
                <h5 className="text-sm font-medium text-white mb-2">OUTLINE INSPECTOR DATABASE</h5>
                <p className="text-xs text-gray-400 font-light" style={{ lineHeight: '1.6' }}>
                  A structured sidebar pane featuring granular controllers: text overrides, font family choices, double-spacing switches, alignment vectors, and font size regulators.
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Sub Services */}
          {activeTab === 'engines' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
              <div style={{ padding: '1.5rem', backgroundColor: '#111', border: '1px solid #1A1A1A' }}>
                <div className="font-mono text-xs text-gray-500 mb-1">pdfService.ts</div>
                <h5 className="text-sm font-medium text-white mb-2">Extraction Core</h5>
                <p className="text-xs text-gray-400 font-light" style={{ lineHeight: '1.5' }}>
                  Interfacing directly with raw binary PDF buffers to build robust, browser-level renders without backend delays.
                </p>
              </div>

              <div style={{ padding: '1.5rem', backgroundColor: '#111', border: '1px solid #1A1A1A' }}>
                <div className="font-mono text-xs text-gray-500 mb-1">geminiService.ts</div>
                <h5 className="text-sm font-medium text-white mb-2">Cognitive Link</h5>
                <p className="text-xs text-gray-400 font-light" style={{ lineHeight: '1.5' }}>
                  Orchestrates the multi-modal request payloads, matching slide image vectors with precise textual positions.
                </p>
              </div>

              <div style={{ padding: '1.5rem', backgroundColor: '#111', border: '1px solid #1A1A1A' }}>
                <div className="font-mono text-xs text-gray-500 mb-1">slideAI.ts</div>
                <h5 className="text-sm font-medium text-white mb-2">Inpaint Orchestration</h5>
                <p className="text-xs text-gray-400 font-light" style={{ lineHeight: '1.5' }}>
                  Drives specific semantic text extraction rules and triggers backplate purifying filters seamlessly.
                </p>
              </div>

              <div style={{ padding: '1.5rem', backgroundColor: '#111', border: '1px solid #1A1A1A' }}>
                <div className="font-mono text-xs text-gray-500 mb-1">pptxService.ts</div>
                <h5 className="text-sm font-medium text-white mb-2">Layout Compiler</h5>
                <p className="text-xs text-gray-400 font-light" style={{ lineHeight: '1.5' }}>
                  Binds the pure backgrounds and position structures into direct, compliant office open XML presentations.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </FadeInSection>
  );
}

export function ProScanEmbed() {
  const [activeTab, setActiveTab] = useState<'flow' | 'parsing' | 'safeguards'>('flow');

  return (
    <FadeInSection className="ai-tool-embed" id="proscan-tool">
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-light mb-4 tracking-tight">AICE ProScan</h2>
          <p className="text-gray-400 font-light mx-auto" style={{ maxWidth: '800px', fontSize: '15px' }}>
            A specialized, responsive, web-based platform tailored for scanning, parsing, and OCR-processing dense civil engineering bids, contracts, official certificates, and Bills of Quantities (BoQs).
          </p>
        </div>

        {/* Secure Workstation Launcher */}
        <div style={{
          backgroundColor: '#121212',
          border: '1px solid #222222',
          padding: '3rem 2rem',
          textAlign: 'center',
          marginBottom: '3.5rem'
        }}>
          <div className="font-mono text-xs tracking-widest text-[#A0A0A0] mb-3">
            <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: '#38bdf8', borderRadius: '50%', marginRight: '8px' }}></span>
            SYSTEM ACCESS CONTEXT DIRECTIVE // SECURE OCR WORKSPACE
          </div>
          <h3 className="text-2xl font-light mb-4 tracking-tight">Launch Dedicated ProScan Tool</h3>
          <p className="text-gray-400 font-light mx-auto mb-8" style={{ maxWidth: '700px', fontSize: '14px', lineHeight: '1.6' }}>
            To satisfy sandboxing and security authentication guidelines and enable full high-speed OCR, side-by-side comparative views, and client-side document exports, the interactive tool runs within a direct secure browser console.
          </p>

          <a
            href="https://ai.studio/apps/50201f0c-d8a5-4bb9-9c9d-fc063ec440e6?fullscreenApplet=true"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary inline-flex items-center gap-2"
            style={{
              padding: '1rem 2.5rem',
              fontSize: '11px',
              letterSpacing: '3px',
              backgroundColor: '#fff',
              color: '#000',
              fontWeight: '600'
            }}
          >
            Launch Interactive Workspace <i className="fas fa-external-link-alt ml-2"></i>
          </a>

          <div className="font-mono text-[11px] text-gray-500 mt-6">
            Sandbox Client Authorization: Verified and Secure via Google AI Studio Platform
          </div>
        </div>

        {/* Interactive System Specifications Panel */}
        <div style={{ border: '1px solid #1A1A1A', backgroundColor: '#0D0D0D', padding: '2rem' }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#222] pb-4 mb-6" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 className="text-lg font-light tracking-tight text-white mb-1">Architecture & Parsing Specifications</h4>
              <p className="text-xs text-gray-500 font-mono">EXPLORE DETAILED EXTRACTION SCHEMAS AND PARSING PIPELINES</p>
            </div>
            
            <div className="flex gap-2 mt-4 md:mt-0" style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setActiveTab('flow')}
                style={{
                  padding: '6px 14px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  border: '1px solid',
                  borderColor: activeTab === 'flow' ? '#fff' : '#222',
                  backgroundColor: activeTab === 'flow' ? '#1A1A1A' : 'transparent',
                  color: activeTab === 'flow' ? '#fff' : '#888',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                1. DOCUMENTS & FLOW
              </button>
              <button
                onClick={() => setActiveTab('parsing')}
                style={{
                  padding: '6px 14px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  border: '1px solid',
                  borderColor: activeTab === 'parsing' ? '#fff' : '#222',
                  backgroundColor: activeTab === 'parsing' ? '#1A1A1A' : 'transparent',
                  color: activeTab === 'parsing' ? '#fff' : '#888',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                2. PARSING COMPASS
              </button>
              <button
                onClick={() => setActiveTab('safeguards')}
                style={{
                  padding: '6px 14px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  border: '1px solid',
                  borderColor: activeTab === 'safeguards' ? '#fff' : '#222',
                  backgroundColor: activeTab === 'safeguards' ? '#1A1A1A' : 'transparent',
                  color: activeTab === 'safeguards' ? '#fff' : '#888',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                3. SAFEGUARDS & BATCHING
              </button>
            </div>
          </div>

          {/* Tab 1: Documents & Flow */}
          {activeTab === 'flow' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
              <div style={{ padding: '1.5rem', backgroundColor: '#111', border: '1px solid #1A1A1A' }}>
                <div className="font-mono text-xs text-gray-500 mb-2">MODULE 01 // VIEWER</div>
                <h5 className="text-sm font-medium text-white mb-2">INTERACTIVE PDF ENGINE</h5>
                <p className="text-xs text-gray-400 font-light" style={{ lineHeight: '1.6' }}>
                  Highly responsive, browser-side rendering of dense multi-page documents. Dynamic scale sliders and seamless slide-by-slide zoom metrics ensure precise orientation controls.
                </p>
              </div>

              <div style={{ padding: '1.5rem', backgroundColor: '#111', border: '1px solid #1A1A1A' }}>
                <div className="font-mono text-xs text-gray-500 mb-2">MODULE 02 // INTERACT</div>
                <h5 className="text-sm font-medium text-white mb-2">SIDE-BY-SIDE PLAYGROUND</h5>
                <p className="text-xs text-gray-400 font-light" style={{ lineHeight: '1.6' }}>
                  A neat split-pane interface comparing original scanned pages side-by-side with the real-time extraction canvas. Enhances correction efficiency and ensures zero structural drop-offs.
                </p>
              </div>

              <div style={{ padding: '1.5rem', backgroundColor: '#111', border: '1px solid #1A1A1A' }}>
                <div className="font-mono text-xs text-gray-500 mb-2">MODULE 03 // OUTPUT</div>
                <h5 className="text-sm font-medium text-white mb-2">CONSOLIDATED EXPORT</h5>
                <p className="text-xs text-gray-400 font-light" style={{ lineHeight: '1.6' }}>
                  Converts active extractions into compiled, formatted Markdown documents. Download your entire document audit run as an offline `.md` file with a single click.
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Parsing Compass */}
          {activeTab === 'parsing' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
              <div style={{ padding: '1.5rem', backgroundColor: '#111', border: '1px solid #1A1A1A' }}>
                <div className="font-mono text-xs text-gray-500 mb-2">SYNTAX // EXTRACTORS</div>
                <h5 className="text-sm font-medium text-white mb-2">CIVIL ENGINEERING MODELING</h5>
                <p className="text-xs text-gray-400 font-light" style={{ lineHeight: '1.6' }}>
                  System layouts configured explicitly for dense bids, contracts, layouts, schedules, and complex structural lists, translating visual grids into elegant Markdown syntax.
                </p>
              </div>

              <div style={{ padding: '1.5rem', backgroundColor: '#111', border: '1px solid #1A1A1A' }}>
                <div className="font-mono text-xs text-gray-500 mb-2">ACCURACY // CALIBRATION</div>
                <h5 className="text-sm font-medium text-white mb-2">UNIT PRESERVATION ENGINE</h5>
                <p className="text-xs text-gray-400 font-light" style={{ lineHeight: '1.6' }}>
                  Strictly tracks civil engineering identifiers (e.g. m³, m², kg, currencies, indexes, percentages), leaving no room for numerical hallucination or decimal displacement.
                </p>
              </div>

              <div style={{ padding: '1.5rem', backgroundColor: '#111', border: '1px solid #1A1A1A' }}>
                <div className="font-mono text-xs text-gray-500 mb-2">SEGREGATE // MARKUP</div>
                <h5 className="text-sm font-medium text-white mb-2">STAMPS & DRAWINGS MAPPING</h5>
                <p className="text-xs text-gray-400 font-light" style={{ lineHeight: '1.6' }}>
                  Identifies official governmental seals, signatures, embossed stamps, and technical drawings. Renders distinct, localized tags (e.g., `[Stamp/Seal: description]`) to retain structural layout context.
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Safeguards & Batching */}
          {activeTab === 'safeguards' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
              <div style={{ padding: '1.5rem', backgroundColor: '#111', border: '1px solid #1A1A1A' }}>
                <div className="font-mono text-xs text-gray-500 mb-1">cognitive-sec</div>
                <h5 className="text-sm font-medium text-white mb-2">Anti-Recitation Filter</h5>
                <p className="text-xs text-gray-400 font-light" style={{ lineHeight: '1.5' }}>
                  Intelligently rephrases boilerplate legal bonds while preserving essential names, dates, amounts, and calculations.
                </p>
              </div>

              <div style={{ padding: '1.5rem', backgroundColor: '#111', border: '1px solid #1A1A1A' }}>
                <div className="font-mono text-xs text-gray-500 mb-1">batch-worker.ts</div>
                <h5 className="text-sm font-medium text-white mb-2">Asynchronous Flows</h5>
                <p className="text-xs text-gray-400 font-light" style={{ lineHeight: '1.5' }}>
                  Initiates continuous batch actions running in the background. Tracks global progress and permits complete aborts gracefully.
                </p>
              </div>

              <div style={{ padding: '1.5rem', backgroundColor: '#111', border: '1px solid #1A1A1A' }}>
                <div className="font-mono text-xs text-gray-500 mb-1">workspace-tabs</div>
                <h5 className="text-sm font-medium text-white mb-2">Dynamic Views</h5>
                <p className="text-xs text-gray-400 font-light" style={{ lineHeight: '1.5' }}>
                  Toggle inside the console amongst the live rendered Markdown, direct text editor inputs, and raw AI processing schemas.
                </p>
              </div>

              <div style={{ padding: '1.5rem', backgroundColor: '#111', border: '1px solid #1A1A1A' }}>
                <div className="font-mono text-xs text-gray-500 mb-1">local-cache.ts</div>
                <h5 className="text-sm font-medium text-white mb-2">Local Isolation</h5>
                <p className="text-xs text-gray-400 font-light" style={{ lineHeight: '1.5' }}>
                  Runs entirely as a client-side environment. Secures structural assets without persistent server uploads.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </FadeInSection>
  );
}

export function HomeCTA() {
  return (
    <FadeInSection className="home-cta">
      <div className="container">
        <h2>Ready to Transform Your Engineering Projects?</h2>
        <div className="cta-buttons">
          <a href="#contact" className="btn btn-primary">Contact Us Today</a>
          <a href="https://wa.me/923013666088" target="_blank" rel="noreferrer" className="btn btn-secondary">WhatsApp: +92 301 3666088</a>
        </div>
      </div>
    </FadeInSection>
  );
}
