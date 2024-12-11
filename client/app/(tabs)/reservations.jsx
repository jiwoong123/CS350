import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 

const reservations = [
  {
    id: 1,
    name: "Leg Press Machine",
    peopleUsing: 2,
    expectedTime: "10min",
  },
  {
    id: 2,
    name: "Treadmill",
    peopleUsing: 1,
    expectedTime: "5min",
  },
  {
    id: 3,
    name: "Lat Pull Down",
    peopleUsing: 3,
    expectedTime: "15min",
  },
];

const ReservationScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          ({reservations.length}/3)
        </Text>
      </View>

      <View style={styles.reservationList}>
        {reservations.map((item) => (
          <View key={item.id} style={styles.reservationCard}>
            <View style={styles.reservationDetails}>
              <Text style={styles.equipmentName}>{item.name}</Text>
              <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                  <Text style={styles.equipmentDetail}>
                    👥 {item.peopleUsing} | ⏱ {item.expectedTime}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.removeButton}>
              <Ionicons name="remove-circle-outline" size={15} color="#FF0000" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    marginTop: 100,
    marginBottom: 20,
    alignItems: "flex-end",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  reservationList: {
    flex: 1,
    marginTop: 20,
  },
  reservationCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 100, // 간격을 넓혔습니다.
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  reservationDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", 
    marginBottom: 18, 
  },
  equipmentName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 2,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end", 
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center", 
  },
  detailText: {
    fontSize: 14,
    color: "#555",
  },
  removeButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
});

export default ReservationScreen;