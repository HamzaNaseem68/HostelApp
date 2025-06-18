import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUser } from '../context/UserContext';
import { useTheme } from './context/ThemeContext';

// Placeholder data with student hostel focus
export const hostels = [
  { 
    id: '1', 
    name: 'Student Hub Downtown', 
    location: 'Downtown', 
    price: '$150/month', 
    rating: 4.5, 
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&auto=format&fit=crop&q=60',
    amenities: ['Study Room', 'High-Speed WiFi', 'Laundry'],
    type: 'Dormitory',
    availableRooms: 5
  },
  { 
    id: '2', 
    name: 'Campus View Residences', 
    location: 'University Area', 
    price: '$180/month', 
    rating: 4.0, 
    imageUrl: 'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=500&auto=format&fit=crop&q=60',
    amenities: ['Library Access', 'Cafeteria', '24/7 Security'],
    type: 'Private Room',
    availableRooms: 3
  },
  { 
    id: '3', 
    name: 'Scholar\'s Nest', 
    location: 'City Center', 
    price: '$120/month', 
    rating: 3.8, 
    imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&auto=format&fit=crop&q=60',
    amenities: ['Computer Lab', 'Quiet Zone', 'Bike Storage'],
    type: 'Dormitory',
    availableRooms: 8
  },
  { 
    id: '4', 
    name: 'Academic Heights', 
    location: 'Downtown', 
    price: '$200/month', 
    rating: 4.2, 
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&auto=format&fit=crop&q=60',
    amenities: ['Study Groups', 'Gym Access', 'Printing Facility'],
    type: 'Private Room',
    availableRooms: 2
  },
  { 
    id: '5', 
    name: 'Student Commons', 
    location: 'University Area', 
    price: '$160/month', 
    rating: 4.7, 
    imageUrl: 'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=500&auto=format&fit=crop&q=60',
    amenities: ['Group Study Rooms', 'Café', 'Sports Facilities'],
    type: 'Dormitory',
    availableRooms: 6
  },
  { 
    id: '6', 
    name: 'Learning Lodge', 
    location: 'City Center', 
    price: '$170/month', 
    rating: 4.0, 
    imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&auto=format&fit=crop&q=60',
    amenities: ['Tutoring Center', 'WiFi', 'Laundry'],
    type: 'Private Room',
    availableRooms: 4
  },
];

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

