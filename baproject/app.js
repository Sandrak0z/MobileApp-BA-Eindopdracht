import * as React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Screens/HomeScreen'; 
import ProductDetails from './Screens/ProductDetails';
import BlogDetails from './Screens/BlogDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        

        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Winkel' }} 
        />
        
        <Stack.Screen 
          name="ProductDetails" 
          component={ProductDetails} 
          options={{ title: 'Product Details' }} 
        />
        
        <Stack.Screen 
          name="BlogDetails" 
          component={BlogDetails} 
          options={{ title: 'Blog Details' }} 
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
