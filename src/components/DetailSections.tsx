import { useState, type FormEvent } from 'react';
import { FadeInSection } from './FadeInSection';

export function ServicesDetailed() {
  return (
    <FadeInSection id="services" className="services-detailed">
      <div className="container">
        <h2>Our Services</h2>
        
        <h3>AI-Driven Solutions</h3>
        <div className="ai-services">
          <div className="service-detail">
            <h4>Report Reviewer AI</h4>
            <ul>
              <li><i className="fas fa-check-circle"></i> Automated compliance checking</li>
              <li><i className="fas fa-check-circle"></i> International standards validation</li>
              <li><i className="fas fa-check-circle"></i> Quality score</li>
              <li><i className="fas fa-check-circle"></i> Detailed recommendations</li>
            </ul>
          </div>
          <div className="service-detail">
            <h4>First Draft AI</h4>
            <ul>
              <li><i className="fas fa-check-circle"></i> Template-based generation</li>
              <li><i className="fas fa-check-circle"></i> Technical optimization</li>
              <li><i className="fas fa-check-circle"></i> Multi-format output</li>
              <li><i className="fas fa-check-circle"></i> Real-time collaboration</li>
            </ul>
          </div>
          <div className="service-detail">
            <h4>Snap2Studio</h4>
            <ul>
              <li><i className="fas fa-check-circle"></i> Photo → CAD conversion</li>
              <li><i className="fas fa-check-circle"></i> Dimension extraction</li>
              <li><i className="fas fa-check-circle"></i> Multi-format export</li>
              <li><i className="fas fa-check-circle"></i> Quality enhancement</li>
            </ul>
          </div>
        </div>
        
        <h3>Traditional Engineering Services</h3>
        <div className="traditional-services-detailed">
          <div className="service-detail">
            <h4>Engineering Design</h4>
            <ul>
              <li><i className="fas fa-check-circle"></i> Water supply</li>
              <li><i className="fas fa-check-circle"></i> Sewerage</li>
              <li><i className="fas fa-check-circle"></i> Solid waste</li>
            </ul>
          </div>
          <div className="service-detail">
            <h4>Contracts &amp; Claims</h4>
            <ul>
              <li><i className="fas fa-check-circle"></i> Contract review</li>
              <li><i className="fas fa-check-circle"></i> Dispute resolution</li>
              <li><i className="fas fa-check-circle"></i> Claims management</li>
            </ul>
          </div>
          <div className="service-detail">
            <h4>Bid Preparation</h4>
            <ul>
              <li><i className="fas fa-check-circle"></i> Tech proposals</li>
              <li><i className="fas fa-check-circle"></i> Cost estimation</li>
              <li><i className="fas fa-check-circle"></i> Compliance checks</li>
            </ul>
          </div>
        </div>
        
        <div className="services-cta">
          <a href="#contact" className="btn btn-primary">Get Free Consultation</a>
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
        
        <h3>Quality Assurance Process</h3>
        <div className="qa-process">
          <div className="process-step">
            <div className="step-number">1</div>
            <h4>Initial Review</h4>
          </div>
          <div className="process-step">
            <div className="step-number">2</div>
            <h4>Compliance Check</h4>
          </div>
          <div className="process-step">
            <div className="step-number">3</div>
            <h4>Validation</h4>
          </div>
          <div className="process-step">
            <div className="step-number">4</div>
            <h4>Certification</h4>
          </div>
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
    { category: "General", items: [
      { q: "What makes you different?", a: "We combine AI technology with deep engineering expertise to deliver audit-ready solutions that meet international standards while maintaining efficiency and cost-effectiveness." },
      { q: "Which project types?", a: "We specialize in water supply, sewerage, solid waste management, urban planning, and infrastructure projects for government and international funding bodies." },
      { q: "Do you work internationally?", a: "Yes, we work with clients globally, with expertise in ADB and World Bank project standards." }
    ]},
    { category: "Confidentiality", items: [
      { q: "How ensure confidentiality?", a: "We sign NDAs with all clients and implement strict data security protocols to protect your information." },
      { q: "Security of AI tools?", a: "Our AI tools are developed with security-first principles and operate in secure environments with encrypted data transmission." },
      { q: "Work under our NDA?", a: "Absolutely. We're accustomed to working under client NDAs and can adapt to your specific confidentiality requirements." }
    ]},
    { category: "Standards", items: [
      { q: "Which international standards?", a: "We comply with NDA, FIDIC, ADB Guidelines, and World Bank Standards for all our deliverables." },
      { q: "How ensure local compliance?", a: "We work with local experts and reference national standards including PPRA Act and Rules, PHED Codes & Standards, EPA Guidelines, WASA Standards, PEC Guidelines, Safety & Labor Standards." },
      { q: "QA process?", a: "Our 4-step QA process includes Initial Review, Compliance Check, Validation, and Certification to ensure 100% compliance." }
    ]},
    { category: "AI Solutions", items: [
      { q: "Accuracy of Report Reviewer AI?", a: "Our Report Reviewer AI has been trained on thousands of engineering reports and achieves 95%+ accuracy in compliance checking." },
      { q: "Snap2Studio for complex sites?", a: "Yes, Snap2Studio can handle complex sites with multiple structures and terrain variations, producing detailed CAD drawings." },
      { q: "First Draft AI technical accuracy?", a: "First Draft AI uses engineering databases and templates to ensure technical accuracy, with expert review before final delivery." }
    ]},
    { category: "Onboarding", items: [
      { q: "Info needed?", a: "We require project scope, relevant standards, and any existing documentation to begin work." },
      { q: "Onboarding time?", a: "Our standard onboarding process takes 2-3 business days after contract signing." },
      { q: "Training provided?", a: "Yes, we provide comprehensive training for all our AI tools and services at no additional cost." }
    ]},
    { category: "Pricing", items: [
      { q: "Pricing structure?", a: "Our pricing is based on project scope, complexity, and deliverables. Contact us for a customized quote." },
      { q: "Typical timelines?", a: "Timelines vary by project scope, typically ranging from 2 weeks to 3 months." },
      { q: "Expedited services?", a: "Yes, we offer expedited services for urgent projects with additional fees." }
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
                      maxHeight: isActive ? '500px' : '0', 
                      padding: isActive ? '1rem' : '0 1rem', 
                      overflow: 'hidden', 
                      transition: 'all 0.3s' 
                    }}>
                    <p>{item.a}</p>
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
                <label htmlFor="name">Full Name *</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input type="text" id="company" name="company" />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" name="phone" />
              </div>
              <div className="form-group">
                <label htmlFor="service">Service of Interest *</label>
                <select id="service" name="service" required defaultValue="">
                  <option value="" disabled>Select a service</option>
                  <option value="Report Reviewer AI">Report Reviewer AI</option>
                  <option value="First Draft AI">First Draft AI</option>
                  <option value="Snap2Studio">Snap2Studio</option>
                  <option value="Engineering Design">Engineering Design</option>
                  <option value="Contracts & Claims">Contracts & Claims</option>
                  <option value="Bid Preparation">Bid Preparation</option>
                  <option value="Multiple">Multiple</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="project-type">Project Type *</label>
                <select id="project-type" name="project-type" required defaultValue="">
                  <option value="" disabled>Select a project type</option>
                  <option value="Water Supply">Water Supply</option>
                  <option value="Sewerage">Sewerage</option>
                  <option value="Solid Waste">Solid Waste</option>
                  <option value="Urban Planning">Urban Planning</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Contract Review">Contract Review</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="details">Project Details *</label>
                <textarea id="details" name="details" rows={5} maxLength={500} required value={details} onChange={(e) => setDetails(e.target.value)}></textarea>
                <small className="char-count"><span style={{ color: details.length > 450 ? '#f44336' : 'inherit' }}>{details.length}</span>/500 characters</small>
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
