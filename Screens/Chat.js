import React, { useState, useEffect } from "react";
import { FlatList, ImageBackground, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import firebase from "../Config";




const database = firebase.database();

export default function Chat(props) {
  const { currentid, secondid } = props.route.params;
//les use State faire le refresh comme le cas de tableau d 
  const [data, setdata] = useState([]);
  const [msg, setMsg] = useState("");

   //telecharger le contenu d'une refererence

  useEffect(() => {
    const ref_discussion = database.ref("discussion");
    const iddisc = currentid > secondid ? currentid + secondid : secondid + currentid;
    const ref_la_disc = ref_discussion.child(iddisc);

  
    const onDataUpdate = (snapshot) => {
      let d = [];
      snapshot.forEach((childSnapshot) => {
        d.push(childSnapshot.val());
      });
      setdata(d);
    };

    ref_la_disc.on("value", onDataUpdate);

    return () => {
      ref_la_disc.off("value", onDataUpdate);
    };
  }, [currentid, secondid]);

  const sendMessage = () => {
    const iddisc = currentid > secondid ? currentid + secondid : secondid + currentid;
    const ref_discussion = database.ref("discussion");
    const ref_la_disc = ref_discussion.child(iddisc);
    const key = ref_la_disc.push().key;
    const ref_un_msg = ref_la_disc.child(key);
    ref_un_msg.set({
      Time: new Date().toLocaleString(),
      Message: msg,
      Sender: currentid,
      Receiver: secondid,
    });
  

    setMsg("");
  };

  return (
    <ImageBackground style={styles.container} source={require("../assets/back.jpg")}>
      <FlatList
      //ici on va afficher le tableau d dans la liste FlatList qui est traité dans le useEffect la haut qui contient tous les chats
        data={data}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, currentid === item.Sender ? styles.userMessage : styles.otherMessage]}>
            <Text style={styles.messageText}>{item.Message}</Text>
            <Text style={styles.messageTime}>{item.Time}</Text>
          </View>
        )}
        style={styles.messageList}
        contentContainerStyle={styles.messageListContent}
        
      />
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(ch) => setMsg(ch)}
          placeholder="Your message"
          style={styles.textInput}
          value={msg}
        />
        <Button mode="contained" onPress={sendMessage} style={styles.sendButton}>
          Send
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  messageContainer: {
    maxWidth: "80%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#22f9",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ddd",
  },
  messageText: {
    fontSize: 16,
    color: "#fff",
  },
  messageTime: {
    fontSize: 12,
    color: "#ccc",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  textInput: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  sendButton: {
    borderRadius: 20,
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
  
   
  },
});