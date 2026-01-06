import { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const DATA = [
  {
    id: '1',
    name: 'Location',
    city: 'India',
    image: require('./test.avif'),
  },
  {
    id: '2',
    name: 'Location',
    city: 'Aagra',
    image: require('./test3.avif'), // image in same folder
  },
  {
    id: '4',
    name: 'Location',
    city: 'San Francisco',
    image: require('./test4.png'), // image in same folder
  },
  {
    id: '4',
    name: 'Location',
    city: 'New York',
    image: require('./test1.png'),
  },
  {
    id: '3',
    name: 'Location',
    city: 'Los Angeles',
    image: require('./test2.png'),
  },
  
];

export default function ExploreScreen() {
  const [query, setQuery] = useState('');

  const filteredData = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DATA;
    return DATA.filter(
      item =>
        item.name.toLowerCase().includes(q) ||
        item.city.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Explore</Text>

      <TextInput
        style={styles.search}
        placeholder="Search locations..."
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.image && (
              <Image source={item.image} style={styles.image} />
            )}
            <View style={styles.info}>
              <Text style={styles.cardText}>{item.name}</Text>
              <Text style={styles.city}>{item.city}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No results found.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  search: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
 card: {
  flexDirection: 'row',
  padding: 18,
  borderRadius: 20,
  backgroundColor: '#f9fafb',
  marginBottom: 14,
  overflow: 'hidden',
},

image: {
  width: 380,
  height: 380,
  borderRadius: 20,
  marginRight: 12,
},

  info: { flex: 1, justifyContent: 'center' },
  cardText: { fontSize: 16, fontWeight: '600' },
  city: { fontSize: 13, color: '#6b7280', marginTop: 2 },
  empty: { textAlign: 'center', marginTop: 20, color: '#6b7280' },
});
