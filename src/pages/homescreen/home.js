import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import {firebase, auth} from '../../bd/firebase';
function HomeScreen() {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Verifica se o usuário está autenticado
    const user = auth.currentUser;
    if (user) {
      // ID do usuário logado
      const userId = user.uid;

      // Consulta as tarefas onde o campo "userId" é igual ao ID do usuário
      const tasksRef = firebase.firestore().collection("tasks").where("userId", "==", userId);

      // Define um observador para ouvir as atualizações na coleção "tasks"
      const unsubscribe = tasksRef.onSnapshot((querySnapshot) => {
        const updatedTasks = [];
        querySnapshot.forEach((doc) => {
          updatedTasks.push({ id: doc.id, ...doc.data() });
        });
        setTasks(updatedTasks);
      });

      // Não se esqueça de cancelar a inscrição quando o componente for desmontado
      return () => unsubscribe();
    }
  }, []);

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
      <TouchableOpacity onPress={() => { navigation.navigate("nova tarefa") }} style={styles.addButton}>
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
    position: "relative",
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
