import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { MapPin, ArrowLeft, Image as ImageIcon } from 'lucide-react';

interface Place {
  _id: string;
  name: string;
  district: string;
  imageUrl: string;
  description: string;
}

interface Region {
  _id: string;
  name: string;
  type: string;
  imageUrl: string;
}

const PlaceList = () => {
  const { regionId } = useParams();
  const [places, setPlaces] = useState<Place[]>([]);
  const [region, setRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [placesRes, regionRes] = await Promise.all([
          api.get(`/places/region/${regionId}`),
          api.get(`/regions/${regionId}`)
        ]);
        setPlaces(placesRes.data);
        setRegion(regionRes.data);
      } catch (error) {
        console.error('Error fetching places:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [regionId]);

  return (
    <div className="min-h-screen bg-forest-mist font-sans pb-20 animate-reveal">
      {/* Region Context Hero */}
      <div className="relative h-[550px] forest-gradient mb-20 rounded-[3rem] mx-4 lg:mx-0 shadow-2xl mt-8 overflow-hidden">
        {loading ? (
          <div className="absolute inset-0 bg-slate-800 animate-pulse"></div>
        ) : (
          <>
            <img 
              src={region?.imageUrl || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2000&auto=format&fit=crop'} 
              alt={region?.name} 
              className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-[3s] hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/40 to-transparent"></div>
            
            <div className="absolute top-10 left-10 z-20">
              <Link 
                to={region?.type === 'State' ? '/states' : '/uts'} 
                className="inline-flex items-center px-6 py-2.5 bg-white/10 backdrop-blur-xl rounded-2xl text-white hover:bg-white/20 transition-all border border-white/20 text-[10px] font-black uppercase tracking-widest shadow-2xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to {region?.type === 'State' ? 'States' : 'Territories'}
              </Link>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
              <span className="inline-block px-5 py-2 bg-forest-green backdrop-blur-xl rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-8 shadow-2xl text-white">
                Explorer's Choice: {region?.type || 'Destination'}
              </span>
              <h1 className="text-6xl md:text-9xl font-black text-white drop-shadow-3xl mb-8 tracking-tighter leading-none">
                {region?.name || 'Unveiling...'}
              </h1>
              <p className="text-2xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
                Discover {places.length > 0 ? places.length : ''} breathtaking locations that define the soul of this region.
              </p>
            </div>
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-16 p-4 bg-white rounded-3xl soft-shadow border border-slate-50">
          <div className="flex items-center gap-4 ml-4">
             <div className="bg-forest-sage p-3 rounded-2xl text-forest-green">
                <MapPin size={24} />
             </div>
             <h2 className="text-2xl font-black text-forest-deep tracking-tight">Prime Destinations</h2>
          </div>
          <span className="bg-forest-mist text-slate-400 py-2 px-6 rounded-2xl text-xs font-black uppercase tracking-widest border border-slate-100">
            {places.length} Spots Identified
          </span>
        </div>
        
        {loading ? (
          <div className="flex flex-col justify-center items-center py-32 space-y-6">
            <div className="w-20 h-20 border-8 border-slate-100 border-t-forest-green rounded-full animate-spin"></div>
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Mapping region...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-12">
            {places.map((place, idx) => (
              <div 
                key={place._id} 
                className="group bg-white rounded-[2.5rem] soft-shadow hover-lift overflow-hidden border border-slate-100 flex flex-col animate-reveal"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="h-80 overflow-hidden relative">
                  {place.imageUrl ? (
                     <img 
                       src={place.imageUrl}
                       alt={place.name} 
                       className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                     />
                  ) : (
                    <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                       <ImageIcon className="text-slate-200 w-16 h-16" />
                    </div>
                  )}
                 
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-xl px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-forest-deep shadow-2xl flex items-center gap-2 border border-white/50">
                    <MapPin size={16} className="text-forest-green" /> {place.district}
                  </div>
                </div>
                
                <div className="p-10 flex-1 flex flex-col bg-white">
                  <h2 className="text-3xl font-black text-forest-deep mb-4 leading-tight group-hover:text-forest-green transition-colors tracking-tight">{place.name}</h2>
                  <p className="text-slate-500 font-medium text-sm mb-10 flex-1 line-clamp-5 leading-relaxed italic overflow-hidden">
                    {place.description}
                  </p>
                  
                  <Link
                    to={`/place/${place._id}`}
                    className="mt-auto w-full inline-flex justify-center items-center px-6 py-5 bg-forest-mist border border-slate-100 text-forest-deep rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-forest-deep hover:text-white hover:shadow-2xl transition-all duration-500 group/btn"
                  >
                    Explore Journey &rarr;
                  </Link>
                </div>
              </div>
            ))}

            {!loading && places.length === 0 && (
              <div className="col-span-full text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200 soft-shadow animate-reveal">
                <MapPin className="w-20 h-20 text-slate-100 mx-auto mb-6" />
                <h3 className="text-3xl font-black text-forest-deep mb-4 tracking-tight">Terrain Uncharted</h3>
                <p className="text-slate-400 font-black uppercase tracking-widest text-xs">We are currently curating this region's gems.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceList;
