import { StatusBar } from 'expo-status-bar';
import { BackHandler, Button, ImageBackground, StyleSheet, Text, TextInput, View,TouchableOpacity ,useRef} from 'react-native';
import firebase from "../Config";
const auth = firebase.auth();
export default function Authentification(props) {
    var email="test@gmail.com",pwd="111111";
    //const  refinput2 = useRef();
  return (
    <ImageBackground 
    source={require("../assets/imageback1.jpg")}
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
      <Text style={{backgroundColor:"red",
      fontSize:34,
      fontStyle:"italic",
      fontWeight:"bold",
      color:"white",
      borderRadius:5,
    }}>BienVenue 
     </Text>
     
    <TextInput 
    
    onChangeText={(ch)=>{email=ch;}}
    onSubmitEditing={()=>{
      //refinput2.current.focus();
    }}
    blurOnSubmit={false}
    keyboardType='email-address'
    placeholder='email'
     style={styles.inputstyle}
     ></TextInput>
    <TextInput
     
     //ref={refinput2}
     onChangeText={(ch)=>{pwd=ch;}}
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

     
        
        auth
        .signInWithEmailAndPassword(email,pwd)
        .then(() => {
          const currentid=auth.currentUser.uid;
          props.navigation.navigate("accueil",{currentid:currentid});
        })
        .catch((err) => {alert(err)});
      
      


      
    }}
    title='Se Connecter'></Button>
    <Button 
    onPress={()=>{
        BackHandler.exitApp();//fermer l'application
    }}
    title='Annuler'></Button>
    </View>
    <TouchableOpacity style={{
      paddingRight:10,
      width:"100%",
      alignItems:"flex-end",

      }}>
     <Text 
     onPress={()=>{
      props.navigation.navigate("newuser");
     }}
     style={{width:"100%",textAlign:"right",marginRight:20,color:"white",marginTop:15}}>Créer un nouveau compte</Text>

    </TouchableOpacity >
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