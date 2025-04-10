import { useEffect } from "react";
import { Pressable, PressableProps, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
  withTiming,
} from "react-native-reanimated";

const PressableAnimated = Animated.createAnimatedComponent(Pressable);

import { THEME } from "../../styles/theme";
import { styles } from "./styles";

const TYPE_COLORS = {
  EASY: THEME.COLORS.BRAND_LIGHT,
  HARD: THEME.COLORS.DANGER_LIGHT,
  MEDIUM: THEME.COLORS.WARNING_LIGHT,
};

type Props = PressableProps & {
  title: string;
  isChecked?: boolean;
  type?: keyof typeof TYPE_COLORS;
};

/**
 * useSharedValue => usando para armazenar um valor para ser usando nas animações.
 * useAnimatedStyle => usado para criar estilos animados
 * interpolateColor => usado para interpolar cores
 * withTiming => usado para criar animações
 */
export function Level({
  title,
  type = "EASY",
  isChecked = false,
  ...rest
}: Props) {
  const scale = useSharedValue(1);
  const checked = useSharedValue(1);

  const COLOR = TYPE_COLORS[type];

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: interpolateColor(
        checked.value,
        [0, 1],
        ["transparent", COLOR]
      ),
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        checked.value,
        [0, 1],
        [COLOR, THEME.COLORS.GREY_100]
      ),
    };
  });

  function onPressInteraction() {
    scale.value = withSpring(1.2);
  }

  function onPressOutInteraction() {
    scale.value = withSpring(1);
  }

  useEffect(() => {
    checked.value = withTiming(isChecked ? 1 : 0, { duration: 1000 });
  }, [isChecked]);
  return (
    <PressableAnimated
      {...rest}
      onPressIn={onPressInteraction}
      onPressOut={onPressOutInteraction}
      style={[
        styles.container,
        animatedContainerStyle,
        {
          borderColor: COLOR,
        },
      ]}
    >
      <Text style={[styles.title, animatedTextStyle]}>{title}</Text>
    </PressableAnimated>
  );
}
