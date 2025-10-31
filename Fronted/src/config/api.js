// API Configuration
// Use environment variable for production, fallback to localhost for development
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// API endpoints
export const API_ENDPOINTS = {
  experiences: `${API_BASE_URL}/experiences`,
  experienceById: (id) => `${API_BASE_URL}/experiences/${id}`,
  availability: (id) => `${API_BASE_URL}/experiences/${id}/availability`,
  bookings: `${API_BASE_URL}/bookings`,
  validatePromo: `${API_BASE_URL}/promo/validate`,
  health: `${API_BASE_URL}/health`,
  dbStatus: `${API_BASE_URL}/db-status`
};

// Local image mapping (copyright-free images from Pexels)
// These images override backend images to avoid proxy/copyright issues
export const ACTIVITY_IMAGES = {
  1: 'https://images.pexels.com/photos/416676/pexels-photo-416676.jpeg?auto=compress&cs=tinysrgb&w=800', // Kayaking
  2: 'https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=800', // Paragliding
  3: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800', // Trekking
  4: 'https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&w=800', // Camping
  5: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800', // Waterfall Rappelling
  6: 'https://images.pexels.com/photos/2259232/pexels-photo-2259232.jpeg?auto=compress&cs=tinysrgb&w=800', // Rock Climbing
  7: 'https://images.pexels.com/photos/1557652/pexels-photo-1557652.jpeg?auto=compress&cs=tinysrgb&w=800', // Hot Air Balloon
  8: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=800'  // Zip Lining
};

// Helper to get activity image (uses local mapping instead of backend image)
export function getActivityImage(activityId) {
  return ACTIVITY_IMAGES[activityId] || ACTIVITY_IMAGES[1]; // Default to kayaking if not found
}

// Helper function to handle API calls
export async function apiCall(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
