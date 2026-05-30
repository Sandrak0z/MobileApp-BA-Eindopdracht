import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function BlogDetails() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Blog Details Scherm</Text>
      <Text style={styles.subText}>Hier kun je straks de nieuwste blogartikelen lezen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 },
  text: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  subText: { fontSize: 16, color: '#666', textAlign: 'center' }
});