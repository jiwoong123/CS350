import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const gymHeight = screenHeight * 1; // 헬스장 높이: 화면 높이의 80%
const gymWidth = gymHeight * 0.8; // 헬스장 가로와 세로 비율 1:1로 설정

const equipmentData = [
  // Stretching Zone (Free Zone)
  { name: "Stretching Zone", waitTime: null, x: 0.05, y: 0, width: 0.35, height: 0.15 },

  // Machines (Lat Pulldown, Cable Machine, etc.)
  { name: "Lat Pulldown", waitTime: 12, x: 0.05, y: 0.16, width: 0.2, height: 0.07 },
  { name: "Cable Machine", waitTime: 8, x: 0.05, y: 0.24, width: 0.2, height: 0.07 },
  { name: "Seated Row", waitTime: 6, x: 0.05, y: 0.32, width: 0.2, height: 0.07 },
  { name: "Leg Curl", waitTime: 0, x: 0.05, y: 0.4, width: 0.2, height: 0.07 },
  { name: "Chest Machine", waitTime: 5, x: 0.05, y: 0.48, width: 0.2, height: 0.07 },
  { name: "Leg Extension", waitTime: 7, x: 0.05, y: 0.56, width: 0.2, height: 0.07 },
  { name: "Arm Curl", waitTime: 1, x: 0.05, y: 0.64, width: 0.2, height: 0.07 },
  { name: "Flying Machine", waitTime: 13, x: 0.05, y: 0.72, width: 0.2, height: 0.07 },
  { name: "Shoulder Press", waitTime: 0, x: 0.05, y: 0.8, width: 0.2, height: 0.07 },
  { name: "Smith Machine", waitTime: 14, x: 0.05, y: 0.88, width: 0.2, height: 0.07 },

  // Free Weights & Additional Machines (Bench Press, Squat, etc.)
  { name: "Bench Press", waitTime: 14, x: 0.75, y: 0.05, width: 0.2, height: 0.07 },
  { name: "Squat Machine", waitTime: 3, x: 0.75, y: 0.13, width: 0.2, height: 0.07 },

  // Massage Belts
  { name: "Massage Belt", waitTime: 0, x: 0.85, y: 0.21, width: 0.1, height: 0.06 },
  { name: "Massage Belt", waitTime: 0, x: 0.85, y: 0.29, width: 0.1, height: 0.06 },

  // Cardio Machines
  { name: "Elliptical Machine", waitTime: 0, x: 0.75, y: 0.36, width: 0.2, height: 0.07 },
  { name: "Elliptical Machine", waitTime: 0, x: 0.75, y: 0.44, width: 0.2, height: 0.07 },
  { name: "Treadmill", waitTime: 0, x: 0.75, y: 0.52, width: 0.2, height: 0.07 },
  { name: "Treadmill", waitTime: 14, x: 0.75, y: 0.6, width: 0.2, height: 0.07 },
  { name: "Treadmill", waitTime: 4, x: 0.75, y: 0.68, width: 0.2, height: 0.07 },
  { name: "Treadmill", waitTime: 0, x: 0.75, y: 0.76, width: 0.2, height: 0.07 },

  { name: "Pullup Machine", waitTime: 0, x: 0.45, y: 0.64, width: 0.1, height: 0.1 },
];

const getColorBasedOnWaitTime = (waitTime) => {
  if (waitTime === null) return "transparent"; // Free Weight Zone (색 없음)
  if (waitTime === 0) return "#4CAF50"; // 초록색 (대기 시간 없음)
  if (waitTime <= 5) return "#FFEB3B"; // 노란색 (짧은 대기 시간)
  if (waitTime <= 10) return "#FF9800"; // 주황색 (중간 대기 시간)
  return "#F44336"; // 빨간색 (긴 대기 시간)
};

const GymLayout = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Silloe Gym</Text>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContainer} horizontal>
        <ScrollView contentContainerStyle={styles.gymContent}>
          <View style={[styles.gymContainer, { width: gymWidth, height: gymHeight }]}>
            {equipmentData.map((equipment, index) => (
              <Link
                href="/equipmentDetail/1"
                key={index}
                style={{
                  ...styles.equipment,
                  left: `${equipment.x * 100}%`,
                  top: `${equipment.y * 100}%`,
                  width: `${equipment.width * 100}%`,
                  height: `${equipment.height * 100}%`,
                  backgroundColor: getColorBasedOnWaitTime(equipment.waitTime),
                }}
              >
                <Text style={styles.equipmentText}>
                  {equipment.name}
                  {equipment.waitTime !== null ? ` (${equipment.waitTime} mins)` : ""}
                </Text>
              </Link>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default GymLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333", // 어두운 배경
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    paddingTop: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF", // 흰색 텍스트
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  gymContent: {
    flexGrow: 1,
    paddingHorizontal: 20, // 수평 스크롤 여백 추가
  },
  gymContainer: {
    position: "relative",
    backgroundColor: "#FFFFFF", // 흰색 배경
    borderWidth: 1,
    borderColor: "#ccc",
  },
  equipment: {
    position: "absolute",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CCC",
    padding: 5,
  },
  equipmentText: {
    color: "#000", // 검은색 텍스트
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 3, // 기구 이름과 대기시간 간격
  },
});
