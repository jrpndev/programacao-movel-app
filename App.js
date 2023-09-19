import React from "react";

import { View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Logo from "./src/pages/Logo";
import CriarConta from "./src/pages/CriarConta";
import TelaPassWord from "./src/pages/TelaPassWord";
import Login from "./src/pages/Login";
import HomeScreen from "./src/pages/homescreen/home";
import FormTaskFragment from "./src/pages/homescreen/formtaskfragment/novatarefa";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#A98CF3" barStyle="light-content" />

      <Stack.Navigator>
        <Stack.Screen
          name="Logo"
          component={Logo}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerLeft: () => <View />,
            headerTitleAlign: "center",
            headerBack: "none",
          }}
        />

        <Stack.Screen
          name="Criar Conta"
          component={CriarConta}
          options={{
            headerTitleAlign: "center", // Centraliza o título na barra de navegação
          }}
        />

        <Stack.Screen
          name="Esqueceu a Senha"
          component={TelaPassWord}
          options={{
            headerTitleAlign: "center", // Centraliza o título na barra de navegação
          }}
        />

        <Stack.Screen
          name="homescreen"
          component={HomeScreen}
          options={{
            headerTitleAlign: "center", // Centraliza o título na barra de navegação
          }}
        />

        <Stack.Screen
          name="nova tarefa"
          component={FormTaskFragment}
          options={{
            headerTitleAlign: "center", // Centraliza o título na barra de navegação
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
