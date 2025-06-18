import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const BookingScreen = () => {
  const { hostelId } = useLocalSearchParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    roomType: '',
    fullName: '',
    email: '',
    phone: '',
    studentId: '',
    university: '',
    specialRequests: ''
  });

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep === 1 && (!bookingData.checkIn || !bookingData.checkOut || !bookingData.roomType)) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    if (currentStep === 2 && (!bookingData.fullName || !bookingData.email || !bookingData.phone)) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    if (currentStep === 3) {
      handleBooking();
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep === 1) {
      router.back();
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleBooking = () => {
    // Here you would typically make an API call to create the booking
    Alert.alert(
      'Booking Confirmed',
      'Your booking has been successfully created!',
      [
        {
          text: 'View Bookings',
          onPress: () => router.push('/bookings')
        },
        {
          text: 'OK',
          onPress: () => router.push('/home')
        }
      ]
    );
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Select Dates & Room</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Check-in Date</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={bookingData.checkIn}
          onChangeText={(value) => handleInputChange('checkIn', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Check-out Date</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={bookingData.checkOut}
          onChangeText={(value) => handleInputChange('checkOut', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Room Type</Text>
        <View style={styles.roomTypeButtons}>
          <TouchableOpacity
            style={[
              styles.roomTypeButton,
              bookingData.roomType === 'Shared Dormitory' && styles.selectedRoomTypeButton
            ]}
            onPress={() => handleInputChange('roomType', 'Shared Dormitory')}
          >
            <Text style={[
              styles.roomTypeButtonText,
              bookingData.roomType === 'Shared Dormitory' && styles.selectedRoomTypeButtonText
            ]}>Shared Dormitory</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.roomTypeButton,
              bookingData.roomType === 'Private Room' && styles.selectedRoomTypeButton
            ]}
            onPress={() => handleInputChange('roomType', 'Private Room')}
          >
            <Text style={[
              styles.roomTypeButtonText,
              bookingData.roomType === 'Private Room' && styles.selectedRoomTypeButtonText
            ]}>Private Room</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Personal Information</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={bookingData.fullName}
          onChangeText={(value) => handleInputChange('fullName', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={bookingData.email}
          onChangeText={(value) => handleInputChange('email', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          value={bookingData.phone}
          onChangeText={(value) => handleInputChange('phone', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Student ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your student ID"
          value={bookingData.studentId}
          onChangeText={(value) => handleInputChange('studentId', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>University</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your university name"
          value={bookingData.university}
          onChangeText={(value) => handleInputChange('university', value)}
        />
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Review & Confirm</Text>
      
      <View style={styles.reviewCard}>
        <Text style={styles.reviewTitle}>Booking Summary</Text>
        
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Check-in:</Text>
          <Text style={styles.reviewValue}>{bookingData.checkIn}</Text>
        </View>
        
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Check-out:</Text>
          <Text style={styles.reviewValue}>{bookingData.checkOut}</Text>
        </View>
        
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Room Type:</Text>
          <Text style={styles.reviewValue}>{bookingData.roomType}</Text>
        </View>
        
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Name:</Text>
          <Text style={styles.reviewValue}>{bookingData.fullName}</Text>
        </View>
        
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Email:</Text>
          <Text style={styles.reviewValue}>{bookingData.email}</Text>
        </View>
        
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Phone:</Text>
          <Text style={styles.reviewValue}>{bookingData.phone}</Text>
        </View>
        
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Student ID:</Text>
          <Text style={styles.reviewValue}>{bookingData.studentId}</Text>
        </View>
        
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>University:</Text>
          <Text style={styles.reviewValue}>{bookingData.university}</Text>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Special Requests (Optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Any special requests or requirements?"
          multiline
          numberOfLines={4}
          value={bookingData.specialRequests}
          onChangeText={(value) => handleInputChange('specialRequests', value)}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking</Text>
        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>Step {currentStep} of 3</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === 3 ? 'Confirm Booking' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  stepIndicator: {
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  stepText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  stepContainer: {
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  roomTypeButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  roomTypeButton: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
    alignItems: 'center',
  },
  selectedRoomTypeButton: {
    backgroundColor: '#007AFF',
  },
  roomTypeButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedRoomTypeButtonText: {
    color: '#fff',
  },
  reviewCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  reviewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  reviewLabel: {
    fontSize: 14,
    color: '#666',
  },
  reviewValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BookingScreen; 