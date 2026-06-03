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
        <h2 className="text-center mb-8 text-3xl font-light text-white">AICEMark Document Editor</h2>
        <p className="text-center mb-8 text-gray-400 font-light mx-auto leading-relaxed text-sm md:text-base" style={{ maxWidth: '800px', margin: '0 auto 2.5rem' }}>
          A single-screen, live-preview Markdown editor specifically designed for drafting strictly formatted academic and professional documents. Experience true-to-format Word export and advanced syntax support directly in your browser.
        </p>
        <div className="w-full relative shadow-lg rounded-none overflow-hidden border border-gray-800" style={{ height: '850px', backgroundColor: '#fff' }}>
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
  return (
    <FadeInSection className="ai-tool-embed" id="deck-edit-tool">
      <div className="container" style={{ maxWidth: '1400px' }}>
        <div className="text-center pt-20 pb-12">
          <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-wide text-white leading-tight font-heading">AICE Deck Edit</h2>
          <p className="text-center text-gray-400 font-light mx-auto leading-relaxed text-sm md:text-base mb-16" style={{ maxWidth: '800px' }}>
            A high-performance presentation slide processing, retouching, and vector editing suite combining server-side multimodal intelligence with offline vector graphics processing to modify, clean, and rebuild slide decks.
          </p>
          <div className="flex justify-center mt-12 mb-16">
            <a
              href="https://ai.studio/apps/caa00651-c278-4279-b798-8c906372e374?fullscreenApplet=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center transition-all duration-300 outline-none border border-white/10 hover:border-[#00FF66] hover:text-[#00FF66] bg-white/[0.01] hover:bg-white/[0.03] font-mono tracking-widest uppercase text-[11px] text-gray-300 rounded-none cursor-pointer"
              style={{
                padding: '0.85rem 2.4rem',
                letterSpacing: '3px',
                fontWeight: '400',
              }}
            >
              Launch Interactive Workspace <i className="fas fa-external-link-alt ml-3 text-[9px]"></i>
            </a>
          </div>
        </div>
        <div className="w-full relative shadow-lg rounded-none overflow-hidden border border-gray-900 mb-20 animate-fade-in" style={{ height: '850px', backgroundColor: '#0A0A0A' }}>
          <iframe
            src="https://tulaibhasan-aice-deck-edit.hf.space"
            className="w-full h-full border-none"
            title="AICE Deck Edit Tool"
            allow="accelerometer; ambient-light-sensor; autoplay; battery; camera; document-domain; encrypted-media; fullscreen; geolocation; gyroscope; layout-animations; legacy-image-formats; magnetometer; microphone; midi; oversized-images; payment; picture-in-picture; publickey-credentials-get; sync-xhr; usb; vr ; wake-lock; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"
          ></iframe>
        </div>

        {/* Specifications & Technical Blueprint (Branding from Brief) */}
        <div className="mt-20 border-t border-gray-900 pt-16 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-left">
            
            {/* Architectural Frame */}
            <div className="space-y-6">
              <div className="font-mono text-xs text-[#00FF66] tracking-widest uppercase">
                // TECHNICAL ARCHITECTURE
              </div>
              <h3 className="text-2xl font-light text-white tracking-tight">Full-Stack Slide Processing</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                AICE Deck Edit combines server-side multimodal intelligence with offline vector graphics processing. Features a Brutalist High-Contrast Dark Theme (#0A0A0A) punctuated by neon-green accents (#00FF66) minimizing digital fatigue during extended retouching runs.
              </p>
              
              <div className="pt-6 border-t border-gray-900/50 space-y-4">
                <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">// REVOLUTIONARY INTERACTION</div>
                <div className="bg-white/[0.01] border border-gray-900 p-4">
                  <div className="font-mono text-xs text-white mb-2 uppercase tracking-wider">Split-Screen Compare Slider</div>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    Toggle and inspect slide evolution interactively. Drag a synchronized vertical divisor line to inspect before (original graphics) and after (purified background) state in real time.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Capabilities */}
            <div className="space-y-6">
              <div className="font-mono text-xs text-[#00FF66] tracking-widest uppercase">
                // CORE CAPABILITIES
              </div>
              <h3 className="text-2xl font-light text-white tracking-tight">Precision AI Pipelines</h3>
              
              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-1">01 / Multisource Document Import</h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    Accepts direct PDF presentation exports from Microsoft PowerPoint, Google Slides, and Apple Keynote. It parses PDF vector containers to ensure pixel-perfect consistency and native font-metrics preservation.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-1">02 / Gemini AI Bounding-Box Detection</h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    Integrates advanced multimodal capabilities (utilizing <code>gemini-3.1-flash-lite</code> with fallbacks) to autonomously scan layout matrices and extract text layers, bounds, labels, and floating annotations.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-1">03 / Typography Style Estimation</h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    Analyzes structural composition in real time, tracking font size metrics, typeface families, alignment paradigms, weight overrides (bold/italic), and exact hexadecimal color values.
                  </p>
                </div>
              </div>
            </div>

            {/* Local Filters & Output */}
            <div className="space-y-6">
              <div className="font-mono text-xs text-[#00FF66] tracking-widest uppercase">
                // EDGE COMPUTING & UX
              </div>
              <h3 className="text-2xl font-light text-white tracking-tight">Reconstitute &amp; Re-Export</h3>
              
              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-1">04 / Instant Local Frame Inpainting</h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    Features a responsive, client-side canvas-inpainting model. Users can instantaneously brush and erase target text coordinates with contextual backplate matching directly on an HTML5 canvas.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-1">05 / Editable PowerPoint (.pptx) Export</h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    Re-compiles extracted slide components back into standalone presentation files. Retains high-definition vector backgrounds while overlaying native, editable text placeholders for effortless post-production editing.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-1">06 / Keyboard Navigation &amp; Fluid Controls</h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    Browse dense collections of deck slides effortlessly using integrated global keyboard event listeners (Arrow keys support) and responsive visual state transitions.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

export function ProScanEmbed() {
  return (
    <FadeInSection className="ai-tool-embed" id="proscan-tool">
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="text-center pt-24 pb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-wide text-white leading-tight font-heading">AICE ProScan</h2>
          <p className="text-gray-400 font-light mx-auto leading-relaxed text-sm md:text-base max-w-2xl mb-16">
            Scan, digest, and OCR-process highly dense civil engineering bids, contracts, BoQs, and official certificates while strictly preserving complex numeric units and layout integrity.
          </p>
          <div className="flex justify-center mt-16 mb-8">
            <a
              href="https://ai.studio/apps/50201f0c-d8a5-4bb9-9c9d-fc063ec440e6?fullscreenApplet=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center transition-all duration-300 outline-none border border-white/10 hover:border-[#00FF66] hover:text-[#00FF66] bg-white/[0.01] hover:bg-white/[0.03] font-mono tracking-widest uppercase text-[11px] text-gray-300 rounded-none cursor-pointer"
              style={{
                padding: '0.85rem 2.4rem',
                letterSpacing: '3px',
                fontWeight: '400',
              }}
            >
              Launch Interactive Workspace <i className="fas fa-external-link-alt ml-3 text-[9px]"></i>
            </a>
          </div>
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
