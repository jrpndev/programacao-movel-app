import React, { useState } from "react";
import { CheckBox } from "react-native-web";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-web";
import database from 'react-native-firebase/database';
import { Auth } from "firebase/auth";
import { auth } from "../../../bd/firebase";


function FormTaskFragment() {

    componentDidMount =() => {
        let dbRef = database().ref(`usuario_id/${this.state.userid}`)
        this.listenerFirebase(dbRef)
    }


  const navigation = useNavigation();
  const [taskname, setInputName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("todo"); // Adicione um estado para controlar o status selecionado

  const criarTarefa = () => {
    // Crie um objeto com os dados da tarefa
    const newTask = {
      name: taskname,
      status: selectedStatus,
    };

    // Salve a tarefa no Realtime Database
    firebase.database().ref("tasks").push(newTask);
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
              value={selectedStatus === "todo"}
              onValueChange={() => setSelectedStatus("todo")}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxLabel}>A fazer</Text>
          </View>

          <View style={styles.checkboxes}>
            <CheckBox
              value={selectedStatus === "doing"}
              onValueChange={() => setSelectedStatus("doing")}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxLabel}>Em progresso</Text>
          </View>

          <View style={styles.checkboxes}>
            <CheckBox
              value={selectedStatus === "done"}
              onValueChange={() => setSelectedStatus("done")}
              style={styles.checkbox}
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
