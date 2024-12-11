import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, Alert, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { apiRequest } from "@/lib/apiRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import latpulldown from "@/assets/images/latpulldown.png";

const ReservationScreen = () => {
  const router = useRouter();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchReservations = useCallback(async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await apiRequest.get("/reserve/inquire", {
        headers: {
          Cookie: `testauth=${authToken}`,
        },
      });

      setReservations((prevReservations) => {
        if (prevReservations.length > response.data.reservations.length) {
          Alert.alert("Reservation Removed", "A reservation has been removed.");
        }
        return response.data.reservations;
      });
    } catch (err) {
      console.error("Failed to fetch reservations:", err, err.response?.data || err.message);
    }
  }, []);

  useEffect(() => {
    fetchReservations();
    const interval = setInterval(fetchReservations, 1000);
    return () => clearInterval(interval);
  }, [fetchReservations]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchReservations);
    return unsubscribe;
  }, [navigation, fetchReservations]);

  const handleRemoveReservation = async (id) => {
    try {
      await apiRequest.delete(`/reservations/${id}`);
      setReservations((prevReservations) => prevReservations.filter((reservation) => reservation.id !== id));
    } catch (error) {
      console.error("Failed to remove reservation:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Reservations ({reservations.length}/3)</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={fetchReservations}>
          <Ionicons name="refresh" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <FlatList
          data={reservations}
          keyExtractor={(item) => item.name.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push("/equipmentDetail/123")}>
              <View style={styles.reservationCard}>
                <Image source={latpulldown} style={styles.reservationImage} />
                <View style={styles.reservationDetails}>
                  <Text style={styles.equipmentName}>{item.name}</Text>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.equipmentDetail}>👥 {item.queue.length}</Text>
                    <Text style={styles.equipmentDetail}>⏱ {item.queue.length * 7} mins</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveReservation(item.id)}>
                  <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.reservationList}
          ListEmptyComponent={<Text style={styles.emptyMessage}>No reservations found.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9FAFB",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginTop: 50,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
  },
  refreshButton: {
    padding: 5,
  },
  reservationList: {
    marginTop: 10,
  },
  reservationCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
  },
  reservationImage: {
    width: 100,
    height: 100,
    borderRadius: 25,
    marginRight: 15,
  },
  reservationDetails: {
    flex: 1,
  },
  equipmentName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#111827",
  },
  detailsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  equipmentDetail: {
    fontSize: 14,
    color: "#6B7280",
  },
  removeButton: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
  emptyMessage: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 16,
    marginTop: 50,
  },
});

export default ReservationScreen;
