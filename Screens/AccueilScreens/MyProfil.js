import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
 


import * as ImagePicker from "expo-image-picker";
import firebase from "../../Config";
const database = firebase.database();
 





export default function MyProfil(props) {
  const currentid=props.route.params.currentid;
  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Telephone, setTelephone] = useState("");
  const [Pseudo, setPseudo] = useState("");
  const [uriImage, setUriImage] = useState();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    // console.log(result);
  
    if (!result.canceled) {
      setUriImage(result.assets[0].uri);
    }
  };
  //image en caractere imageToBlob
  const imageToBlob = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob"; //bufferArray
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    return blob;
  };
  
  const uploadImageToStorage=async(uri) =>{
    const storage = firebase.storage();
    const ref_les_photos=storage.ref("lesphotos");
    const ref_une_photo = ref_les_photos.child(currentid);
    //const ref_une_photo=ref_les_photos.child("photo");

    const blob=await imageToBlob(uri);
    await ref_une_photo.put(blob);
    const newURL = await ref_une_photo.getDownloadURL();
    return newURL;
  }

  
  return (
    <ImageBackground
      source={require("../../assets/image1.jpg")}
      style={styles.container}
    >
      <StatusBar style="dark" />
      <Text style={styles.textstyle}>My profil</Text>
      <TouchableOpacity onPress={() => {
          pickImage();
      }}>
        <Image
          source={
            uriImage ? { uri : uriImage} : require("../../assets/profilimage.png")}
          style={{
            height: 150,
            width: 150,
            borderRadius:75,
          }}
        ></Image>
      </TouchableOpacity>
 
      <TextInput
        onChangeText={(text) => {
          setNom(text);
        }}
        textAlign="center"
        placeholderTextColor="#0005"
        placeholder="Nom"
        keyboardType="name-phone-pad"
        style={styles.textinputstyle}
      ></TextInput>
      <TextInput
        onChangeText={(text) => {
          setPrenom(text);
        }}
        textAlign="center"
        placeholderTextColor="#0005"
        placeholder="Prenom"
        keyboardType="name-phone-pad"
        style={styles.textinputstyle}
      ></TextInput>
      <TextInput
        onChangeText={(text) => {
          setTelephone(text);
        }}
        placeholderTextColor="#0005"
        textAlign="center"
        placeholder="Telephone"
        keyboardType="phone-pad"
        style={styles.textinputstyle}
      ></TextInput>
      <TextInput
        onChangeText={(text) => {
          setPseudo(text);
        }}
        placeholderTextColor="#0005"
        textAlign="center"
        placeholder="Pseudo"
        style={styles.textinputstyle}
      ></TextInput>
 
      <TouchableOpacity
        onPress={async() => {
          const newURL=await uploadImageToStorage(uriImage);
          const ref_users = database.ref("users");
         // const key=ref_users.push().key;
          const ref_one_user=ref_users.child(currentid);
          if (newURL && Nom.length>0)
        
          ref_one_user.set({
            Nom,
            Prenom,
            Telephone,
            Pseudo,
            Url:newURL,
            Id:currentid
          })
          .then(()=>{
            alert("ajout avec succées")
          })
          .catch(()=>{
            alert("erreur")
          });

        }}
        disabled={false}
        activeOpacity={0.5}
        underlayColor="#DDDDDD"
        style={{
          marginBottom: 10,
          backgroundColor: "#4682a0",
          textstyle: "italic",
          fontSize: 24,
          height: 40,
          width: "50%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Save
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  textinputstyle: {
    fontStyle: "italic",
    backgroundColor: "#0002",
    fontSize: 13,
    width: "70%",
    height: 40,
    borderRadius: 5,
    margin: 5,
  },
  textstyle: {
    fontSize: 32,
    fontFamily: "serif",
    color: "#4682b4",
    fontWeight: "bold",
  },
  container: {
    paddingTop: 40,
    color: "blue",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});