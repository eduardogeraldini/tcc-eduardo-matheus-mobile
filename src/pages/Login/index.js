import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Context } from "../../context/AuthContext";
import styles from "./styles";

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(Context);

  const toRegister = () => {
    navigation.navigate("Register");
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.img_container}>
        <Image
          source={require("../../assets/home_logo.png")}
          resizeMode="contain"
          style={styles.img_home_logo}
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

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => signIn(email, password)}
      >
        <LinearGradient
          start={[0, 1]}
          end={[1, 0]}
          colors={["#01B075", "#01C075"]}
          style={styles.gradient_button}
        >
          <Text style={styles.text_button_login}>Autenticar-se!</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/*<TouchableOpacity activeOpacity={0.5} onPress={toRegister}>
        <Text style={styles.text_footer}>
          Você ainda não possui uma conta ?{" "}
          <Text style={styles.text_register}>Registrar-se!</Text>
        </Text>
       </TouchableOpacity>*/}

    </ScrollView>
  );
}
