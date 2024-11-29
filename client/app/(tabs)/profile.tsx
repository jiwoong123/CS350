import { StyleSheet, Text, View } from "react-native";
import React from "react";

const profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is profile page. {"\n"} you can inquire your profile informations</Text>
    </View>
  );
};

export default profile;

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
