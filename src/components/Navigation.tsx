import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <a href="https://wa.me/923013666088" target="_blank" rel="noreferrer" className="whatsapp-chat">
        <i className="fab fa-whatsapp"></i>
      </a>
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
              <li><Link to="/#services" onClick={() => setIsOpen(false)}>Services</Link></li>
              <li><Link to="/tools/aicemark" onClick={() => setIsOpen(false)}>AI Tool</Link></li>
              <li><Link to="/#standards" onClick={() => setIsOpen(false)}>Standards</Link></li>
              <li><Link to="/#faq" onClick={() => setIsOpen(false)}>FAQ</Link></li>
              <li><Link to="/#contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
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
