import React from 'react';
import { StyleSheet, Text, View, StatusBar, AppRegistry } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      
      <View style={styles.content}>
        <Text style={styles.text}>test!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50, 
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});

AppRegistry.registerComponent('main', () => App);