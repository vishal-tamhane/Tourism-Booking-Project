import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { API_ENDPOINTS, apiCall, getActivityImage } from '../config/api';

function Home() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    // Filter activities whenever searchQuery or activities change
    if (searchQuery.trim() === '') {
      setFilteredActivities(activities);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = activities.filter(activity => 
        activity.name.toLowerCase().includes(query) ||
        activity.location.toLowerCase().includes(query) ||
        activity.description.toLowerCase().includes(query)
      );
      setFilteredActivities(filtered);
    }
  }, [searchQuery, activities]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await apiCall(API_ENDPOINTS.experiences);
      setActivities(response.data);
      setFilteredActivities(response.data); // Initialize filtered activities
      setError(null);
    } catch (err) {
      setError('Failed to load activities. Please try again later.');
      console.error('Error fetching activities:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header onSearch={handleSearch} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-black text-lg">Loading activities...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header onSearch={handleSearch} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center py-20">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button 
              onClick={fetchActivities}
              className="px-6 py-3 bg-primary hover:bg-primary-hover rounded font-semibold text-black transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onSearch={handleSearch} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Results Info */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-black text-lg">
              {filteredActivities.length > 0 
                ? `Found ${filteredActivities.length} result${filteredActivities.length !== 1 ? 's' : ''} for "${searchQuery}"`
                : `No results found for "${searchQuery}"`
              }
            </p>
          </div>
        )}

        {filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredActivities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <img src={getActivityImage(activity.id)} alt={activity.name} className="w-full h-full object-cover" />
                <span className="absolute top-2 right-2 bg-primary px-3 py-1 rounded text-xs font-semibold text-black">
                  New
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg lg:text-xl font-semibold mb-2 text-black">{activity.name}</h3>
                <p className="text-xs lg:text-sm text-black mb-3">{activity.location}</p>
                <p className="text-xs lg:text-sm text-black leading-relaxed mb-4 line-clamp-3">
                  {activity.description}
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4">
                  <div>
                    <div className="text-sm lg:text-base font-semibold text-black">From ₹{activity.price}</div>
                    <p className="text-xs text-gray-600">per person</p>
                  </div>
                  <button 
                    className="w-full sm:w-auto px-4 lg:px-6 py-2 bg-primary hover:bg-primary-hover rounded font-semibold text-xs lg:text-sm text-black transition-colors whitespace-nowrap"
                    onClick={() => navigate(`/select-date/${activity.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-black text-xl mb-4">No activities match your search for "{searchQuery}".</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="px-6 py-3 bg-primary hover:bg-primary-hover rounded font-semibold text-black transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

