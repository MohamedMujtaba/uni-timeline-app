import { View, Text, Dimensions, StyleSheet } from "react-native";
import React from "react";
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeInRight,
  Layout,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { removeNotification } from "../Redux/notificationSlice";
import { useRef } from "react";
import { useEffect } from "react";

const WIDTH = Dimensions.get("window").width;
const NotificationListItem = ({ item, index }) => {
  const tX = useSharedValue(0);
  const opacity = useSharedValue(0);
  const dispatch = useDispatch();
  const init = useRef(true);
  useEffect(() => {
    init.current = false;
  }, []);
  const remove = (i, t) => {
    dispatch(
      removeNotification({
        id: i,
        time: t,
      })
    );
  };
  const panGesture = Gesture.Pan()
    .onChange((event) => {
      if (event.translationX > 0) {
        return;
      } else {
        tX.value = event.translationX;
        opacity.value = withTiming(1);
        let ready = -tX.value > WIDTH * 0.2;
        if (ready) {
          opacity.value = withTiming(1);
        } else {
          opacity.value = withTiming(0);
        }
      }
    })
    .onEnd(() => {
      // start.value = tX.value;
      let ready = -tX.value > WIDTH * 0.3;
      if (ready) {
        tX.value = withTiming(-WIDTH, undefined, (isFinished) => {
          if (isFinished) {
            opacity.value = 0;
            runOnJS(remove)(item.request.identifier, item.date);
          }
        });
      } else {
        tX.value = withTiming(0);
      }
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tX.value }],
    };
  }, []);
  const tStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  return (
    <Animated.View
      entering={init.current ? FadeIn.delay(index * 100) : FadeIn}
      // exiting={FadeInLeft}
      className="w-full items-center justify-center mb-2"
      layout={Layout.delay(50)}
    >
      <GestureDetector gesture={panGesture}>
        <Animated.View
          className="w-[90%] h-[90] bg-white  rounded-md p-4 z-20"
          style={[styles.container, rStyle]}
        >
          <Text className="text-left text-base font-semibold mb-1">
            {item.request?.content.title}
          </Text>
          <Text className="text-gray-500">{item.request?.content.body}</Text>
        </Animated.View>
      </GestureDetector>
      <Animated.View
        className="h-full items-center justify-center absolute right-[10%]"
        style={[tStyle]}
      >
        <AntDesign name="delete" size={24} color="red" />
      </Animated.View>
    </Animated.View>
  );
};

export default NotificationListItem;

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
