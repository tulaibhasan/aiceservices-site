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
