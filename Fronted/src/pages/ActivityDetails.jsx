import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';

function ActivityDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-2xl font-bold mb-4 text-black">Activity Details for ID: {id}</h2>
        <button 
          onClick={() => navigate(`/select-date/${id}`)}
          className="px-6 py-3 bg-primary hover:bg-primary-hover rounded font-semibold text-black transition-colors"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default ActivityDetails;

