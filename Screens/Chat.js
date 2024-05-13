import React, { useState, useEffect } from "react";
import { FlatList, ImageBackground, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import firebase from "../Config";

const database = firebase.database();

export default function Chat(props) {
  const currentid = props.route.params.currentid;
  const secondid = props.route.params.secondid;
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState("");
  const [istypingVisible, setIstypingVisible] = useState(false);

  // Define ref_la_disc within the component
  const iddisc = currentid > secondid ? currentid + secondid : secondid + currentid;
  const ref_discussion = database.ref("discussion");
  const ref_la_disc = ref_discussion.child(iddisc);

  useEffect(() => {
    ref_la_disc.on("value", (DataSnapshot) => {
      let d = [];
      DataSnapshot.forEach((un_msg) => {
        d.push(un_msg.val());
      });
      setData(d);
    });

    return () => {
      ref_la_disc.off();
    };
  }, []);

  const ref_typing = ref_la_disc.child(secondid + "isTyping");
  useEffect(() => {
    ref_typing.on("value", (snapshot) => {
      setIstypingVisible(snapshot.val());
    });

    return () => {
      ref_typing.off();
    };
  }, []);

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/image1.jpg")}
    >
      <View style={{ flexDirection: "row" }}>
        <TextInput
          onFocus={() => {
            const ref_typing = ref_la_disc.child(currentid + "isTyping");
            ref_typing.set("true");
          }}
          onBlur={() => {
            const ref_typing = ref_la_disc.child(currentid + "isTyping");
            ref_typing.set("false");
          }}
          onChangeText={(ch) => {
            setMsg(ch);
          }}
          textColor="white"
          style={{
            margin: 5,
            width: "80%",
            height: 50,
            backgroundColor: "#0008",
            fontSize: 14,
            fontWeight: "bold",
          }}
        />
        <Button
          onPress={() => {
            const key = ref_la_disc.push().key;
            const ref_un_msg = ref_la_disc.child(key);
            ref_un_msg.set({
              Time: new Date().toLocaleString(),
              Message: msg,
              Sender: currentid,
              Receiver: secondid,
            });
          }}
          textColor="white"
          style={{
            margin: 5,
            justifyContent: "center",
            backgroundColor: "#22f9",
          }}
        >
          Send
        </Button>
      </View>
      {istypingVisible && <Text>istyping ...</Text>}
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (currentid === item.Sender)
            return (
              <View style={{ backgroundColor: "#0f04", margin: 5, alignItems: 'flex-end', }}>
                <Text>{item.Message}</Text>
                <Text>{item.Time}</Text>
              </View>
            );
          else
            return (
              <View style={{
                backgroundColor: '#0f04',
                margin: 5,
                alignItems: "flex-start",
              }}>
                <Text>{item.Message}</Text>
                <Text>{item.Time}</Text>
              </View>
            )
        }}
        style={{ margin: 5 }}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
  },
});
