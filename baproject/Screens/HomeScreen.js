import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welkom bij Busleyden Atheneum</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('BlogDetails')}
      >
        <Text style={styles.buttonText}>Lees Nieuws</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#0066CC', padding: 12, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: '600' }
});