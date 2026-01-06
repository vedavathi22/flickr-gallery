import { Ionicons } from '@expo/vector-icons';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const activities = [
    { id: '1', title: 'New Location Added', location: 'San Francisco, CA', time: '2m ago' },
    { id: '2', title: 'New Location Added', location: 'San Francisco, CA', time: '2m ago' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu-outline" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Home</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={{ padding: 20 }}>
        {/* Blue Welcome Card */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeSub}>Welcome back,</Text>
          <Text style={styles.welcomeTitle}>Good Morning!</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>12</Text>
              <Text style={styles.statLabel}>Tasks</Text>
            </View>
            <View
              style={[
                styles.statBox,
                { borderLeftWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
              ]}
            >
              <Text style={styles.statNum}>5</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {activities.map(item => (
          <View key={item.id} style={styles.activityCard}>
            <View style={styles.iconCircle}>
              <Ionicons name="location-outline" size={20} color="#6366f1" />
            </View>
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.activityTitle}>{item.title}</Text>
              <Text style={styles.activityLoc}>{item.location}</Text>
            </View>
            <Text style={styles.activityTime}>{item.time}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  welcomeCard: { backgroundColor: '#818cf8', borderRadius: 20, padding: 25, marginBottom: 25 },
  welcomeSub: { color: '#e0e7ff', fontSize: 16 },
  welcomeTitle: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginVertical: 10 },
  statsRow: { flexDirection: 'row', marginTop: 15, borderTopWidth: 1, borderColor: 'rgba(255,255,255,0.2)', paddingTop: 15 },
  statBox: { flex: 1, alignItems: 'center' },
  statNum: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  statLabel: { color: '#e0e7ff', fontSize: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  seeAll: { color: '#6366f1' },
  activityCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9fafb', padding: 15, borderRadius: 15, marginBottom: 10 },
  iconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#eef2ff', justifyContent: 'center', alignItems: 'center' },
  activityTitle: { fontWeight: '600', fontSize: 14 },
  activityLoc: { color: '#6b7280', fontSize: 12 },
  activityTime: { color: '#9ca3af', fontSize: 12 },
});
