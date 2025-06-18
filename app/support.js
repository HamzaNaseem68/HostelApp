import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SupportScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      question: 'How do I make a booking?',
      answer: 'To make a booking, go to the home screen and select your desired hostel. Choose your dates, room type, and follow the booking process. You can pay using any of your saved payment methods.'
    },
    {
      question: 'How can I cancel my booking?',
      answer: 'You can cancel your booking by going to the "My Bookings" section, selecting the booking you want to cancel, and clicking the "Cancel Booking" button. Please note that cancellation policies may vary depending on the hostel.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, and digital payment methods like PayPal and Apple Pay.'
    },
    {
      question: 'How do I change my account settings?',
      answer: 'You can change your account settings by going to the Profile section and selecting the setting you want to modify. This includes personal information, payment methods, and notification preferences.'
    }
  ];

  const handleContactSupport = () => {
    Alert.alert(
      'Contact Support',
      'Our support team will get back to you within 24 hours.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Send',
          onPress: () => {
            Alert.alert('Message Sent', 'Thank you for contacting us. We will respond shortly.');
          }
        }
      ]
    );
  };

  const renderFaqItem = (faq, index) => (
    <TouchableOpacity
      key={index}
      style={styles.faqItem}
      onPress={() => setExpandedFaq(expandedFaq === index ? null : index)}
    >
      <View style={styles.faqHeader}>
        <Text style={styles.faqQuestion}>{faq.question}</Text>
        <Ionicons
          name={expandedFaq === index ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="#666"
        />
      </View>
      {expandedFaq === index && (
        <Text style={styles.faqAnswer}>{faq.answer}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Help & Support</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for help"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {faqs.map(renderFaqItem)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Support</Text>
        <TouchableOpacity style={styles.contactItem} onPress={handleContactSupport}>
          <Ionicons name="mail-outline" size={24} color="#007AFF" />
          <Text style={styles.contactText}>Email Support</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactItem}>
          <Ionicons name="call-outline" size={24} color="#007AFF" />
          <Text style={styles.contactText}>Call Support</Text>
          <Text style={styles.contactDetail}>+1 (555) 123-4567</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactItem}>
          <Ionicons name="chatbubble-outline" size={24} color="#007AFF" />
          <Text style={styles.contactText}>Live Chat</Text>
          <Text style={styles.contactDetail}>Available 24/7</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Links</Text>
        <TouchableOpacity style={styles.linkItem}>
          <Ionicons name="document-text-outline" size={24} color="#007AFF" />
          <Text style={styles.linkText}>Terms of Service</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkItem}>
          <Ionicons name="shield-outline" size={24} color="#007AFF" />
          <Text style={styles.linkText}>Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
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
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 15,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    lineHeight: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  contactText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  contactDetail: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  linkText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
});

export default SupportScreen; 