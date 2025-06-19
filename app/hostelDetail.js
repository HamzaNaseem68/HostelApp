import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from './context/ThemeContext';
import { allHostels } from './hostels';

const { width } = Dimensions.get('window');

const HostelDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const hostel = allHostels.find(h => String(h.id) === String(id));

  if (!hostel) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }] }>
        <Text style={[styles.errorText, { color: colors.error }]}>Hostel not found!</Text>
      </View>
    );
  }

  const renderAmenity = (amenity) => (
    <View key={amenity} style={styles.amenityItem}>
      <Ionicons name="checkmark-circle" size={20} color={colors.success || '#28a745'} />
      <Text style={[styles.amenityText, { color: colors.text }]}>{amenity}</Text>
    </View>
  );

  const renderRule = (rule) => (
    <View key={rule} style={styles.ruleItem}>
      <Ionicons name="information-circle" size={20} color={colors.primary} />
      <Text style={[styles.ruleText, { color: colors.text }]}>{rule}</Text>
    </View>
  );

  const renderUniversity = (university) => (
    <View key={university} style={styles.universityItem}>
      <Ionicons name="school" size={20} color={colors.textSecondary} />
      <Text style={[styles.universityText, { color: colors.textSecondary }]}>{university}</Text>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      <View style={{ height: insets.top, backgroundColor: 'transparent' }} />
      <View style={[styles.header, { backgroundColor: 'transparent' }] }>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.surface }]} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.shareButton, { backgroundColor: colors.surface }] }>
          <Ionicons name="share-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <Image 
        source={{ uri: hostel.imageUrl }}
        style={styles.hostelImage}
        onError={(e) => console.error('Image failed to load:', e.nativeEvent.error)}
      />
      
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={[styles.hostelName, { color: colors.text }]}>{hostel.name}</Text>
          <View style={[styles.ratingContainer, { backgroundColor: colors.surface }] }>
            <Ionicons name="star" size={20} color={colors.ratingStar || '#FFD700'} />
            <Text style={[styles.ratingText, { color: colors.textSecondary }]}>{hostel.rating}</Text>
          </View>
        </View>

        <View style={styles.locationContainer}>
          <Ionicons name="location" size={20} color={colors.textSecondary} />
          <Text style={[styles.locationText, { color: colors.textSecondary }]}>{hostel.location}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>{hostel.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Room Types</Text>
          {hostel.roomTypes.map((type, index) => (
            <View key={index} style={styles.roomTypeItem}>
              <Ionicons name="bed" size={20} color={colors.primary} />
              <Text style={[styles.roomTypeText, { color: colors.textSecondary }]}>{type}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Amenities</Text>
          {hostel.amenities.map(renderAmenity)}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>House Rules</Text>
          {hostel.rules.map(renderRule)}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Nearby Universities</Text>
          {hostel.nearbyUniversities.map(renderUniversity)}
        </View>
      </View>

      <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border }] }>
        <TouchableOpacity
          style={[styles.bookButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push(`/booking?hostelId=${hostel.id}`)}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerChatButton, { backgroundColor: colors.success || '#28a745' }]}
          onPress={() => router.push('/chatPreview')}
        >
          <Text style={styles.chatButtonText}>Chat</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationText: {
    marginLeft: 5,
    fontSize: 16,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
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
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  amenityText: {
    marginLeft: 10,
    fontSize: 16,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ruleText: {
    marginLeft: 10,
    fontSize: 16,
  },
  universityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  universityText: {
    marginLeft: 10,
    fontSize: 16,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
  },
  bookButton: {
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
    textAlign: 'center',
    marginTop: 50,
  },
  footerChatButton: {
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginTop: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HostelDetailScreen; 