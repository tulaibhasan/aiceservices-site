import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Lenis from 'lenis';
import App from './App.tsx';
import './index.css';

// Smooth, weighted scrolling (skipped for reduced motion)
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
  const raf = (t: number) => { lenis.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// hand over from the static boot image once the app has painted
requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById('boot')?.remove()));
