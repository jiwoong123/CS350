import { StyleSheet, Text, View, ActivityIndicator, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { apiRequest } from "@/lib/apiRequest.jsx"; // apiRequest 가져오기
import AsyncStorage from "@react-native-async-storage/async-storage";

const EquipmentDetail = () => {
  const equipmentId = "673b06315e6648bb4da2f441"; // 장비 ID
  const [equipment, setEquipment] = useState(null); // 장비 데이터
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  // 장비 세부 정보를 가져오는 함수
  const fetchEquipmentDetail = async () => {
    try {
      setIsLoading(true); // 로딩 시작

      // AsyncStorage에서 authToken 가져오기
      const authToken = await AsyncStorage.getItem("authToken");

      // 서버 요청
      const response = await apiRequest.get(`/usage/${equipmentId}`, {
        headers: {
          Cookie: `testauth=${authToken}`, // 쿠키 포함
        },
      });

      setEquipment(response.data); // 데이터 저장
    } catch (error) {
      console.error("Error fetching equipment details:", error);
      Alert.alert("Error", "Failed to fetch equipment details. Please try again later.");
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  // 페이지 로드 시 장비 세부 정보 가져오기
  useEffect(() => {
    fetchEquipmentDetail();
  }, [equipmentId]);

  // 새로 고침 함수
  const handleRefresh = () => {
    fetchEquipmentDetail();
  };

  // 로딩 중일 때 표시할 화면
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text>Loading equipment details...</Text>
      </View>
    );
  }

  // 장비 데이터가 없을 때 표시할 화면
  if (!equipment) {
    return (
      <View style={styles.container}>
        <Text>No equipment details found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: "Equipment Detail" }} />
      <Text style={styles.title}>Equipment Details</Text>
      <Text>ID: {equipmentId}</Text>
      <Text>Name: {equipment.name}</Text>
      <Text>Description: {equipment.description}</Text>
      <Text>Status: {equipment.status}</Text>

      <Button title="Refresh" onPress={handleRefresh} color="#6200ea" />
    </View>
  );
};

export default EquipmentDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
});
