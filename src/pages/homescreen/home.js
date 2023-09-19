import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-web";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

function HomeScreen() {
  const navigation = useNavigation();
  const tasks = [];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Tarefas</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.title}</Text>
          </View>
        )}
      />
      <TouchableOpacity onPress={() => { navigation.navigate("nova tarefa")}} style={styles.addButton}>
        <View style={styles.iconContainer}>
          <FontAwesomeIcon name="plus" size={30} color="#03b6fc" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "#03b6fc",
    paddingHorizontal: 20,
    position: "relative", // Permite que os elementos dentro dele sejam posicionados de forma absoluta
  },
  header: {
    fontSize: 24,
    color: "white",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  taskItem: {
    backgroundColor: "white",
    marginBottom: 10,
    padding: 12,
    borderRadius: 6,
  },
  taskTitle: {
    fontSize: 18,
  },
  addButton: {
    position: "absolute",
    bottom: 20, 
    right: 20, 
  },
  iconContainer: {
    backgroundColor: "white",
    borderRadius: 50, 
    padding: 12,
  },
});

export default HomeScreen;
