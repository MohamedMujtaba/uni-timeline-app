import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const NetworkStatus = () => {
  return (
    <View className="h-10 px-4 bg-slate-700 absolute bottom-0 right-0 left-0 flex-row items-center">
      <Ionicons
        name="ios-information-circle-outline"
        size={22}
        color="#ef4444"
      />
      <Text className="text-red-400 ml-2">
        You are offline! , The data maybe out dated
      </Text>
    </View>
  );
};

export default NetworkStatus;
