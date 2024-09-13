// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductList from '../Screens/ProductList/ProductList';
import ProductDetails from '../Screens/ProductDetails/ProductDetails';








const RootStack = createNativeStackNavigator<any>();
const RootStackScreen = () => (
  <RootStack.Navigator
    
    screenOptions={{headerShown: false}}>
    
    <RootStack.Screen name="ProductList" component={ProductList} options={{ title: 'Product List' }} />
    <RootStack.Screen name="ProductDetails" component={ProductDetails} options={{ title: 'Product Details' }} />
  </RootStack.Navigator>
);

const AppNavigator = () => (
   <NavigationContainer>
    <RootStackScreen />
  </NavigationContainer> 
 
);

export default AppNavigator;
