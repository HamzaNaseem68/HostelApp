import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { allHostels } from './hostels'; // Import allHostels

const { width } = Dimensions.get('window');

const HostelDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  // Use allHostels data instead of sampleHostels
  const hostel = allHostels.find(h => h.id === id);

  if (!hostel) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Hostel not found!</Text>
      </View>
    );
  }

  const renderAmenity = (amenity) => (
    <View key={amenity} style={styles.amenityItem}>
      <Ionicons name="checkmark-circle" size={20} color="#28a745" />
      <Text style={styles.amenityText}>{amenity}</Text>
    </View>
  );

  const renderRule = (rule) => (
    <View key={rule} style={styles.ruleItem}>
      <Ionicons name="information-circle" size={20} color="#007AFF" />
      <Text style={styles.ruleText}>{rule}</Text>
    </View>
  );

  const renderUniversity = (university) => (
    <View key={university} style={styles.universityItem}>
      <Ionicons name="school" size={20} color="#6c757d" />
      <Text style={styles.universityText}>{university}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <Image 
        source={{ uri: hostel.imageUrl }}
        style={styles.hostelImage}
        onError={(e) => console.error('Image failed to load:', e.nativeEvent.error)}
      />
      
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.hostelName}>{hostel.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={styles.ratingText}>{hostel.rating}</Text>
          </View>
        </View>

        <View style={styles.locationContainer}>
          <Ionicons name="location" size={20} color="#666" />
          <Text style={styles.locationText}>{hostel.location}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{hostel.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Room Types</Text>
          {hostel.roomTypes.map((type, index) => (
            <View key={index} style={styles.roomTypeItem}>
              <Ionicons name="bed" size={20} color="#007AFF" />
              <Text style={styles.roomTypeText}>{type}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          {hostel.amenities.map(renderAmenity)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>House Rules</Text>
          {hostel.rules.map(renderRule)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Universities</Text>
          {hostel.nearbyUniversities.map(renderUniversity)}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => router.push(`/booking?hostelId=${hostel.id}`)}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hostelImage: {
    width: width,
    height: 300,
  },
  content: {
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  hostelName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  roomTypeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  roomTypeText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  amenityText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ruleText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  universityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  universityText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  bookButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default HostelDetailScreen; 