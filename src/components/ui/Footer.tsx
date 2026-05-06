import { ShieldCheck } from "lucide-react";
import VaxTrackLogo from "../svgImages/VaxTrackLogo";

const Footer = () => {
  return (
    <footer className="w-full border-t border-[#E7E5E4] bg-[#FAFAF9] px-6 py-10">
      <div className="mx-auto max-w-6xl">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#E9DFFF]">
                <VaxTrackLogo />
              </div>

              <h2 className="text-sm font-semibold text-[#7C3AED]">
                VaxTrack
              </h2>
            </div>

            <p className="max-w-[220px] text-xs leading-5 text-[#78716C]">
              The modern solution for medical administration and family
              health tracking. Keeping your loved ones safe, one dose
              at a time.
            </p>
          </div>

          {/* Platform */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#1C1917]">
              Platform
            </h3>

            <ul className="space-y-2 text-xs text-[#78716C]">
              <li className="cursor-pointer hover:text-[#7C3AED]">
                Dashboard
              </li>

              <li className="cursor-pointer hover:text-[#7C3AED]">
                Dependents
              </li>

              <li className="cursor-pointer hover:text-[#7C3AED]">
                Vaccine Records
              </li>

              <li className="cursor-pointer hover:text-[#7C3AED]">
                Medical Partners
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#1C1917]">
              Resources
            </h3>

            <ul className="space-y-2 text-xs text-[#78716C]">
              <li className="cursor-pointer hover:text-[#7C3AED]">
                FAQ
              </li>

              <li className="cursor-pointer hover:text-[#7C3AED]">
                Privacy Policy
              </li>

              <li className="cursor-pointer hover:text-[#7C3AED]">
                Terms of Service
              </li>

              <li className="cursor-pointer hover:text-[#7C3AED]">
                Support
              </li>
            </ul>
          </div>

          {/* Security */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#1C1917]">
              Secure Access
            </h3>

            <div className="flex items-center gap-3 rounded-xl border border-[#E7E5E4] bg-white px-4 py-3 shadow-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ECFDF3]">
                <ShieldCheck className="h-4 w-4 text-[#16A34A]" />
              </div>

              <div>
                <p className="text-xs font-medium text-[#1C1917]">
                  HIPAA Compliant
                </p>

                <p className="text-[10px] text-[#78716C]">
                  256-bit AES Encryption
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-[#E7E5E4] pt-5 text-center">
          <p className="text-[11px] text-[#A8A29E]">
            © 2024 VaxTrack. All rights reserved. Professional
            healthcare administration simplified.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;