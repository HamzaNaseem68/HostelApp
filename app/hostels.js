import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from './context/ThemeContext';

// More extensive dummy data for all hostels with real images
export const allHostels = [
  { 
    id: '1', 
    name: 'Hostel Alpha', 
    location: 'Downtown Core', 
    price: '$25/night', 
    rating: 4.5, 
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=60',
    description: 'Modern hostel in the heart of downtown with excellent amenities and friendly staff.',
    amenities: ['Free WiFi', '24/7 Reception', 'Common Kitchen', 'Laundry'],
    roomTypes: ['Dormitory', 'Private Room', 'Double Room'],
    rules: ['No smoking', 'Quiet hours 10PM-7AM', 'No pets allowed'],
    nearbyUniversities: ['City University', 'Downtown College']
  },
  { 
    id: '2', 
    name: 'Beachside Backpackers', 
    location: 'Coastal Area', 
    price: '$30/night', 
    rating: 4.0, 
    imageUrl: 'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=800&auto=format&fit=crop&q=60',
    description: 'Beautiful beachfront hostel with stunning ocean views and a relaxed atmosphere.',
    amenities: ['Beach Access', 'Outdoor Pool', 'BBQ Area', 'Free WiFi'],
    roomTypes: ['Dormitory', 'Private Room'],
    rules: ['No smoking indoors', 'Beach equipment available', 'Lockers provided'],
    nearbyUniversities: ['Coastal University', 'Marine Institute']
  },
  { 
    id: '3', 
    name: 'City Central Hub', 
    location: 'City Center', 
    price: '$20/night', 
    rating: 3.8, 
    imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop&q=60',
    description: 'Budget-friendly hostel in the city center, perfect for students and backpackers.',
    amenities: ['Study Room', 'Free WiFi', 'Bike Rental', 'Tour Desk'],
    roomTypes: ['Dormitory', 'Private Room'],
    rules: ['No smoking', 'ID required', 'Curfew at 2AM'],
    nearbyUniversities: ['Central University', 'City College']
  },
  { 
    id: '4', 
    name: 'Urban Retreat Hostel', 
    location: 'Downtown Core', 
    price: '$28/night', 
    rating: 4.2, 
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=60',
    description: 'Contemporary hostel with modern design and excellent facilities.',
    amenities: ['Gym Access', 'Rooftop Terrace', 'Free WiFi', 'Café'],
    roomTypes: ['Dormitory', 'Private Room', 'Family Room'],
    rules: ['No smoking', 'No pets', 'Quiet hours 11PM-7AM'],
    nearbyUniversities: ['Urban University', 'Downtown Institute']
  },
  { 
    id: '5', 
    name: 'Sunset Point Hostel', 
    location: 'Coastal Area', 
    price: '$35/night', 
    rating: 4.7, 
    imageUrl: 'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=800&auto=format&fit=crop&q=60',
    description: 'Luxury hostel with panoramic views and premium amenities.',
    amenities: ['Infinity Pool', 'Spa Access', 'Restaurant', 'Free WiFi'],
    roomTypes: ['Private Room', 'Suite', 'Dormitory'],
    rules: ['No smoking', 'Dress code in restaurant', 'Pool hours 7AM-10PM'],
    nearbyUniversities: ['Sunset University', 'Coastal College']
  },
  { 
    id: '6', 
    name: 'Historic District Stay', 
    location: 'Old Town', 
    price: '$22/night', 
    rating: 4.1, 
    imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop&q=60',
    description: 'Charming hostel in a historic building with traditional architecture.',
    amenities: ['Library', 'Garden', 'Free WiFi', 'Tour Guide'],
    roomTypes: ['Dormitory', 'Private Room'],
    rules: ['No smoking', 'Heritage building rules apply', 'No food in rooms'],
    nearbyUniversities: ['Historic University', 'Old Town College']
  },
  { 
    id: '7', 
    name: 'Mountain View Hostel', 
    location: 'Hillside', 
    price: '$40/night', 
    rating: 4.9, 
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=60',
    description: 'Scenic hostel with breathtaking mountain views and outdoor activities.',
    amenities: ['Hiking Trails', 'Hot Tub', 'Free WiFi', 'Restaurant'],
    roomTypes: ['Private Room', 'Dormitory', 'Cabin'],
    rules: ['No smoking', 'Hiking gear available', 'Check weather conditions'],
    nearbyUniversities: ['Mountain University', 'Hillside College']
  },
];

const AllHostelsScreen = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const renderHostelItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.hostelItem, { backgroundColor: colors.surface }]} 
      onPress={() => router.push(`/hostelDetail?id=${item.id}`)}
    >
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.hostelImage}
        onError={(e) => console.error('Image failed to load:', e.nativeEvent.error)}
      />
      <View style={styles.hostelInfo}>
        <Text style={[styles.hostelName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.hostelLocation, { color: colors.textSecondary }]}>{item.location}</Text>
        <Text style={[styles.hostelRating, { color: colors.primary }]}>Rating: {item.rating} ★</Text>
      </View>
      <Text style={[styles.hostelPrice, { backgroundColor: colors.primary }]}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={[styles.header, { 
        backgroundColor: colors.surface,
        paddingTop: insets.top + 10,
        borderBottomColor: colors.border
      }]}> 
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backArrow, { color: colors.text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>All Hostels</Text>
        <View style={{ width: 30 }} />
      </View>
      <FlatList
        data={allHostels}
        renderItem={renderHostelItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  backArrow: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  hostelItem: {
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  hostelImage: {
    width: '100%',
    height: 200,
  },
  hostelInfo: {
    padding: 15,
  },
  hostelName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  hostelLocation: {
    fontSize: 14,
    marginBottom: 5,
  },
  hostelRating: {
    fontSize: 14,
  },
  hostelPrice: {
    position: 'absolute',
    top: 15,
    right: 15,
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AllHostelsScreen; 