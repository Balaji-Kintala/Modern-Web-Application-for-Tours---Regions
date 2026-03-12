import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Globe, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10 shrink-0 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-forest-sage/20 blur-[120px] rounded-full -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Section */}
          <div className="space-y-8 animate-reveal" style={{ animationDelay: '0.1s' }}>
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-6 rounded-lg overflow-hidden flex flex-col border border-slate-200">
                <div className="h-1/3 w-full bg-[#FF9933]"></div>
                <div className="h-1/3 w-full bg-white flex justify-center items-center">
                  <div className="w-1.5 h-1.5 rounded-full border border-[#000080]"></div>
                </div>
                <div className="h-1/3 w-full bg-[#138808]"></div>
              </div>
              <span className="text-xl font-black text-forest-deep tracking-tight">India Travel</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              We curate extraordinary journeys across the soul of India. From ancient monuments to modern wonders, discover the essence of the sub-continent.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                <a key={idx} href="#" className="p-2.5 rounded-xl bg-forest-mist text-slate-400 hover:text-white hover:bg-forest-green transition-all duration-300 transform hover:-translate-y-1">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Destinatios */}
          <div className="animate-reveal" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xs font-black text-forest-deep mb-8 tracking-[0.3em] uppercase">Expeditions</h3>
            <ul className="space-y-4">
              <li><Link to="/states" className="text-slate-500 hover:text-forest-green font-bold text-sm transition-colors block">28 Majestic States</Link></li>
              <li><Link to="/uts" className="text-slate-500 hover:text-forest-green font-bold text-sm transition-colors block">8 Union Territories</Link></li>
              <li><Link to="/" className="text-slate-500 hover:text-forest-green font-bold text-sm transition-colors block">Curated Trails</Link></li>
              <li><Link to="/" className="text-slate-500 hover:text-forest-green font-bold text-sm transition-colors block">Heritage Sites</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-reveal" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-xs font-black text-forest-deep mb-8 tracking-[0.3em] uppercase">Concierge</h3>
            <ul className="space-y-5">
              <li className="flex items-center gap-4 text-slate-500 text-sm font-medium">
                <div className="w-10 h-10 rounded-xl bg-forest-sage flex items-center justify-center text-forest-green shrink-0">
                  <Phone size={18} />
                </div>
                <span>+91 1800-TRAVEL-IN</span>
              </li>
              <li className="flex items-center gap-4 text-slate-500 text-sm font-medium">
                <div className="w-10 h-10 rounded-xl bg-forest-sage flex items-center justify-center text-forest-green shrink-0">
                  <Mail size={18} />
                </div>
                <span>explore@indiatravel.com</span>
              </li>
              <li className="flex items-center gap-4 text-slate-500 text-sm font-medium">
                <div className="w-10 h-10 rounded-xl bg-forest-sage flex items-center justify-center text-forest-green shrink-0">
                  <MapPin size={18} />
                </div>
                <span>Delhi, MH, India</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="animate-reveal" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xs font-black text-forest-deep mb-8 tracking-[0.3em] uppercase">Join the Fold</h3>
            <p className="text-slate-500 text-sm font-medium mb-6">Receive curated travel stories and hidden gems in your inbox.</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Signal Address" 
                className="w-full bg-forest-mist border border-slate-100 rounded-2xl py-4 pl-6 pr-12 text-sm font-bold focus:ring-4 focus:ring-forest-green/10 outline-none transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 px-4 bg-forest-deep text-white rounded-xl hover:bg-forest-green transition-colors shadow-lg">
                <Globe size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            &copy; {new Date().getFullYear()} India Travel MGMT. All rights preserved for explorers.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-forest-green transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-forest-green transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-forest-green transition-colors">Cookie Signals</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
