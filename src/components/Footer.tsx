import { useState, useEffect, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FadeInSection } from './FadeInSection';

function Modal({ title, isOpen, onClose, children }: { title: string, isOpen: boolean, onClose: () => void, children: ReactNode }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal" style={{ display: 'block' }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <span className="close" onClick={onClose}>&times;</span>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <>
      <FadeInSection className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>AICE Services</h3>
              <p>AI + Civil Engineering for Smarter Cities</p>
            </div>
            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li><Link to="/tools/aicemark">AICEMark</Link></li>
                <li><Link to="/tools/deckedit">AICE Deck Edit</Link></li>
                <li><Link to="/tools/proscan">AICE ProScan</Link></li>
                <li><a href="#services">Engineering Design</a></li>
                <li><a href="#services">Contracts &amp; Claims</a></li>
                <li><a href="#services">Bid Preparation</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><a href="#standards">Standards</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Legal</h4>
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setPrivacyOpen(true); }}>Privacy Policy</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setTermsOpen(true); }}>Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 AICE Services. All rights reserved.</p>
          </div>
        </div>
      </FadeInSection>

      <Modal title="Privacy Policy" isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)}>
        <h3>Information We Collect</h3>
        <p>We collect information you provide directly to us, such as when you contact us, request services, or communicate with us. This may include your name, email address, phone number, company name, and project details.</p>
        
        <h3>How We Use Information</h3>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, maintain, and improve our services</li>
          <li>Respond to your inquiries and requests</li>
          <li>Send you technical notices and support messages</li>
          <li>Comply with legal obligations</li>
        </ul>
        
        <h3>Data Security</h3>
        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
        
        <h3>Data Sharing</h3>
        <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except as required by law.</p>
        
        <h3>Your Rights</h3>
        <p>You have the right to access, update, or delete your personal information. Contact us to exercise these rights.</p>
        
        <h3>Changes to This Policy</h3>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
        
        <h3>Contact Us</h3>
        <p>If you have questions about this Privacy Policy, please contact us at contact@aiceservices.com.</p>
      </Modal>

      <Modal title="Terms of Service" isOpen={termsOpen} onClose={() => setTermsOpen(false)}>
        <h3>Acceptance of Terms</h3>
        <p>By accessing or using AICE Services' website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
        
        <h3>Services</h3>
        <p>We provide AI-powered civil engineering solutions including AICEMark, AICE Deck Edit, AICE ProScan, and traditional engineering services. Services are provided "as is" and subject to change.</p>
        
        <h3>User Responsibilities</h3>
        <p>You agree to:</p>
        <ul>
          <li>Provide accurate and complete information</li>
          <li>Maintain the security of your account</li>
          <li>Use our services only for lawful purposes</li>
          <li>Not interfere with or disrupt our services</li>
        </ul>
        
        <h3>Intellectual Property</h3>
        <p>All content, features, and functionality on our website are owned by AICE Services and are protected by international copyright, trademark, and other intellectual property laws.</p>
        
        <h3>Limitation of Liability</h3>
        <p>AICE Services shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.</p>
        
        <h3>Termination</h3>
        <p>We may terminate or suspend your access to our services immediately, without prior notice, for any reason, including breach of these Terms.</p>
        
        <h3>Governing Law</h3>
        <p>These Terms shall be governed by and construed in accordance with the laws of Pakistan, without regard to its conflict of law provisions.</p>
        
        <h3>Changes to Terms</h3>
        <p>We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page.</p>
        
        <h3>Contact Us</h3>
        <p>If you have questions about these Terms of Service, please contact us at contact@aiceservices.com.</p>
      </Modal>
    </>
  );
}
