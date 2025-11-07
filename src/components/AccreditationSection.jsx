import { ShieldCheck } from "lucide-react";
import hipaaLogo from "../assets/hipaa.png";
import isoLogo from "../assets/Iso27001.png";
import gdprLogo from "../assets/gdpr.png";

export default function AccreditationSection(props) {
  return (
    <section className="bg-gradient-to-r from-sky-50 to-indigo-50 py-12 px-6 rounded-3xl shadow-md mt-10">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        {/* Heading */}
        <div className="flex justify-center items-center space-x-3">
          <ShieldCheck className="text-indigo-500 w-8 h-8" />
          <h2 className="text-2xl font-bold text-gray-800">
            Security & Accreditation
          </h2>
        </div>

        {/* Text */}
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your privacy and data security are our top priorities. MoodTrack complies
          with international healthcare data protection and information security
          standards.
        </p>

        {/* Accreditation Logos */}
        <div className="flex flex-wrap justify-center items-center gap-10 mt-8">
          {/* HIPAA */}
          <div className="flex flex-col items-center">
            <img
              src={hipaaLogo}
              alt="HIPAA Compliant"
              className="w-20 h-20 object-contain hover:scale-105 transition-transform duration-300"
            />
            <p className="text-sm text-gray-700 mt-2 font-medium">HIPAA Compliant</p>
          </div>

          {/* ISO */}
          <div className="flex flex-col items-center">
            <img
              src={isoLogo}
              alt="ISO 27001 Certified"
              className="w-20 h-20 object-contain hover:scale-105 transition-transform duration-300"
            />
            <p className="text-sm text-gray-700 mt-2 font-medium">
              ISO 27001 Certified
            </p>
          </div>

          {/* GDPR */}
          <div className="flex flex-col items-center">
            <img
              src={gdprLogo}
              alt="GDPR Compliant"
              className="w-20 h-20 object-contain hover:scale-105 transition-transform duration-300"
            />
            <p className="text-sm text-gray-700 mt-2 font-medium">GDPR Compliant</p>
          </div>
        </div>
      </div>
    </section>
  );
}
