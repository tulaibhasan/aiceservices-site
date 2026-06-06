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
        <h2>AI Solutions</h2>
        <div className="solutions-grid">
          <div className="solution-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
            <div>
              <div className="card-icon"><i className="fas fa-file-contract"></i></div>
              <h3>AICEMark</h3>
              <p style={{ textAlign: 'justify', marginBottom: '2.5rem', lineHeight: '1.7', color: 'rgb(209, 213, 219)' }}>
                Direct copy-pasting of AI-generated math formulas, engineering symbols, and tables into Microsoft Word often corrupts formatting. AICEMark solves this by translating GFM Markdown into beautifully styled, native Word (.docx) documents with a secure, on-demand client-side AI repair engine.
              </p>
            </div>
            <Link to="/tools/aicemark" className="btn btn-outline w-full block">Try Now</Link>
          </div>

          <div className="solution-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
            <div>
              <div className="card-icon"><i className="fas fa-file-powerpoint"></i></div>
              <h3>AICE Deck Edit</h3>
              <p style={{ textAlign: 'justify', marginBottom: '2.5rem', lineHeight: '1.7', color: 'rgb(209, 213, 219)' }}>
                Google NotebookLM generates state-of-the-art slides but bakes them into locked, flat image layers that are uneditable. AICE Deck Edit liberates these templates—clearing background plates, inpainting graphics, and compiling them back into native, fully editable PowerPoint (.pptx) presentations.
              </p>
            </div>
            <Link to="/tools/deckedit" className="btn btn-outline w-full block">Try Now</Link>
          </div>

          <div className="solution-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
            <div>
              <div className="card-icon"><i className="fas fa-search"></i></div>
              <h3>AICE ProScan</h3>
              <p style={{ textAlign: 'justify', marginBottom: '2.5rem', lineHeight: '1.7', color: 'rgb(209, 213, 219)' }}>
                A precise, web-based intelligence utility designed to scan, parse, and digitize technical documents, technical bids, and complex civil engineering Bills of Quantities (BoQs) securely page by page.
              </p>
            </div>
            <Link to="/tools/proscan" className="btn btn-outline w-full block">Try Now</Link>
          </div>
        </div>

        {/* Custom AI Automation & App Dev Conversion Banner */}
        <div 
          className="flex flex-col md:flex-row md:items-center justify-between gap-8 text-left"
          style={{ 
            backgroundColor: 'var(--white)', 
            border: '1px solid var(--gray-300)', 
            borderRadius: 'var(--radius-lg)', 
            padding: 'var(--spacing-lg)',
            marginTop: 'var(--spacing-lg)'
          }}
        >
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00FF66]/10 border border-[#00FF66]/20 text-[11px] font-mono text-[#00FF66] w-fit" style={{ borderRadius: '0px' }}>
              <i className="fas fa-bolt"></i> Custom Engineering Automation
            </div>
            <h3 className="text-xl md:text-2xl font-light tracking-tight text-white m-0" style={{ letterSpacing: '-0.03em' }}>
              Need Custom AI Automation or Specialized App Development?
            </h3>
            <p className="text-sm font-normal leading-relaxed text-justify m-0" style={{ color: 'rgb(209, 213, 219)' }}>
              The free workspace tools above showcase our in-house rapid automation capabilities. Beyond these public utilities, we partner directly with engineering firms, consultancy groups, and public authorities to design, build, and deploy private, high-precision Client-Side AI Engines, automated Quality Assurance pipelines, complex PDF-to-BoQ scrapers, and enterprise-grade web dashboards engineered precisely to your project guidelines.
            </p>
          </div>
          <div className="flex-shrink-0 flex items-center">
            <a href="#contact" className="btn btn-primary w-full md:w-auto inline-flex items-center justify-center gap-2 whitespace-nowrap">
              Hire Us for Custom Work <i className="fas fa-arrow-right text-[10px]"></i>
            </a>
          </div>
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
              <p>A decade of experience in ADB/World Bank/Govt projects especially related to Water, Sanitation and Solid Waste.</p>
            </div>
            <div className="founder-details">
              <p>Led by Water &amp; Sanitation Expert Muhammad Tulaib Hasan, AICE Services bridges donor-funded compliance with AI engineering workflows.</p>
              <p>We combine cutting-edge AI tools with hands-on engineering reviews to deliver compliant, audit-ready deliverables for complex infrastructure projects with unmatched speed.</p>
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
  const [isLoading, setIsLoading] = useState(true);

  return (
    <FadeInSection className="w-full bg-[#0A0A0A] p-0 m-0" id="ai-tool">
      <div className="w-full max-w-full p-0 m-0">
        <div className="w-full relative shadow-2xl rounded-none overflow-hidden border-none animate-fade-in" style={{ height: 'calc(100vh - 70px)', backgroundColor: '#0A0A0A' }}>
          {isLoading && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0A]">
              <div className="flex flex-col items-center space-y-6">
                {/* Brutalist high-performance loader */}
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border border-gray-900"></div>
                  <div className="absolute inset-0 rounded-full border-t border-b border-[#00FF66] animate-spin" style={{ animationDuration: '0.8s' }}></div>
                </div>
                
                <div className="space-y-1.5 text-center">
                  <div className="text-[11px] font-mono text-[#00FF66] tracking-widest uppercase animate-pulse">
                    // INITIALIZING AICEMARK WORKSPACE
                  </div>
                  <div className="text-[10px] font-mono text-gray-500 tracking-wider">
                    Loading Rich Document Engine &amp; Live-Preview Units...
                  </div>
                </div>
              </div>
            </div>
          )}
          <iframe
            src="https://tulaibhasan-aicemark-v1.hf.space"
            className="w-full h-full border-none"
            title="AICEMark Tool"
            onLoad={() => setIsLoading(false)}
            allow="accelerometer; ambient-light-sensor; autoplay; battery; camera; document-domain; encrypted-media; fullscreen; geolocation; gyroscope; layout-animations; legacy-image-formats; magnetometer; microphone; midi; oversized-images; payment; picture-in-picture; publickey-credentials-get; sync-xhr; usb; vr ; wake-lock; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"
          ></iframe>
        </div>
      </div>
    </FadeInSection>
  );
}

