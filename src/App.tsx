/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navigation } from './components/Navigation';
import { Hero, AISolutions, TraditionalServices, Standards, About, HomeCTA } from './components/MainSections';
import { ServicesDetailed, StandardsDetailed, FAQ, Contact } from './components/DetailSections';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="font-body text-text-dark bg-background">
      <Navigation />
      <main>
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
      </main>
      <Footer />
    </div>
  );
}
