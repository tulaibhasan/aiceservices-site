/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { Footer, Header, Loader } from './components/Layout';
import { HomePage } from './components/Home';
import { ToolEmbed } from './components/ToolEmbed';

function ScrollToHashElement() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => element.scrollIntoView(), 100);
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
        <Loader />
        <Header />
        <main id="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tools/aicemark" element={<ToolEmbed id="aicemark" />} />
            <Route path="/tools/deckedit" element={<ToolEmbed id="deckedit" />} />
            <Route path="/tools/proscan" element={<ToolEmbed id="proscan" />} />
            <Route path="/tools/boqauditor" element={<ToolEmbed id="boqauditor" />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </MotionConfig>
    </BrowserRouter>
  );
}
