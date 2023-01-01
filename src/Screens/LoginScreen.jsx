import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { saveParams } from "../Redux/paramsSlice";
import { useNavigation } from "@react-navigation/native";
import { useGetData } from "../utils/useGetData";
import { setData } from "../Redux/daysSlice";
import AnimatedList from "../Components/AnimatedList";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

const deps = ["Pet", "Civ", "Chem"];
const years = ["019", "018", "017"];

const LoginScreen = () => {
  const [d, setD] = React.useState("Pet");
  const [y, setY] = React.useState("021");
  const [s, setS] = React.useState("Sem1");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { year, dep } = useSelector((state) => state.params);
  const { data } = useSelector((state) => state.days);
  useGetData();
  const save = () => {
    dispatch(saveParams({ year: y, dep: d }));
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 bg-white items-center ">
        <Image
          source={require("../../assets/dizzy-education.gif")}
          className="w-full"
        />
        <View className="w-[90%] items-center">
          <View className="mb-2">
            <Text className="text-lg text-clip w-full mb-1">Major</Text>
            <AnimatedList
              data={["Pet", "EE", "Mec", "Civ", "Agr", "Min", "Chem", "Sur"]}
              setSelected={setD}
            />
          </View>
          <View className="mb-2">
            <Text className="text-lg text-clip w-full mb-1">Year</Text>
            <AnimatedList
              data={["021", "020", "019", "018", "017", "016"]}
              setSelected={setY}
            />
          </View>
          <View className="mb-2">
            <Text className="text-lg text-clip w-full mb-1">
              Current Semester
            </Text>
            <AnimatedList
              w={80}
              data={[
                "Sem1",
                "Sem2",
                "Sem3",
                "Sem4",
                "Sem5",
                "Sem6",
                "Sem7",
                "Sem8",
                "Sem9",
                "Sem10",
              ]}
              setSelected={setS}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => dispatch(saveParams({ year: y, dep: d }))}
          activeOpacity={0.9}
          className="flex-row w-[90%] h-12 bg-[#5B86E5] items-center justify-between rounded-md px-4 absolute bottom-0 "
        >
          <Text className="text-lg text-white">Next</Text>
          <MaterialIcons name="navigate-next" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
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
