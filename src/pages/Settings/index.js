import React, { useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";

import { Context } from './../../context/AuthContext';

export default function Settings() {

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
    })();
  }, []);

  const { signOut } = useContext(Context);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.block_header}>
        <Text style={styles.block_title}>Conta</Text>
      </View>

      <TouchableOpacity style={styles.block_button} onPress={() => navigation.push('EditProfile')}>
        <Text>Editar perfil</Text>
        <MaterialCommunityIcons
          name="arrow-right"
          size={20}
          color="#3B3B3B"
          style={{ marginLeft: 20 }}
        />
      </TouchableOpacity>

      <View style={styles.block_header}>
        <Text style={styles.block_title}>Outros</Text>
      </View>

      <TouchableOpacity style={styles.block_button}>
        <Text>Sobre o app</Text>
        <MaterialCommunityIcons
          name="arrow-right"
          size={20}
          color="#3B3B3B"
          style={{ marginLeft: 20 }}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.block_button} onPress={() => signOut()}>
        <Text>Sair</Text>
        <MaterialCommunityIcons
          name="arrow-right"
          size={20}
          color="#3B3B3B"
          style={{ marginLeft: 20 }}
        />
      </TouchableOpacity>
    </ScrollView>
  );
}
