import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialCommunityIcons,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";

import { View, ActivityIndicator } from "react-native";

// Stacks screens
import DashboardStackScreen from "../routes/Stacks/Dashboard";
import SettingsStackScreen from "../routes/Stacks/Settings";
import AuthStackScreen from "../routes/Stacks/Auth";

// Tab navigation
const Tabs = createBottomTabNavigator();

//Auth Context
import { Context } from "./../context/AuthContext";

const TabsNavigation = () => (
  <Tabs.Navigator
    tabBarOptions={{
      showLabel: false,
      activeTintColor: "#01B075",
      style: { backgroundColor: "#FFF" },
      keyboardHidesTabBar: true,
    }}
    initialRouteName="Dashboard"
  >
    <Tabs.Screen
      name="Dashboard"
      component={DashboardStackScreen}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="chart-areaspline" size={25} color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="Settings"
      component={SettingsStackScreen}
      options={{
        tabBarLabel: "Configurações",
        tabBarIcon: ({ size, color }) => (
          <FontAwesome5 name="cog" size={20} color={color} />
        ),
      }}
    />
  </Tabs.Navigator>
);

export default function Routes() {
  const { authenticated } = useContext(Context);

  return (
    <NavigationContainer>
      {authenticated ? TabsNavigation() : AuthStackScreen()}
    </NavigationContainer>
  );
}
