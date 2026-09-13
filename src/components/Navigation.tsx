import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky-nav">
        <div className="container">
          <div className="logo">
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              <h2>AICE Services</h2>
            </Link>
          </div>
          <nav>
            <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
              <li><Link to="/#home" onClick={() => setIsOpen(false)}>Home</Link></li>
              <li><Link to="/#ai-solutions" onClick={() => setIsOpen(false)}>AI Solutions</Link></li>
              <li><Link to="/#services" onClick={() => setIsOpen(false)}>Services</Link></li>
              <li><Link to="/#standards" onClick={() => setIsOpen(false)}>Standards</Link></li>
              <li><Link to="/#faq" onClick={() => setIsOpen(false)}>FAQ</Link></li>
              <li><Link to="/#contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
              <li>
                <button
                  type="button"
                  className="nav-assistant-btn"
                  onClick={() => {
                    setIsOpen(false);
                    if (typeof (window as any).openAICEAssistant === 'function') {
                      (window as any).openAICEAssistant();
                    }
                  }}
                  aria-label="Open AI Assistant"
                >
                  <span className="assistant-badge-dot"></span>
                  AI Assistant
                </button>
              </li>
            </ul>
            <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
