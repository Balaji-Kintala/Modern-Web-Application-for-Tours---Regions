import { Link, useNavigate } from 'react-router-dom';
import { UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 frosted-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-3 group text-nordic-navy">
            <div className="w-10 h-7 rounded-lg overflow-hidden flex flex-col border border-slate-200 shadow-sm group-hover:scale-110 transition-transform duration-500">
              <div className="h-1/3 w-full bg-[#FF9933]"></div>
              <div className="h-1/3 w-full bg-white flex justify-center items-center">
                <div className="w-2 h-2 rounded-full border border-[#000080]"></div>
              </div>
              <div className="h-1/3 w-full bg-[#138808]"></div>
            </div>
            <span className="text-2xl font-black text-forest-green tracking-tight">
              India Travel
            </span>
          </Link>
        </div>

        <nav className="flex items-center space-x-8">
          <Link 
            to="/profile" 
            className="flex items-center space-x-2 text-slate-600 hover:text-forest-green transition-all duration-300 group"
          >
            <div className="p-1.5 rounded-full bg-slate-50 group-hover:bg-forest-sage transition-colors">
              <UserCircle size={24} className="group-hover:text-forest-green" />
            </div>
            <span className="font-semibold hidden sm:inline-block tracking-wide">{user?.name || 'Profile'}</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-red-50 hover:text-red-500 transition-all duration-300 font-bold text-sm uppercase tracking-widest"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline-block">Sign Out</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
