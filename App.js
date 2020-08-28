import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as theme } from "./theme.json";
import { default as mapping } from "./mapping.json";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import ContactPage from "./components/ContactPage";
import ContactDetails from "./components/ContactDetails";
import useToggleState from "./hooks/useToggleState";

const Stack = createStackNavigator();

function App() {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, toggleLogin] = useToggleState(true);
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
              toggleLogin={toggleLogin}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {(props) => <LoginPage {...props} toggleLogin={toggleLogin} />}
        </Stack.Screen>
        <Stack.Screen name="Contacts" component={ContactPage} />
        <Stack.Screen name="Detail" component={ContactDetails} />
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
