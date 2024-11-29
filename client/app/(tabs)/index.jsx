import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const gymHeight = screenHeight * 1.3; // 헬스장 높이: 화면 높이의 80%
const gymWidth = gymHeight * 0.5; // 헬스장 가로와 세로 비율 1:1로 설정

const equipmentData = [
  // Stretching Zone (Free Zone)
  { name: "Stretching Zone", waitTime: null, x: 0.05, y: 0, width: 0.4, height: 0.15 },

  // Machines (Lat Pulldown, Cable Machine, etc.)
  { name: "Lat Pulldown", waitTime: 12, x: 0.05, y: 0.18, width: 0.2, height: 0.07 },
  { name: "Cable Machine", waitTime: 2, x: 0.05, y: 0.26, width: 0.2, height: 0.07 },
  { name: "Seated Row", waitTime: 6, x: 0.05, y: 0.34, width: 0.2, height: 0.07 },
  { name: "Leg Curl", waitTime: 0, x: 0.05, y: 0.42, width: 0.2, height: 0.07 },
  { name: "Chest Machine", waitTime: 6, x: 0.05, y: 0.5, width: 0.2, height: 0.07 },
  { name: "Leg Extension", waitTime: 3, x: 0.05, y: 0.58, width: 0.2, height: 0.07 },
  { name: "Arm Curl", waitTime: 0, x: 0.05, y: 0.66, width: 0.2, height: 0.07 },
  { name: "Flying Machine", waitTime: 13, x: 0.05, y: 0.74, width: 0.2, height: 0.07 },
  { name: "Shoulder Press", waitTime: 0, x: 0.05, y: 0.82, width: 0.2, height: 0.07 },
  { name: "Smith Machine", waitTime: 14, x: 0.05, y: 0.9, width: 0.2, height: 0.07 },

  // Free Weights & Additional Machines (Bench Press, Squat, etc.)
  { name: "Bench Press", waitTime: 14, x: 0.75, y: 0.05, width: 0.2, height: 0.07 },
  { name: "Squat Machine", waitTime: 9, x: 0.75, y: 0.15, width: 0.2, height: 0.07 },

  // Massage Belts
  { name: "Massage Belt", waitTime: 0, x: 0.8, y: 0.25, width: 0.15, height: 0.05 },
  { name: "Massage Belt", waitTime: 0, x: 0.8, y: 0.31, width: 0.15, height: 0.05 },

  // Cardio Machines
  { name: "Elliptical Machine", waitTime: 0, x: 0.75, y: 0.44, width: 0.2, height: 0.07 },
  { name: "Elliptical Machine", waitTime: 0, x: 0.75, y: 0.52, width: 0.2, height: 0.07 },
  { name: "Treadmill", waitTime: 14, x: 0.75, y: 0.62, width: 0.2, height: 0.07 },
  { name: "Treadmill", waitTime: 0, x: 0.75, y: 0.71, width: 0.2, height: 0.07 },
  { name: "Treadmill", waitTime: 3, x: 0.75, y: 0.8, width: 0.2, height: 0.07 },
  { name: "Treadmill", waitTime: 0, x: 0.75, y: 0.9, width: 0.2, height: 0.07 },

  { name: "pullup machine", waitTime: 0, x: 0.43, y: 0.82, width: 0.1, height: 0.07 },
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
      <Text style={styles.header}>Gym Equipment Layout</Text>
      {/* 수평 스크롤 가능 */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContainer} horizontal>
        <ScrollView contentContainerStyle={styles.gymContent}>
          <View style={[styles.gymContainer, { width: gymWidth, height: gymHeight }]}>
            {equipmentData.map((equipment, index) => (
              <View
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
                <Link href="/equipment">
                  <Text style={styles.equipmentText}>
                    {equipment.name}
                    {"\n"}
                    {equipment.waitTime !== null ? ` (${equipment.waitTime} mins)` : ""}
                  </Text>
                </Link>
              </View>
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
    alignItems: "center",
    justifyContent: "center",
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
