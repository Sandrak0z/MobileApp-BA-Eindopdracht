import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function NewsDetails() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>News Details Scherm</Text>
      <Text style={styles.subText}>Hier kun je straks de nieuwste nieuwsartikelen lezen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 },
  text: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  subText: { fontSize: 16, color: '#666', textAlign: 'center' }
});