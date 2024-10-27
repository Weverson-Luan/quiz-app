import { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  withSequence,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Canvas, Rect } from "@shopify/react-native-skia";
import { THEME } from "../../styles/theme";

const STATUS = [
  "transparent",
  THEME.COLORS.BRAND_LIGHT,
  THEME.COLORS.DANGER_LIGHT,
];

type Props = {
  status: number;
};

export function OverlayFeedback({ status }: Props) {
  const opacity = useSharedValue(0);
  const color = STATUS[status];

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(1, { duration: 400, easing: Easing.bounce }),
      withTiming(0)
    );
  }, [status]);
  return (
    <Animated.View
      style={[{ height, width, position: "absolute" }, animatedStyle]}
    >
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height} color={color} />
      </Canvas>
    </Animated.View>
  );
}
