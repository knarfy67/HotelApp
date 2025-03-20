import { StyleSheet, View } from "react-native";
import React from "react";
import Dot from "./Dot";

const Pagination = ({ data, x }) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, index) => (
        <Dot index={index} x={x} key={index} />
      ))}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
