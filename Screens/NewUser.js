import { StatusBar } from 'expo-status-bar';
import { BackHandler, Button, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import firebase from "../Config";
const auth = firebase.auth();




export default function NewUser(props) {
    var email,pwd="",cpwd;

  return (
    <ImageBackground 
    source={require("../assets/backnew.jpg")}
    style={styles.container}>
      <View 
      style={{
      backgroundColor:"#0003",
      width:"95%",
      height:280,
      alignItems:"center",
      justifyContent:"center",
      borderRadius:10,
      borderColor:"white",
      borderWidth:2,
      }}>
      <Text style={{
      fontSize:34,
      fontStyle:"italic",
      fontWeight:"bold",
      color:"white",
      borderRadius:5,
    }}>New User
     </Text>
     
    <TextInput 
    onChangeText={(ch)=>{email=ch;}}
    keyboardType='email-address'
    placeholder='Email'
     style={styles.inputstyle}
     ></TextInput>
    <TextInput
     onChangeText={(ch)=>{pwd=ch;}}
     placeholder ="***" 
    secureTextEntry={true} 
    style={styles.inputstyle}
    ></TextInput>
     <TextInput
     onChangeText={(ch)=>{cpwd=ch;}}
     placeholder ="***" 
    secureTextEntry={true} 
    style={styles.inputstyle}
    ></TextInput>

    <View 
    style={{
      flexDirection:"row",
       

  }}>
    <Button 
    onPress={()=>{
      if (pwd === cpwd && pwd.length > 5){
        auth.createUserWithEmailAndPassword(email,pwd)

        .then(() => {props.navigation.replace("accueil",{currentid:auth.currentUser.uid});})
        .catch((err) => {alert(err)});
      }else{
          alert("verifier les mots de passe");
      }
       
       
    }}
    title="SignIn"></Button>
    <Button 
    onPress={()=>{
       
        props.navigation.goBack();
    }}
    title='Back'></Button>
    </View>
    </View> 
    <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink', //pour changer la couleur de bachground en rose
    alignItems: 'center', //aligenemt horizontale
    justifyContent: 'center',//alignement verticale 
  },
  inputstyle:{
    width:"90%",
    height:50,
    margin:10,
    fontSize:18,
    textAlign:"center",
    borderRadius:7,
    backgroundColor:"white",
  }
});
//Auto selon le mode de telifoun (light /dark)