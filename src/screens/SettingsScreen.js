// src/screens/SettingsScreen.js
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [systemTheme, setSystemTheme] = useState(false);
  const [taskReminders, setTaskReminders] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [wifiOnly, setWifiOnly] = useState(false);

  const backgroundColor = darkMode ? '#111827' : '#ffffff';
  const textColor = darkMode ? '#f9fafb' : '#111827';
  const sectionColor = darkMode ? '#9ca3af' : '#6b7280';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Settings</Text>

      <ScrollView contentContainerStyle={styles.content}>
        {/* General */}
        <Text style={[styles.sectionTitle, { color: sectionColor }]}>
          General
        </Text>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.label, { color: textColor }]}>Dark Mode</Text>
            <Text style={{ color: sectionColor, fontSize: 12 }}>
              {darkMode ? 'Dark theme enabled' : 'Light theme enabled'}
            </Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
          />
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.label, { color: textColor }]}>
              Use System Theme
            </Text>
            <Text style={{ color: sectionColor, fontSize: 12 }}>
              {systemTheme ? 'Following device theme (demo)' : 'Custom theme'}
            </Text>
          </View>
          <Switch
            value={systemTheme}
            onValueChange={on => {
              setSystemTheme(on);
              if (on) {
                // Simple demo behavior: force light mode when "system" is on
                setDarkMode(false);
              }
            }}
          />
        </View>

        {/* Notifications */}
        <Text style={[styles.sectionTitle, { color: sectionColor }]}>
          Notifications
        </Text>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.label, { color: textColor }]}>
              Task Reminders
            </Text>
            <Text style={{ color: sectionColor, fontSize: 12 }}>
              {taskReminders ? 'Reminders enabled' : 'Reminders disabled'}
            </Text>
          </View>
          <Switch
            value={taskReminders}
            onValueChange={setTaskReminders}
          />
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.label, { color: textColor }]}>
              Push Notifications
            </Text>
            <Text style={{ color: sectionColor, fontSize: 12 }}>
              {pushNotifications ? 'Notifications on' : 'Notifications off'}
            </Text>
          </View>
          <Switch
            value={pushNotifications}
            onValueChange={setPushNotifications}
          />
        </View>

        {/* Other */}
        <Text style={[styles.sectionTitle, { color: sectionColor }]}>
          Other
        </Text>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.label, { color: textColor }]}>
              Sync over Wi‑Fi only
            </Text>
            <Text style={{ color: sectionColor, fontSize: 12 }}>
              {wifiOnly
                ? 'Mobile data sync disabled'
                : 'Mobile data sync allowed'}
            </Text>
          </View>
          <Switch
            value={wifiOnly}
            onValueChange={setWifiOnly}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 24, fontWeight: '600', padding: 16 },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e7eb',
  },
  label: { fontSize: 16 },
});
