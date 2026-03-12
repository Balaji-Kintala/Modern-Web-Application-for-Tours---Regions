import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { MapPin, Lock, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data, data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-forest-mist relative overflow-hidden font-sans">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-forest-green/10 blur-[120px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-forest-sage/50 blur-[100px] rounded-full"></div>
      
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-white/96 backdrop-blur-3xl p-12 rounded-[3rem] border border-forest-sage shadow-2xl animate-reveal">
          <div className="flex justify-center mb-10">
            <div className="w-20 h-20 forest-gradient rounded-3xl flex items-center justify-center shadow-2xl transition-transform hover:scale-110 duration-500">
              <MapPin className="text-white" size={40} />
            </div>
          </div>
          
          <h1 className="text-4xl font-black text-center text-forest-deep mb-3 tracking-tighter">Welcome Back</h1>
          <p className="text-center text-slate-500 mb-10 font-medium italic">Your Forest journey continues.</p>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-xs font-black uppercase tracking-widest mb-8 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-2">Email Identity</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-forest-green transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  className="pl-14 w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 text-forest-deep placeholder:text-slate-400 focus:ring-4 focus:ring-forest-green/10 focus:border-forest-green outline-none transition-all"
                  placeholder="explorer@forest.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-2">Secure Key</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-forest-green transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  className="pl-14 w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 text-forest-deep placeholder:text-slate-400 focus:ring-4 focus:ring-forest-green/10 focus:border-forest-green outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full forest-gradient text-white font-black py-5 rounded-2xl hover:shadow-[0_0_30px_rgba(23,111,60,0.3)] transition-all duration-500 text-xs uppercase tracking-[0.3em] active:scale-95"
            >
              Enter Portal
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
              New Spectator?{' '}
              <Link to="/signup" className="text-forest-green font-black hover:text-emerald-700 transition-colors ml-2 underline underline-offset-4 decoration-2">
                Join Expedition
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
