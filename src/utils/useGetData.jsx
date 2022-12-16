import axios from "axios";
import * as Network from "expo-network";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData, setIsOnline, setLoading } from "../Redux/daysSlice";

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
  const { data, isLoading, isError, isOnline } = useSelector(
    (state) => state.days
  );

  // `https://uni-api-v1.vercel.app/api/v1/lecture?date=${router.query["date"]}&dep=${params.dep}&year=${params.year}`
  // `http://localhost:5000/api/v1/lecture/get-grouped-lectures?dep=${dep}&year=${year}`
  const checkInternet = async () => {
    const network = await Network.getNetworkStateAsync();
    setIsConnected(network.isConnected);
    dispatch(setIsOnline({ isOnline: network.isConnected }));
  };
  const getData = async () => {
    await checkInternet();
    if (isOnline) {
      try {
        dispatch(setLoading({ isLoading: true }));
        const res = await axios.get(
          `https://uni-api-v1.vercel.app/api/v1/lecture/get-grouped-lectures?dep=${dep}&year=${year}`
        );

        const r = await res.data.lectures;
        // dispatch(setDays({ days: res.data.lectures }));
        // console.log(r);
        dispatch(setData({ data: r }));
        dispatch(setLoading({ isLoading: false }));
      } catch (error) {
        dispatch(setLoading({ isLoading: false }));

        console.log(error);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [dep, year]);

  return { getData };
};
