import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const CoursesScreen = () => {
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      <LinearGradient
        className="h-[30%] w-full rounded-b-xl"
        colors={["#5B86E5", "#36D1DC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      ></LinearGradient>
      <View className="px-4 pt-6">
        <Text className="text-lg font-semibold ">Courses</Text>
        <View className="h-[80%] pt-4">
          <ScrollView
            className="flex-1 mb-4"
            showsVerticalScrollIndicator={false}
          >
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const Item = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Course")}
      activeOpacity={0.8}
      className="bg-gray-300 p-4 rounded-xl flex-row items-center justify-between h-24 mb-4 overflow-hidden"
    >
      <Image
        className="absolute"
        source={require("../../assets/bg-pattern-footer-desktop.png")}
      />
      <View>
        <Text className="text-base font-semibold">Computer Sin </Text>
        <Text className="text-xs text-white mt-1">MT2439</Text>
      </View>
      <View className="bg-slate-900 w-12 h-12 rounded-xl items-center justify-center ">
        <Feather name="chevron-right" size={24} color="gray" />
      </View>
    </TouchableOpacity>
  );
};

export default CoursesScreen;
