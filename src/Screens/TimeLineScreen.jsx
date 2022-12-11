import {
  View,
  Text,
  Dimensions,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
} from "react-native";
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
import NetworkStatus from "../Components/NetworkStatus";
import { clearParams } from "../Redux/paramsSlice";
const TimeLineScreen = () => {
  // const [address] = useGetData();

  const today = new Date();
  const d = moment(today).format("dddd");
  const date = moment(today).format("D MMMM , YYYY");
  const { height } = Dimensions.get("window");
  const [lectures, setLectures] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [l, setL] = useState("");
  const { day } = useSelector((state) => state.day);
  const { year, dep } = useSelector((state) => state.params);
  const { data, isOnline, isLoading } = useSelector((state) => state.days);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const { getData } = useGetData();
  const onRefresh = React.useCallback(() => {
    getData();
  }, []);
  const checkInternet = async () => {
    const network = await Network.getNetworkStateAsync();
    return network.isConnected;
  };

  useEffect(() => {
    let y = data?.find((i) => i._id === day);
    if (y) {
      setLectures(y.lectures || []);
    } else {
      setLectures([]);
    }
  }, [day, data]);

  const renderData = () => {
    if (isLoading) {
      return (
        <View className="h-72 items-center justify-center">
          <Image
            source={require("../../assets/loading.gif")}
            className="w-24 h-24"
          />
        </View>
      );
    }
    if (lectures.length === 0) {
      return (
        <View className="h-72 items-center justify-center">
          <Image
            source={require("../../assets/empty-box.png")}
            className="w-24 h-24"
          />
        </View>
      );
    }
    if (lectures) {
      return lectures?.map((lecture) => (
        <TimeLineItem lecture={lecture} key={lecture._id} />
      ));
    }
  };
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
          <TouchableOpacity onPress={() => dispatch(clearParams())}>
            <Text>clear</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <View className="w-full h-7 bg-white absolute bottom-0 left-0 right-0 rounded-tl-xl rounded-tr-xl" />
      </LinearGradient>
      <DaysList />
      {/* FIXME: margin */}
      <View className=" mt-4 h-[53%]">
        <ScrollView
          overScrollMode="never"
          className="mb-9"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* {data?.map((lecture) => (
            <TimeLineItem lecture={lecture} key={lecture._id} />
          ))} */}
          {renderData()}
        </ScrollView>
      </View>
      {!isOnline && <NetworkStatus />}
    </View>
  );
};

export default TimeLineScreen;
