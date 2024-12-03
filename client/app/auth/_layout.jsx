import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const authLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerTitle: "Login" }} />
    </Stack>
  );
};

export default authLayout;

const styles = StyleSheet.create({});
