import React, { useState } from "react";
import { StyleSheet, TextInput, Alert, View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, firebase } from "../../../bd/firebase";
import CheckBox from 'react-native-check-box';

function FormTaskFragment() {
  const navigation = useNavigation();
  const [taskName, setTaskName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("todo");

  const criarTarefa = async () => {
    const newTask = {
      name: taskName,
      status: selectedStatus,
    };

    const userId = auth.currentUser.uid;

    try {
      // Primeiro, verifique se a coleção 'tasks' existe no banco de dados
      const tasksCollectionRef = firebase.firestore().collection('tasks');
      const docRef = tasksCollectionRef.doc(userId);

      const doc = await docRef.get();

      if (!doc.exists) {
        // Se a coleção não existe, crie-a
        await docRef.set({});
      }

      // Agora, adicione a tarefa ao documento do usuário
      await docRef.collection('userTasks').add(newTask);

      Alert.alert("Sucesso", "A tarefa foi criada com sucesso!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputs}
        placeholder="Nome da tarefa"
        onChangeText={(text) => setTaskName(text)}
      />
      <Text style={styles.texts}>Status</Text>

      <View style={styles.checkboxesRow}>

        <Text style={styles.checkboxLabel}>A fazer</Text>

        <CheckBox
          isChecked={selectedStatus === "doing"}
          onClick={() => setSelectedStatus("doing")}
        />
        <Text style={styles.checkboxLabel}>Em progresso</Text>

        <CheckBox
          isChecked={selectedStatus === "done"}
          onClick={() => setSelectedStatus("done")}
        />
        <Text style={styles.checkboxLabel}>Concluído</Text>
      </View>

      <TouchableOpacity onPress={criarTarefa} style={styles.button}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#03b6fc",
    alignItems: "center",
    paddingTop: 20, // Adiciona espaço no topo
    paddingHorizontal: 20, // Espaço horizontal para os lados
  },
  checkboxesRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginLeft : 10,
  },
  checkboxLabel: {
    margin: 10, 
    fontSize: 18,
    color: "white",
  },
  texts: {
    fontSize: 18,
    color: "white",
  },
  inputs: {
    width: "100%", // Ocupa todo o width da tela
    height: 50,
    backgroundColor: "white",
    marginBottom: 10,
    padding: 12,
    borderRadius: 6,
  },
  button: {
    backgroundColor: "white", // Fundo branco
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    width: "100%", // Ocupa todo o width da tela
    position: "absolute", // Posição absoluta na parte inferior
    bottom: 0, // Alinha na parte inferior
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
    color: "black", // Texto preto
  },
});

export default FormTaskFragment;
