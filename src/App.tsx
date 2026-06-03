/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Hero, AISolutions, TraditionalServices, Standards, About, HomeCTA, AIToolEmbed, DeckEditEmbed, ProScanEmbed } from './components/MainSections';
import { ServicesDetailed, StandardsDetailed, FAQ, Contact } from './components/DetailSections';
import { Footer } from './components/Footer';

function ScrollToHashElement() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => element.scrollIntoView(), 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <AISolutions />
      <TraditionalServices />
      <Standards />
      <About />
      <HomeCTA />
      <ServicesDetailed />
      <StandardsDetailed />
      <FAQ />
      <Contact />
    </>
  );
}

function ToolPage() {
  return (
    <div style={{ paddingTop: '80px', minHeight: 'calc(100vh - 300px)' }}>
      <AIToolEmbed />
    </div>
  );
}

function DeckEditPage() {
  return (
    <div style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)', backgroundColor: '#0A0A0A' }}>
      <DeckEditEmbed />
    </div>
  );
}

function ProScanPage() {
  return (
    <div style={{ paddingTop: '80px', minHeight: 'calc(100vh - 300px)' }}>
      <ProScanEmbed />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHashElement />
      <div className="font-body text-text-dark bg-background">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tools/aicemark" element={<ToolPage />} />
            <Route path="/tools/deckedit" element={<DeckEditPage />} />
            <Route path="/tools/proscan" element={<ProScanPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
