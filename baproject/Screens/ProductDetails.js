import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

const ProductDetails = ({ route }) => { 
  const { titel, prijs, foto, omschrijving } = route.params;

  const [quantity, setQuantity] = useState(1);
  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: foto || "https://via.placeholder.com/350" }} style={styles.detailImage} resizeMode="cover" />
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.header}>{titel || "Geen productnaam"}</Text>
          <Text style={styles.price}>€ {Number(prijs).toFixed(2)}</Text>
        </View>
        
        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Beschrijving</Text>
        <Text style={styles.inhoud}>
          {omschrijving || "Er is voor dit artikel geen uitgebreide beschrijving beschikbaar vanuit het Webflow dashboard."}
        </Text>

        <View style={styles.divider} />

        <View style={styles.footer}>
          <View style={styles.quantitySection}>
            <Text style={styles.label}>Aantal</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>−</Text>
              </TouchableOpacity>

              <Text style={styles.quantityText}>{quantity}</Text>

              <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.totalSection}>
            <Text style={styles.label}>Totaal</Text>
            <Text style={styles.totalPrice}>€ {(prijs * quantity).toFixed(2)}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.mainButton}
          onPress={() => alert(`${quantity}x ${titel} toegevoegd aan je winkelmandje!`)}
        >
          <Text style={styles.mainButtonText}>In winkelmandje</Text>
        </TouchableOpacity>
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
    height: 350 
  },
  content: { 
    padding: 25 
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: { 
    fontSize: 22, 
    fontWeight: '800', 
    color: '#1A1A1A', 
    flex: 1, 
    marginRight: 10 
  },
  price: { 
    fontSize: 22, 
    color: '#236b41', 
    fontWeight: '900' 
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  inhoud: { 
    fontSize: 16, 
    color: '#444', 
    lineHeight: 24,
    marginBottom: 10 
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  quantityContainer: { 
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 5,
    borderWidth: 1,
    borderColor: '#EEE'
  },
  quantityButton: { 
    width: 35, 
    height: 35, 
    backgroundColor: '#F5F5F5', 
    borderRadius: 8, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  quantityButtonText: { 
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#333'
  },
  quantityText: { 
    marginHorizontal: 15, 
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  totalSection: {
    alignItems: 'flex-end',
  },
  totalPrice: { 
    fontSize: 24, 
    fontWeight: '900', 
    color: '#1A1A1A' 
  },
  mainButton: {
    backgroundColor: '#236b41',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#236b41',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default ProductDetails;