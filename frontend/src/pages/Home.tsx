import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Map, MapPinned } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="py-12 lg:py-20 animate-reveal">
      <div className="text-center mb-20 max-w-4xl mx-auto">
        <h1 className="text-5xl lg:text-7xl font-black text-forest-deep tracking-tighter mb-8 leading-tight">
          Discover <span className="text-forest-green">Incredible</span> India
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
          Welcome {user?.name ? `${user.name}, e` : 'E'}xplore the diverse culture, historical monuments, and breathtaking landscapes across all regions of the country.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto px-4">
        {/* States Box */}
        <Link 
          to="/states" 
          className="group relative bg-white rounded-[2rem] soft-shadow hover-lift overflow-hidden border border-forest-sage"
        >
          <div className="h-64 forest-gradient p-10 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <h2 className="text-4xl font-black text-white z-10 tracking-tight">28<br/>States</h2>
              <Map className="text-white/20 w-32 h-32 absolute -right-6 -top-6 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700" />
            </div>
            <div className="mt-auto inline-flex items-center px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300">
              Explore Now
            </div>
          </div>
          <div className="p-10">
            <p className="text-slate-500 font-medium leading-relaxed">
              From the snow-capped mountains of Himachal Pradesh to the serene backwaters of Kerala.
            </p>
            <div className="mt-6 flex items-center text-forest-green font-black text-xs uppercase tracking-[0.2em]">
              Select a State &rarr;
            </div>
          </div>
        </Link>

        {/* UTs Box */}
        <Link 
          to="/uts" 
          className="group relative bg-white rounded-[2rem] soft-shadow hover-lift overflow-hidden border border-forest-sage"
        >
          <div className="h-64 bg-gradient-to-br from-forest-green to-emerald-800 p-10 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <h2 className="text-4xl font-black text-white z-10 tracking-tight">8 Union<br/>Territories</h2>
              <MapPinned className="text-white/20 w-32 h-32 absolute -right-6 -top-6 transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700" />
            </div>
            <div className="mt-auto inline-flex items-center px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300">
              Explore Now
            </div>
          </div>
          <div className="p-10">
            <p className="text-slate-500 font-medium leading-relaxed">
              Discover the tropical paradise of Andaman and Nicobar Islands and pristine beaches of Lakshadweep.
            </p>
            <div className="mt-6 flex items-center text-forest-green font-black text-xs uppercase tracking-[0.2em]">
              Select a Territory &rarr;
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
