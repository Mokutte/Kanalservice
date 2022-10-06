import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Auth from "../screens/Auth";
import Posts from "../screens/Posts";
import { MainContext } from "../context";
const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { user } = useContext(MainContext);
  return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Posts"
          screenOptions={({ route }) => ({
            headerShown: false,
          })}
        >
          {user ? (
            <Stack.Screen name="Posts" component={Posts} />
          ) : (
            <Stack.Screen name="Auth" component={Auth} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
  );
}
