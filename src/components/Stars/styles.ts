import { StyleSheet } from "react-native";
import { THEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: THEME.COLORS.GREY_800
  },
  canvas: {
    width: 257,
    height: 249,
    position: "absolute",
    zIndex: 1,
  },
});
