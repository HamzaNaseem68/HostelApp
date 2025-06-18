import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

const NotificationsScreen = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState({
    bookingUpdates: true,
    paymentReminders: true,
    promotionalOffers: false,
    securityAlerts: true,
    newMessages: true,
    systemUpdates: true
  });

  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const renderNotificationItem = (icon, title, description, key) => (
    <View style={styles.notificationItem}>
      <View style={styles.notificationIcon}>
        <Ionicons name={icon} size={24} color="#007AFF" />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{title}</Text>
        <Text style={styles.notificationDescription}>{description}</Text>
      </View>
      <Switch
        value={notifications[key]}
        onValueChange={() => toggleNotification(key)}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={notifications[key] ? '#007AFF' : '#f4f3f4'}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Booking Notifications</Text>
        {renderNotificationItem(
          'calendar-outline',
          'Booking Updates',
          'Get notified about booking confirmations and changes',
          'bookingUpdates'
        )}
        {renderNotificationItem(
          'cash-outline',
          'Payment Reminders',
          'Receive reminders for upcoming payments',
          'paymentReminders'
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Communication</Text>
        {renderNotificationItem(
          'chatbubble-outline',
          'New Messages',
          'Get notified when you receive new messages',
          'newMessages'
        )}
        {renderNotificationItem(
          'megaphone-outline',
          'Promotional Offers',
          'Receive updates about special offers and discounts',
          'promotionalOffers'
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System</Text>
        {renderNotificationItem(
          'shield-checkmark-outline',
          'Security Alerts',
          'Get notified about important security updates',
          'securityAlerts'
        )}
        {renderNotificationItem(
          'refresh-outline',
          'System Updates',
          'Receive notifications about app updates',
          'systemUpdates'
        )}
      </View>
    </ScrollView>
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
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginVertical: 15,
    paddingHorizontal: 5,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default NotificationsScreen; 