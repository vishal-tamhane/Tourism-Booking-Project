export const activities = [
  {
    id: 1,
    name: 'Kayaking',
    location: 'Pawna Lake, Lonavala',
    description: 'Experience the thrill of kayaking in the serene waters of Pawna Lake. Perfect for beginners and experienced paddlers alike.',
    price: 1999,
    image: 'https://via.placeholder.com/800x600/4A90E2/FFFFFF?text=Kayaking',
    breakdown: [
      { label: 'Kayak Rental', amount: 1200 },
      { label: 'Safety Equipment', amount: 300 },
      { label: 'Instructor Fee', amount: 499 }
    ]
  },
  {
    id: 2,
    name: 'Paragliding',
    location: 'Kamshet, Pune',
    description: 'Soar through the skies and experience breathtaking aerial views of the Western Ghats. Professional pilots ensure a safe and memorable flight.',
    price: 3500,
    image: 'https://via.placeholder.com/800x600/E74C3C/FFFFFF?text=Paragliding',
    breakdown: [
      { label: 'Flight Fee', amount: 2800 },
      { label: 'Safety Gear', amount: 400 },
      { label: 'Video Recording', amount: 300 }
    ]
  },
  {
    id: 3,
    name: 'Trekking',
    location: 'Rajmachi Fort, Lonavala',
    description: 'Embark on an adventurous trek to the historic Rajmachi Fort. Witness stunning sunrise views and explore ancient ruins.',
    price: 1499,
    image: 'https://via.placeholder.com/800x600/27AE60/FFFFFF?text=Trekking',
    breakdown: [
      { label: 'Guide Fee', amount: 800 },
      { label: 'Entry Ticket', amount: 200 },
      { label: 'Equipment', amount: 499 }
    ]
  },
  {
    id: 4,
    name: 'Camping',
    location: 'Mulshi, Pune',
    description: 'Escape to nature with overnight camping under the stars. Includes bonfire, BBQ, and comfortable tents with scenic views.',
    price: 2499,
    image: 'https://via.placeholder.com/800x600/F39C12/FFFFFF?text=Camping',
    breakdown: [
      { label: 'Tent & Bedding', amount: 1200 },
      { label: 'Meals (Dinner & Breakfast)', amount: 800 },
      { label: 'Bonfire & Activities', amount: 499 }
    ]
  },
  {
    id: 5,
    name: 'Waterfall Rappelling',
    location: 'Bhivpuri, Karjat',
    description: 'Descend through cascading waterfalls in this ultimate adrenaline adventure. Expert supervision and premium safety gear provided.',
    price: 2799,
    image: 'https://via.placeholder.com/800x600/9B59B6/FFFFFF?text=Waterfall+Rappelling',
    breakdown: [
      { label: 'Rappelling Equipment', amount: 1500 },
      { label: 'Expert Supervision', amount: 900 },
      { label: 'Safety Certification', amount: 399 }
    ]
  },
  {
    id: 6,
    name: 'Rock Climbing',
    location: 'Sandhan Valley, Ahmednagar',
    description: 'Challenge yourself with rock climbing on natural rock formations. Suitable for all skill levels with professional instructors.',
    price: 1899,
    image: 'https://via.placeholder.com/800x600/34495E/FFFFFF?text=Rock+Climbing',
    breakdown: [
      { label: 'Climbing Gear', amount: 1000 },
      { label: 'Instructor Fee', amount: 600 },
      { label: 'Safety Equipment', amount: 299 }
    ]
  },
  {
    id: 7,
    name: 'Hot Air Balloon',
    location: 'Lonavala',
    description: 'Float peacefully above the Western Ghats in a hot air balloon. Enjoy panoramic views and a champagne celebration after landing.',
    price: 8999,
    image: 'https://via.placeholder.com/800x600/E67E22/FFFFFF?text=Hot+Air+Balloon',
    breakdown: [
      { label: 'Balloon Flight', amount: 7500 },
      { label: 'Pilot & Crew', amount: 1000 },
      { label: 'Champagne Celebration', amount: 499 }
    ]
  },
  {
    id: 8,
    name: 'Zip Lining',
    location: 'Della Adventure Park, Lonavala',
    description: 'Experience the rush of flying through the air on India\'s longest zip line. Safety-certified equipment and professional guidance.',
    price: 1299,
    image: 'https://via.placeholder.com/800x600/16A085/FFFFFF?text=Zip+Lining',
    breakdown: [
      { label: 'Zip Line Access', amount: 800 },
      { label: 'Safety Harness', amount: 300 },
      { label: 'Instructor', amount: 199 }
    ]
  }
];

export const getActivityById = (id) => {
  return activities.find(activity => activity.id === parseInt(id));
};
