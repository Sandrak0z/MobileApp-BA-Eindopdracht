import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 44) / 2; 

const ProductCard = ({ titel, prijs, foto, omschrijving, onPress }) => {
  const veiligePrijs = typeof prijs === 'number' && !isNaN(prijs) ? prijs : Number(prijs) || 0;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: foto || "https://via.placeholder.com/150" }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>{titel || "Geen productnaam"}</Text>
        <Text style={styles.description} numberOfLines={2}>{omschrijving || "Geen beschrijving."}</Text>
        <Text style={styles.price}>€ {veiligePrijs.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#edf0f2',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 120,
    backgroundColor: '#f6f8fa',
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  description: {
    fontSize: 11,
    color: '#666',
    height: 32, // Zorgt dat de teksthoogte altijd gelijk blijft
    marginBottom: 6,
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
    color: '#236b41', 
  },
});

export default ProductCard;