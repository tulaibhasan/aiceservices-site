import { useState } from 'react';

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
            <h2>AICE Services</h2>
          </div>
          <nav>
            <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
              <li><a href="#home" onClick={() => setIsOpen(false)}>Home</a></li>
              <li><a href="#services" onClick={() => setIsOpen(false)}>Services</a></li>
              <li><a href="#standards" onClick={() => setIsOpen(false)}>Standards</a></li>
              <li><a href="#faq" onClick={() => setIsOpen(false)}>FAQ</a></li>
              <li><a href="#contact" onClick={() => setIsOpen(false)}>Contact</a></li>
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
