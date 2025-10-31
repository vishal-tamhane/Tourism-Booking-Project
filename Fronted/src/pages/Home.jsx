import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { activities } from '../data/activities';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {activities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <img src={activity.image} alt={activity.name} className="w-full h-full object-cover" />
                <span className="absolute top-2 right-2 bg-primary px-3 py-1 rounded text-xs font-semibold text-black">
                  New
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 text-black">{activity.name}</h3>
                <p className="text-sm text-black mb-3">{activity.location}</p>
                <p className="text-sm text-black leading-relaxed mb-4 line-clamp-3">
                  {activity.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-lg font-semibold text-black">From ₹{activity.price}</div>
                  <button 
                    className="px-6 py-2 bg-primary hover:bg-primary-hover rounded font-semibold text-sm text-black transition-colors"
                    onClick={() => navigate(`/select-date/${activity.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

