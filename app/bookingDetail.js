import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Sample booking data (in a real app, this would come from an API)
const sampleBookings = {
  '1': {
    id: '1',
    hostelName: 'Student Hub Downtown',
    roomType: 'Shared Dormitory',
    checkIn: '2024-03-01',
    checkOut: '2024-06-30',
    status: 'active',
    price: '$150/month',
    bookingDate: '2024-02-15',
    totalAmount: '$600',
    paymentStatus: 'Paid',
    roomNumber: 'D-304',
    floor: '3rd Floor',
    building: 'Block D',
    contactPerson: 'John Smith',
    contactPhone: '+1 234 567 8900',
    specialRequests: 'Near window, quiet area preferred',
    amenities: [
      'High-Speed WiFi',
      'Study Room',
      'Laundry',
      '24/7 Security',
      'Common Kitchen'
    ],
    rules: [
      'No smoking in rooms',
      'Quiet hours: 10 PM - 7 AM',
      'No overnight guests',
      'Keep common areas clean'
    ]
  }
};

const BookingDetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const booking = sampleBookings[id];

  if (!booking) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Booking Details</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Booking not found</Text>
        </View>
      </View>
    );
  }

  const handleCancelBooking = () => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        {
          text: 'No',
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: () => {
            // Here you would typically make an API call to cancel the booking
            Alert.alert('Success', 'Booking cancelled successfully');
            router.back();
          }
        }
      ]
    );
  };

  const renderSection = (title, content) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {content}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: '#28a745' }]}>
            <Text style={styles.statusText}>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</Text>
          </View>
        </View>

        {renderSection('Hostel Information', (
          <View style={styles.infoCard}>
            <Text style={styles.hostelName}>{booking.hostelName}</Text>
            <View style={styles.infoRow}>
              <Ionicons name="bed" size={16} color="#666" />
              <Text style={styles.infoText}>{booking.roomType}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="location" size={16} color="#666" />
              <Text style={styles.infoText}>{booking.building}, {booking.floor}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="key" size={16} color="#666" />
              <Text style={styles.infoText}>Room {booking.roomNumber}</Text>
            </View>
          </View>
        ))}

        {renderSection('Booking Details', (
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="calendar" size={16} color="#666" />
              <Text style={styles.infoText}>Check-in: {booking.checkIn}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="calendar" size={16} color="#666" />
              <Text style={styles.infoText}>Check-out: {booking.checkOut}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="cash" size={16} color="#666" />
              <Text style={styles.infoText}>Price: {booking.price}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="wallet" size={16} color="#666" />
              <Text style={styles.infoText}>Total Amount: {booking.totalAmount}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="checkmark-circle" size={16} color="#666" />
              <Text style={styles.infoText}>Payment Status: {booking.paymentStatus}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="time" size={16} color="#666" />
              <Text style={styles.infoText}>Booked on: {booking.bookingDate}</Text>
            </View>
          </View>
        ))}

        {renderSection('Contact Information', (
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="person" size={16} color="#666" />
              <Text style={styles.infoText}>{booking.contactPerson}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="call" size={16} color="#666" />
              <Text style={styles.infoText}>{booking.contactPhone}</Text>
            </View>
          </View>
        ))}

        {booking.specialRequests && renderSection('Special Requests', (
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>{booking.specialRequests}</Text>
          </View>
        ))}

        {renderSection('Amenities', (
          <View style={styles.infoCard}>
            {booking.amenities.map((amenity, index) => (
              <View key={index} style={styles.infoRow}>
                <Ionicons name="checkmark-circle" size={16} color="#28a745" />
                <Text style={styles.infoText}>{amenity}</Text>
              </View>
            ))}
          </View>
        ))}

        {renderSection('House Rules', (
          <View style={styles.infoCard}>
            {booking.rules.map((rule, index) => (
              <View key={index} style={styles.infoRow}>
                <Ionicons name="information-circle" size={16} color="#666" />
                <Text style={styles.infoText}>{rule}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      {booking.status === 'active' && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancelBooking}>
            <Text style={styles.cancelButtonText}>Cancel Booking</Text>
          </TouchableOpacity>
        </View>
      )}
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
    justifyContent: 'space-between',
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
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
  },
  statusContainer: {
    padding: 20,
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
  },
  hostelName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  cancelButton: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dc3545',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#dc3545',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BookingDetailScreen; 