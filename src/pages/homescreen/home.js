import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { firebase, auth } from "../../bd/firebase";

function HomeScreen() {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);
  const [uid, setUid] = useState(null); // Estado para armazenar o uid do usuário

  useEffect(() => {
    // Verifica se o usuário está autenticado
    const user = auth.currentUser;
    if (user) {

      const userId = user.uid;

      console.log("Id do usuario : " , userId);

      setUid(userId);

      // Consulta as tarefas do usuário atual
      const tasksRef = firebase.firestore().collection("tasks").doc(userId).collection('userTasks');

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
      {tasks.length === 0 ? (
        <Text style={styles.noTasks}>Nenhuma tarefa encontrada</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskTitle}>{item.name}</Text>
              <Text style={styles.taskStatus}>{item.status}</Text>
            </View>
          )}
        />
      )}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("nova tarefa");
        }}
        style={styles.addButton}
      >
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
  taskStatus: {
    fontSize: 16,
    color: "#03b6fc",
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
  noTasks: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginTop: 50, // Ajuste conforme necessário
  },
});

export default HomeScreen;
