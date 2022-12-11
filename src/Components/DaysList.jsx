import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { setDay } from "../Redux/daySlice";
const days = [
  {
    short: "Sun",
    val: "Sunday",
  },
  {
    short: "Mon",
    val: "Monday",
  },
  {
    short: "Tue",
    val: "Tuesday",
  },
  {
    short: "Thu",
    val: "Wednesday",
  },
  {
    short: "Fri",
    val: "Friday",
  },
  {
    short: "Sat",
    val: "Saturday",
  },
];

const DaysList = () => {
  const today = new Date();
  const d = moment(today).format("dddd");
  const { day } = useSelector((state) => state.day);
  const { data } = useSelector((state) => state.days);
  const dispatch = useDispatch();
  // console.log(data);
  // console.log(data.filter((item) => item._id === "Sunday")[0].lectures.length);
  return (
    <View className="px-4 mt-1">
      <FlatList
        data={days}
        keyExtractor={(item) => item.val}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => dispatch(setDay({ day: item.val }))}
              className="mr-2 border-gray-400 items-center justify-center rounded-xl w-16 h-20 px-2"
              style={{
                borderWidth: StyleSheet.hairlineWidth,
                backgroundColor: item.val === day ? "#60a5fa" : null,
              }}
            >
              <Entypo
                name="dot-single"
                size={20}
                color={
                  item.val === d
                    ? "#bef264"
                    : item.val === day
                    ? "#60a5fa"
                    : "#fff"
                }
              />
              <Text>{item.short}</Text>
              <Text>
                {data.filter((i) => i._id === item.val)[0]?.lectures.length ||
                  0}
              </Text>
            </TouchableOpacity>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default DaysList;
