import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUser } from '../context/UserContext';
import { useTheme } from './context/ThemeContext';

const ProfileScreen = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { user, updateUser, logoutUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(user.name || '');
  const [userEmail, setUserEmail] = useState(user.email || '');
  const [profileImage, setProfileImage] = useState(user.profileImage || '');

  const handleLogout = async () => {
    await logoutUser();
    router.replace('/login');
  };

  const handleSave = async () => {
    await updateUser({ name: userName, email: userEmail, profileImage });
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets[0].uri) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const menuItems = [
    { icon: 'person', title: 'Personal Information', screen: '/personal-info' },
    { icon: 'card', title: 'Payment Methods', screen: '/payment-methods' },
    { icon: 'notifications', title: 'Notifications', screen: '/notifications' },
    { icon: 'shield', title: 'Privacy & Security', screen: '/privacy' },
    { icon: 'help-circle', title: 'Help & Support', screen: '/support' },
    { icon: 'information-circle', title: 'About', screen: '/about' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={{ height: insets.top, backgroundColor: colors.surface }} />
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <TouchableOpacity onPress={isEditing ? pickImage : undefined} style={[styles.profileImageContainer, { backgroundColor: colors.primary + '30' }]}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={{ width: 80, height: 80, borderRadius: 40 }} />
          ) : (
            <Ionicons name="person" size={80} color={colors.primary} />
          )}
        </TouchableOpacity>

        {isEditing ? (
          <View style={styles.editContainer}>
            <TextInput
              style={[styles.input, { 
                backgroundColor: colors.surface,
                color: colors.text,
                borderColor: colors.border
              }]}
              value={userName}
              onChangeText={setUserName}
              placeholder="Enter your name"
              placeholderTextColor={colors.textSecondary}
            />
            <TextInput
              style={[styles.input, { 
                backgroundColor: colors.surface,
                color: colors.text,
                borderColor: colors.border
              }]}
              value={userEmail}
              onChangeText={setUserEmail}
              placeholder="Enter your email"
              placeholderTextColor={colors.textSecondary}
              keyboardType="email-address"
            />
            <View style={styles.editActions}>
              <TouchableOpacity 
                style={[styles.editButton, { backgroundColor: colors.error }]}
                onPress={() => {
                  setIsEditing(false);
                  setUserName(user.name || '');
                  setUserEmail(user.email || '');
                  setProfileImage(user.profileImage || '');
                }}
              >
                <Text style={styles.editButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.editButton, { backgroundColor: colors.primary }]}
                onPress={handleSave}
              >
                <Text style={styles.editButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.profileInfo}>
            <Text style={[styles.name, { color: colors.text }]}>{user.name}</Text>
            <Text style={[styles.email, { color: colors.textSecondary }]}>{user.email}</Text>
            <TouchableOpacity 
              style={[styles.editProfileButton, { backgroundColor: colors.surface }]}
              onPress={() => setIsEditing(true)}
            >
              <Ionicons name="pencil" size={20} color={colors.primary} />
              <Text style={[styles.editProfileText, { color: colors.primary }]}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={[styles.statsContainer, { backgroundColor: colors.surface }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.text }]}>3</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Active Bookings</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.text }]}>12</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Completed</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.text }]}>4.8</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Rating</Text>
        </View>
      </View>

      <View style={[styles.menuContainer, { backgroundColor: colors.surface }]}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, { 
              borderBottomColor: colors.border,
              borderBottomWidth: index === menuItems.length - 1 ? 0 : 1
            }]}
            onPress={() => router.push(item.screen)}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name={item.icon} size={24} color={colors.primary} />
              <Text style={[styles.menuItemText, { color: colors.text }]}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        style={[styles.logoutButton, { backgroundColor: colors.error }]}
        onPress={handleLogout}
      >
        <Ionicons name="log-out" size={24} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 20,
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    marginBottom: 15,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    gap: 5,
  },
  editProfileText: {
    fontSize: 16,
    fontWeight: '600',
  },
  editContainer: {
    width: '100%',
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  editButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginTop: 20,
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
  },
  statDivider: {
    width: 1,
    height: '80%',
  },
  menuContainer: {
    marginTop: 20,
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuItemText: {
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    marginHorizontal: 20,
    gap: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProfileScreen; 