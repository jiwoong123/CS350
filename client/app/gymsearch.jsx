import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Modal, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import searchMap from "@/assets/images/searchmap.png";
import { useRouter } from "expo-router";

const GymSearchScreen = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGym, setSelectedGym] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const gyms = [
    { id: 1, name: "Silloe Gym", description: "24/7 access with premium equipment." },
    { id: 2, name: "Downtown Gym", description: "Convenient location with affordable rates." },
    { id: 3, name: "High Peak Gym", description: "Advanced training facilities for athletes." },
  ];

  const handleMapClick = () => {
    setSelectedGym(gyms[0]); // Example: Default selection when map is clicked
    setModalVisible(true);
  };

  const handleSearchInput = (input) => {
    setSearchInput(input);
    const foundGym = gyms.find((gym) => gym.name.toLowerCase().includes(input.toLowerCase()));
    if (foundGym) {
      setSelectedGym(foundGym);
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Search for a Gym!</Text>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Enter gym name"
          placeholderTextColor="#888"
          onSubmitEditing={(e) => handleSearchInput(e.nativeEvent.text)}
        />
      </View>

      <TouchableOpacity style={styles.mapContainer} onPress={handleMapClick}>
        <Image source={searchMap} style={styles.mapImage} resizeMode="cover" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{selectedGym?.name || "Gym Details"}</Text>
            <Text style={styles.modalDescription}>{selectedGym?.description || "No details available."}</Text>
            <Button
              title="Enter"
              onPress={() => {
                setModalVisible(false);
                router.push("/(tabs)/gym");
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GymSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 20,
    backgroundColor: "#fff",
  },
  searchIcon: {
    marginRight: 10,
  },
  mapContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  mapImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});
