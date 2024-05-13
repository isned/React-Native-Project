import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground, StatusBar, Alert } from 'react-native';

export default function MyGroups({ groups, navigation }) {
  const handleCreateGroup = () => {
    // Afficher une simple alerte
    Alert.alert('Create Group', 'Button "Create Group" pressed!');
  };

  return (
    <ImageBackground
      source={require("../../assets/image1.jpg")}
      style={styles.container}
    >
      <StatusBar style="dark" />
      <Text style={styles.title}>My Groups</Text>
      <FlatList
        data={groups}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.groupItem}
            onPress={() => navigation.navigate("GroupDetails", { groupId: item.id })}
          >
            <Text style={styles.groupName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
      />
      <TouchableOpacity onPress={handleCreateGroup} style={styles.createButton}>
        <Text style={styles.createButtonText}>Create Group</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 32,
    fontFamily: 'serif',
    color: '#4682b4',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  groupItem: {
    backgroundColor: '#f5f5f5',
    elevation: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  groupName: {
    fontSize: 18,
  },
  createButton: {
    backgroundColor: '#4682b4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
