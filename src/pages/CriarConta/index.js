import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Importar getAuth e createUserWithEmailAndPassword

function App() {
  const navigation = useNavigation(); 

  const [textInputEmail, setInputEmail] = useState('');
  const [textInputSenha, setInputSenha] = useState('');

  const handleCreateAccount = async () => {
    try {
      const auth = getAuth(); // Inicializar o módulo de autenticação
      await createUserWithEmailAndPassword(auth, textInputEmail, textInputSenha); // Criar conta usando o auth
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

        <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
          <Text style={styles.buttonText}>Criar Conta</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#03b6fc',
  },
  texts: {
    fontSize: 18,
    color: 'white',
    marginTop: 8
  },
  forms: {
    flexDirection: "column",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 50
  },
  inputs: {
    height: 50,
    backgroundColor: "white",
    marginBottom: 10,
    padding: 12,
    borderRadius: 6
  },
  button: {
    backgroundColor: '#03b6fc',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    fontSize: 15,
    textAlign: 'center',
    color: 'white'
  }
});

export default App;
