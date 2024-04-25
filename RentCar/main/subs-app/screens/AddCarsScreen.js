import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";
import NavBar from "../components/NavBar";
import { ref, set } from "firebase/database";
import { db, auth } from "../firebase.js";
import { Picker } from "@react-native-picker/picker";

const AddCarScreen = ({ navigation }) => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [rent, setRent] = useState(false);

  const userEmail = auth.currentUser.email;
  const allowedUserEmail = "flv@yahoo.com"; // Adresa de email a utilizatorului care poate adăuga mașini

  function AddCar() {
    const username = userEmail.substring(0, userEmail.indexOf("@"));
    const key = generateUniqueKey();

    set(ref(db, `cars/${username}/${key}`), {
      brand: brand,
      model: model,
      year: parseInt(year),
      price: parseFloat(price),
      details: details,
      rent: rent,
    })
      .then(() => {
        alert("Car added successfully");
      })
      .catch((error) => {
        alert("Error adding car: " + error.message);
      });
  }

  function generateUniqueKey() {
    const timestamp = new Date().getTime();
    const uniqueID = generateUUID();
    return `${timestamp}-${uniqueID}`;
  }

  function generateUUID() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  // Verificăm dacă utilizatorul curent este utilizatorul permis pentru adăugarea mașinilor
  useEffect(() => {
    if (userEmail !== allowedUserEmail) {
      // Redirecționăm utilizatorul către o altă pagină sau afișăm un mesaj de eroare
      alert("You are not allowed to add cars.");
      navigation.goBack(); // Redirecționăm către ecranul anterior
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <Text style={styles.title}>Add Car</Text>
      </View>
      <TextInput
        style={styles.input}
        value={brand}
        onChangeText={(brand) => {
          setBrand(brand);
        }}
        placeholder="Brand"
      />
      <TextInput
        style={styles.input}
        value={model}
        onChangeText={(model) => {
          setModel(model);
        }}
        placeholder="Model"
      />
      <TextInput
        style={styles.input}
        value={year}
        onChangeText={(year) => {
          setYear(year);
        }}
        placeholder="Year"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={(price) => {
          setPrice(price);
        }}
        placeholder="Price"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={details}
        onChangeText={(details) => {
          setDetails(details);
        }}
        placeholder="Details"
      />
      <Picker
        selectedValue={rent}
        style={styles.input}
        onValueChange={(itemValue, itemIndex) => setRent(itemValue)}
      >
        <Picker.Item label="Available" value={false} />
        <Picker.Item label="Rented" value={true} />
      </Picker>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={AddCar} style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("MainScreen")}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <NavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 35,
    borderTopWidth: 1,
    borderColor: "#000",
    paddingTop: 150, 
    backgroundColor: '#CCCCFF', // culoarea fundalului 
  },
  fixedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 1,
    elevation: 5,
    padding: 10,
    borderColor: "#000",
    borderWidth: 1,
    borderColor: "#4B0082",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 20,
    color: "#4B0082", // culoarea textului titlului
  },
  input: {
    width: "90%",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 5,
    color: "#4B0082", // culoarea textului inputului
  },
  buttonContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#FFF100",
    width: "100%",
    padding: 10,
    borderRadius: 40,
    alignItems: "center",
    backgroundColor: "#9370DB", // culoarea butonului Save
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#FFF100",
    borderWidth: 2,
    borderColor: "#9370DB",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#9370DB",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default AddCarScreen;
