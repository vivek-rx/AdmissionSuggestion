import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const WhatsAppButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:left-6 z-40 flex items-center group">
      {/* Floating Compact WhatsApp FAB */}
      <a
        href="https://wa.me/919860777069?text=Hi%20Admission%20Suggestion%2C%20I%20need%20assistance%20regarding%20CAP%20Round%20and%20College%20Cutoffs."
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-12 h-12 md:w-13 md:h-13 rounded-full bg-gradient-to-tr from-[#20ba59] to-[#25D366] text-white flex items-center justify-center shadow-[0_4px_18px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_24px_rgba(37,211,102,0.6)] border border-white/20 transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Chat on WhatsApp (+91 9860 777 069)"
      >
        {/* Subtle Online Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />

        {/* Official WhatsApp Crisp SVG Logo */}
        <svg
          className="w-6 h-6 md:w-7 md:h-7 fill-white relative z-10 transition-transform duration-300 group-hover:rotate-6"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>

        {/* Small Active Status Dot */}
        <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-white rounded-full flex items-center justify-center">
          <span className="w-2 h-2 bg-emerald-500 rounded-full" />
        </span>
      </a>

      {/* Modern Floating Hover Badge */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -8, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="hidden md:flex ml-3 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold shadow-lg items-center gap-1.5 border border-slate-700 pointer-events-none"
          >
            <span>Chat on WhatsApp</span>
            <span className="text-[10px] text-emerald-400 font-mono">Online</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
