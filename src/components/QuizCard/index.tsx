import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  View,
} from "react-native";

import Animated, { FadeInUp } from "react-native-reanimated";

import { LevelBars } from "../LevelBars";
import { QUIZZES } from "../../data/quizzes";

import { styles } from "./styles";
import { THEME } from "../../styles/theme";

type Props = TouchableOpacityProps & {
  data: (typeof QUIZZES)[0];
  index: number;
};

export function QuizCard({ data, index, ...rest }: Props) {
  const TouchableOpacityAnimated =
    Animated.createAnimatedComponent(TouchableOpacity);

  const Icon = data.svg;

  return (
    <TouchableOpacityAnimated
      entering={FadeInUp.delay(index * 100)}
      style={styles.container}
      {...rest}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {Icon && <Icon size={24} color={THEME.COLORS.GREY_100} />}
        </View>

        <LevelBars level={data.level} />
      </View>

      <Text style={styles.title}>{data.title}</Text>
    </TouchableOpacityAnimated>
  );
}
