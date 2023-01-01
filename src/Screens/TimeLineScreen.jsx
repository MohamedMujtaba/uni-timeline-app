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
import checkForUpdates from "../utils/checkForUpdates";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
} from "react-native-reanimated";
const TimeLineScreen = () => {
  // const [address] = useGetData();
  const navigation = useNavigation();
  const today = new Date();
  const d = moment(today).format("dddd");
  const date = moment(today).format("D MMMM");
  const { height } = Dimensions.get("window");
  const [lectures, setLectures] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [l, setL] = useState("");
  const { day } = useSelector((state) => state.day);
  const { year, dep } = useSelector((state) => state.params);
  const { notifications } = useSelector((state) => state.notifications);
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
        <Animated.View
          className="h-72 items-center justify-center"
          entering={FadeIn.delay(100)}
          exiting={FadeOut.duration(1)}
        >
          <Animated.Image
            source={require("../../assets/loading.gif")}
            className="w-24 h-24"
          />
        </Animated.View>
      );
    }
    if (lectures.length === 0) {
      return (
        <Animated.View
          entering={FadeInDown}
          exiting={FadeOut.duration(1)}
          className="h-72 items-center justify-center"
        >
          <Image
            source={require("../../assets/empty-box.png")}
            className="w-24 h-24"
          />
        </Animated.View>
      );
    }
    if (lectures) {
      return lectures?.map((lecture, index) => (
        <TimeLineItem lecture={lecture} key={lecture._id} index={index} />
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
          height: height * 0.2,
        }}
      >
        <SafeAreaView className="px-4 pb-10 flex-1 items-center justify-between flex-row">
          <TouchableOpacity
            onPress={() => {
              dispatch(clearParams());
            }}
          >
            <Text>clear</Text>
          </TouchableOpacity>
          <View>
            <Text className="text-base font-semibold text-white">{d}</Text>
            <Text className="text-xl font-semibold text-white">{date}</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Notifications")}
              activeOpacity={1}
              className="w-10 h-10 rounded-full items-center justify-center bg-slate-50"
            >
              {notifications.length !== 0 && (
                <Animated.View
                  entering={FadeIn}
                  exiting={FadeOut}
                  className="w-5 h-5 bg-blue-500 absolute -top-1 -right-1 z-50 rounded-full items-center justify-center"
                >
                  <Text
                    className="text-white"
                    style={{
                      fontSize: 10,
                    }}
                  >
                    {notifications.length}
                  </Text>
                </Animated.View>
              )}

              {/* <Ionicons
                name="md-notifications-outline"
                size={24}
                color="black"
              /> */}
              {notifications.length === 0 ? (
                <Image
                  source={require("../../assets/notification.png")}
                  className="w-6 h-6 z-10"
                />
              ) : (
                <Image
                  source={require("../../assets/notification.gif")}
                  className="w-6 h-6 z-10"
                />
              )}
            </TouchableOpacity>
            {/* <View className="w-full h-full bg-blue-300" /> */}
          </View>
        </SafeAreaView>
        <View className="w-full h-7 bg-white absolute bottom-0 left-0 right-0 rounded-tl-xl rounded-tr-xl" />
      </LinearGradient>
      <DaysList />
      {/* FIXME: margin */}
      <SafeAreaView className=" flex-1 items-center">
        <ScrollView
          overScrollMode="never"
          // className="mb-2"
          style={
            {
              // flex: 1,
            }
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {renderData()}
        </ScrollView>
      </SafeAreaView>
      {/* </View> */}
      <SafeAreaView>{!isOnline ? <NetworkStatus /> : null}</SafeAreaView>
      {/* <NetworkStatus /> */}
      {/* <SafeAreaView>
      </SafeAreaView> */}
    </View>
  );
};

export default TimeLineScreen;
