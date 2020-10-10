import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";

import Dashboard from "../../../pages/Dashboard";

import logo from "../../../assets/logo.png";

//Auth Context
import { Context } from "../../../context/AuthContext";

const AppStack = createStackNavigator();

export default function DashboardStackScreen() {
  const { handleLogout } = useContext(Context);

  return (
    <AppStack.Navigator
      screenOptions={{
        headerBackTitleVisible: true,
      }}
    >
      <AppStack.Screen
        name="Dashboard"
        options={{
          headerTitleAlign: "center",
          headerTitle: () => (
            <Image
              source={logo}
              style={{ width: 130, height: 25 }}
              resizeMode="contain"
            />
          ),
        }}
        component={Dashboard}
      />
    </AppStack.Navigator>
  );
}
