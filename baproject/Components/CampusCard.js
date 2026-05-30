import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 44) / 2; 

export default function CampusCard({ item, onPress }) {
  const campusItem = item || {};
  const displayColor = campusItem.color || '#236b41';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.iconContainer, { backgroundColor: displayColor }]}>
        {campusItem.iconUrl ? (
          <Image source={{ uri: campusItem.iconUrl }} style={styles.iconImage} />
        ) : (
          <View style={styles.placeholderIcon} />
        )}
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={[styles.descriptionTag, { color: displayColor }]} numberOfLines={1}>
          {campusItem.description ? campusItem.description.toUpperCase() : "ALGEMEEN"}
        </Text>
        <Text style={styles.title} numberOfLines={1}>
          {campusItem.name || "Onbekende Campus"}
        </Text>
        <Text style={styles.address} numberOfLines={2}>
          {campusItem.address || "Geen adres beschikbaar"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#edf0f2',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  iconContainer: {
    width: '100%',
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderIcon: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 25,
  },
  infoContainer: {
    padding: 12,
  },
  descriptionTag: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.7,
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  address: {
    fontSize: 11,
    color: '#718096',
    lineHeight: 15,
  },
});