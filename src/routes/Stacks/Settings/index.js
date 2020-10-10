import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Settings from "../../../pages/Settings";
import EditProfile from "../../../pages/EditProfile";
import EditPassword from "../../../pages/EditPassword";

const AppStack = createStackNavigator();

export default function SettingsStackScreen() {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerBackTitleVisible: true,
      }}
    >
      <AppStack.Screen
        name="Settings"
        options={{
          headerTitleAlign: "center",
          headerTitle: "Configurações",
        }}
        component={Settings}
      />
      <AppStack.Screen
        name="EditProfile"
        options={{
          headerTitleAlign: "center",
          headerTitle: "Editar perfil",
          headerBackTitleVisible: false,
        }}
        component={EditProfile}
      />
      <AppStack.Screen
        name="EditPassword"
        options={{
          headerTitleAlign: "center",
          headerTitle: "Alterar senha",
          headerBackTitleVisible: false,
        }}
        component={EditPassword}
      />
    </AppStack.Navigator>
  );
}
