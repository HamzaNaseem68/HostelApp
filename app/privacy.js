import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from './context/ThemeContext';

const PrivacyScreen = () => {
  const router = useRouter();
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const [settings, setSettings] = useState({
    biometricAuth: false,
    locationServices: true,
    dataCollection: true,
    twoFactorAuth: false,
    emailNotifications: true,
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleChangePassword = () => {
    Alert.alert(
      'Change Password',
      'Password change functionality will be implemented soon.',
      [{ text: 'OK' }]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            // Implement account deletion logic
            router.replace('/login');
          }
        }
      ]
    );
  };

  const renderSettingItem = (icon, title, description, value, onToggle) => (
    <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
      <View style={styles.settingInfo}>
        <Ionicons name={icon} size={24} color={colors.primary} />
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
          <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>{description}</Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor={value ? colors.primary : colors.surface}
      />
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Privacy & Security</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Security</Text>
        {renderSettingItem(
          'finger-print',
          'Biometric Authentication',
          'Use fingerprint or face ID to log in',
          settings.biometricAuth,
          () => handleToggle('biometricAuth')
        )}
        {renderSettingItem(
          'shield-checkmark',
          'Two-Factor Authentication',
          'Add an extra layer of security',
          settings.twoFactorAuth,
          () => handleToggle('twoFactorAuth')
        )}
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: colors.surface }]}
          onPress={handleChangePassword}
        >
          <Ionicons name="key" size={24} color={colors.primary} />
          <Text style={[styles.actionButtonText, { color: colors.primary }]}>Change Password</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Privacy</Text>
        {renderSettingItem(
          'location',
          'Location Services',
          'Allow app to access your location',
          settings.locationServices,
          () => handleToggle('locationServices')
        )}
        {renderSettingItem(
          'analytics',
          'Data Collection',
          'Allow app to collect usage data',
          settings.dataCollection,
          () => handleToggle('dataCollection')
        )}
        {renderSettingItem(
          'mail',
          'Email Notifications',
          'Receive updates via email',
          settings.emailNotifications,
          () => handleToggle('emailNotifications')
        )}
      </View>

      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
        {renderSettingItem(
          'moon',
          'Dark Mode',
          'Switch between light and dark theme',
          isDarkMode,
          toggleTheme
        )}
      </View>

      <TouchableOpacity 
        style={[styles.deleteButton, { backgroundColor: colors.error }]}
        onPress={handleDeleteAccount}
      >
        <Ionicons name="trash" size={24} color="#FFFFFF" />
        <Text style={styles.deleteButtonText}>Delete Account</Text>
      </TouchableOpacity>
    </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 15,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 15,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 15,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    padding: 15,
    borderRadius: 12,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default PrivacyScreen; 