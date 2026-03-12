import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../api/axios';
import { Map, MapPinned, Search, Compass, ChevronRight } from 'lucide-react';

interface Region {
  _id: string;
  name: string;
  type: string;
  imageUrl: string;
}

const RegionList = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isStates = location.pathname.includes('states');
  const typeFilter = isStates ? 'State' : 'Union Territory';

  useEffect(() => {
    const fetchRegions = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/regions?type=${typeFilter}`);
        setRegions(data);
      } catch (error) {
        console.error('Error fetching regions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRegions();
  }, [typeFilter]);

  const filteredRegions = regions.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-forest-mist font-sans pb-20 animate-reveal">
      {/* Hero Section */}
      <div className="relative forest-gradient overflow-hidden mb-20 rounded-[3rem] mx-4 lg:mx-0 shadow-2xl mt-8">
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1596895111956-6f112613ce2b?q=80&w=2000&auto=format&fit=crop" 
            alt="India Landscape" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-32 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl mb-8 border border-white/20 text-forest-sage font-black text-xs uppercase tracking-[0.3em] shadow-xl">
              Explorer Directory
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
              Incredible <span className="text-forest-sage">{isStates ? 'States' : 'UTs'}</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-xl mb-12 font-medium leading-relaxed">
              Discover the rich heritage, vibrant culture, and breathtaking landscapes across our 36 distinct regions.
            </p>
            
            <div className="max-w-xl relative group">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-slate-400 group-focus-within:text-forest-green transition-colors" />
              </div>
              <input
                type="text"
                className="w-full pl-16 pr-6 py-5 bg-white backdrop-blur-3xl border-none rounded-2xl text-forest-deep placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-forest-green/30 transition-all shadow-2xl text-xl font-bold"
                placeholder={`Search ${isStates ? '28 States' : '8 UTs'}...`}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="hidden lg:block lg:w-96 lg:h-96 relative">
            <div className="absolute inset-0 bg-forest-green/20 blur-[100px] animate-pulse"></div>
            <div className="relative z-10 w-full h-full flex items-center justify-center p-8 bg-white/5 backdrop-blur-md rounded-[4rem] border border-white/10 shadow-3xl animate-float">
              {isStates ? <Map className="text-white w-48 h-48 opacity-80" /> : <MapPinned className="text-white w-48 h-48 opacity-80" />}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12 p-3 bg-white rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-black text-forest-deep flex items-center gap-3 ml-4">
            <Compass className="text-forest-green" size={28} />
            Destinations Directory
          </h2>
          <span className="bg-forest-sage text-forest-green py-2 px-5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm border border-forest-green/10">
            {filteredRegions.length} Found
          </span>
        </div>

        {/* Region Grid */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-32 space-y-6">
            <div className="w-20 h-20 border-8 border-slate-100 border-t-forest-green rounded-full animate-spin"></div>
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Fetching places...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredRegions.map((region, idx) => (
              <Link
                key={region._id}
                to={`/region/${region._id}`}
                className="group relative h-[420px] rounded-[2.5rem] overflow-hidden soft-shadow hover-lift animate-reveal"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <img 
                  src={region.imageUrl} 
                  alt={region.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500"></div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-xl rounded-xl text-[10px] font-black uppercase tracking-widest text-white mb-4 border border-white/10 shadow-sm">
                      {region.type}
                    </span>
                    <h3 className="text-3xl font-black text-white mb-4 leading-[1.1] tracking-tight">
                      {region.name}
                    </h3>
                    <div className="flex items-center text-forest-sage font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                      Explore Destinations <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && filteredRegions.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-forest-sage soft-shadow animate-reveal">
            <Search className="w-20 h-20 text-slate-200 mx-auto mb-6" />
            <h3 className="text-3xl font-black text-forest-deep mb-4 tracking-tight">No Matches Found</h3>
            <p className="text-slate-500 font-medium">We couldn't find any {isStates ? 'state' : 'territory'} matching "{search}".</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegionList;
