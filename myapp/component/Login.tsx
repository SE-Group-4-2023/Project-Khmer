import React, { useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  StatusBar,
  Image,
  Button,
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import client from "../app/api/client";
import HomePage from './HomePage';
import {
  isValidObjField,
  updateError,
  isValidEmail,
} from "../app/utils/methods";
import Register from "./Register_email"

// const phoneValidate =
//   /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export default function LoginScreen() {
  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const { email, password } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError("Required all fields!", setError);

    if (!isValidEmail(email)) return updateError("Invalid email!", setError);

    if (!password.trim() || password.length < 8)
      return updateError("Password is too short!", setError);

    return true;
  };

  const submitForm = async () => {
    if (isValidForm()) {
      try {
        const res = await client.post("/sign_in", { ...userInfo });

        if (res.data.success) {
          setUserInfo({ email: " ", password: " " });
          setProfile(res.data.user);
          setIsLoggedIn(true);
          
        }
        if(res.data.success == false) return updateError("User not found", setError);

        console.log(res.data);
        navigation.navigate("HomePage");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <LinearGradient
      colors={["#BADEFF", "#BADEFF"]}
      style={globalStyle.linearGradient}
    >
      <SafeAreaView style={globalStyle.container}>
        <StatusBar hidden={true} />
        <KeyboardAvoidingView
          enabled
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <View>
            <Image
              source={require("../images/AngkorSoft.png")}
              style={globalStyle.img}
            />
          </View>
          <View>
            <Text
              style={{
                top: -40,
                fontSize: 30,
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Login
            </Text>
          </View>
          <View>
            {error ? (
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  textAlign: "center",
                  top: -30,
                }}
              >
                {error}
              </Text>
            ) : null}
            <FormInput
              value={email}
              onChangeText={(value) => handleOnChangeText(value, "email")}
              label="Email"
              placeholder="Enter Email"
              autoCapitalize="none"
            />
            <FormInput
              value={password}
              onChangeText={(value) => handleOnChangeText(value, "password")}
              label="Password"
              placeholder="********"
              autoCapitalize="none"
              secureTextEntry
            />
            <View style={{ alignItems: "center" }}>
              <SubmitBtn onPress={submitForm} label="LOGIN" />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={globalStyle.new_here}>New here? Register here!</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  linearGradient: {
    flex: 1,
  },
  img: {
    height: 152,
    width: 152,
    left: "25%",
    top: -40,
  },
  forget_password: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    left: "60%",
  },
  new_here: {
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    left: "17%",
    marginTop: 40,
  },
});
