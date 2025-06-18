import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AboutScreen = () => {
  const router = useRouter();
  const appVersion = '1.0.0';

  const handleSocialLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>About</Text>
      </View>

      <View style={styles.appInfo}>
        <Image
          source={{ uri: 'https://via.placeholder.com/120' }}
          style={styles.appLogo}
        />
        <Text style={styles.appName}>Hostel App</Text>
        <Text style={styles.appVersion}>Version {appVersion}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Us</Text>
        <Text style={styles.description}>
          Hostel App is your trusted companion for finding and booking hostels worldwide. 
          We connect travelers with unique accommodation experiences, making travel more 
          accessible and enjoyable for everyone.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.description}>
          To make travel more accessible and enjoyable by connecting travelers with 
          unique accommodation experiences worldwide. We believe in creating meaningful 
          connections between travelers and local communities.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connect With Us</Text>
        <View style={styles.socialLinks}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLink('https://facebook.com')}
          >
            <Ionicons name="logo-facebook" size={24} color="#1877F2" />
            <Text style={styles.socialText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLink('https://twitter.com')}
          >
            <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
            <Text style={styles.socialText}>Twitter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLink('https://instagram.com')}
          >
            <Ionicons name="logo-instagram" size={24} color="#E4405F" />
            <Text style={styles.socialText}>Instagram</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal</Text>
        <TouchableOpacity style={styles.legalItem}>
          <Ionicons name="document-text-outline" size={24} color="#007AFF" />
          <Text style={styles.legalText}>Terms of Service</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.legalItem}>
          <Ionicons name="shield-outline" size={24} color="#007AFF" />
          <Text style={styles.legalText}>Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.legalItem}>
          <Ionicons name="information-circle-outline" size={24} color="#007AFF" />
          <Text style={styles.legalText}>Licenses</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <Text style={styles.copyright}>
        © 2024 Hostel App. All rights reserved.
      </Text>
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
  appInfo: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
  },
  appLogo: {
    width: 120,
    height: 120,
    borderRadius: 30,
    marginBottom: 15,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  appVersion: {
    fontSize: 16,
    color: '#666',
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
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
  },
  socialButton: {
    alignItems: 'center',
  },
  socialText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  legalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  legalText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  copyright: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginVertical: 30,
  },
});

export default AboutScreen; 