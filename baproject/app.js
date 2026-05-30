import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Screens/HomeScreen'; 
import CampusDetailsScreen from './Screens/CampusDetailsScreen'; 
import ProductDetails from './Screens/ProductDetails';
import NewsDetails from './Screens/NewsDetailsScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        
        <Stack.Screen 
          name="ProductDetails" 
          component={ProductDetails} 
          options={{ title: 'Product Details' }} 
        />
        
        <Stack.Screen 
          name="NewsDetails" 
          component={NewsDetails} 
          options={{ title: 'News Details' }} 
        />

        <Stack.Screen 
          name="CampusDetails" 
         component={CampusDetailsScreen} 
         options={{ title: 'Campus Informatie' }}
/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}