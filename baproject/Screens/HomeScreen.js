import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';

const NEWS_DATA = [
  {
    id: '1',
    title: 'OV3 op GWP in stille Kempen',
    date: 'May 26, 2026',
    campus: 'BA De Beemden',
    campusColor: '#5bc0de', 
    image: 'https://via.placeholder.com/150', 
  },
  {
    id: '2',
    title: 'Leerlingen van 3 Restaurant-keuken vullen magen én harten: strijd tegen honger op school',
    date: 'May 26, 2026',
    campus: 'BA Stassart',
    campusColor: '#f0ad4e', 
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    title: 'Internationale uitwisseling in Oslo voor onze 6e jaars',
    date: 'May 26, 2026',
    campus: 'BA Zandpoort',
    campusColor: '#d9534f', 
    image: 'https://via.placeholder.com/150',
  },
];

export default function HomeScreen({ navigation }) {
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
          In Busleyden Atheneum willen we dat je een studierichting volgt die aansluit bij jouw talenten en interesses. 
          Leren gaat immers het best als je kan doen wat je graag doet. Daarom hebben we meer dan 100 studieopties, 
          verspreid over 7 unieke campussen met elk een eigen sfeer.
        </Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>NIEUWS & UPDATES</Text>
        <Text style={styles.sectionMainTitle}>Altijd op de hoogte</Text>
      </View>

      {NEWS_DATA.map((item) => (
        <TouchableOpacity 
          key={item.id} 
          style={styles.newsCard}
          onPress={() => navigation.navigate('NewsDetails', { newsItem: item })} 
        >
          <Image source={{ uri: item.image }} style={styles.cardImage} />

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle} numberOfLines={3}>{item.title}</Text>
            <Text style={styles.cardDate}>{item.date}</Text>
            
            <View style={[styles.campusLabel, { backgroundColor: item.campusColor }]}>
              <Text style={styles.campusText}>{item.campus}</Text>
            </View>
          </View>

          <View style={styles.arrowContainer}>
            <Text style={styles.arrow}>➔</Text>
          </View>
        </TouchableOpacity>
      ))}
      
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
  },
  appHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 50, 
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#edf0f2',
  },
  appLogo: {
    width: 42,
    height: 42,
    borderRadius: 21, 
    resizeMode: 'cover',
  },
  headerTextContainer: {
    marginLeft: 14,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: -0.5,
  },
  appTagline: {
    fontSize: 12,
    color: '#666',
  },
  mapContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e1e4e8',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  mapBanner: {
    width: '100%',      
    height: 200,        
    resizeMode: 'cover', 
  },
  introCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e1e4e8',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  introTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  introText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 19,
  },
  sectionHeader: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#999',
    letterSpacing: 1,
  },
  sectionMainTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000',
  },
  newsCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2, 
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    lineHeight: 18,
  },
  cardDate: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
  campusLabel: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 6,
  },
  campusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  arrowContainer: {
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  arrow: {
    fontSize: 18,
    color: '#000',
  },
});