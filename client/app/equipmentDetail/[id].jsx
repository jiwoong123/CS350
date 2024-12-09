import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { Stack } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { apiRequest } from "@/lib/apiRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import seatedLow from "@/assets/images/seatedlow.png";
import chestPress from "@/assets/images/chestpress.png";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const EquipmentInformation = () => {
  const equipmentId = "673b06315e6648bb4da2f441";
  const [equipment, setEquipment] = useState({});
  const [recommendedEquipments, setRecommendedEquipments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEquipmentDetails = async () => {
    setIsLoading(true);
    try {
      // 서버 API 요청 (예제용 Mock 데이터 사용)
      setIsLoading(true); // 로딩 시작

      // AsyncStorage에서 authToken 가져오기
      const authToken = await AsyncStorage.getItem("authToken");

      // 서버 요청
      const response = await apiRequest.get(`/usage/${equipmentId}`, {
        headers: {
          Cookie: `testauth=${authToken}`, // 쿠키 포함
        },
      });
      const equipmentData = {
        name: "Lat Pull Down",
        peopleWaiting: response.data.queue.length,
        expectedAvailableTime: response.data.queue.length * 7,
        target: "Latissimus dorsi",
        status: response.data.queue.length ? true : response.data.status, // true: not available, false: available
        tutorialVideo: true,
      };

      const recommendedData = [
        {
          id: 1,
          name: "Seated Low",
          peopleUsing: 0,
          expectedTime: "available now",
          image: seatedLow,
        },
        {
          id: 2,
          name: "Converging Chest Press",
          peopleUsing: 0,
          expectedTime: "2min",
          image: chestPress,
        },
      ];

      setEquipment(equipmentData);
      setRecommendedEquipments(recommendedData);
    } catch (error) {
      console.error("Error fetching equipment details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 첫 로드 시 데이터 가져오기
  useEffect(() => {
    fetchEquipmentDetails();
  }, []);

  // Availability 상태 텍스트로 변환
  const getAvailabilityText = (status) => {
    return status ? "Not Available" : "Available";
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ headerTitle: "Equipment Information" }} />

      {/* 제목과 Refresh 버튼 */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{equipment.name}</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={fetchEquipmentDetails}>
          <Feather name="refresh-ccw" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* 장비 정보 */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>People waiting</Text>
        <Text style={styles.value}>{equipment.peopleWaiting}</Text>

        <Text style={styles.label}>Expected available time</Text>
        <Text style={styles.value}>{equipment.expectedAvailableTime}</Text>

        <Text style={styles.label}>Recommended target muscle</Text>
        <Text style={styles.value}>{equipment.target}</Text>

        <Text style={styles.label}>Availability</Text>
        <Text style={[styles.value, { color: equipment.status ? "red" : "green", fontWeight: "bold" }]}>
          {getAvailabilityText(equipment.status)}
        </Text>

        {/* 튜토리얼 비디오 버튼 */}
        {equipment.tutorialVideo && (
          <View style={styles.videoContainer}>
            <Text style={styles.label}>Tutorial Videos</Text>
            <TouchableOpacity style={styles.videoButton}>
              <FontAwesome6 name="youtube" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* 추천 장비 */}
      <Text style={styles.subTitle}>Available equipments now</Text>
      <View style={styles.recommendationContainer}>
        {recommendedEquipments.map((item) => (
          <View key={item.id} style={styles.recommendationCard}>
            <Image source={item.image} style={styles.equipmentImage} />
            <Text style={styles.equipmentName}>{item.name}</Text>
            <Text style={styles.equipmentDetail}>
              👥 {item.peopleUsing} | ⏱ {item.expectedTime}
            </Text>
          </View>
        ))}
      </View>

      {/* 예약 버튼 */}
      <TouchableOpacity style={styles.reserveButton}>
        <Text style={styles.reserveButtonText}>Request Reservation (2/3)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EquipmentInformation;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  refreshButton: {
    padding: 10,
  },
  infoContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
  },
  videoContainer: {
    display: "flex",
    flexDirection: "row", // 텍스트와 버튼을 가로로 정렬
    alignItems: "center", // 세로 중앙 정렬
    justifyContent: "flex-start",
    marginTop: 10,
  },
  videoButton: {
    marginLeft: 10, // 텍스트와 버튼 사이 간격
    padding: 10,
  },
  videoText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recommendationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  recommendationCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  equipmentImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  equipmentName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  equipmentDetail: {
    fontSize: 12,
    color: "#666",
  },
  reserveButton: {
    backgroundColor: "#6200ea",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  reserveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