export function DeckEditEmbed() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <FadeInSection className="w-full bg-[#0A0A0A] p-0 m-0" id="deck-edit-tool">
      <div className="w-full max-w-full p-0 m-0">
        <div className="w-full relative shadow-2xl rounded-none overflow-hidden border-none animate-fade-in" style={{ height: 'calc(100vh - 70px)', backgroundColor: '#0A0A0A' }}>
          {isLoading && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0A]">
              <div className="flex flex-col items-center space-y-6">
                {/* Brutalist high-performance loader */}
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border border-gray-900"></div>
                  <div className="absolute inset-0 rounded-full border-t border-b border-[#00FF66] animate-spin" style={{ animationDuration: '0.8s' }}></div>
                </div>
                
                <div className="space-y-1.5 text-center">
                  <div className="text-[11px] font-mono text-[#00FF66] tracking-widest uppercase animate-pulse">
                    // INITIALIZING AICE WORKSPACE
                  </div>
                  <div className="text-[10px] font-mono text-gray-500 tracking-wider">
                    Loading Deck Retouch &amp; Vector Processing Units...
                  </div>
                </div>
              </div>
            </div>
          )}
          <iframe
            src="https://tulaibhasan-aice-deck-edit-v1.hf.space"
            className="w-full h-full border-none"
            title="AICE Deck Edit Tool"
            onLoad={() => setIsLoading(false)}
            allow="accelerometer; ambient-light-sensor; autoplay; battery; camera; document-domain; encrypted-media; fullscreen; geolocation; gyroscope; layout-animations; legacy-image-formats; magnetometer; microphone; midi; oversized-images; payment; picture-in-picture; publickey-credentials-get; sync-xhr; usb; vr ; wake-lock; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"
          ></iframe>
        </div>
      </div>
    </FadeInSection>
  );
}

export function ProScanEmbed() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <FadeInSection className="w-full bg-[#0A0A0A] p-0 m-0" id="proscan-tool">
      <div className="w-full max-w-full p-0 m-0">
        <div className="w-full relative shadow-2xl rounded-none overflow-hidden border-none animate-fade-in" style={{ height: 'calc(100vh - 70px)', backgroundColor: '#0A0A0A' }}>
          {isLoading && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0A]">
              <div className="flex flex-col items-center space-y-6">
                {/* Brutalist high-performance loader */}
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border border-gray-900"></div>
                  <div className="absolute inset-0 rounded-full border-t border-b border-[#00FF66] animate-spin" style={{ animationDuration: '0.8s' }}></div>
                </div>
                
                <div className="space-y-1.5 text-center">
                  <div className="text-[11px] font-mono text-[#00FF66] tracking-widest uppercase animate-pulse">
                    // INITIALIZING AICE PROSCAN WORKSPACE
                  </div>
                  <div className="text-[10px] font-mono text-gray-500 tracking-wider">
                    Loading Engineering Document Scanner &amp; OCR Units...
                  </div>
                </div>
              </div>
            </div>
          )}
          <iframe
            src="https://tulaibhasan-aice-proscan.hf.space"
            className="w-full h-full border-none"
            title="AICE ProScan Tool"
            onLoad={() => setIsLoading(false)}
            allow="accelerometer; ambient-light-sensor; autoplay; battery; camera; document-domain; encrypted-media; fullscreen; geolocation; gyroscope; layout-animations; legacy-image-formats; magnetometer; microphone; midi; oversized-images; payment; picture-in-picture; publickey-credentials-get; sync-xhr; usb; vr ; wake-lock; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"
          ></iframe>
        </div>
      </div>
    </FadeInSection>
  );
}
