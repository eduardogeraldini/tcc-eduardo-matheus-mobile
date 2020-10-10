import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-simple-toast";
import api from "./../../services/api";

import styles from "./styles";

export default function Register() {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  async function handleRegister() {
    try {
      await api.post("/users", {
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation,
      });

      Toast.show("A sua conta foi registrada com sucesso.", Toast.LONG);

      navigation.navigate("Login");
    } catch (error) {
      Toast.show("Ocorreu um erro, verifique as informações!", Toast.LONG);
    }
  }

  const toAuth = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputs_container}>
        <View style={styles.input_container}>
          <Text style={styles.input_label}>NOME</Text>
          <TextInput
            placeholder="nome"
            onChangeText={(txt) => setFirstName(txt)}
            style={styles.input_text}
          />
        </View>

        <View style={styles.input_container}>
          <Text style={styles.input_label}>SOBRENOME</Text>
          <TextInput
            placeholder="sobrenome"
            onChangeText={(txt) => setLastName(txt)}
            style={styles.input_text}
          />
        </View>

        <View style={styles.input_container}>
          <Text style={styles.input_label}>E-MAIL</Text>
          <TextInput
            placeholder="usuario@usuario.com.br"
            onChangeText={(txt) => setEmail(txt)}
            style={styles.input_text}
          />
        </View>

        <View style={styles.input_container}>
          <Text style={styles.input_label}>SENHA</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="minhasenha"
            onChangeText={(txt) => setPassword(txt)}
            style={styles.input_text}
          />
        </View>

        <View style={styles.input_container}>
          <Text style={styles.input_label}>CONFIRMAR SENHA</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="minhasenha"
            onChangeText={(txt) => setPasswordConfirmation(txt)}
            style={styles.input_text}
          />
        </View>
      </View>

      <TouchableOpacity activeOpacity={0.8} onPress={() => handleRegister()}>
        <LinearGradient
          start={[0, 1]}
          end={[1, 0]}
          colors={["#F58524", "#F92B7F"]}
          style={styles.gradient_button}
        >
          <Text style={styles.text_button_login}>Registrar-se!</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.5} onPress={toAuth}>
        <Text style={styles.text_footer}>
          Você já possui uma conta ?{" "}
          <Text style={styles.text_register}>Autenticar-se!</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
