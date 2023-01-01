import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { saveParams } from "../Redux/paramsSlice";
import { useNavigation } from "@react-navigation/native";
import { useGetData } from "../utils/useGetData";
import { setData } from "../Redux/daysSlice";

const deps = ["Pet", "Civ", "Chem"];
const years = ["019", "018", "017"];

const LoginScreen = () => {
  const [d, setD] = React.useState("");
  const [y, setY] = React.useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { year, dep } = useSelector((state) => state.params);
  const { data } = useSelector((state) => state.days);
  useGetData();
  const save = () => {
    dispatch(saveParams({ year: y, dep: d }));
  };

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <View className="w-[90%] items-center">
        <Image
          source={require("../../assets/dizzy-education.gif")}
          className="w-full"
        />
      </View>
      {deps.map((item, index) => {
        return (
          <TouchableOpacity
            key={index.toString() + item}
            className="bg-red-300 p-4 mb-2"
            onPress={() => setD(item)}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        );
      })}
      {years.map((item, index) => {
        return (
          <TouchableOpacity
            key={index.toString() + item}
            className="bg-lime-200 p-4 mb-2"
            onPress={() => setY(item)}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        onPress={() => {
          save();
        }}
      >
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

//  <Picker
//         selectedValue={d}
//         onValueChange={(itemValue, itemIndex) => setD(itemIndex.toString())}
//         style={{
//           width: 100,
//           height: 50,
//           // backgroundColor: "#000",
//         }}
//       >
//         <Picker.Item label="Pet" value="Pet" />
//         <Picker.Item label="Civ" value="Civ" />
//       </Picker>
//       <Picker
//         selectedValue={y}
//         onValueChange={(itemValue, itemIndex) => dispatch(setPra)}
//         style={{
//           width: 100,
//           height: 50,
//           // backgroundColor: "#000",
//         }}
//       >
//         <Picker.Item label="019" value="019" />
//         <Picker.Item label="018" value="018" />
//       </Picker>
