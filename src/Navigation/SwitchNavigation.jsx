import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../Screens/LoginScreen";
import TimeLineScreen from "../Screens/TimeLineScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const SwitchNavigation = () => {
  const { year, dep } = useSelector((state) => state.params);
  const { token } = useSelector((state) => state.token);
  if (!year || !dep || !token) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="login" component={LoginScreen} />
      </Stack.Navigator>
    );
  }
  if (year && dep && token) {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      >
        <Tab.Screen
          name="Root"
          component={TimeLineScreen}
          options={{
            tabBarVisible: false,
          }}
        />
      </Tab.Navigator>
    );
  }
};

export default SwitchNavigation;
