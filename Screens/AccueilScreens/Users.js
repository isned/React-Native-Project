import { View, Text, ImageBackground, FlatList, StyleSheet, Image, TouchableOpacity, Platform, Linking } from 'react-native';
import React, { useState,useEffect } from 'react';

import firebase from '../../Config';
import { DataSnapshot, set } from 'firebase/database';
import { Button, Dialog } from 'react-native-paper';
const database = firebase.database();




export default function Users(props) {
  const currentid=props.route.params.currentid;
  const [data,setdata] = useState([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false)
  const [itemPressed,setItemPressed]=useState({})
  useEffect(() => {
    const ref_users=database.ref("users");
    //datasnapchot reference des copies
    ref_users.on("value",(datasnapshot)=>{
      let d =[];
      datasnapshot.forEach((one_user) => {
      
        if (one_user.val().Id!= currentid)  d.push(one_user.val());
       
    });
    setdata(d);
    console.log(data);
  });
  
    return () => {
      ref_users.off();
    }
  }, []);


  const closeDialog = () => {
    setIsDialogVisible(false);
  };
  
 
  
  

  return (
    <ImageBackground
      source={require("../../assets/image1.jpg")}
      style={styles.container} 
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 28,
          fontWeight: "bold",
          color: "green",
          marginTop: 20
        }}
      >
        Users
      </Text>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#f5f5f5",
                elevation: 5,
                margin: 10,
                borderRadius: 5,
                alignItems: 'center',
                height: 100, 
              }}
            >
              <TouchableOpacity onPress={()=>{
                setItemPressed(item)
                setIsDialogVisible(true);
              }}
              >
             <Image style={{ width: 50, height: 50, marginRight: 20 }} source={require("../../assets/profil.png")} />


              </TouchableOpacity>
              <View>
                <Text>{item.Nom}</Text>
                
                <Text>{item.Pseudo}</Text>
                <Text>{item.Telephone}</Text>
              </View>

            </View>
          );
        }}
        style={{
          margin: 5,
        }}
      />
      <Dialog visible={isDialogVisible}>
        <Dialog.Title>Details et options</Dialog.Title>
        <Dialog.Content>
          <Image style={{ width: 100, height: 100, marginRight: 20 }} source={itemPressed.Url ? { uri: itemPressed.Url } : require("../../assets/profil.png")} />
          <Text>{itemPressed.Nom + " " + itemPressed.Prenom + itemPressed.Telephone + itemPressed.Pseudo}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => { Platform.OS === "android" ? Linking.openURL("tel:" + itemPressed.Telephone) : Linking.openURL("telprompot:" + itemPressed.Telephone); }}>Call</Button>
          <Button onPress={() => { props.navigation.navigate("chat", { currentid: currentid, secondid: itemPressed.Id }) }}>Chat</Button>
          <Button onPress={closeDialog}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});