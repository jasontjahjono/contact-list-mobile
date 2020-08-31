import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";
import { Text, Button, Icon, Input } from "@ui-kitten/components";
import useToggleState from "../hooks/useToggleState";

export default function LoginPage({ navigation, title, login, userData }) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [secureTextEntry, toggleSecureTextEntry] = useToggleState(true);
  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureTextEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );
  const handlePress = () => {
    const user = userData.find(
      (user) => user.email === emailInput && user.password === passwordInput
    );
    setEmailInput("");
    setPasswordInput("");
    if (!user) {
      console.log("Error logging in");
    } else {
      login(user);
      navigation.navigate("Home");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.backContainer}>
        <Icon
          style={styles.backIcon}
          fill="#383e56"
          name="arrow-back"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.loginGroup}>
        <Text style={styles.title} category="h1">
          Sign In {title}
        </Text>
        <Input
          label="Email"
          value={emailInput}
          onChangeText={(nextValue) => setEmailInput(nextValue)}
        />
        <Input
          label="Password"
          value={passwordInput}
          onChangeText={(nextValue) => setPasswordInput(nextValue)}
          secureTextEntry={secureTextEntry}
          accessoryRight={renderIcon}
        />
        <Button
          style={styles.loginButton}
          status="primary"
          onPress={handlePress}
        >
          Log In
        </Button>
      </View>
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
  container: {
    flex: 1,
    backgroundColor: "#f6f6f5",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    alignSelf: "center",
    marginBottom: "5%",
  },
  loginGroup: {
    width: "70%",
    bottom: 40,
  },
  loginButton: {
    marginTop: "4%",
  },
});
