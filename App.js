import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Entrada from './Screens/Entrada';
import Email from './Screens/Email';
const Stack = createStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name= "Entrada" component = {Entrada} options={{headerShown: false}}/>
      <Stack.Screen name= "E-mail" component = {Email} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}