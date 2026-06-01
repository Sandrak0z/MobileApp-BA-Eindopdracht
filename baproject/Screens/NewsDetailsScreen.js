import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';

const NewsDetails = ({ route }) => {
  const { title, date, campus, image, inhoud } = route.params?.newsItem || route.params || {};
  
  const { width } = useWindowDimensions();

  const tagsStyles = {
    p: {
      color: '#333333',
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 14,
    },
    img: {
      borderRadius: 12,
      marginTop: 8,
      marginBottom: 8,
    },
    h1: { color: '#1A1A1A', fontSize: 22, fontWeight: '800', marginBottom: 10 },
    h2: { color: '#1A1A1A', fontSize: 18, fontWeight: '700', marginBottom: 8 },
    li: { color: '#333333', fontSize: 15, lineHeight: 22 }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* AFBEELDING */}
      <View style={styles.imageWrapper}>
        <Image 
          source={{ uri: image || "https://via.placeholder.com/350" }} 
          style={styles.detailImage} 
          resizeMode="cover" 
        />
      </View>

      <View style={styles.content}>
        <View style={styles.metaRow}>
          <View style={styles.campusTag}>
            <Text style={styles.campusTagText}>{campus || "Algemeen Nieuws"}</Text>
          </View>
          <Text style={styles.dateText}>{date || "Onbekende datum"}</Text>
        </View>

        {/* TITEL */}
        <Text style={styles.title}>{title || "Geen titel beschikbaar"}</Text>
        
        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Bericht</Text>
        
        <View style={styles.htmlContainer}>
          <RenderHTML
            contentWidth={width - 50} 
            source={{ html: inhoud || "<p>Er is geen verdere inhoud beschikbaar voor dit nieuwsbericht.</p>" }}
            tagsStyles={tagsStyles}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F9F9F9' 
  },
  imageWrapper: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  detailImage: { 
    width: '100%', 
    height: 300 
  },
  content: { 
    padding: 25 
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  campusTag: {
    backgroundColor: '#edf4ee',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  campusTagText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#236b41',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dateText: {
    fontSize: 13,
    color: '#888',
    fontWeight: '600',
  },
  title: { 
    fontSize: 24, 
    fontWeight: '800', 
    color: '#1A1A1A', 
    lineHeight: 32,
    marginBottom: 10 
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  htmlContainer: {
    marginTop: 5,
    marginBottom: 20,
  }
});

export default NewsDetails;