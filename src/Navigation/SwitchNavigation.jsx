import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../Screens/LoginScreen";
import TimeLineScreen from "../Screens/TimeLineScreen";
import NotificationsScreen from "../Screens/NotificationsScreen";
import CoursesScreen from "../Screens/CoursesScreen";
import CourseScreen from "../Screens/CourseScreen";

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
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Root" component={TabNavigation} />
        <Stack.Screen name="Course" component={CourseScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
      </Stack.Navigator>
    );
  }
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="TimeLine" component={TimeLineScreen} />
      <Tab.Screen name="Courses" component={CoursesScreen} />
    </Tab.Navigator>
  );
};

export default SwitchNavigation;
