import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Feather, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import CourseBottomSheet from "../Components/CourseBottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";

const CourseScreen = () => {
  const bottomSheetRef = useRef(null);

  return (
    <GestureHandlerRootView style={{ flex: 1 }} className="flex-1 bg-white">
      <BottomSheetModalProvider>
        <StatusBar style="light" />
        <LinearGradient
          className="h-[20%]  w-full rounded-b-xl"
          colors={["#5B86E5", "#36D1DC"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        ></LinearGradient>
        <View className="px-4 pt-4 mb-4">
          {/* <Text className="text-lg font-semibold ">Lectures</Text> */}
          <View className="h-[100%] ">
            <ScrollView
              className="flex-1 mb-4"
              showsVerticalScrollIndicator={false}
            >
              <Item bottomSheetRef={bottomSheetRef} />
              <Item bottomSheetRef={bottomSheetRef} />
              <Item bottomSheetRef={bottomSheetRef} />
              <Item bottomSheetRef={bottomSheetRef} />
              <Item bottomSheetRef={bottomSheetRef} />
              <Item bottomSheetRef={bottomSheetRef} />
              <Item bottomSheetRef={bottomSheetRef} />
            </ScrollView>
          </View>
        </View>
        <CourseBottomSheet bottomSheetRef={bottomSheetRef} />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const Item = ({ bottomSheetRef }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        bottomSheetRef.current.snapToIndex(0);
      }}
      activeOpacity={0.8}
      className="bg-gray-300 p-4 rounded-xl flex-row items-center justify-between  h-24 mb-4 overflow-hidden"
    >
      <Image
        className="absolute"
        source={require("../../assets/bg-pattern-footer-desktop.png")}
      />
      <View className=" flex-row items-center">
        <View className="bg-slate-900 w-12 h-12 rounded-xl items-center justify-center mr-4">
          <Text className="text-xl text-gray-100">1.1</Text>
        </View>
        <View>
          <View className="flex-row items-baseline">
            <Text className="text-base font-semibold">Computer Sin</Text>
            {/* <Text className="text-xs text-white mt-1"> (MT2439)</Text> */}
          </View>
          {/* <Text className="text-xs text-white mt-1">MT2439</Text> */}
          <View className="flex-row mt-1">
            <View className="mr-1">
              <Ionicons name="ios-videocam-outline" size={18} color="#60a5fa" />
            </View>
            <View className="mr-1">
              <Ionicons name="mic-outline" size={18} color="#22c55e" />
            </View>
            {/* <Ionicons
              name="ios-file-tray-full-outline"
              size={18}
              color="#f59e0b"
            /> */}
            <Ionicons name="ios-newspaper-outline" size={18} color="#f59e0b" />
          </View>
        </View>
      </View>

      <View>
        {/* <Ionicons name="ios-videocam-outline" size={15} color="black" />
        <Ionicons name="mic-outline" size={15} color="black" />
        <Ionicons name="ios-file-tray-full-outline" size={15} color="black" /> */}
      </View>
    </TouchableOpacity>
  );
};

export default CourseScreen;
