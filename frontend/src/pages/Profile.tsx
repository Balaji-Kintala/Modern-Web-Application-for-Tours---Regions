import { useAuth } from '../context/AuthContext';
import { UserCircle, Mail, Key } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 font-sans animate-reveal">
      <div className="bg-white rounded-[3rem] soft-shadow overflow-hidden border border-slate-50">
        <div className="h-64 forest-gradient relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20 opacity-40"></div>
          <div className="absolute top-10 right-10 flex gap-4">
             <div className="hidden md:flex px-6 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest items-center">
               Expedition Rank: Explorer
             </div>
          </div>
        </div>
        
        <div className="px-12 pb-16 relative">
          <div className="-mt-24 mb-10 flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
            <div className="bg-white p-3 rounded-[2.5rem] inline-block border-8 border-white shadow-2xl relative group">
              <div className="absolute inset-0 bg-forest-green/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <UserCircle size={140} className="text-forest-deep bg-forest-sage/30 rounded-[2rem] relative z-10" />
              <div className="absolute -bottom-2 -right-2 bg-forest-green p-3 rounded-2xl text-white shadow-2xl border-4 border-white">
                 <Key size={20} />
              </div>
            </div>
            
            <button className="bg-forest-deep text-white px-10 py-5 font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-forest-green hover:shadow-[0_0_30px_rgba(23,111,60,0.3)] transition-all duration-500 active:scale-95 flex items-center gap-3">
              <span className="w-2 h-2 bg-forest-sage rounded-full animate-ping"></span> Edit Profile Identity
            </button>
          </div>
          
          <div className="space-y-2 text-center md:text-left mb-12">
            <h1 className="text-6xl font-black text-forest-deep tracking-tighter leading-none">{user.name}</h1>
            <p className="text-slate-400 font-bold flex items-center justify-center md:justify-start gap-3 text-lg italic">
              <Mail size={20} className="text-forest-green" /> {user.email}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-forest-mist border border-slate-100 rounded-[2rem] p-8 hover:shadow-xl transition-all group">
              <h3 className="font-black text-forest-deep text-xs uppercase tracking-widest mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-forest-sage/50 rounded-lg flex items-center justify-center text-forest-green">
                   <UserCircle size={18} />
                </span> 
                Member Status
              </h3>
              <div className="flex items-center gap-4">
                <span className="text-forest-green font-black bg-white px-6 py-2 rounded-xl text-xs uppercase tracking-widest shadow-sm border border-slate-100">Verified Explorer</span>
                <span className="text-slate-400 text-[10px] font-bold">Since March 2024</span>
              </div>
            </div>
            
            <div className="bg-forest-mist border border-slate-100 rounded-[2rem] p-8 hover:shadow-xl transition-all group">
              <h3 className="font-black text-forest-deep text-xs uppercase tracking-widest mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center text-slate-500">
                   <Key size={18} />
                </span> 
                Expedition Logs
              </h3>
              <button className="text-forest-deep hover:text-forest-green text-[10px] font-black uppercase tracking-[0.2em] transition-colors flex items-center gap-2">
                Sync Data &rarr;
              </button>
            </div>
          </div>
          
          <div className="mt-16 border-t border-slate-100 pt-16">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-2 h-10 bg-forest-sage rounded-full"></div>
               <h3 className="font-black text-forest-deep text-3xl tracking-tight leading-none">Your Contributions</h3>
            </div>
            <div className="bg-forest-mist rounded-[2.5rem] p-12 text-center border border-dashed border-slate-200">
               <p className="text-slate-400 font-medium italic text-lg max-w-md mx-auto">
                 "Every path taken is a story untold. You haven't added any public logs yet."
               </p>
               <button className="mt-8 text-forest-green font-black text-[10px] uppercase tracking-[0.3em] hover:text-forest-deep transition-colors">Start Your First log &rarr;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
