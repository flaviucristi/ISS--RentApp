import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { ref, onValue, remove, update } from "firebase/database";
import { db, auth } from "../firebase.js";
import NavBar from "../components/NavBar.js";

const MainScreen = ({ navigation }) => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [renterInfo, setRenterInfo] = useState(null);
  const currentUser = auth.currentUser;

  useEffect(() => {
    fetchCarsData();
  }, []);

  const fetchCarsData = () => {
    const carsData = [];
    const carsRef = ref(db, "cars");
    onValue(carsRef, (snapshot) => {
      const data = snapshot.val();
      for (let userKey in data) {
        const userData = data[userKey];
        for (let carKey in userData) {
          const car = { id: carKey, ...userData[carKey] };
          if (currentUser && currentUser.email === "flv@yahoo.com" || !car.rent) {
            carsData.push(car);
          }
        }
      }
      setCars(carsData);
    });
  };

  const openModal = (car) => {
    setSelectedCar(car);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedCar(null);
    setModalVisible(false);
  };

  const handleDelete = () => {
    const userEmail = currentUser ? currentUser.email : '';
    const username = userEmail.substring(0, userEmail.indexOf("@"));
    
    if (username === "flv") {
      const carRef = ref(db, `cars/${username}/${selectedCar.id}`);
      remove(carRef)
        .then(() => {
          console.log("Car deleted successfully");
          closeModal();
          fetchCarsData();
        })
        .catch((error) => {
          console.error("Error deleting car: ", error);
        });
    } else {
      alert("You don't have permission to delete this car.");
    }
  };

  const handleRentToggle = () => {
    const carRef = ref(db, `cars/flv/${selectedCar.id}`);
    
    if (selectedCar.rent) {
      const updatedCarData = {
        ...selectedCar,
        rent: false,
      };
      update(carRef, updatedCarData)
        .then(() => {
          console.log("Car rental status updated successfully");
          fetchCarsData();
          setRenterInfo(null);
        })
        .catch((error) => {
          console.error("Error updating car rental status: ", error);
        });
    } else {
      const updatedCarData = {
        ...selectedCar,
        rent: true,
      };
      update(carRef, updatedCarData)
        .then(() => {
          console.log("Car rental status updated successfully");
          fetchCarsData();
          setRenterInfo({
            username: auth.currentUser.email.substring(0, auth.currentUser.email.indexOf("@")),
            userId: auth.currentUser.uid,
          });          
        })
        .catch((error) => {
          console.error("Error updating car rental status: ", error);
        });
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.fixedContent}>
        <Text style={styles.title}>Total Cars</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerSpacer} />
        {cars.map((car, index) => (
          <TouchableOpacity key={index} onPress={() => openModal(car)}>
            <View style={[styles.expenseItem, selectedCar && selectedCar.id === car.id && styles.selectedItem]}>
              <View style={styles.expenseColumn}>
                <Text style={styles.expenseTitle}>{car.name}</Text>
                <Text style={styles.expenseInfo}>{car.brand} - {car.model}</Text>
                <Text style={styles.expenseInfo}>Rent: {car.rent ? "Rented" : "Available"}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {selectedCar && (
            <View>
              <Text style={styles.modalTitle}>{selectedCar.name}</Text>
              <Text>Brand: {selectedCar.brand}</Text>
              <Text>Model: {selectedCar.model}</Text>
              <Text>Year: {selectedCar.year}</Text>
              <Text>Price: ${selectedCar.price}</Text>
              <Text>Details: {selectedCar.details}</Text>
              {selectedCar.rent && (
                <Text>Rented by: {renterInfo ? renterInfo.username : "Unknown"}</Text>
              )}
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
            </View>
          )}
          <TouchableOpacity style={styles.modalButton} onPress={handleRentToggle}>
            <Text style={styles.buttonText}>{selectedCar && selectedCar.rent ? "Return" : "Rent"}</Text>
          </TouchableOpacity>
          {currentUser && (
            <TouchableOpacity style={styles.modalButton} onPress={handleDelete}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.bottomNav}>
        <NavBar navigation={navigation} />
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 45,
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
  headerSpacer: {
    height: 70,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#5E00FF", // Culoare mai vibrantă pentru titlu
  },
  scrollContainer: {
    paddingTop: 80,
    paddingBottom: 100,
  },
  expenseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    width: width * 0.9,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedItem: {
    backgroundColor: "#DA70D6", // Mov deschis pentru evidențierea mașinii selectate
  },
  expenseColumn: {
    alignItems: "flex-start",
  },
  expenseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#4B0082", // Culoare mai vibrantă pentru titlurile mașinilor
  },
  expenseInfo: {
    fontSize: 16,
    color: "#800080", // Culoare mai vibrantă pentru informațiile mașinilor
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#5E00FF", // Culoare mai vibrantă pentru titlul modalului
  },
  modalButton: {
    backgroundColor: "#DA70D6", // Mov deschis pentru butoanele modale
    width: "90%",
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF", // Text alb pentru butoane
  },
});

export default MainScreen;
