import { StyleSheet, Text, View } from "react-native";
import React from "react";

const reservation = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You can inquire your reservation history</Text>
    </View>
  );
};

export default reservation;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    textAlign: "center",
  },
});
