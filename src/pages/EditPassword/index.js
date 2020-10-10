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

import api from "../../services/api";
import { Context } from  "./../../context/AuthContext";

import styles from "./styles";

export default function EditPassword() {
  const navigation = useNavigation();
  const { signOut } = useContext(Context);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

  async function handleUpdate() {
    try {
      await api.put("/password", {
        oldPassword,
        newPassword,
        newPasswordConfirmation
      });

      Toast.show("A senha foi atualizada com sucesso. Por favor, autentique-se novamente!", Toast.LONG);

      signOut();
      
    } catch (error) {
      Toast.show("Ocorreu um erro, verifique as informações!", Toast.LONG);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputs_container}>
        <View style={styles.input_container}>
          <Text style={styles.input_label}>SENHA ATUAL</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="senha atual"
            onChangeText={(txt) => setOldPassword(txt)}
            style={styles.input_text}
          />
        </View>

        <View style={styles.input_container}>
          <Text style={styles.input_label}>NOVA SENHA</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="nova senha"
            onChangeText={(txt) => setNewPassword(txt)}
            style={styles.input_text}
          />
        </View>

        <View style={styles.input_container}>
          <Text style={styles.input_label}>CONFIRMAR NOVA SENHA</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="confirmar nova senha"
            onChangeText={(txt) => setNewPasswordConfirmation(txt)}
            style={styles.input_text}
          />
        </View>
      </View>

      <TouchableOpacity activeOpacity={0.8} onPress={() => handleUpdate()}>
        <LinearGradient
          start={[0, 1]}
          end={[1, 0]}
          colors={["#01B075", "#01C075"]}
          style={styles.gradient_button}
        >
          <Text style={styles.text_button_update}>Alterar senha!</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}
