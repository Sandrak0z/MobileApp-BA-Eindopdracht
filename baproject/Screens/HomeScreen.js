import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, TouchableOpacity, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import NewsCard from '../Components/NewsCard';
import CampusCard from '../Components/CampusCard';
import ProductCard from '../Components/ProductCard'; 

const studiegebieden = {
  "": "Alle studiegebieden",
  "IT & ONDERNEMEN.": "IT & Ondernemen",
  "MENS & WELZIJN.": "Mens & Welzijn",
  "GEZONDHEID & WETENSCHAP": "Gezondheid & Wetenschap",
  "INTEGRAAL & CREATIEF": "Integraal & Creatief",


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

const categorieProducten = {
  "": "Alle categorieën",
  "6a060e36d98e935d2a49c3de": "Accessoires & Lifestyle", 
  "6a060e2c93aea5900f183296": "Eten & Drinken", 
  "6a060e1f4cd93d9ff167e604": "Baby & Kind",   
  "6a060a7e2227d3d1e1eb363c": "Sweaters" 
};

const HomeScreen = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [products, setProducts] = useState([]); 

  const [selectedStudiegebied, setSelectedStudiegebied] = useState("");
  const [selectedCampus, setSelectedCampus] = useState("");
  
  const [selectedProductCategory, setSelectedProductCategory] = useState("");
  const [productSortBy, setProductSortBy] = useState("naam-az");
  const [showOnlyPromo, setShowOnlyPromo] = useState(false);
  
  const [newsSearchQuery, setNewsSearchQuery] = useState("");
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [newsSortBy, setNewsSortBy] = useState("naam-az");

  useEffect(() => {
    const headers = { 'Authorization': 'Bearer 6af37f24b55e7761df0f2e346acfe34ae929115e9f8e66b6f9f1c74baabd4746' };

    fetch('https://api.webflow.com/v2/collections/6a061320dcff5cb5330579f8/items', { headers })
      .then(res => res.json())
      .then(newsData => {
        const rawItems = newsData.items || [];
        setNews(rawItems.map(item => {
          const IDs = item.fieldData?.['betrokken-scholen-2'] || [];
          const gekoppeldeScholen = IDs.map(id => campusNames[id]).filter(Boolean).join(', ');
          const fields = item.fieldData || {};

          return {
            id: item.id,
            title: fields.name || "Geen titel",
            rawDate: item.lastPublished || "",
            date: item.lastPublished ? new Date(item.lastPublished).toLocaleDateString('nl-BE') : "Onbekende datum",
            campus: gekoppeldeScholen || "Algemeen Nieuws",
            campusColor: "#236b41",
            image: fields['main-image']?.url || fields.mainImage?.url || "https://via.placeholder.com/150",
            betrokkenScholen: IDs,
            inhoud: fields['post-body'] || fields.maincontent || fields.description || "Geen tekst beschikbaar"
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

          const webflowCategories = productFields.category || productFields.categories || [];

          return {
            id: item.product?.id || item.id,
            titel: productFields.name,
            prijs: skuFields.price?.value / 100, 
            omschrijving: productFields.description,
            foto: skuFields.mainImage?.url || skuFields['main-image']?.url,
            categoriesList: Array.isArray(webflowCategories) ? webflowCategories : [webflowCategories]
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
    return 0;
  });

  const filteredProducts = products.filter(item => {
    const matchesSearch = item.titel?.toLowerCase().includes(productSearchQuery.toLowerCase());
    const matchesPromo = !showOnlyPromo || item.prijs < 15;
    const matchesCategory = selectedProductCategory === "" || item.categoriesList.includes(selectedProductCategory);
    
    return matchesSearch && matchesCategory && matchesPromo;
  }).sort((a, b) => {
    if (productSortBy === "naam-az") return (a.titel || "").localeCompare(b.titel || "");
    if (productSortBy === "naam-za") return (b.titel || "").localeCompare(a.titel || "");
    if (productSortBy === "prijs-laag") return a.prijs - b.prijs;
    if (productSortBy === "prijs-hoog") return b.prijs - a.prijs;
    return 0;
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
        
        <View style={[styles.sectionHeader, { marginTop: 15 }]}>
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

        <View style={styles.rowContainer}>
          <View style={styles.pickerHalfContainer}>
            <Text style={styles.miniLabel}>Campus</Text>
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

          <View style={styles.pickerHalfContainer}>
            <Text style={styles.miniLabel}>Sorteer Nieuws</Text>
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
        </View>
        
        {filteredNews.map(item => (
          <NewsCard 
            key={item.id} 
            item={item} 
            onPress={() => navigation.navigate('NewsDetails', item)} 
          />
        ))}

        <View style={[styles.sectionHeader, { marginTop: 30 }]}>
          <Text style={styles.sectionTitle}>SCHOOLWEBSHOP</Text>
          <Text style={styles.sectionMainTitle}>Artikelen & Merch</Text>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.pickerHalfContainer}>
            <Text style={styles.miniLabel}>Categorie</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedProductCategory}
                onValueChange={(value) => setSelectedProductCategory(value)}
                style={styles.picker}
              >
                {Object.keys(categorieProducten).map((key) => (
                  <Picker.Item key={key} label={categorieProducten[key]} value={key} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.pickerHalfContainer}>
            <Text style={styles.miniLabel}>Sorteer Prijs/Naam</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={productSortBy}
                onValueChange={(value) => setProductSortBy(value)}
                style={styles.picker}
              >
                <Picker.Item label="Naam A-Z" value="naam-az" />
                <Picker.Item label="Naam Z-A" value="naam-za" />
                <Picker.Item label="Prijs: Laag - Hoog" value="prijs-laag" />
                <Picker.Item label="Prijs: Hoog - Laag" value="prijs-hoog" />
              </Picker>
            </View>
          </View>
        </View>
        
        <TextInput 
          style={styles.searchBar} 
          placeholder="Zoek een product..." 
          value={productSearchQuery} 
          onChangeText={setProductSearchQuery} 
        />

        <View style={styles.pickerCardContainer}>
          <View style={styles.switchWrapper}>
            <Text style={styles.switchLabel}>Toon alleen artikelen in promotie</Text>
            <Switch
              value={showOnlyPromo}
              onValueChange={(value) => setShowOnlyPromo(value)}
              trackColor={{ false: "#767577", true: "#8ba653" }}
              thumbColor={showOnlyPromo ? "#236b41" : "#f4f3f4"}
            />
          </View>
        </View>

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
  rowContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, width: '100%' },
  pickerHalfContainer: { width: '48%', backgroundColor: '#fff', padding: 10, borderRadius: 14, borderWidth: 1, borderColor: '#e1e4e8' },
  pickerCardContainer: { backgroundColor: '#fff', padding: 12, borderRadius: 14, borderWidth: 1, borderColor: '#e1e4e8', marginBottom: 16 },
  miniLabel: { fontSize: 10, color: '#888', fontWeight: 'bold', marginLeft: 4, textTransform: 'uppercase', marginBottom: 4 },
  pickerWrapper: { backgroundColor: '#f6f8fa', borderRadius: 10 },
  picker: { height: 50, width: '100%' },
  campusGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' },
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' },
  switchWrapper: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
  switchLabel: { fontSize: 13, fontWeight: '700', color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: 0.5 }
});

export default HomeScreen;