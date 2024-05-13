
import React from 'react';
import { View, Text } from 'react-native';
import Authentification from './Screens/Authentification';
import Accueil from './Screens/Accueil';
import NewUser from './Screens/NewUser';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from './Screens/Chat';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="authentification" component={Authentification} />
        <Stack.Screen name="newuser" component={NewUser} />
        <Stack.Screen name="accueil" component={Accueil} />
        <Stack.Screen name="chat" component={Chat} />
       

      </Stack.Navigator>
    </NavigationContainer>
  );
}
