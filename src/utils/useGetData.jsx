import axios from "axios";
import * as Network from "expo-network";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDays } from "../Redux/daysSlice";

const daysArr = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const useGetData = () => {
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useDispatch();
  const { year, dep } = useSelector((state) => state.params);
  const { day } = useSelector((state) => state.day);
  const { days, isLoading, isError } = useSelector((state) => state.days);
  const checkInternet = async () => {
    const network = await Network.getNetworkStateAsync();
    setIsConnected(network.isConnected);
  };
  const getData = async () => {
    try {
      // `https://uni-api-v1.vercel.app/api/v1/lecture?date=${router.query["date"]}&dep=${params.dep}&year=${params.year}`
      const res = await axios.get(
        // `http://localhost:5000/api/v1/lecture/get-grouped-lectures?dep=${dep}&year=${year}`
        `https://uni-api-v1.vercel.app/api/v1/lecture/get-grouped-lectures?dep=${dep}&year=${year}`
      );
      const r = await res.data.lectures;
      // dispatch(setDays({ days: res.data.lectures }));
      console.log(r);
    } catch (error) {
      console.log(error);
    }
  };
  getData();
};
