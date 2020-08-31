import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as theme } from "./theme.json";
import { default as mapping } from "./mapping.json";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import axios from "axios";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import ContactPage from "./components/ContactPage";
import ContactDetails from "./components/ContactDetails";

const Stack = createStackNavigator();

function App() {
  const [isReady, setIsReady] = useState(false);
  const [contactData, setContactData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [currUser, setCurrUser] = useState("");
  const [currContacts, setCurrContacts] = useState("");
  const [isLoggedIn, setLogin] = useState(false);
  useEffect(() => {
    axios.get("http://10.0.2.2:5000/users/").then((res) => {
      setUserData(res.data);
    });
    axios.get("http://10.0.2.2:5000/contacts/").then((res) => {
      setContactData(res.data);
    });
  }, []);
  useEffect(() => {
    setCurrContacts(
      contactData.filter((c) => c.username === currUser.username)
    );
  }, [isLoggedIn]);
  const login = (user) => {
    setCurrUser(user);
    setLogin(true);
  };
  const logout = () => {
    setCurrUser("");
    setCurrContacts("");
    setLogin(false);
  };
  const deleteContact = (id) => {
    axios.delete("http://10.0.2.2:5000/contacts/" + id);
    const newCurrentData = currContacts.filter((c) => c._id !== id);
    const newData = contactData.filter((c) => c._id !== id);
    setCurrContacts(newCurrentData);
    setContactData(newData);
  };
  const _cacheResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
        "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
        "OpenSans-SemiBold": require("./assets/fonts/OpenSans-SemiBold.ttf"),
      }),
    ]);
  };
  if (!isReady) {
    return (
      <AppLoading
        startAsync={_cacheResourcesAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {(props) => (
            <LandingPage
              {...props}
              isLoggedIn={isLoggedIn}
              logout={logout}
              currUser={currUser}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {(props) => (
            <LoginPage {...props} login={login} userData={userData} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Contacts">
          {(props) => <ContactPage {...props} contacts={currContacts} />}
        </Stack.Screen>
        <Stack.Screen name="Detail">
          {(props) => (
            <ContactDetails
              {...props}
              contacts={currContacts}
              deleteContact={deleteContact}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider
      {...eva}
      theme={{ ...eva.light, ...theme }}
      customMapping={mapping}
    >
      <App />
    </ApplicationProvider>
  </>
);
