import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth"; // Importar getAuth e sendPasswordResetEmail

function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const [textInputEmail, setInputEmail] = useState('');

  const handleForgotPassword = async () => {
    try {
      const auth = getAuth(); // Inicializar o módulo de autenticação
      await sendPasswordResetEmail(auth, textInputEmail); 
      console.log("Email de recuperação de senha enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar email de recuperação de senha:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.forms}>
        <Text style={styles.texts}>Email:</Text>
        <TextInput
          placeholder="Digite seu email"
          style={styles.inputs}
          onChangeText={(text) => setInputEmail(text)}
        />

        <TouchableOpacity onPress={handleForgotPassword} style={styles.button}>
          <Text style={styles.buttonText}>Enviar Email de Recuperação</Text>
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

export default ForgotPasswordScreen;
