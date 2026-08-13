import React from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  Users,
  GraduationCap,
  Video,
  Briefcase,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { initialServices } from '../../data/initialData';

interface ServicesSectionProps {
  onOpenConsultation: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenConsultation }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return Layers;
      case 'Users':
        return Users;
      case 'GraduationCap':
        return GraduationCap;
      case 'Video':
        return Video;
      case 'Briefcase':
        return Briefcase;
      default:
        return FileCheck;
    }
  };

  return (
    <section id="services" className="py-20 px-4 lg:px-8 relative font-sans bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00A3FF]" />
            <span>Dedicated Counselling Practice</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            Personalized Admission <span className="text-[#00A3FF]">Counselling Services</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            From MHT-CET / NEET score evaluation to final seat confirmation, our senior mentors in Pune guide students step-by-step with 100% transparency.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialServices.map((service, idx) => {
            const IconComp = getIcon(service.iconName);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-7 flex flex-col justify-between group border border-slate-200 shadow-md hover:shadow-xl hover:border-blue-300 transition-all relative overflow-hidden will-change-[transform,opacity]"
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00A3FF] to-[#0284C7] opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-5">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#00A3FF] group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-[#00A3FF] group-hover:to-[#0284C7] group-hover:text-white transition-all duration-200 shadow-sm">
                    <IconComp className="w-7 h-7" />
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-heading group-hover:text-[#00A3FF] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-medium">
                      {service.description}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <ul className="space-y-2 pt-2 border-t border-slate-100">
                    {service.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer Action */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0284C7] uppercase tracking-wider font-heading">
                    1-on-1 Mentorship
                  </span>
                  <button
                    onClick={onOpenConsultation}
                    className="p-2.5 rounded-xl bg-slate-100 group-hover:bg-[#00A3FF] text-slate-700 group-hover:text-white transition-colors flex items-center justify-center"
                    aria-label={`Enquire about ${service.title}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
