import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import NewsCard from '../Components/NewsCard';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]); 
  const [newsSearchQuery, setNewsSearchQuery] = useState(""); 

  useEffect(() => {
    fetch('https://api.webflow.com/v2/collections/6a061320dcff5cb5330579f8/items', {
      headers: { 
        'Authorization': 'Bearer 6af37f24b55e7761df0f2e346acfe34ae929115e9f8e66b6f9f1c74baabd4746',
      }
    })
    .then((res) => {
      if (!res.ok) throw new Error("Netwerk respons was niet ok");
      return res.json();
    })
    .then(data => {
      const rawItems = data.items && Array.isArray(data.items) ? data.items : [];
      
      setNews(rawItems.map(item => ({
        id: item.id,
        title: item.fieldData?.name || "Geen titel",
        date: item.lastPublished ? new Date(item.lastPublished).toLocaleDateString('nl-BE') : "Onbekende datum",
        campus: "Busleyden Atheneum",
        campusColor: "#236b41",
        image: item.fieldData?.['main-image']?.url || item.fieldData?.['thumbnail-image']?.url || "https://via.placeholder.com/150",
        inhoud: item.fieldData?.longdescription || ""
      })));
      setLoading(false);
    })
    .catch(err => {
      console.error("Fout bij nieuws ophalen:", err);
      setNews([]);
      setLoading(false);
    });
  }, []);

  const filteredNews = news.filter((item) => {
    return item.title.toLowerCase().includes(newsSearchQuery.toLowerCase());
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <View style={styles.appHeader}>
        <Image source={require('../images/logoBusl.jpg')} style={styles.appLogo} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.appTitle}>Busleyden Atheneum</Text>
          <Text style={styles.appTagline}>Grootste atheneum van Mechelen</Text>
        </View>
      </View>

      <View style={styles.mapContainer}>
        <Image source={require('../images/campussenMechelen.jpg')} style={styles.mapBanner} />
      </View>

      <View style={styles.introCard}>
        <Text style={styles.introTitle}>Ontdek jouw talenten</Text>
        <Text style={styles.introText}>
          In Busleyden Atheneum willen we dat je een studierichting volgt die aansluit bij jouw talentenpties, 
          verspreid over 7 unieke campussen met elk een eigen sfeer.
        </Text>
      </View>

  
      <View style={styles.content}>
<View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>NIEUWS & UPDATES</Text>
        <Text style={styles.sectionMainTitle}>Altijd op de hoogte</Text>
      </View>

        <TextInput 
          style={styles.searchBar} 
          placeholder="Zoek in nieuws..." 
          value={newsSearchQuery} 
          onChangeText={setNewsSearchQuery} 
        />
        
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
        ) : filteredNews.length > 0 ? (
          filteredNews.map((item) => (
            <NewsCard 
              key={item.id} 
              item={item} 
              onPress={() => navigation.navigate('NewsDetails', { newsItem: item })} 
            />
          ))
        ) : (
          <Text style={styles.noDataText}>Geen nieuws gevonden.</Text>
        )}

      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f8fa' },
  appHeader: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingTop: 50, paddingBottom: 16, paddingHorizontal: 20, borderBottomWidth: 1, borderColor: '#edf0f2' },
  appLogo: { width: 42, height: 42, borderRadius: 21, resizeMode: 'cover' },
  headerTextContainer: { marginLeft: 14 },
  appTitle: { fontSize: 20, fontWeight: '800', color: '#1a1a1a', letterSpacing: -0.5 },
  appTagline: { fontSize: 12, color: '#666' },
  mapContainer: { marginTop: 16, marginHorizontal: 16, borderRadius: 16, overflow: 'hidden', backgroundColor: '#fff', borderWidth: 1, borderColor: '#e1e4e8', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 },
  mapBanner: { width: '100%', height: 200, resizeMode: 'cover' },
  introCard: { backgroundColor: '#fff', marginHorizontal: 16, marginTop: 12, padding: 16, borderRadius: 14, borderWidth: 1, borderColor: '#e1e4e8', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 },
  introTitle: { fontSize: 16, fontWeight: '800', color: '#1a1a1a', marginBottom: 6 },
  introText: { fontSize: 13, color: '#555', lineHeight: 19 },
  content: { paddingHorizontal: 16 },
  sectionHeader: { marginBottom: 16, marginTop: 12 },
  sectionTitle: { fontSize: 11, fontWeight: '800', color: '#8ba653', letterSpacing: 1.5, marginBottom: 4, marginTop: 8 },
  sectionMainTitle: { fontSize: 24, fontWeight: '800', color: '#000000', letterSpacing: -0.5 },
  searchBar: { width: '100%', height: 50, backgroundColor: '#ffffff', borderRadius: 12, paddingHorizontal: 15, marginBottom: 24, borderWidth: 1, borderColor: '#e1e4e8', fontSize: 16 },
  noDataText: { textAlign: 'center', marginTop: 20, color: '#666', fontSize: 14 }
});

export default HomeScreen;