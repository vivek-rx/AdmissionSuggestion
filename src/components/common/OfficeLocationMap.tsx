import React from 'react';
import { MapPin, Navigation, Phone, MessageSquare, Clock, Building2, CheckCircle2, Car, Train } from 'lucide-react';

export const OfficeLocationMap: React.FC = () => {
  const googleMapsDirectionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Sohrab+Hall+Tadiwala+Road+Pune+Station+Pune+Maharashtra+411001";
  const googleMapsViewUrl = "https://maps.google.com/?q=Sohrab+Hall,+Tadiwala+Road,+Pune,+Maharashtra+411001";

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left / Top Information Column */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-slate-50/50 border-b lg:border-b-0 lg:border-r border-slate-200">
          <div className="space-y-4">
            
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#00ADEF] text-xs font-bold uppercase tracking-wider font-heading">
              <Building2 className="w-3.5 h-3.5" />
              <span>Pune Head Office</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading tracking-tight">
              Visit Our Central Counselling Center
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Conveniently located directly behind Pune Railway Station for easy access by outstation students from Mumbai, Nashik, Kolhapur, Aurangabad & across Maharashtra.
            </p>

            {/* Address Box */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#00ADEF] flex items-center justify-center shrink-0 mt-0.5 border border-sky-100">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 font-heading">Office Address</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-0.5 font-normal">
                    Office No. 312, 3rd Floor, Sohrab Hall, Tadiwala Road, Behind Pune Railway Station, Pune - 411001
                  </p>
                </div>
              </div>
            </div>

            {/* Transit & Landmark Highlights */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-600">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200">
                <Train className="w-4 h-4 text-[#00ADEF] shrink-0" />
                <span>150m from Pune Station</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200">
                <Car className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Visitor Parking Available</span>
              </div>
            </div>

            {/* Timings */}
            <div className="flex items-center gap-2 text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
              <Clock className="w-4 h-4 text-[#00ADEF] shrink-0" />
              <span><strong>Timings:</strong> Mon - Sat: 10:00 AM – 7:30 PM (Sun by Appointment)</span>
            </div>
          </div>

          {/* Action Navigation Buttons */}
          <div className="space-y-2.5 pt-2">
            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-[#00ADEF] hover:bg-[#0098D4] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 font-heading group"
            >
              <Navigation className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              <span>Get Directions in Google Maps</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:+919860777069"
                className="py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors font-heading"
              >
                <Phone className="w-3.5 h-3.5 text-[#00ADEF]" />
                <span>Call Helpline</span>
              </a>

              <a
                href="https://wa.me/919860777069?text=Hi%20Admission%20Suggestion%2C%20I%20am%20visiting%20your%20Pune%20Office%20for%20CAP%20Round%20Counselling."
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors font-heading"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right / Bottom Interactive Google Maps Embed */}
        <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[420px] bg-slate-100">
          <iframe
            title="Admission Suggestion Pune Head Office Location"
            src="https://maps.google.com/maps?q=Sohrab%20Hall%2C%20Tadiwala%20Road%2C%20behind%20Pune%20Railway%20Station%2C%20Pune%2C%20Maharashtra%20411001&t=&z=16&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full min-h-[340px] sm:min-h-[420px] border-0"
            loading="lazy"
            allowFullScreen
          />

          {/* Quick Overlay Map Badge */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-md flex items-center gap-2 pointer-events-none">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-slate-800 font-heading">Admission Suggestion • Sohrab Hall</span>
          </div>
        </div>

      </div>
    </div>
  );
};
