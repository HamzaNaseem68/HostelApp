import { useEffect, useState } from 'react';

// Dummy hostel data for fallback
const dummyHostels = [
  { name: 'Hostel Alpha', vicinity: 'Downtown Core' },
  { name: 'Beachside Backpackers', vicinity: 'Coastal Area' },
  { name: 'City Central Hub', vicinity: 'City Center' },
  { name: 'Urban Retreat Hostel', vicinity: 'Downtown Core' },
  { name: 'Sunset Point Hostel', vicinity: 'Coastal Area' },
  { name: 'Historic District Stay', vicinity: 'Old Town' },
  { name: 'Mountain View Hostel', vicinity: 'Hillside' },
];

export default function useNearbyHostels() {
  const [hostels, setHostels] = useState(dummyHostels);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // No-op, just use dummy data
  }, []);

  return { hostels, loading };
} 