import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  EvilIcons,
  Ionicons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
} from "@expo/vector-icons";

const TimeLineItem = ({ lecture }) => {
  const { title, code, time, hall, status } = lecture;
  const getColor = (s) => {
    if (s === "listed") return "#bef264";
    if (s === "unknown") return "#c4b5fd";
    if (s === "canceled") return "#fb7185";
  };
  return (
    <View className="flex-row w-full h-40 items-center justify-evenly">
      <View className="h-full w-[10%] items-center justify-center">
        <View
          className="h-[100%] bg-gray-400"
          style={{
            width: StyleSheet.hairlineWidth,
          }}
        />
        <View className="absolute bg-white">
          <Text>{time || "99:99"}</Text>
        </View>
        <View
          className="w-[15] h-[15]  rounded-full items-center justify-center z-20 absolute top-0"
          style={{
            backgroundColor: getColor(status),
          }}
        >
          <View className="w-[7] h-[7] bg-white rounded-full" />
        </View>
      </View>
      <View
        className="w-[80%] h-[90%] border-gray-400 rounded-xl p-4"
        style={{ borderWidth: StyleSheet.hairlineWidth }}
      >
        <Text className="font-semibold text-base text-left">{title}</Text>
        <Text className="text-gray-500 text-xs ">{code}</Text>
        <View className="flex-row items-center justify-start">
          <MaterialIcons name="my-location" size={18} color="black" />
          <Text className="ml-1">Falcory of Engnering, </Text>
          <Text>{hall}</Text>
        </View>
      </View>
    </View>
  );
};

export default TimeLineItem;
