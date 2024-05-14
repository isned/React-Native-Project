import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, FlatList, StyleSheet, Image, TouchableOpacity, Platform, Linking } from 'react-native';
import { Button, Dialog } from 'react-native-paper';
import firebase from '../../Config';

const database = firebase.database();

export default function Users(props) {
  const currentid = props.route.params.currentid;
  const [data, setdata] = useState([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [itemPressed, setItemPressed] = useState({});

  useEffect(() => {
    const ref_users = database.ref("users");

    ref_users.on("value", (datasnapshot) => {
      let d = [];
      datasnapshot.forEach((one_user) => {
        if (one_user.val().Id != currentid) d.push(one_user.val());
      });
      setdata(d);
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
      source={require("../../assets/back.jpg")}
      style={styles.container}
    >
      <Text style={styles.heading}>Users</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userCard}
            onPress={() => {
              setItemPressed(item);
              setIsDialogVisible(true);
            }}
          >
            <Image style={styles.userImage} source={require("../../assets/profil.png")} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.Nom}</Text>
              <Text style={styles.userDetail}>{item.Pseudo}</Text>
              <Text style={styles.userDetail}>{item.Telephone}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
      />
      <Dialog visible={isDialogVisible}>
        <Dialog.Title>Details and  options</Dialog.Title>
        <Dialog.Content>
          <Image style={styles.dialogImage} source={itemPressed.Url ? { uri: itemPressed.Url } : require("../../assets/profil.png")} />
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
  heading: {
    textAlign: "center",
    fontSize: 28,
    
   
    marginTop: 20,
    
    fontFamily: "serif",
    color: "#4682b4",
    fontWeight: "bold",
  },
  flatList: {
    margin: 5,
  },
  userCard: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    elevation: 5,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
    height: 100,
    paddingHorizontal: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    marginRight: 20
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  userDetail: {
    fontSize: 14,
    color: 'gray',
  },
  dialogImage: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
