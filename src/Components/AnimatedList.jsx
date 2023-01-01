import * as React from "react";
import { View, Pressable, TouchableWithoutFeedback, Text } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { Dimensions } from "react-native";

export const ElementsText = {
  AUTOPLAY: "AutoPlay",
};

export const window = Dimensions.get("window");
const PAGE_WIDTH = 60;
const PAGE_HEIGHT = 40;

const AnimatedList = ({ w, data, vertical = false, setSelected }) => {
  const r = React.useRef(null);
  const AutoPLay = useToggleButton({
    defaultValue: false,
    buttonTitle: ElementsText.AUTOPLAY,
  });
  const [loop, setLoop] = React.useState(true);

  return (
    <View>
      <View>
        <Carousel
          vertical={vertical}
          key={`${loop}`}
          ref={r}
          loop={loop}
          style={{
            width: window.width * 0.9,
            height: PAGE_HEIGHT,
            justifyContent: "center",
            alignItems: "center",
          }}
          width={w || PAGE_WIDTH}
          height={PAGE_HEIGHT}
          data={data}
          renderItem={({ item, animationValue }) => {
            return (
              <Item
                animationValue={animationValue}
                label={item}
                onPress={() =>
                  r.current?.scrollTo({
                    count: animationValue.value,
                    animated: true,
                  })
                }
              />
            );
          }}
          autoPlay={AutoPLay.status}
          onSnapToItem={(index) => setSelected(data[index])}
        />
      </View>
    </View>
  );
};

const Item = (props) => {
  const { animationValue, label, onPress } = props;

  const translateY = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    );

    return {
      opacity,
    };
  }, [animationValue]);

  const labelStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [1, 1.25, 1],
      Extrapolate.CLAMP
    );

    const color = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ["#b6bbc0", "#0071fa", "#b6bbc0"]
    );

    return {
      transform: [{ scale }, { translateY: translateY.value }],
      color,
    };
  }, [animationValue, translateY]);

  const onPressIn = React.useCallback(() => {
    translateY.value = withTiming(-1, { duration: 250 });
  }, [translateY]);

  const onPressOut = React.useCallback(() => {
    translateY.value = withTiming(0, { duration: 250 });
  }, [translateY]);

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View
        style={[
          {
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          },
          containerStyle,
        ]}
      >
        <Animated.Text style={[{ fontSize: 18, color: "#26292E" }, labelStyle]}>
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
};

const SButton = (props) => {
  const { children, visible = true, onPress } = props;

  if (!visible) {
    return <></>;
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          style={{
            marginTop: 20,
            backgroundColor: "#26292E",
            borderRadius: 50,
            paddingHorizontal: 20,
            padding: 10,
          }}
        >
          <Text style={{ color: "white" }}>{children}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

function useToggleButton(opts) {
  const { buttonTitle, defaultValue = false } = opts;
  const [status, setStatus] = React.useState(defaultValue);

  const button = React.useMemo(() => {
    return (
      <SButton onPress={() => setStatus(!status)}>
        {buttonTitle}: {`${status}`}
      </SButton>
    );
  }, [status, buttonTitle]);

  return {
    status,
    button,
  };
}

export default AnimatedList;
