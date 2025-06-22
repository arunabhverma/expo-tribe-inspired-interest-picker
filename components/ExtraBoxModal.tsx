import { useTheme } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
} from "react-native";
import Animated, {
  AnimatedRef,
  interpolate,
  interpolateColor,
  runOnJS,
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants/Dimensions";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const ExtraBoxModal = ({
  inputRef,
  extraBoxValue,
  setShowExtraBox,
  activeExtraBoxPosition,
  setExtraBoxText,
}: {
  inputRef: AnimatedRef<TextInput>;
  extraBoxValue: SharedValue<number>;
  setShowExtraBox: (value: boolean) => void;
  activeExtraBoxPosition: SharedValue<{ x: number; y: number }>;
  setExtraBoxText: (value: string) => void;
}) => {
  const theme = useTheme();

  const animatedStyle = useAnimatedStyle(() => {
    const endWidth = SCREEN_WIDTH * 0.75;
    const centerX = (SCREEN_WIDTH - endWidth) / 2;
    const minY = (SCREEN_HEIGHT - 3.5 * 100) / 2;
    const width = interpolate(extraBoxValue.value, [0, 1], [100, endWidth]);
    const height = interpolate(extraBoxValue.value, [0, 1], [100, 1.5 * 100]);
    const borderRadius = interpolate(extraBoxValue.value, [0, 1], [15, 20]);
    const translateX = interpolate(
      extraBoxValue.value,
      [0, 1],
      [activeExtraBoxPosition.value.x, centerX]
    );
    const translateY = interpolate(
      extraBoxValue.value,
      [0, 1],
      [activeExtraBoxPosition.value.y, minY]
    );
    const backgroundColor = interpolateColor(
      extraBoxValue.value,
      [0, 1],
      ["transparent", theme.colors.border]
    );
    return {
      width,
      height,
      transform: [{ translateX }, { translateY }],
      borderRadius,
      backgroundColor,
    };
  });

  const animTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(extraBoxValue.value, [0, 1], [0, 1]);
    const fontSize = interpolate(extraBoxValue.value, [0, 1], [12, 25]);
    const translateY = interpolate(extraBoxValue.value, [0, 1], [0, -35]);
    return {
      opacity,
      fontSize,
      transform: [{ translateY }],
    };
  });

  const animatedBlurViewProps = useAnimatedProps(() => {
    return {
      intensity: interpolate(extraBoxValue.value, [0, 1], [0, 100]),
    };
  });

  const animatedTextInputStyle = useAnimatedStyle(() => {
    const opacity = interpolate(extraBoxValue.value, [0, 1], [0, 1]);
    const translateY = interpolate(extraBoxValue.value, [0, 1], [0, 40]);
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const onOutSidePress = () => {
    inputRef.current?.blur();
    extraBoxValue.value = withTiming(0, {}, () => {
      runOnJS(setShowExtraBox)(false);
    });
  };

  const onSubmitEditing = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    const text = e.nativeEvent.text;
    extraBoxValue.value = withTiming(0, {}, () => {
      runOnJS(setShowExtraBox)(false);
      runOnJS(setExtraBoxText)(text);
    });
  };

  return (
    <Animated.View style={StyleSheet.absoluteFill}>
      <AnimatedBlurView
        onTouchEndCapture={onOutSidePress}
        animatedProps={animatedBlurViewProps}
        intensity={10}
        tint="prominent"
        style={StyleSheet.absoluteFill}
      />
      <Animated.View style={[styles.boxStyle, animatedStyle]}>
        <Animated.Text style={[{ color: theme.colors.text }, animTextStyle]}>
          Add new
        </Animated.Text>
        <AnimatedTextInput
          ref={inputRef}
          returnKeyType="done"
          onSubmitEditing={onSubmitEditing}
          style={[
            styles.textInputStyle,
            ,
            {
              backgroundColor: theme.colors.card,
              color: theme.colors.text,
            },
            animatedTextInputStyle,
          ]}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  boxStyle: {
    width: 100,
    height: 100,
    borderRadius: 15,
    overflow: "hidden",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  textInputStyle: {
    width: SCREEN_WIDTH * 0.7,
    height: 50,
    borderRadius: 12,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
    position: "absolute",
  },
});
