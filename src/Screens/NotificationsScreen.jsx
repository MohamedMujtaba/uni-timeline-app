import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import NotificationListItem from "../Components/NotificationListItem";
import { useNavigation } from "@react-navigation/native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { Layout, Transition, useSharedValue } from "react-native-reanimated";

const NotificationsScreen = () => {
  const { notifications } = useSelector((state) => state.notifications);
  const navigation = useNavigation();
  return (
    <GestureHandlerRootView className="flex-1 bg-white">
      <SafeAreaView className="  px-4 py-3 items-center justify-between flex-row">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">Notifications</Text>
        <TouchableOpacity>
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>
      </SafeAreaView>
      <View className="px-4 py-2">
        <Text className="text-gray-400 text-center">
          *Swipe to the left to delete a notification
        </Text>
      </View>
      <ScrollView
        className="flex-1 pt-2 "
        contentContainerStyle={{ alignItems: "center" }}
      >
        {notifications.map((item, index) => {
          return (
            <NotificationListItem
              item={item}
              index={index}
              key={item.request.identifier + item.date}
            />
          );
        })}
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default NotificationsScreen;
