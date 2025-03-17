import React from 'react';
import { View, Text as RNText, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define prop types for our components
interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

interface SettingsItemProps {
  icon: string;
  label: string;
  value?: string;
  onPress?: () => void;
}

// Settings Section Component
const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children }) => (
  <View style={styles.section}>
    <RNText style={styles.sectionTitle}>{title}</RNText>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

// Settings Item Component
const SettingsItem: React.FC<SettingsItemProps> = ({ icon, label, value, onPress }) => (
  <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
    <View style={styles.settingsItemLeft}>
      <Ionicons name={icon as any} size={24} color="#666" />
      <RNText style={styles.settingsItemLabel}>{label}</RNText>
    </View>
    <View style={styles.settingsItemRight}>
      {value && <RNText style={styles.settingsItemValue}>{value}</RNText>}
      <Ionicons name="chevron-forward" size={20} color="#CCC" />
    </View>
  </TouchableOpacity>
);

const SettingsScreen: React.FC = () => {
  return (
<SafeAreaView style={{flex:1}}>
    <ScrollView style={styles.container}>
      <SettingsSection title="Account">
        <SettingsItem
          icon="person-outline"
          label="Profile"
          onPress={() => {/* Handle profile */}}
        />
        <SettingsItem
          icon="notifications-outline"
          label="Notifications"
          onPress={() => {/* Handle notifications */}}
        />
        <SettingsItem
          icon="language-outline"
          label="Language"
          value="English"
          onPress={() => {/* Handle language */}}
        />
      </SettingsSection>

      <SettingsSection title="Preferences">
        <SettingsItem
          icon="calendar-outline"
          label="Calendar Sync"
          onPress={() => {/* Handle calendar */}}
        />
        <SettingsItem
          icon="color-palette-outline"
          label="Appearance"
          value="Light"
          onPress={() => {/* Handle appearance */}}
        />
      </SettingsSection>

      <SettingsSection title="Support">
        <SettingsItem
          icon="help-circle-outline"
          label="Help Center"
          onPress={() => {/* Handle help */}}
        />
        <SettingsItem
          icon="mail-outline"
          label="Contact Us"
          onPress={() => {/* Handle contact */}}
        />
        <SettingsItem
          icon="information-circle-outline"
          label="About"
          onPress={() => {/* Handle about */}}
        />
      </SettingsSection>

      <SettingsSection title="Privacy">
        <SettingsItem
          icon="lock-closed-outline"
          label="Privacy Policy"
          onPress={() => {/* Handle privacy */}}
        />
        <SettingsItem
          icon="document-text-outline"
          label="Terms of Service"
          onPress={() => {/* Handle terms */}}
        />
      </SettingsSection>

      <TouchableOpacity 
        style={styles.signOutButton}
        onPress={() => {/* Handle sign out */}}
      >
        <RNText style={styles.signOutText}>Sign Out</RNText>
      </TouchableOpacity>
    </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A90E2',
    marginLeft: 20,
    marginBottom: 10,
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsItemLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  settingsItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsItemValue: {
    fontSize: 16,
    color: '#999',
    marginRight: 10,
  },
  signOutButton: {
    marginVertical: 20,
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    alignItems: 'center',
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SettingsScreen;