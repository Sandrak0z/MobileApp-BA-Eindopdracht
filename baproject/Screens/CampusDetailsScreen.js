import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Linking, useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';

export default function CampusDetailsScreen({ route, navigation }) {
  const { campusItem } = route.params;
  const { width } = useWindowDimensions(); 
  const displayColor = campusItem.color || '#236b41';

  const htmlStyles = {
    p: { color: '#4a5568', fontSize: 14, lineHeight: 22, marginBottom: 12 },
    strong: { fontWeight: 'bold', color: '#1a1a1a' },
    h1: { fontSize: 20, fontWeight: '800', color: '#1a1a1a', marginTop: 20, marginBottom: 10 },
    h2: { fontSize: 18, fontWeight: '700', color: '#1a1a1a', marginTop: 16, marginBottom: 8 },
    ul: { marginBottom: 12 },
    li: { color: '#4a5568', fontSize: 14, marginBottom: 4 },
    a: { color: displayColor, fontWeight: '600', textDecorationLine: 'underline' }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <View style={styles.imageContainer}>
        {campusItem.iconUrl ? (
          <Image source={{ uri: campusItem.iconUrl }} style={styles.campusImage} />
        ) : (
          <View style={[styles.placeholderImage, { backgroundColor: displayColor }]} />
        )}
        
      

        <Text style={styles.title}>{campusItem.name}</Text>
        
        <View style={styles.addressRow}>
          <Text style={styles.addressIcon}>📍</Text>
          <Text style={styles.addressText}>{campusItem.address || 'Geen adres beschikbaar'}</Text>
        </View>

        <View style={styles.divider} />

        {campusItem.maincontent ? (
          <RenderHTML
            contentWidth={width - 48}
            source={{ html: campusItem.maincontent }}
            tagsStyles={htmlStyles}
          />
        ) : (
          <Text style={styles.bodyText}>Er is geen uitgebreide informatie beschikbaar.</Text>
        )}

        {campusItem.address ? (
          <TouchableOpacity 
            style={[styles.mapsButton, { backgroundColor: displayColor }]}
            onPress={() => Linking.openURL(`https://www.google.com/maps}`)}
          >
            <Text style={styles.mapsButtonText}>Open in Google Maps</Text>
          </TouchableOpacity>
        ) : null}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f8fa' },
  imageContainer: { position: 'relative', width: '100%', height: 250, backgroundColor: '#e1e4e8' },
  campusImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  placeholderImage: { width: '100%', height: '100%' },
  backButton: { position: 'absolute', top: 50, left: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  contentCard: { backgroundColor: '#fff', marginTop: -20, borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40, minHeight: 500 },
  tag: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginBottom: 12 },
  tagText: { fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
  title: { fontSize: 26, fontWeight: '800', color: '#1a1a1a', marginBottom: 10 },
  addressRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  addressIcon: { fontSize: 16, marginRight: 6 },
});