export const activities = [
  {
    id: 1,
    name: 'Kayaking',
    location: 'Uttar Karnataka',
    description: 'Experience the serene beauty of kayaking through calm waters. Our expert guides will take you on an unforgettable journey surrounded by lush greenery and wildlife.',
    price: 999,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
    breakdown: [
      { label: 'Entrance Fee', amount: 150 },
      { label: 'Guide', amount: 300 },
      { label: 'Equipment', amount: 400 },
      { label: 'Total', amount: 850 }
    ]
  },
  {
    id: 2,
    name: 'Nandi Hills Sunrise',
    location: 'Bangalore',
    description: 'Experience breathtaking sunrise views from Nandi Hills. Perfect for nature lovers and photography enthusiasts. Witness the golden hour magic.',
    price: 699,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    breakdown: [
      { label: 'Transportation', amount: 300 },
      { label: 'Guide', amount: 200 },
      { label: 'Breakfast', amount: 150 },
      { label: 'Total', amount: 650 }
    ]
  },
  {
    id: 3,
    name: 'Coffee Trail',
    location: 'Coorg',
    description: 'Explore lush coffee plantations in Coorg. Learn about coffee cultivation and enjoy fresh brews. Walk through aromatic estates.',
    price: 799,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    breakdown: [
      { label: 'Plantation Tour', amount: 400 },
      { label: 'Coffee Tasting', amount: 200 },
      { label: 'Lunch', amount: 150 },
      { label: 'Total', amount: 750 }
    ]
  },
  {
    id: 4,
    name: 'River Rafting',
    location: 'Dandeli',
    description: 'Join us for thrilling white water rafting adventures. Safety first with professional guides and quality equipment included.',
    price: 999,
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&h=300&fit=crop',
    breakdown: [
      { label: 'Equipment Rental', amount: 400 },
      { label: 'Professional Guide', amount: 350 },
      { label: 'Safety Gear', amount: 200 },
      { label: 'Total', amount: 950 }
    ]
  },
  {
    id: 5,
    name: 'Sunrise Trek',
    location: 'Nandi Hills',
    description: 'Catch the golden hour at Nandi Hills. Trek early morning and witness spectacular views from the top. Perfect for fitness enthusiasts.',
    price: 899,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    breakdown: [
      { label: 'Trek Guide', amount: 400 },
      { label: 'Entry Fee', amount: 200 },
      { label: 'Refreshments', amount: 250 },
      { label: 'Total', amount: 850 }
    ]
  },
  {
    id: 6,
    name: 'Boat Cruise',
    location: 'Goa',
    description: 'Cruise along pristine waters of Goa. Enjoy sunset views and coastal beauty. Perfect for families and couples.',
    price: 999,
    image: 'https://images.unsplash.com/photo-1544551763-92ed1c6c2c82?w=400&h=300&fit=crop',
    breakdown: [
      { label: 'Boat Rental', amount: 500 },
      { label: 'Captain Fee', amount: 300 },
      { label: 'Snacks', amount: 150 },
      { label: 'Total', amount: 950 }
    ]
  },
  {
    id: 7,
    name: 'Bungee Jumping',
    location: 'Rishikesh',
    description: 'Experience the ultimate adrenaline rush. Jump from heights with complete safety gear and professional supervision.',
    price: 999,
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300&fit=crop',
    breakdown: [
      { label: 'Jump Fee', amount: 600 },
      { label: 'Safety Equipment', amount: 250 },
      { label: 'Video Recording', amount: 100 },
      { label: 'Total', amount: 950 }
    ]
  },
  {
    id: 8,
    name: 'Coffee Estate Tour',
    location: 'Chikmagalur',
    description: 'Walk through aromatic coffee estates. Taste fresh coffee and learn about processing. Enjoy the peaceful hill station atmosphere.',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop',
    breakdown: [
      { label: 'Estate Tour', amount: 600 },
      { label: 'Coffee Tasting', amount: 300 },
      { label: 'Lunch & Snacks', amount: 350 },
      { label: 'Total', amount: 1250 }
    ]
  }
];

export const getActivityById = (id) => {
  return activities.find(activity => activity.id === parseInt(id));
};
