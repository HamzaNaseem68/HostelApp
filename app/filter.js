import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FilterScreen = () => {
  const router = useRouter();
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState(null);

  const priceRanges = [
    'Under $50',
    '$50 - $100',
    '$100 - $150',
    'Over $150',
  ];

  const roomTypes = [
    'Shared Dormitory',
    'Private Room',
  ];

  const handlePriceSelect = (price) => {
    setSelectedPrice(selectedPrice === price ? null : price);
  };

  const handleRoomTypeSelect = (type) => {
    setSelectedRoomType(selectedRoomType === type ? null : type);
  };

  const applyFilters = () => {
    // In a real app, you would pass selected filters back or apply them globally
    console.log('Applying Filters:', { selectedPrice, selectedRoomType });
    router.back();
  };

  const resetFilters = () => {
    setSelectedPrice(null);
    setSelectedRoomType(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        <TouchableOpacity onPress={resetFilters}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Range</Text>
          <View style={styles.optionsContainer}>
            {priceRanges.map((price) => (
              <TouchableOpacity
                key={price}
                style={[
                  styles.optionButton,
                  selectedPrice === price && styles.selectedOption,
                ]}
                onPress={() => handlePriceSelect(price)}
              >
                <Text style={[
                  styles.optionText,
                  selectedPrice === price && styles.selectedOptionText,
                ]}>{price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Room Type</Text>
          <View style={styles.optionsContainer}>
            {roomTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.optionButton,
                  selectedRoomType === type && styles.selectedOption,
                ]}
                onPress={() => handleRoomTypeSelect(type)}
              >
                <Text style={[
                  styles.optionText,
                  selectedRoomType === type && styles.selectedOptionText,
                ]}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Add other filter sections here as needed */}

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  resetText: {
    color: '#007AFF',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedOption: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  selectedOptionText: {
    color: '#fff',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  applyButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FilterScreen; 