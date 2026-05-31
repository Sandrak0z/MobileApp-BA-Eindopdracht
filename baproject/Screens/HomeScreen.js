import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import NewsCard from '../Components/NewsCard';
import CampusCard from '../Components/CampusCard';
import ProductCard from '../Components/ProductCard'; 

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
  const [products, setProducts] = useState([]); 

  const [selectedStudiegebied, setSelectedStudiegebied] = useState("");
  const [selectedCampus, setSelectedCampus] = useState("");
  
  const [newsSearchQuery, setNewsSearchQuery] = useState("");
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [newsSortBy, setNewsSortBy] = useState("datum-nieuw");

  useEffect(() => {
    const headers = { 'Authorization': 'Bearer 6af37f24b55e7761df0f2e346acfe34ae929115e9f8e66b6f9f1c74baabd4746' };

    fetch('https://api.webflow.com/v2/collections/6a061320dcff5cb5330579f8/items', { headers })
      .then(res => res.json())
      .then(newsData => {
        const rawItems = newsData.items || [];
        setNews(rawItems.map(item => {
          const IDs = item.fieldData?.['betrokken-scholen-2'] || [];
          const gekoppeldeScholen = IDs.map(id => campusNames[id]).filter(Boolean).join(', ');

          return {
            id: item.id,
            title: item.fieldData?.name || "Geen titel",
            rawDate: item.lastPublished || "",
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

    fetch('https://api.webflow.com/v2/sites/69f20ebbdfedc1aa82aad6fa/products', { headers })
      .then(res => res.json())
      .then(data => {
        const rawItems = data.items || [];
        setProducts(rawItems.map(item => {
          const skuFields = item.skus?.[0]?.fieldData || {};
          const productFields = item.product?.fieldData || {};

          return {
            id: item.product?.id || item.id,
            titel: productFields.name,
            prijs: skuFields.price?.value / 100, 
            omschrijving: productFields.description,
            foto: skuFields.mainImage?.url || skuFields['main-image']?.url,
            betrokkenScholen: [] 
          };
        }));
      })
      .catch(err => console.error("Fout bij products fetch:", err));
  }, []);

  const filteredCampuses = campuses.filter(item => {
    return selectedStudiegebied === "" || item.description === selectedStudiegebied;
  });

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(newsSearchQuery.toLowerCase());
    if (selectedCampus === "") return matchesSearch;
    return matchesSearch && Array.isArray(item.betrokkenScholen) && item.betrokkenScholen.includes(selectedCampus);
  }).sort((a, b) => {
    if (newsSortBy === "naam-az") return a.title.localeCompare(b.title);
    if (newsSortBy === "naam-za") return b.title.localeCompare(a.title);
    if (newsSortBy === "datum-oud") return new Date(a.rawDate) - new Date(b.rawDate);
    return new Date(b.rawDate) - new Date(a.rawDate);
  });

  const filteredProducts = products.filter(item => {
    return item.titel?.toLowerCase().includes(productSearchQuery.toLowerCase());
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* APP HEADER */}
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
        
        <View style={[styles.pickerCardContainer, { marginTop: 10 }]}>
          <Text style={styles.miniLabel}>Kies jouw campus (Filtert het nieuws)</Text>
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

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>ONZE CAMPUSSEN</Text>
          <Text style={styles.sectionMainTitle}>Kies je eigen pad</Text>
        </View>

        <View style={styles.pickerCardContainer}>
          <Text style={styles.miniLabel}>Filter campussen op studiegebied</Text>
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

        <TextInput 
          style={styles.searchBar} 
          placeholder="Zoek een nieuwsbericht..." 
          value={newsSearchQuery} 
          onChangeText={setNewsSearchQuery} 
        />

        <View style={styles.pickerCardContainer}>
          <Text style={styles.miniLabel}>Sorteer nieuws</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={newsSortBy}
              onValueChange={(value) => setNewsSortBy(value)}
              style={styles.picker}
            >
              <Picker.Item label="A-Z" value="naam-az" />
              <Picker.Item label="Z-A" value="naam-za" />
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

        {/* WEBSHOP SECTIE */}
        <View style={[styles.sectionHeader, { marginTop: 30 }]}>
          <Text style={styles.sectionTitle}>SCHOOLWEBSHOP</Text>
          <Text style={styles.sectionMainTitle}>Artikelen & Merch</Text>
        </View>

        <TextInput 
          style={styles.searchBar} 
          placeholder="Zoek een product..." 
          value={productSearchQuery} 
          onChangeText={setProductSearchQuery} 
        />

        <View style={styles.productGrid}>
          {filteredProducts.map(p => (
            <ProductCard 
              key={p.id} 
              titel={p.titel} 
              prijs={p.prijs} 
              foto={p.foto} 
              omschrijving={p.omschrijving} 
              onPress={() => navigation.navigate('ProductDetails', p)} 
            />
          ))}
        </View>

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
  searchBar: { width: '100%', height: 50, backgroundColor: '#ffffff', borderRadius: 12, paddingHorizontal: 15, marginBottom: 15, borderWidth: 1, borderColor: '#e1e4e8', fontSize: 16 },
  pickerCardContainer: { backgroundColor: '#fff', padding: 12, borderRadius: 14, borderWidth: 1, borderColor: '#e1e4e8', marginBottom: 16 },
  miniLabel: { fontSize: 10, color: '#888', fontWeight: 'bold', marginLeft: 10, textTransform: 'uppercase', marginBottom: 2 },
  pickerWrapper: { backgroundColor: '#f6f8fa', borderRadius: 10 },
  picker: { height: 50, width: '100%' },
  campusGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' },
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }
});

export default HomeScreen;