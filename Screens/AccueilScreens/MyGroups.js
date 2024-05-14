import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground, StatusBar, Image, TextInput } from 'react-native';
import { Button, Dialog } from 'react-native-paper';
import firebase from '../../Config';

const database = firebase.database();

const MyGroups = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isSelectingRecipients, setIsSelectingRecipients] = useState(false);
  const [message, setMessage] = useState("");

  const fetchUsers = () => {
    const refUsers = database.ref("users");

    refUsers.on("value", (snapshot) => {
      const users = snapshot.val();
      if (users) {
        const userList = Object.keys(users).map(key => ({ id: key, ...users[key] }));
        setData(userList);
      }
    });

    return () => {
      refUsers.off();
    };
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleSelectingRecipients = () => {
    setIsSelectingRecipients(!isSelectingRecipients);
    setSelectedUsers([]); // Clear selected users when toggling
  };

  const handleUserPress = (user) => {
    if (isSelectingRecipients) {
      toggleUserSelection(user);
    } else {
      // Handle regular user press action here
    }
  };

  const toggleUserSelection = (user) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(selectedUsers.filter((selectedUser) => selectedUser !== user));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const sendMessageToSelectedUsers = () => {
    // Implement your logic to send a message to selected users here
    console.log("Selected Users:", selectedUsers);
    console.log("Message:", message);
    // Navigate to chat screen with selected users
    selectedUsers.forEach(user => {
      navigation.navigate("Chat", { currentid: 'currentUserIdHere', secondid: user.id, message });
    });
    // Clear message after sending
    setMessage("");
    // Exit selection mode
    setIsSelectingRecipients(false);
  };
  

  return (
    <ImageBackground
      source={require("../../assets/back.jpg")}
      style={styles.container}
    >
      <StatusBar style="dark" />
      <Text style={styles.title}>Groups</Text>
      
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleUserPress(item)}>
            <View style={[styles.userContainer, selectedUsers.includes(item) && styles.selectedUser]}>
              <Image style={styles.userImage} source={require("../../assets/profil.png")} />
              <View>
                <Text>{item.Nom}</Text>
                <Text>{item.Pseudo}</Text>
                <Text>{item.Telephone}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        style={styles.listContainer}
      />
      {isSelectingRecipients && (
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={sendMessageToSelectedUsers} style={styles.sendButton}>
            Send Message
          </Button>
        </View>
      )}
      {!isSelectingRecipients && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Write your message"
            value={message}
            onChangeText={setMessage}
          />
          <View style={styles.buttonContainer}>
            <Button 
              mode="contained"
              onPress={toggleSelectingRecipients}
              style={styles.selectButton}
            >
              <Text style={styles.buttonText}>Select Recipients</Text>
            </Button>
          </View>
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
    fontSize: 28,
    fontFamily: "serif",
    color: "#4682b4",
  },
  listContainer: {
    margin: 5,
  },
  userContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    elevation: 5,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    height: 100,
    paddingHorizontal: 10,
  },
  selectedUser: {
    backgroundColor: "#add8e6", // Light blue background for selected user
    borderColor: "#4682b4", // Border color for selected user
    borderWidth: 2,
  },
  userImage: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  buttonContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  inputContainer: {
    margin: 10,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#ffffff",
  },
  sendButton: {
    backgroundColor: "#4682b4",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  selectButton: {
    backgroundColor: "#4682b4",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default MyGroups;
