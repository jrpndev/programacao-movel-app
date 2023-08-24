import React, { useEffect } from "react";
import { View, Image, StyleSheet, BackHandler } from 'react-native';
import { useNavigation, useIsFocused } from "@react-navigation/native";

export default function App() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  useEffect(() => {
    if (isFocused) {
      // Recarregue sua lógica de carregamento da imagem aqui

      const timer = setTimeout(() => {
        navigation.navigate('Login');
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [isFocused, navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../img/img.png')}
        style={styles.imagem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03b6fc',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imagem: {
    width: 130,
    height: 120
  }
});
