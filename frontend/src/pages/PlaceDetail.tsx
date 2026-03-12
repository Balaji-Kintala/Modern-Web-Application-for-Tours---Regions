import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Clock, Banknote, Scroll, MapPin, Landmark, Award, ArrowLeft, MessageSquare, Star, Map } from 'lucide-react';

interface Place {
  _id: string;
  name: string;
  district: string;
  imageUrl: string;
  description: string;
  history: string;
  ruler: string;
  geographicArea: string;
  entryTime: string;
  ticketPrice: number;
  regionId: {
    _id: string;
    name: string;
  };
}

interface Review {
  _id: string;
  userId: { _id: string; name: string };
  comment: string;
  rating: number;
  createdAt: string;
}

const PlaceDetail = () => {
  const { placeId } = useParams();
  const { user } = useAuth();
  const [place, setPlace] = useState<Place | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Review form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const [placeRes, reviewsRes] = await Promise.all([
          api.get(`/places/${placeId}`),
          api.get(`/places/${placeId}/reviews`)
        ]);
        setPlace(placeRes.data);
        setReviews(reviewsRes.data);
      } catch (error) {
        console.error('Error fetching place details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaceData();
  }, [placeId]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      const { data } = await api.post(`/places/${placeId}/reviews`, { rating, comment });
      setReviews(prev => [...prev, data]);
      setComment('');
      setRating(5);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (loading) return (
    <div className="py-40 text-center animate-reveal">
      <div className="w-16 h-16 border-8 border-slate-100 border-t-forest-green rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Unveiling details...</p>
    </div>
  );
  
  if (!place) return (
    <div className="py-40 text-center animate-reveal">
      <Landmark className="w-20 h-20 text-slate-200 mx-auto mb-6" />
      <h3 className="text-3xl font-black text-forest-deep mb-4 tracking-tight">Place Not Found</h3>
      <Link to="/" className="text-forest-green font-black uppercase tracking-widest text-xs hover:underline decoration-2 underline-offset-8">Return Home</Link>
    </div>
  );

  return (
    <div className="py-12 animate-reveal">
      <Link to={`/region/${place.regionId._id}`} className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-forest-green mb-10 transition-colors group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to {place.regionId.name}
      </Link>

      <div className="bg-white rounded-[3rem] soft-shadow overflow-hidden border border-slate-50">
        <div className="h-[500px] relative group overflow-hidden">
          <img 
            src={place.imageUrl || `https://source.unsplash.com/1600x900/?${place.name.replace(/\s/g, '')},india`} 
            alt={place.name} 
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/30 to-transparent"></div>
          <div className="absolute bottom-10 left-10 right-10 lg:bottom-16 lg:left-16">
            <div className="inline-flex items-center px-4 py-1.5 bg-forest-green backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-widest text-white mb-6 shadow-2xl">
              Must Visit Destination
            </div>
            <h1 className="text-6xl lg:text-8xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl leading-[0.9]">
              {place.name}
            </h1>
            <div className="flex items-center text-slate-200 text-xl font-medium tracking-wide">
              <MapPin size={24} className="mr-3 text-forest-green" />
              {place.district}, {place.regionId.name}
            </div>
          </div>
        </div>

        <div className="p-10 lg:p-20">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Main Content */}
            <div className="flex-1 space-y-16">
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-forest-sage p-3 rounded-2xl text-forest-green">
                    <Landmark size={32} />
                  </div>
                  <h2 className="text-4xl font-black text-forest-deep tracking-tight">Overview</h2>
                </div>
                <p className="text-slate-500 leading-[1.8] text-xl font-medium">{place.description}</p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 bg-forest-mist rounded-[2.5rem] border border-slate-100">
                <div className="space-y-4">
                  <h3 className="text-xs font-black text-forest-green uppercase tracking-[0.3em] flex items-center gap-3">
                    <Scroll size={20} className="text-forest-deep" /> History
                  </h3>
                  <p className="text-slate-600 font-medium leading-relaxed italic text-lg">{place.history}</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xs font-black text-forest-green uppercase tracking-[0.3em] flex items-center gap-3">
                    <Award size={20} className="text-forest-deep" /> Legacy
                  </h3>
                  <p className="text-slate-600 font-bold leading-relaxed text-xl">{place.ruler}</p>
                </div>
              </div>

              <section>
                <div className="flex items-center gap-4 mb-10">
                  <div className="bg-slate-100 p-3 rounded-2xl text-forest-deep">
                    <MessageSquare size={32} />
                  </div>
                  <h2 className="text-4xl font-black text-forest-deep tracking-tight">Traveler Voice</h2>
                </div>
                
                {/* Review Form */}
                {user ? (
                  <form onSubmit={handleReviewSubmit} className="mb-12 bg-white soft-shadow p-10 rounded-[2.5rem] border border-slate-50">
                    <h4 className="font-black text-forest-deep text-xl mb-6 tracking-tight">Add your footprint</h4>
                    <div className="flex items-center gap-3 mb-8">
                      <span className="text-xs font-black uppercase tracking-widest text-slate-400 mr-2">Experience Score:</span>
                      {[1,2,3,4,5].map(num => (
                        <button 
                          key={num} 
                          type="button" 
                          onClick={() => setRating(num)}
                          className={`hover:scale-125 transition-all duration-300 ${rating >= num ? 'text-forest-green' : 'text-slate-200'}`}
                        >
                          <Star fill={rating >= num ? "currentColor" : "none"} size={32} />
                        </button>
                      ))}
                    </div>
                    <textarea 
                      className="w-full bg-slate-50 border-none rounded-2xl p-6 focus:ring-4 focus:ring-forest-green/20 min-h-[150px] mb-6 text-lg font-medium placeholder-slate-400 transition-all shadow-inner"
                      placeholder="Narrate your journey here..."
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                    ></textarea>
                    <button type="submit" className="w-full lg:w-fit bg-forest-deep text-white font-black text-xs uppercase tracking-[0.3em] px-10 py-5 rounded-2xl hover:bg-forest-green shadow-xl transition-all duration-300 transform active:scale-95">
                      Publish Your Talk
                    </button>
                  </form>
                ) : (
                  <div className="mb-12 p-8 bg-forest-mist rounded-[2.5rem] text-center border border-slate-100">
                    <p className="text-slate-500 font-bold mb-4">You must be logged in to contribute.</p>
                    <Link to="/login" className="inline-block bg-forest-deep text-white font-black text-[10px] uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-forest-green transition-all">Sign In &rarr;</Link>
                  </div>
                )}

                {/* Reviews List */}
                <div className="space-y-8">
                  {reviews.length === 0 ? (
                    <div className="text-center py-16 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
                      <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Be the first traveler to speak</p>
                    </div>
                  ) : (
                    reviews.map((r, idx) => (
                      <div key={r._id} className="bg-forest-mist/40 p-8 rounded-[2rem] animate-reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-black text-forest-deep uppercase tracking-widest text-xs">{r.userId.name}</span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{new Date(r.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-forest-green mb-4 space-x-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} fill={i < r.rating ? "currentColor" : "none"} size={16} className={i < r.rating ? '' : 'text-gray-300'} />
                          ))}
                        </div>
                        <p className="text-slate-600 font-medium leading-[1.6] italic">"{r.comment}"</p>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>

            {/* Sidebar info */}
            <div className="lg:w-96 shrink-0">
              <div className="sticky top-32 frosted-glass rounded-[3rem] p-10 space-y-10">
                <h3 className="font-black text-2xl text-forest-deep tracking-tight border-b border-slate-100 pb-6">Explorer Info</h3>
                
                <div className="space-y-12">
                  <div className="flex gap-6 items-start group">
                    <div className="bg-forest-sage p-4 rounded-[1.25rem] text-forest-green soft-shadow transition-transform duration-500 group-hover:scale-110">
                      <Clock size={32} />
                    </div>
                    <div>
                      <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Access Window</span>
                      <span className="text-forest-deep font-black text-lg">{place.entryTime || 'Always Open'}</span>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start group">
                    <div className="bg-forest-green/10 p-4 rounded-[1.25rem] text-forest-green soft-shadow transition-transform duration-500 group-hover:scale-110">
                      <Banknote size={32} />
                    </div>
                    <div>
                      <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Gate Fee</span>
                      <span className="text-forest-deep font-black text-lg">
                        {place.ticketPrice === 0 ? 'Expedition Free' : `₹ ${place.ticketPrice}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start group">
                    <div className="bg-slate-100 p-4 rounded-[1.25rem] text-forest-deep soft-shadow transition-transform duration-500 group-hover:scale-110">
                      <Map size={32} />
                    </div>
                    <div>
                      <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Topography</span>
                      <span className="text-forest-deep font-black text-lg italic">{place.geographicArea || 'Wilderness Territory'}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 pt-10 mt-10 border-t border-slate-100 italic text-sm text-slate-400 font-medium">
                  Experience the soul of {place.regionId.name} through this ancient wonder.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;
