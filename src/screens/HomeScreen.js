import { Feather, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator, Image,
  RefreshControl,
  ScrollView,
  Share,
  StyleSheet, Text,
  TextInput, TouchableOpacity, View
} from 'react-native';

// TASK 1 API CONFIG
const FLICKR_API = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s";
const CACHE_KEY = "@flickr_v1_storage";

export default function HomeScreen({ navigation }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    initializeAppData();
  }, []);

  // INSTAGRAM BEHAVIOR: Load cache first, then fetch fresh
  const initializeAppData = async () => {
    try {
      const cached = await AsyncStorage.getItem(CACHE_KEY);
      if (cached) {
        setPhotos(JSON.parse(cached));
        setLoading(false);
      }
      await fetchFlickrData(false);
    } catch (e) {
      await fetchFlickrData(true);
    }
  };

  const fetchFlickrData = async (showUI = true) => {
    if (showUI) setRefreshing(true);
    try {
      const res = await axios.get(FLICKR_API);
      const freshData = res.data.photos.photo.map(p => ({
        ...p,
        isLiked: false,
        isSaved: false,
        comment: ''
      }));

      const cached = await AsyncStorage.getItem(CACHE_KEY);
      if (JSON.stringify(freshData) !== cached) {
        setPhotos(freshData);
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(freshData));
      }
    } catch (err) {
      console.log("Running in Offline Mode");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // INTERACTION LOGIC (Saves to Cache)
  const syncState = async (newList) => {
    setPhotos(newList);
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(newList));
  };

  const handleLike = (id) => syncState(photos.map(p => p.id === id ? {...p, isLiked: !p.isLiked} : p));
  const handleSave = (id) => syncState(photos.map(p => p.id === id ? {...p, isSaved: !p.isSaved} : p));
  const handleComment = (id, text) => syncState(photos.map(p => p.id === id ? {...p, comment: text} : p));

  const filtered = photos.filter(p => (p.title || "").toLowerCase().includes(search.toLowerCase()));

  if (loading && photos.length === 0) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#000" /></View>;
  }

  return (
    <View style={styles.container}>
      {/* HEADER: Search & Refresh */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu-outline" size={28} color="#000" />
        </TouchableOpacity>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color="#999" />
          <TextInput 
            placeholder="Search authors or titles..." 
            style={styles.input} 
            value={search} 
            onChangeText={setSearch} 
          />
        </View>
        <TouchableOpacity onPress={() => fetchFlickrData(true)}>
          <Ionicons name="refresh" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => fetchFlickrData(true)} />}
      >
        <View style={styles.titleArea}>
          <Text style={styles.titleText}>Recent Photos</Text>
          <Text style={styles.subtitle}>Flickr Global Feed</Text>
        </View>

        {filtered.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.avatar} />
              <Text style={styles.owner}>{item.owner}</Text>
            </View>

            <Image source={{ uri: item.url_s }} style={styles.image} />

            <View style={styles.cardBody}>
              <View style={styles.iconBar}>
                <TouchableOpacity onPress={() => handleLike(item.id)}>
                  <Ionicons name={item.isLiked ? "heart" : "heart-outline"} size={28} color={item.isLiked ? "red" : "black"} />
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 18}}>
                  <Ionicons name="chatbubble-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Share.share({message: item.url_s})} style={{marginLeft: 18}}>
                  <Feather name="send" size={24} color="black" />
                </TouchableOpacity>
                <View style={{flex: 1}} />
                <TouchableOpacity onPress={() => handleSave(item.id)}>
                  <Ionicons name={item.isSaved ? "bookmark" : "bookmark-outline"} size={24} color="black" />
                </TouchableOpacity>
              </View>

              <Text style={styles.photoTitle}>{item.title || "Untitled Feed Item"}</Text>
              <TextInput 
                placeholder="Add a comment..." 
                style={styles.commentInput} 
                value={item.comment}
                onChangeText={(t) => handleComment(item.id, t)}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { paddingTop: 55, paddingHorizontal: 15, paddingBottom: 10, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#eee' },
  searchBox: { flex: 1, flexDirection: 'row', backgroundColor: '#f5f5f5', marginHorizontal: 10, padding: 8, borderRadius: 10, alignItems: 'center' },
  input: { flex: 1, marginLeft: 8, fontSize: 14 },
  titleArea: { padding: 20 },
  titleText: { fontSize: 26, fontWeight: 'bold' },
  subtitle: { fontSize: 13, color: '#999', marginTop: 2 },
  card: { marginBottom: 15 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#f0f0f0', marginRight: 10 },
  owner: { fontWeight: '700', fontSize: 14 },
  image: { width: '100%', height: 380, backgroundColor: '#fafafa' },
  cardBody: { padding: 15 },
  iconBar: { flexDirection: 'row', marginBottom: 12, alignItems: 'center' },
  photoTitle: { fontSize: 14, fontWeight: '500', marginBottom: 10, lineHeight: 20 },
  commentInput: { borderTopWidth: 1, borderTopColor: '#f9f9f9', paddingTop: 10, color: '#777', fontSize: 13 }
});