// Move FilterModal component outside HomeScreen
const FilterModal = ({ 
  showFilters, 
  setShowFilters, 
  selectedPriceRange, 
  setSelectedPriceRange, 
  selectedLocation, 
  setSelectedLocation, 
  selectedType, 
  setSelectedType, 
  handleSearch,
  priceRanges,
  locations,
  types,
}) => {
  const { colors } = useTheme();
  
  return (
    <Modal
      visible={showFilters}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowFilters(false)}
    >
      <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
        <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Filter Hostels</Text>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <View style={styles.filterSection}>
              <Text style={[styles.filterTitle, { color: colors.text }]}>Price Range</Text>
              {priceRanges.map((range, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.filterOption,
                    selectedPriceRange?.label === range.label && { backgroundColor: colors.primary + '20' }
                  ]}
                  onPress={() => setSelectedPriceRange(range)}
                >
                  <Text style={[styles.filterOptionText, { color: colors.text }]}>{range.label}</Text>
                  {selectedPriceRange?.label === range.label && (
                    <Ionicons name="checkmark" size={20} color={colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.filterSection}>
              <Text style={[styles.filterTitle, { color: colors.text }]}>Location</Text>
              {locations.map((location, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.filterOption,
                    selectedLocation === location && { backgroundColor: colors.primary + '20' }
                  ]}
                  onPress={() => setSelectedLocation(location)}
                >
                  <Text style={[styles.filterOptionText, { color: colors.text }]}>{location}</Text>
                  {selectedLocation === location && (
                    <Ionicons name="checkmark" size={20} color={colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.filterSection}>
              <Text style={[styles.filterTitle, { color: colors.text }]}>Room Type</Text>
              {types.map((type, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.filterOption,
                    selectedType === type && { backgroundColor: colors.primary + '20' }
                  ]}
                  onPress={() => setSelectedType(type)}
                >
                  <Text style={[styles.filterOptionText, { color: colors.text }]}>{type}</Text>
                  {selectedType === type && (
                    <Ionicons name="checkmark" size={20} color={colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={[styles.resetButton, { borderColor: colors.border }]}
              onPress={() => {
                setSelectedPriceRange(null);
                setSelectedLocation(null);
                setSelectedType(null);
              }}
            >
              <Text style={[styles.resetButtonText, { color: colors.text }]}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.applyButton, { backgroundColor: colors.primary }]}
              onPress={handleSearch}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const HomeScreen = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const { user } = useUser();

  const locations = ['Downtown', 'University Area', 'City Center'];
  const types = ['Dormitory', 'Private Room'];
  const priceRanges = [
    { label: 'Under $150', min: 0, max: 150 },
    { label: '$150 - $200', min: 150, max: 200 },
    { label: '$200 - $250', min: 200, max: 250 },
    { label: 'Over $250', min: 250, max: 1000 }
  ];

  // Only filter by location if needed, otherwise show all
  const filteredHostels = hostels.filter(hostel => {
    if (!selectedLocation) return true;
    return hostel.location && hostel.location.includes(selectedLocation);
  });

  const renderHostelCard = ({ item }) => (
    <TouchableOpacity 
      style={[styles.hostelCard, { backgroundColor: colors.surface }]}
      onPress={() => router.push(`/hostelDetail?id=${item.id}`)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.hostelImage} />
      <View style={styles.hostelInfo}>
        <Text style={[styles.hostelName, { color: colors.text }]}>{item.name}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={16} color={colors.textSecondary} />
          <Text style={[styles.hostelLocation, { color: colors.textSecondary }]}>{item.location}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color={colors.ratingStar || '#FFD700'} />
          <Text style={[styles.hostelRating, { color: colors.textSecondary }]}>{item.rating}</Text>
        </View>
        <View style={styles.typeContainer}>
          <Ionicons name="bed" size={16} color={colors.textSecondary} />
          <Text style={[styles.typeText, { color: colors.textSecondary }]}>{item.type}</Text>
        </View>
        <View style={styles.amenitiesContainer}>
          {item.amenities.slice(0, 2).map((amenity, index) => (
            <View key={index} style={[styles.amenityTag, { backgroundColor: colors.amenityBackground || '#f0f7ff' }]}> 
              <Text style={[styles.amenityText, { color: colors.amenityText || '#007AFF' }]}>{amenity}</Text>
            </View>
          ))}
        </View>
        <Text style={[styles.hostelPrice, { color: colors.primary }]}>{item.price}</Text>
        <Text style={[styles.availableRooms, { color: colors.textSecondary }]}>{item.availableRooms} rooms available</Text>
      </View>
    </TouchableOpacity>
  );

  const handleSearch = () => {
    setShowFilters(false);
    // You can add additional search logic here if needed
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      <View style={{ height: insets.top, backgroundColor: colors.surface }} />
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <View>
          <Text style={[styles.greetingText, { color: colors.text }]}>Hello, {(user.personalInfo && user.personalInfo.firstName) ? user.personalInfo.firstName : (user.name ? user.name.split(' ')[0] : 'Student')}!</Text>
          <Text style={[styles.subGreetingText, { color: colors.textSecondary }]}>Find your perfect student accommodation</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Image
            source={user.profileImage ? { uri: user.profileImage } : { uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60' }}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { 
            backgroundColor: colors.surface,
            color: colors.text,
          }]}
          placeholder="Search student hostels..."
          placeholderTextColor={colors.textSecondary}
        />
        <TouchableOpacity onPress={() => setShowFilters(true)}>
          <Ionicons name="options-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.actionCardsContainer}>
        <TouchableOpacity 
          style={[styles.actionCard, { backgroundColor: colors.surface }]} 
          onPress={() => router.push('/hostels')}
        >
          <View style={[styles.actionCardIconContainer, { backgroundColor: colors.primary + '20' }]}>
            <Ionicons name="bed" size={24} color={colors.primary} />
          </View>
          <Text style={[styles.actionCardText, { color: colors.text }]}>All Hostels</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionCard, { backgroundColor: colors.surface }]} 
          onPress={() => router.push('/map')}
        >
          <View style={[styles.actionCardIconContainer, { backgroundColor: colors.primary + '20' }]}>
            <Ionicons name="map" size={24} color={colors.primary} />
          </View>
          <Text style={[styles.actionCardText, { color: colors.text }]}>View Map</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionCard, { backgroundColor: colors.surface }]} 
          onPress={() => router.push('/bookings')}
        >
          <View style={[styles.actionCardIconContainer, { backgroundColor: colors.primary + '20' }]}>
            <Ionicons name="calendar" size={24} color={colors.primary} />
          </View>
          <Text style={[styles.actionCardText, { color: colors.text }]}>My Bookings</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Nearby Hostels</Text>
        </View>
        <FlatList
          data={filteredHostels.slice(0, 6)}
          renderItem={renderHostelCard}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalListContent}
          snapToInterval={CARD_WIDTH + 20}
          decelerationRate="fast"
        />
      </View>

      <FilterModal
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        selectedPriceRange={selectedPriceRange}
        setSelectedPriceRange={setSelectedPriceRange}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        handleSearch={handleSearch}
        priceRanges={priceRanges}
        locations={locations}
        types={types}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subGreetingText: {
    fontSize: 14,
    marginTop: 4,
  },
  profileIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchIcon: {
    position: 'absolute',
    left: 30,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    padding: 15,
    paddingLeft: 45,
    borderRadius: 12,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  actionCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  actionCard: {
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionCardIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionCardText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  horizontalListContent: {
    paddingHorizontal: 15,
  },
  hostelCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginRight: 15,
    width: CARD_WIDTH,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  hostelImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  hostelInfo: {
    padding: 15,
  },
  hostelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  hostelLocation: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  hostelRating: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  amenityTag: {
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  amenityText: {
    fontSize: 12,
    color: '#007AFF',
  },
  hostelPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  availableRooms: {
    fontSize: 14,
    color: '#666',
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
  },
  locationIcon: {
    marginRight: 4,
  },
  locationText: {
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalBody: {
    padding: 20,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 8,
  },
  filterOptionText: {
    fontSize: 16,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    gap: 10,
  },
  resetButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen; 