import { View, Text, Dimensions, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import DaysList from "../Components/DaysList";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import TimeLineItem from "../Components/TimeLineItem";
import axios from "axios";
import * as Network from "expo-network";
import { useSelector, useDispatch } from "react-redux";
import { useGetData } from "../utils/useGetData";
import { setDays } from "../Redux/daysSlice";
const TimeLineScreen = () => {
  // const [address] = useGetData();

  const today = new Date();
  const d = moment(today).format("dddd");
  const date = moment(today).format("D MMMM , YYYY");
  const { height } = Dimensions.get("window");
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [l, setL] = useState("");
  const { day } = useSelector((state) => state.day);
  const { year, dep } = useSelector((state) => state.params);
  const { days } = useSelector((state) => state.days);
  const dispatch = useDispatch();

  useEffect(() => {
    let y = days?.find((i) => i._id === day);
    setLectures(y.lectures);
    console.log(lectures.lectures);
  }, [day, days]);
  const getData = async () => {
    try {
      // `https://uni-api-v1.vercel.app/api/v1/lecture?date=${router.query["date"]}&dep=${params.dep}&year=${params.year}`
      const res = await axios.get(
        // `http://localhost:5000/api/v1/lecture/get-grouped-lectures?dep=${dep}&year=${year}`
        `https://uni-api-v1.vercel.app/api/v1/lecture/get-grouped-lectures?dep=Pet&year=019`
        // `https://uni-api-v1.vercel.app/api/v1/lecture/get-grouped-lectures?dep=${dep}&year=${year}`
      );
      const r = res.data.lectures;
      dispatch(setDays({ days: r }));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  // useGetData();
  // console.log(days);

  return (
    <View className="flex-1 bg-white ">
      {/* {days.map((i) => (
        <Text>{i.day}</Text>
      ))} */}
      <StatusBar />
      <LinearGradient
        colors={["#5B86E5", "#36D1DC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          height: height * 0.3,
        }}
      >
        <SafeAreaView className="px-4">
          <Text>{d}</Text>
          <Text>{date}</Text>
        </SafeAreaView>
        <View className="w-full h-7 bg-white absolute bottom-0 left-0 right-0 rounded-tl-xl rounded-tr-xl" />
      </LinearGradient>
      <DaysList />
      {/* FIXME: margin */}
      <View className="mb-[150] mt-4 h-[53%]">
        <ScrollView>
          {/* {lectures?.map((lecture) => (
            <TimeLineItem lecture={lecture} key={lecture._id} />
          ))} */}
        </ScrollView>
      </View>
    </View>
  );
};

export default TimeLineScreen;
