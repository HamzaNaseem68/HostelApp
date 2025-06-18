import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useUser } from '../context/UserContext';

const PersonalInfoScreen = () => {
  const router = useRouter();
  const { user, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    dateOfBirth: ''
  });

  // Load user info from context on mount
  useEffect(() => {
    if (user && user.personalInfo) {
      setUserInfo(user.personalInfo);
    }
  }, [user]);

  const handleSave = async () => {
    try {
      if (!userInfo.firstName || !userInfo.lastName || !userInfo.email) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userInfo.email)) {
        Alert.alert('Error', 'Please enter a valid email address');
        return;
      }
      await updateUser({ personalInfo: userInfo });
      setIsEditing(false);
      Alert.alert('Success', 'Your information has been saved successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to save information. Please try again.');
    }
  };

  const renderField = (label, key, placeholder, keyboardType = 'default', required = false) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={userInfo[key]}
          onChangeText={(text) => setUserInfo({ ...userInfo, [key]: text })}
          placeholder={placeholder}
          keyboardType={keyboardType}
        />
      ) : (
        <Text style={styles.fieldValue}>
          {userInfo[key] || 'Not provided'}
        </Text>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Personal Information</Text>
        {!isEditing ? (
          <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
            <Ionicons name="pencil" size={24} color="#007AFF" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          {renderField('First Name', 'firstName', 'Enter your first name', 'default', true)}
          {renderField('Last Name', 'lastName', 'Enter your last name', 'default', true)}
          {renderField('Email', 'email', 'Enter your email', 'email-address', true)}
          {renderField('Phone', 'phone', 'Enter your phone number', 'phone-pad')}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address Information</Text>
          {renderField('Address', 'address', 'Enter your address')}
          {renderField('City', 'city', 'Enter your city')}
          {renderField('Country', 'country', 'Enter your country')}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Information</Text>
          {renderField('Date of Birth', 'dateOfBirth', 'Enter your date of birth', 'default')}
        </View>
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
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  editButton: {
    padding: 5,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    padding: 15,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  required: {
    color: '#dc3545',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  fieldValue: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 12,
  },
});

export default PersonalInfoScreen; 