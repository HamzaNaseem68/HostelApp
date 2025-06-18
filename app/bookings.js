import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from './context/ThemeContext';

// Sample booking data
const initialBookings = [
  {
    id: '1',
    hostelName: 'Student Hub Downtown',
    roomType: 'Shared Dormitory',
    checkIn: '2024-03-01',
    checkOut: '2024-06-30',
    status: 'active',
    price: '$150/month',
    bookingDate: '2024-02-15'
  },
  {
    id: '2',
    hostelName: 'Campus View Residences',
    roomType: 'Private Room',
    checkIn: '2024-02-01',
    checkOut: '2024-05-31',
    status: 'upcoming',
    price: '$250/month',
    bookingDate: '2024-01-20'
  },
  {
    id: '3',
    hostelName: 'Scholar\'s Nest',
    roomType: 'Shared Dormitory',
    checkIn: '2023-09-01',
    checkOut: '2023-12-31',
    status: 'completed',
    price: '$120/month',
    bookingDate: '2023-08-15'
  }
];

const BookingsScreen = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('active');
  const [bookings, setBookings] = useState(initialBookings); // Use state for bookings

  const filteredBookings = bookings.filter(booking => booking.status === activeTab);

  const handleCancelBooking = (bookingId) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        { 
          text: 'Yes', 
          onPress: () => {
            setBookings(prevBookings => 
              prevBookings.map(booking =>
                booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
              )
            );
            Alert.alert('Success', 'Booking cancelled successfully');
          }
        }
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return colors.success; // Using theme color
      case 'upcoming':
        return colors.primary; // Using theme color
      case 'completed':
        return colors.textSecondary; // Using theme color
      case 'cancelled':
        return colors.error; // Using theme color
      default:
        return colors.textSecondary; // Using theme color
    }
  };

  const renderBookingCard = ({ item }) => (
    <View style={[styles.bookingCard, { backgroundColor: colors.surface }]}>
      <View style={styles.bookingHeader}>
        <Text style={[styles.hostelName, { color: colors.text }]}>{item.hostelName}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
        </View>
      </View>

      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="bed" size={16} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>
            {item.roomType}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={16} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>
            {item.checkIn} - {item.checkOut}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="cash" size={16} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>{item.price}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time" size={16} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>Booked on {item.bookingDate}</Text>
        </View>
      </View>

      <View style={styles.bookingActions}>
        {item.status === 'active' && (
          <TouchableOpacity 
            style={[styles.cancelButton, { backgroundColor: colors.error }]}
            onPress={() => handleCancelBooking(item.id)}
          >
            <Text style={styles.cancelButtonText}>Cancel Booking</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity 
          style={[styles.detailsButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push(`/bookingDetail?id=${item.id}`)}
        >
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={{ height: insets.top, backgroundColor: colors.surface }} />
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>My Bookings</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={[styles.tabs, { borderBottomColor: colors.border }]}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'active' && styles.activeTab, {
            backgroundColor: activeTab === 'active' ? colors.primary : colors.surface,
          }]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText, {
            color: activeTab === 'active' ? colors.buttonText : colors.textSecondary,
          }]}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab, {
            backgroundColor: activeTab === 'upcoming' ? colors.primary : colors.surface,
          }]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText, {
            color: activeTab === 'upcoming' ? colors.buttonText : colors.textSecondary,
          }]}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'completed' && styles.activeTab, {
            backgroundColor: activeTab === 'completed' ? colors.primary : colors.surface,
          }]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText, {
            color: activeTab === 'completed' ? colors.buttonText : colors.textSecondary,
          }]}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'cancelled' && styles.activeTab, {
            backgroundColor: activeTab === 'cancelled' ? colors.primary : colors.surface,
          }]}
          onPress={() => setActiveTab('cancelled')}
        >
          <Text style={[styles.tabText, activeTab === 'cancelled' && styles.activeTabText, {
            color: activeTab === 'cancelled' ? colors.buttonText : colors.textSecondary,
          }]}>Cancelled</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredBookings}
        renderItem={renderBookingCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
    padding: 20,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    justifyContent: 'space-around',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  activeTab: {
    // backgroundColor is handled inline
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    // color is handled inline
  },
  listContent: {
    padding: 20,
  },
  bookingCard: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  hostelName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  bookingDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    gap: 5,
  },
  detailText: {
    fontSize: 14,
  },
  bookingActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  detailsButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default BookingsScreen; 