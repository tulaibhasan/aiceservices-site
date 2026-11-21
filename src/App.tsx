/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { Footer, Header } from './components/Layout';
import { HomePage } from './components/Home';
import { ToolEmbed } from './components/ToolEmbed';

function ScrollToHashElement() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
        setTimeout(() => (lenis ? lenis.scrollTo(element, { offset: 0 }) : element.scrollIntoView()), 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <ScrollToHashElement />
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tools/aicemark" element={<ToolEmbed id="aicemark" />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </MotionConfig>
    </BrowserRouter>
  );
}
