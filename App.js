import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { SafeAreaProvider } from "react-native-safe-area-context";
import TimeLineScreen from "./src/Screens/TimeLineScreen";

import React, { useState, useEffect, useRef } from "react";
import { registerForPushNotificationsAsync } from "./src/utils/registerForPushNotificationsAsync";
import { persistor, store } from "./src/Redux/store";
import { Provider, useSelector, useDispatch } from "react-redux";
import { saveToken } from "./src/Redux/expoTokenSlice";
import * as Notifications from "expo-notifications";
import { PersistGate } from "redux-persist/integration/react";
import SwitchNavigation from "./src/Navigation/SwitchNavigation";
import axios from "axios";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatefullApp />
      </PersistGate>
    </Provider>
  );
}

const StatefullApp = () => {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const dispatch = useDispatch();
  const { token: savedToken } = useSelector((state) => state.token);
  const { dep, year } = useSelector((state) => state.params);

  const addTokenToDataBase = async (t) => {
    try {
      await axios.post(
        `https://uni-api-v1.vercel.app/api/v1/session?sessionName=${dep}-${year}`,
        { token: t }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      // if (!savedToken) {
      dispatch(saveToken({ token: token }));
      console.log(token);
      // }
    });
    addTokenToDataBase(savedToken);

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SwitchNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
