import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import "firebase/auth";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../bd/firebase";
// Importe o objeto "auth" do seu arquivo de configuração

function App() {
  const app = auth;

  const navigation = useNavigation();

  const [textInputEmail, setInputEmail] = useState("");
  const [textInputSenha, setInputSenha] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth,"liliene@gmail.com", "123456");
      navigation.navigate("homescreen")
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const handleCreateAccount = async () => {
    try {
      await createUserWithEmailAndPassword(textInputEmail, textInputSenha);
      console.log("Conta criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar conta:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.forms}>
        <Text style={styles.texts}>Email:</Text>
        <TextInput
          placeholder="email@email.com"
          style={styles.inputs}
          onChangeText={(text) => setInputEmail(text)}
        />

        <Text style={styles.texts}>Senha:</Text>
        <TextInput
          placeholder="****"
          style={styles.inputs}
          onChangeText={(text) => setInputSenha(text)}
        />

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Criar Conta")}>
          <Text style={styles.buttonText}>Criar Conta</Text>
        </TouchableOpacity>

        
        <TouchableOpacity onPress={() => navigation.navigate("Esqueceu a Senha")}>
          <Text style={styles.buttonText}>Esqueci senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
//stilização do app, precisa mudar algumas coisas
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "#03b6fc",
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
    fontSize: 15,
    textAlign: "center",
    color: "white",
  },
});

export default App;
