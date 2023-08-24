import React, {useState} from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"

import { useNavigation } from "@react-navigation/native";


function App() {
  const navigation = useNavigation();



  const [textEmail, setEmail] = useState ('');
  const [textInputEmail, setInputEmail] = useState ('');


  const [textSenha, setSenha] = useState ('');
  const [textInputSenha, setInputSenha] = useState ('');


  return (
    <View style={styles.container}>

      <View style={styles.forms}>
    

        
       
        
        <Text style={styles.texts}>Email:</Text>
        <TextInput
          placeholder="email@email.com"
          style={styles.inputs}
          onChangeText={ (text) => setInputEmail (text)}
        />

        <Text style={styles.texts}>Senha:</Text>
        <TextInput
          placeholder="****"
          style={styles.inputs}
          onChangeText={(text) => setInputSenha (text)}
        />

        <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.inputs}>
          <Text style={styles.textBtt}>Fazer Login</Text>
        </TouchableOpacity>

                
      </View>

    </View>
  );

  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:0,
    backgroundColor: '#03b6fc',

  },
  title:{
    fontSize:20,
    color:'white',
    textAlign:'center',
    borderWidth: 1,
    backgroundColor:'white',
    color:'#03b6fc',

  
  },
  texts:{
    fontSize:18,
    color:'white',
    marginTop:8
  },
  forms:{
    flexDirection:"column",
    marginLeft:10,
    marginRight:10,
    marginTop:50
  },
  inputs:{
    height:50,
    backgroundColor:"white",
    marginBottom:10,
    padding:12,
    borderRadius:6

  },
  textBtt:{
    fontSize:15,
    textAlign:'center',
    color: '#03b6fc'
    
    
  }
})
export default App;