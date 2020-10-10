import React, { useState, useEffect } from "react";
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

export default function EditProfile() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {

    async function loadUser() {

      const { data } = await api.get("/profile");

      setName(data.name);
      setEmail(data.email);
      setType(data.type);
      setCreatedAt(data.createdAt);
      setCompany(data.company.name);

    };

    loadUser();

  },[]);

  async function handleRegister() {
    try {
      await api.put("/profile", {
        name
      });

      Toast.show("O perfil foi atualizado com sucesso!", Toast.LONG);

      navigation.navigate("Settings");
    } catch (error) {
      Toast.show("Ocorreu um erro ao tentar atualizar o perfil!", Toast.LONG);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputs_container}>
        <View style={styles.input_container}>
          <Text style={styles.input_label}>NOME</Text>
          <TextInput
            placeholder="Nome"
            defaultValue={name}
            onChangeText={(txt) => setName(txt)}
            style={styles.input_text}
          />
        </View>

        <View style={styles.input_container}>
          <Text style={styles.input_label}>E-MAIL</Text>
          <TextInput
            placeholder="E-mail"
            defaultValue={email}
            editable={false}
            style={styles.input_text_disabled}
          />
        </View>

        <View style={styles.input_container}>
          <Text style={styles.input_label}>TIPO</Text>
          <TextInput
            placeholder="Cliente"
            defaultValue={type}
            editable={false}
            style={styles.input_text_disabled}
          />
        </View>

        <View style={styles.input_container}>
          <Text style={styles.input_label}>CRIADO EM</Text>
          <TextInput
            placeholder="Criado em"
            defaultValue={createdAt}
            editable={false}
            style={styles.input_text_disabled}
          />
        </View>

        <View style={styles.input_container}>
          <Text style={styles.input_label}>EMPRESA</Text>
          <TextInput
            placeholder="Empresa"
            defaultValue={company}
            editable={false}
            style={styles.input_text_disabled}
          />
        </View>

      </View>

      <TouchableOpacity activeOpacity={0.8} onPress={() => handleRegister()}>
        <LinearGradient
          start={[0, 1]}
          end={[1, 0]}
          colors={["#01B075", "#01C075"]}
          style={styles.gradient_button}
        >
          <Text style={styles.text_button_update}>Atualizar!</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}
