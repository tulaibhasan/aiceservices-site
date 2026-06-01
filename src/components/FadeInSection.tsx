import { motion } from 'motion/react';
import { ReactNode } from 'react';

export function FadeInSection({ id, className, children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
