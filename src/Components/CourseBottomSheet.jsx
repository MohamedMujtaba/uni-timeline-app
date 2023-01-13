import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";

const CourseBottomSheet = ({ bottomSheetRef }) => {
  // ref

  // variables
  const snapPoints = useMemo(() => ["70%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  // renders
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      style={{
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,

        elevation: 24,
      }}
    >
      <View className="flex-1 items-center p-4">
        <Item
          actions={
            <View className="items-center">
              <TouchableOpacity className="p-1">
                <Ionicons name="play-outline" size={24} color="#22c55e" />
              </TouchableOpacity>
              <TouchableOpacity className="p-1">
                <Ionicons name="download-outline" size={24} color="#60a5fa" />
              </TouchableOpacity>
            </View>
          }
          Icon={
            <Ionicons name="ios-videocam-outline" size={24} color="#60a5fa" />
          }
        />
        <Item
          actions={
            <View className="items-center">
              <TouchableOpacity className="p-1">
                <Ionicons name="download-outline" size={24} color="#60a5fa" />
              </TouchableOpacity>
            </View>
          }
          Icon={<Ionicons name="mic-outline" size={24} color="#22c55e" />}
        />
        <Item
          actions={
            <View className="items-center">
              <TouchableOpacity className="p-1">
                <Ionicons name="download-outline" size={24} color="#60a5fa" />
              </TouchableOpacity>
            </View>
          }
          Icon={
            <Ionicons name="ios-newspaper-outline" size={18} color="#f59e0b" />
          }
        />
      </View>
    </BottomSheet>
  );
};

const Item = ({ Icon, actions }) => {
  return (
    <View className="w-full bg-gray-300 p-4 rounded-xl flex-row items-center justify-between  h-24 mb-4 overflow-hidden">
      <View className=" flex-row items-center">
        <View className="bg-slate-900 w-12 h-12 rounded-xl items-center justify-center mr-4">
          {Icon}
        </View>
        <View>
          <View className="items-baseline">
            <Text className="text-base font-semibold">Computer Sin</Text>
            <Text className="text-xs text-white mt-1"> (MT2439)</Text>
          </View>
          {/* <Text className="text-xs text-white mt-1">MT2439</Text> */}
          <View className="flex-row mt-1">
            <View className="mr-1"></View>
            <View className="mr-1"></View>
            {/* <Ionicons
              name="ios-file-tray-full-outline"
              size={18}
              color="#f59e0b"
            /> */}
          </View>
        </View>
      </View>

      <View className="flex-row">{actions}</View>
    </View>
  );
};
export default CourseBottomSheet;
