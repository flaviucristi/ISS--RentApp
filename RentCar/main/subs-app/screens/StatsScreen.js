import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ref, onValue } from "firebase/database";
import { db, auth } from "../firebase.js";
import NavBar from "../components/NavBar";

const StatsScreen = ({ navigation }) => {
  const [rentedCars, setRentedCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userEmail = auth.currentUser.email;
    const username = userEmail.substring(0, userEmail.indexOf("@"));

    const carsRef = ref(db, `cars/flv`);
    onValue(carsRef, (snapshot) => {
      const data = snapshot.val();
      const rentedCarsData = [];
      for (let key in data) {
        if (data[key].rent) {
          rentedCarsData.push({ id: key, ...data[key] });
        }
      }
      setRentedCars(rentedCarsData);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const userEmail = auth.currentUser.email;
  const currentUser = userEmail.substring(0, userEmail.indexOf("@"));

  return (
    <View style={styles.container}>
      <View style={styles.fixedContent}>
        <Text style={styles.title}>Rented Cars</Text>
      </View>
      <ScrollView contentContainerStyle={styles.carsGrid}>
        {rentedCars.length > 0 ? (
          rentedCars.map((car) => (
            <TouchableOpacity
              key={car.id}
              style={styles.carContainer}
              onPress={() => {/* Acțiunea când utilizatorul apasă pe mașină */}}
            >
              <Text style={styles.carText}>Brand: {car.brand}</Text>
              <Text style={styles.carText}>Model: {car.model}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No rented cars</Text>
        )}
      </ScrollView>
      <View style={styles.bottomNav}>
        <NavBar navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 45,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
    borderTopWidth: 1,
    borderColor: "#000",
    backgroundColor: '#CCCCFF',
  },
  fixedContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 1,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#8A2BE2", // Mov mai închis pentru titlu
  },
  carsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  carContainer: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  carText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#9932CC", // Mov mai închis pentru textul mașinii
  },
  bottomNav: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
  },
});

export default StatsScreen;
