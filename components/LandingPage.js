import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import { Text } from "@ui-kitten/components";

export default function LandingPage({ navigation, isLoggedIn, toggleLogin }) {
  const handlePress = () => {
    isLoggedIn ? toggleLogin() : navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <View style={[styles.heading, !isLoggedIn && styles.conditionals]}>
        <Text category="s1">Welcome to</Text>
        <Text category="h1" style={styles.title}>
          Phone Book
        </Text>
      </View>
      <TouchableHighlight
        underlayColor="#cc6a54"
        style={[styles.buttons, styles.login]}
        onPress={handlePress}
      >
        <Text category="s1" style={styles.buttonText}>
          {isLoggedIn ? "Logout" : "Login"}
        </Text>
      </TouchableHighlight>
      {isLoggedIn && (
        <TouchableHighlight
          underlayColor="#222636"
          style={[styles.buttons, styles.list]}
          onPress={() => navigation.navigate("Contacts")}
        >
          <Text category="s1" style={styles.buttonText}>
            Contact List
          </Text>
        </TouchableHighlight>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f5",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    height: "85%",
    alignItems: "center",
    justifyContent: "center",
  },
  conditionals: {
    height: "92.5%",
  },
  title: {
    fontSize: 50,
  },
  buttons: {
    height: "7.5%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  login: {
    backgroundColor: "#f69e7b",
  },
  list: {
    backgroundColor: "#383e56",
  },
  buttonText: {
    color: "#f6f6f5",
    fontSize: 17,
  },
});
