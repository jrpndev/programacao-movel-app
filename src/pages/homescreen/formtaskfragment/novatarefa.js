import React, { useState } from "react";
import { StyleSheet, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, firebase } from "../../../bd/firebase";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import CheckBox from 'react-native-check-box'; // Importe o CheckBox corretamente

function FormTaskFragment() {
  const navigation = useNavigation();
  const [taskname, setInputName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("todo");

  const criarTarefa = async () => {
    const newTask = {
      name: taskname,
      status: selectedStatus,
    };

    const userId = auth.currentUser.uid;

    const connection = firebase.firestore().collection('tasks').doc(userId);

    try {
      await connection.update(newTask);
      Alert.alert("Sucesso", "A tarefa foi criada com sucesso!");
    } catch (error) {
      console.log(error);
    }
    consol.log('foi clicado');
  };

  return (
    <View style={styles.container}>
      <View style={styles.forms}>
        <Text>Nome da tarefa</Text>
        <TextInput
          style={styles.inputs}
          onChangeText={(text) => setInputName(text)}
        />

        <View style={styles.checkboxContainer}>
          <Text>Status</Text>
          <View style={styles.checkboxes}>
            <CheckBox
              isChecked={selectedStatus === "todo"} // Use isChecked em vez de value
              onClick={() => setSelectedStatus("todo")} // Use onClick em vez de onValueChange
            />
            <Text style={styles.checkboxLabel}>A fazer</Text>
          </View>

          <View style={styles.checkboxes}>
            <CheckBox
              isChecked={selectedStatus === "doing"} // Use isChecked em vez de value
              onClick={() => setSelectedStatus("doing")} // Use onClick em vez de onValueChange
            />
            <Text style={styles.checkboxLabel}>Em progresso</Text>
          </View>

          <View style={styles.checkboxes}>
            <CheckBox
              isChecked={selectedStatus === "done"} // Use isChecked em vez de value
              onClick={() => setSelectedStatus("done")} // Use onClick em vez de onValueChange
            />
            <Text style={styles.checkboxLabel}>Concluído</Text>
          </View>
        </View>

        <TouchableOpacity onPress={criarTarefa} style={styles.button}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "#03b6fc",
  },
  checkboxContainer: {
    flexDirection: "column",
    marginBottom: 20,
  },
  checkboxes: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 18,
    color: "white",
  },
  texts: {
    fontSize: 18,
    color: "white",
    marginTop: 8,
  },
  forms: {
    flexDirection: "column",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 50,
  },
  inputs: {
    height: 50,
    backgroundColor: "white",
    marginBottom: 10,
    padding: 12,
    borderRadius: 6,
  },
  button: {
    backgroundColor: "#03b6fc",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    backgroundColor: "white",
    width: 100,
    fontSize: 15,
    textAlign: "center",
    color: "#03b6fc",
  },
});

export default FormTaskFragment;
