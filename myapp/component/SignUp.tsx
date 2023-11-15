import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import {
  Button,
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Pressable,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTogglePasswordVisibility } from "../tools/useTogglePasswordVisibility";
import {
  isValidObjField,
  updateError,
  isValidEmail,
} from "../app/utils/methods";
import client from "../app/api/client";

import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";

import { Formik } from "formik";
import * as Yup from "yup";

const phoneValidate =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const validationSchema = Yup.object({
  fullname: Yup.string()
    .trim()
    .min(3, "Invalid name")
    .required("Name is required"),
  phoneNumber: Yup.string()
    .matches(phoneValidate, "Invalid")
    .min(9, "Too short!")
    .max(10, "Too long!"),
  password: Yup.string()
    .trim()
    .min(8, "Password is too short")
    .required("Password is required"),
  confirmPassword: Yup.string().equals(
    [Yup.ref("password"), null],
    "Does not match"
  ),
});

const Register_phone_screen = () => {
  const navigation = useNavigation();
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const scrollViewRef = useRef(null);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", handleKeyboardShow);
    Keyboard.addListener("keyboardDidHide", handleKeyboardHide);

    return () => {
      Keyboard.removeAllListeners("keyboardDidShow", handleKeyboardShow);
      Keyboard.removeAllListeners("keyboardDidHide", handleKeyboardHide);
    };
  }, []);

  const handleKeyboardShow = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  const handleKeyboardHide = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  const userInfo = {
    fullname: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  const [error, setError] = useState("");

  const { fullname, phoneNumber, password, confirmPassword } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    // we will accept only if all of the fields have value
    if (!isValidObjField(userInfo))
      return updateError("Required all fields!", setError);
    // if valid name with 3 or more characters
    if (!fullname.trim() || fullname.length < 3)
      return updateError("Invalid name!", setError);
    // only valid phoneNumber id is allowed
    if (!phoneValidate(phoneNumber))
      return updateError("Invalid phone number", setError);
    // password must have 8 or more characters
    if (!password.trim() || password.length < 8)
      return updateError("Password is less then 8 characters!", setError);
    // password and confirm password must be the same
    if (password !== confirmPassword)
      return updateError("Does not match!", setError);

    return true;
  };

  const submitForm = () => {
    if (isValidForm()) {
      console.log(userInfo);
    }
  };

  const signUp = async (values, formikActions) => {
    const res = await client.post("/create-user", {
      ...values,
    });

    console.log(res.data);
    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };

  return (
    <LinearGradient
      colors={["#B519EC", "#F25F9D"]}
      style={globalStyle.linearGradient}
    >
      <KeyboardAvoidingView
        style={globalStyle.KeyContainer}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <Formik
          initialValues={userInfo}
          validationSchema={validationSchema}
          onSubmit={signUp}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            const { fullname, phoneNumber, password, confirmPassword } = values;
            return (
              <>
                <ScrollView
                  ref={scrollViewRef}
                  contentContainerStyle={globalStyle.ContentContainer}
                  onContentSizeChange={() =>
                    scrollViewRef.current.scrollToEnd({ animated: true })
                  }
                >
                  <SafeAreaView style={globalStyle.container}>
                    <StatusBar hidden={true} />
                    <View style={globalStyle.signUpContainer}>
                      <View style={{ alignItems: "center" }}>
                        <Image
                          source={require("../images/MerlMapLogo.png")}
                          style={globalStyle.img}
                        />
                      </View>
                      <View>
                        <Text
                          style={{
                            position: "relative",
                            top: -30,
                            fontSize: 30,
                            color: "white",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          SIGN UP
                        </Text>
                      </View>
                      <View>
                        <FormInput
                          value={fullname}
                          error={touched.fullname && errors.fullname}
                          onChangeText={handleChange("fullname")}
                          onBlur={handleBlur("fullname")}
                          autoCapitalize="none"
                          placeholder="Enter Username"
                          label="Username"
                        />

                        <FormInput
                          value={phoneNumber}
                          error={touched.phoneNumber && errors.phoneNumber}
                          onChangeText={handleChange("phoneNumber")}
                          onBlur={handleBlur("phoneNumber")}
                          autoCapitalize="none"
                          placeholder="Enter Phone Number"
                          label="Phone Number"
                          editable={true}
                          keyboardType="numeric"
                        />

                        <View style={globalStyle.inputContainer}>
                          <Pressable
                            onPress={handlePasswordVisibility}
                            style={globalStyle.eye}
                          >
                            <MaterialCommunityIcons
                              name={rightIcon}
                              size={22}
                              color="black"
                            />
                          </Pressable>
                          <FormInput
                            value={password}
                            error={touched.password && errors.password}
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            autoCapitalize="none"
                            placeholder="Enter Password"
                            label="Password"
                            textContentType="newPassword"
                            secureTextEntry={passwordVisibility}
                          />
                        </View>
                        <View style={globalStyle.inputContainer}>
                          <Pressable
                            onPress={handlePasswordVisibility}
                            style={globalStyle.eye}
                          >
                            <MaterialCommunityIcons
                              name={rightIcon}
                              size={22}
                              color="black"
                            />
                          </Pressable>
                          <FormInput
                            value={confirmPassword}
                            error={
                              touched.confirmPassword && errors.confirmPassword
                            }
                            onChangeText={handleChange("confirmPassword")}
                            onBlur={handleBlur("confirmPassword")}
                            autoCapitalize="none"
                            placeholder="Confirm password"
                            label="Confirm password"
                            textContentType="newPassword"
                            secureTextEntry={passwordVisibility}
                          />
                        </View>

                        <View style={{ alignItems: "center" }}>
                          <SubmitBtn
                            submitting={isSubmitting}
                            onPress={handleSubmit}
                            label="Sign Up"
                          />
                        </View>
                      </View>

                      <TouchableOpacity style={globalStyle.login_here}>
                        <Text style={globalStyle.buttonText}>Login here</Text>
                      </TouchableOpacity>
                    </View>
                  </SafeAreaView>
                </ScrollView>
              </>
            );
          }}
        </Formik>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Register_phone_screen;

const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  KeyContainer: {
    flexGrow: 1,
  },
  ContentContainer: {
    flexGrow: 1,
  },
  signUpContainer: {
    // justifyContent: "center",
    // alignItems: "center",
  },
  linearGradient: {
    flex: 1,
  },
  eye: {
    right: 30,
    top: 20,
    zIndex: 3,
    position: "absolute",
  },
  TextTitle: {
    top: 10,
    fontSize: 18,
    color: "white",
    alignItems: "flex-start",
  },
  TextInput: {
    top: 5,
    borderWidth: 1,
    borderColor: "grey",
    margin: 10,
    width: 250,
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  NumberInput: {
    top: 5,
    borderWidth: 1,
    margin: 10,
    width: 250,
    height: 40,
    backgroundColor: "white",
    borderColor: "grey",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    // flexDirection: "row",
    // alignItems: "center",
  },
  img: {
    top: -40,
    height: 152,
    width: 152,
    position: "relative",
  },
  isValidPhoneister: {
    position: "relative",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    width: 150,
    top: 40,
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  use_telephone: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    position: 'absolute',
    left: '65%',
  },
  login_here: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    // left: "35%",
    alignItems: "center",
    marginTop: 10,
  },
});
