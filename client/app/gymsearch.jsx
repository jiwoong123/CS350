import React from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import searchMap from "@/assets/images/searchmap.png"; 

const GymSearchScreen = () => {
  return (                          
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Search for a Gym!</Text>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
            placeholder="Enter gym name"
            placeholderTextColor="#888"
        />
      </View>

      <View style={styles.mapContainer}>
        <Image
          source={
              //   uri: "https://simg.pstatic.net/static.map/v2/map/staticmap.bin?caller=smarteditor&markers=color%3A0x11cc73%7Csize%3Amid%7Cpos%3A127.361606%2036.372481%7CviewSizeRatio%3A0.7%7Clabel%3Aa%7Ctype%3Aa&markers=color%3A0x11cc73%7Csize%3Amid%7Cpos%3A127.36293%2036.372146%7CviewSizeRatio%3A0.7%7Clabel%3Ab%7Ctype%3Aa&markers=color%3A0x11cc73%7Csize%3Amid%7Cpos%3A127.356895%2036.373003%7CviewSizeRatio%3A0.7%7Clabel%3Ac%7Ctype%3Aa&markers=color%3A0x11cc73%7Csize%3Amid%7Cpos%3A127.368404%2036.369561%7CviewSizeRatio%3A0.7%7Clabel%3Ad%7Ctype%3Aa&w=892&h=466&scale=2&dataversion=171.73",
              searchMap
              }
          style={styles.mapImage}
          resizeMode="cover"
        />
      </View>
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
});