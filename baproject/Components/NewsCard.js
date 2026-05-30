import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'; 

export default function NewsCard({ item, onPress }) {
  const newsItem = item || {}; 

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: newsItem.image || "https://via.placeholder.com/150" }} 
          style={styles.image} 
        />
        <View style={styles.greenBar} />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{newsItem.title || "Geen titel"}</Text>
        <Text style={styles.date}>{newsItem.date || "Onbekende datum"}</Text>
        
        <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: newsItem.campusColor || "#ca4329" }]}>
            <Text style={styles.badgeText}>{newsItem.campus || "Algemeen"}</Text>
          </View>
        </View>
      </View>

      <View style={styles.arrowContainer}>
        <Text style={styles.arrow}>➔</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: '#fff', 
    marginBottom: 24, 
    flexDirection: 'row', 
    alignItems: 'center',
    paddingHorizontal: 16
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  image: { 
    width: 140, 
    height: 110, 
    resizeMode: 'cover' 
  },
  greenBar: {
    width: 6,
    backgroundColor: '#8ba653',
  },
  content: { 
    paddingLeft: 12, 
    paddingRight: 4,
    flex: 1, 
    justifyContent: 'center' 
  },
  title: { 
    fontSize: 16, 
    fontWeight: '800', 
    color: '#2c3e50', 
    lineHeight: 20,
    marginBottom: 4 
  },
  date: { 
    fontSize: 12, 
    color: '#7f8c8d',
    marginBottom: 8
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  badge: { 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 4,
    marginBottom: 4,
    marginRight: 4
  },
  badgeText: { 
    color: '#fff', 
    fontSize: 11, 
    fontWeight: '600' 
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 8
  },
  arrow: {
    fontSize: 32,
    fontWeight: '300',
    color: '#000'
  }
});