import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import NewsCard from '../Components/NewsCard';
import CampusCard from '../Components/CampusCard';

const studiegebieden = {
  "": "Alle studiegebieden",
  "IT & ONDERNEMEN.": "IT & Ondernemen",
  "MENS & WELZIJN.": "Mens & Welzijn"
};

const campusNames = {
  "": "Alle campussen",
  "6a1095cb6bd772ec2c6555e2": "BA Pitzemburg",
  "6a062d5e45e087ecaf3e6da0": "BA De Beemden",
  "6a062d549480d6a973e9f485": "BA Caputsteen",
  "6a062d4c2016f31f81ea29c3": "BA Botaniek",
  "6a157dc92cc2c31aa1e0177a": "BA Zandpoort",
  "6a157d1b61886283c2061e91": "BA Stassart",
  "6a157c11353eac8c1b745177": "BA Nekkerspoel",
  "6a1577328688f10406b3222f": "BA Basisverpleegkunde"
};

const HomeScreen = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [selectedStudiegebied, setSelectedStudiegebied] = useState("");
  const [selectedCampus, setSelectedCampus] = useState("");

  useEffect(() => {
    const headers = { 'Authorization': 'Bearer 6af37f24b55e7761df0f2e346acfe34ae929115e9f8e66b6f9f1c74baabd4746' };

    fetch('https://api.webflow.com/v2/collections/6a061320dcff5cb5330579f8/items', { headers })
      .then(res => res.json())
      .then(newsData => {
        const rawItems = newsData.items || [];
        setNews(rawItems.map(item => {
          const IDs = item.fieldData?.['betrokken-scholen-2'] || [];
          
          
          const gekoppeldeScholen = IDs
            .map(id => campusNames[id])
            .filter(name => name !== undefined)
            .join(', ');

          return {
            id: item.id,
            title: item.fieldData?.name || "Geen titel",
            date: item.lastPublished ? new Date(item.lastPublished).toLocaleDateString('nl-BE') : "Onbekende datum",
            
            campus: gekoppeldeScholen || "Algemeen Nieuws",
            campusColor: "#236b41",
            image: item.fieldData?.['main-image']?.url || "https://via.placeholder.com/150",
            betrokkenScholen: IDs
          };
        }));
      })
      .catch(err => console.error("Fout bij nieuws:", err));

    fetch('https://api.webflow.com/v2/collections/6a062d37698df9a79b6bd250/items', { headers })
      .then(res => res.json())
      .then(campusData => {
        const rawItems = campusData.items || [];
        setCampuses(rawItems.map(item => ({
          id: item.id,
          name: item.fieldData?.name || "",
          description: item.fieldData?.description || "",
          color: item.fieldData?.color || "#236b41",
          iconUrl: item.fieldData?.icon?.url || "",
          address: item.fieldData?.['adres-van-de-campus'] || "",
          maincontent: item.fieldData?.maincontent || ""
        })));
      })
      .catch(err => console.error("Fout bij campussen:", err));
  }, []);

  const filteredCampuses = campuses.filter(item => {
    return selectedStudiegebied === "" || item.description === selectedStudiegebied;
  });

  const filteredNews = news.filter(item => {
    if (selectedCampus === "") return true;
    if (!item.betrokkenScholen || !Array.isArray(item.betrokkenScholen)) return false;
    return item.betrokkenScholen.includes(selectedCampus);
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

      <View style={styles.content}>
        
        {/* CAMPUSSEN SECTIE */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>ONZE CAMPUSSEN</Text>
          <Text style={styles.sectionMainTitle}>Kies je eigen pad</Text>
        </View>

        <View style={styles.pickerCardContainer}>
          <Text style={styles.miniLabel}>Filter op studiegebied</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedStudiegebied}
              onValueChange={(value) => setSelectedStudiegebied(value)}
              style={styles.picker}
            >
              {Object.keys(studiegebieden).map((key) => (
                <Picker.Item key={key} label={studiegebieden[key]} value={key} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.campusGrid}>
          {filteredCampuses.map(item => (
            <CampusCard 
              key={item.id} 
              item={item} 
              onPress={() => navigation.navigate('CampusDetails', { campusItem: item })} 
            />
          ))}
        </View>

        {/* NIEUWS SECTIE */}
        <View style={[styles.sectionHeader, { marginTop: 30 }]}>
          <Text style={styles.sectionTitle}>NIEUWS & UPDATES</Text>
          <Text style={styles.sectionMainTitle}>Altijd op de hoogte</Text>
        </View>

        <View style={styles.pickerCardContainer}>
          <Text style={styles.miniLabel}>Filter nieuws per campus</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedCampus}
              onValueChange={(value) => setSelectedCampus(value)}
              style={styles.picker}
            >
              {Object.keys(campusNames).map((key) => (
                <Picker.Item key={key} label={campusNames[key]} value={key} />
              ))}
            </Picker>
          </View>
        </View>
        
        {filteredNews.map(item => (
          <NewsCard 
            key={item.id} 
            item={item} 
            onPress={() => navigation.navigate('NewsDetails', { newsItem: item })} 
          />
        ))}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f8fa' },
  appHeader: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingTop: 50, paddingBottom: 16, paddingHorizontal: 20, borderBottomWidth: 1, borderColor: '#edf0f2' },
  appLogo: { width: 42, height: 42, borderRadius: 21 },
  headerTextContainer: { marginLeft: 14 },
  appTitle: { fontSize: 20, fontWeight: '800', color: '#1a1a1a' },
  appTagline: { fontSize: 12, color: '#666' },
  mapContainer: { marginTop: 16, marginHorizontal: 16, borderRadius: 16, overflow: 'hidden' },
  mapBanner: { width: '100%', height: 200, resizeMode: 'cover' },
  content: { paddingHorizontal: 16 },
  sectionHeader: { marginBottom: 14, marginTop: 12 },
  sectionTitle: { fontSize: 11, fontWeight: '800', color: '#8ba653', letterSpacing: 1.5 },
  sectionMainTitle: { fontSize: 24, fontWeight: '800', color: '#000000' },
  pickerCardContainer: { backgroundColor: '#fff', padding: 12, borderRadius: 14, borderWidth: 1, borderColor: '#e1e4e8', marginBottom: 16 },
  miniLabel: { fontSize: 10, color: '#888', fontWeight: 'bold', marginLeft: 10, textTransform: 'uppercase', marginBottom: 2 },
  pickerWrapper: { backgroundColor: '#f6f8fa', borderRadius: 10 },
  picker: { height: 50, width: '100%' },
  campusGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }
});

export default HomeScreen;