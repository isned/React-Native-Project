import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Users from './AccueilScreens/Users';
import MyGroups from './AccueilScreens/MyGroups';
import MyProfil from './AccueilScreens/MyProfil';

const Tab = createMaterialBottomTabNavigator();

export default function Accueil(props) {
  const currentid= props.route.params.currentid;
  return (
    <Tab.Navigator>
     <Tab.Screen options= {{title:"Profils"}} name="users" component={Users} initialParams={{currentid:currentid}}  ></Tab.Screen>
     <Tab.Screen options= {{title:"Groups"}} name="mygroups" component={MyGroups} ></Tab.Screen>
     <Tab.Screen options= {{title:"Profil"}} name="myprofil" component={MyProfil} initialParams={{currentid:currentid}} 

     ></Tab.Screen>
    </Tab.Navigator>
  );
}
