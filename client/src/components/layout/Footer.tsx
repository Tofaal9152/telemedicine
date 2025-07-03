import { Mail, Smartphone, Download, ShieldCheck, Heart } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-12 AntonFont px-4 bg-gradient-to-br from-[#4f3d80] to-[#E6FFF5] text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Get in Touch
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-[#4f3d80] backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <span>+8801342177190</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#4f3d80] backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <a
                  href="mailto:hello@upandpro.com"
                  className="hover:text-blue-400 transition-colors"
                >
                 upnproacademy@gmail.com

                </a>
              </div>
            </div>
          </div>

          {/* App Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Coming Soon
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-[#4f3d80] backdrop-blur-sm rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Download className="w-5 h-5" />
                </div>
                <span>Mobile App</span>
              </div>
              <Link href={"/privacy-policy"} className="flex items-center gap-3 p-3 bg-[#4f3d80] backdrop-blur-sm rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span>Privacy Policy | Terms</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-[#E6FFF5] flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-400" /> for English
            learners
          </p>
          <p className="text-sm text-gray-800 mt-2">
            © {new Date().getFullYear()} UP&PRO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
