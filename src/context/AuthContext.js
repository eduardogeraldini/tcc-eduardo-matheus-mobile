import React, { createContext, useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Toast from "react-native-simple-toast";

import api from "../services/api";

const Context = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const storageUser = await AsyncStorage.getItem("@DGAuth:user");
      const storageToken = await AsyncStorage.getItem("@DGAuth:token");

      if (storageUser && storageToken) {
        api.defaults.headers.Authorization = `Bearer ${storageToken}`;
        setAuthenticated(true);
      }

      setLoading(false);
    })();
  }, []);

  async function signIn(email, password) {
    try {
      const { data } = await api.post("/authenticate", {
        email,
        password,
      });

      const { user, token } = data;

      console.log({ user, token });

      AsyncStorage.setItem("@DGAuth:user", JSON.stringify(user));
      AsyncStorage.setItem("@DGAuth:token", token);

      api.defaults.headers.Authorization = `Bearer ${token}`; 

      setAuthenticated(true);
    } catch (error) {
      Toast.show(
        "Ocorreu um erro, verifique se as suas credenciais estão corretas!",
        Toast.LONG
      );
      setAuthenticated(false);
    }
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setAuthenticated(false);
      api.defaults.headers.Authorization = undefined;
    });
  }

  if (loading) {
    return (
      <>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      </>
    );
  }

  return (
    <Context.Provider value={{ authenticated, signIn, signOut }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
