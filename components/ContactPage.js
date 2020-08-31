import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { Text, Icon } from "@ui-kitten/components";
import ContactList from "./ContactList";

export default function ContactPage({ navigation, contacts }) {
  return (
    <View style={styles.root}>
      <View style={styles.backContainer}>
        <Icon
          style={styles.backIcon}
          fill="#f6f6f5"
          name="arrow-back"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
      <View style={styles.textContainer}>
        <Text category="h1" style={styles.title}>
          Contacts
        </Text>
      </View>
      <ContactList navigation={navigation} contacts={contacts} />
    </View>
  );
}

const styles = StyleSheet.create({
  backContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    paddingTop: StatusBar.currentHeight,
  },
  backIcon: {
    width: 32,
    height: 32,
  },
  root: {
    backgroundColor: "#f69e7b",
    flex: 1,
  },
  textContainer: {
    height: "15%",
    justifyContent: "center",
    top: 4,
  },
  title: {
    color: "#fff",
    alignSelf: "center",
  },
});
