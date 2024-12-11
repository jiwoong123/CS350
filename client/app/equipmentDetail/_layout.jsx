import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const detaillayout = () => {
  return (
    <Stack>
      <Stack.Screen name="[id]" />
    </Stack>
  );
};

export default detaillayout;

const styles = StyleSheet.create({});
