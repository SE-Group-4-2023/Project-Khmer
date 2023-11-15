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
import {
  isValidObjField,
  updateError,
  isValidEmail,
} from "../app/utils/methods";

const phoneValidate =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export default function LoginScreen() {
  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState({
    phoneNumber: "",
    password: "",
  });

  const [error, setError] = useState("");

  const { phoneNumber, password } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError("Required all fields!", setError);

    if (!phoneValidate(phoneNumber)) return updateError("Invalid email!", setError);

    if (!password.trim() || password.length < 8)
      return updateError("Password is too short!", setError);

    return true;
  };

  const submitForm = async () => {
    if (isValidForm()) {
      try {
        const res = await client.post("/sign_in", { ...userInfo });

        if (res.data.success) {
          setUserInfo({ phoneNumber: " ", password: " " });
          // setProfile(res.data.user);
          // setIsLoggedIn(true);
        }
        if(res.data.success == false) return updateError("User not found", setError);

        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <LinearGradient
      colors={["#B519EC", "#F25F9D"]}
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
              source={require("../images/MerlMapLogo.png")}
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
              value={phoneNumber}
              onChangeText={(value) => handleOnChangeText(value, "phoneNumber")}
              label="Phone Number"
              placeholder="Enter Phone Number"
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
            onPress={() => navigation.navigate("Register_email")}
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
