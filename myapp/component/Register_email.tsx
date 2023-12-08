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
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import client from "../app/api/client";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import Login from "./Login";
import {
  isValidObjField,
  updateError,
  isValidEmail,
} from "../app/utils/methods";

import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  fullname: Yup.string()
    .trim()
    .min(3, "Invalid name")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .trim()
    .min(8, "Password is too short")
    .required("Password is required"),
  confirmPassword: Yup.string().equals(
    [Yup.ref("password"), null],
    "Does not match"
  ),
});

const Register_email_screen = () => {
  const navigation = useNavigation();

  const userInfo = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [error, setError] = useState("");

  const { fullname, email, password, confirmPassword } = userInfo;

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
    // only valid email id is allowed
    if (!isValidEmail(email)) return updateError("Invalid email!", setError);
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
      colors={["#BADEFF", "#BADEFF"]}
      style={globalStyle.linearGradient}
    >
      <SafeAreaView style={globalStyle.container}>
        <StatusBar hidden={true} />
        <KeyboardAvoidingView
          enabled
          behavior={Platform.OS === "ios" ? "padding" : null}
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
              const { fullname, email, password, confirmPassword } = values;
              return (
                <>
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
                      REGISTER
                    </Text>
                  </View>
                  <View>
                    <FormInput
                      value={fullname}
                      error={touched.fullname && errors.fullname}
                      onChangeText={handleChange("fullname")}
                      onBlur={handleBlur("fullname")}
                      autoCapitalize="none"
                      placeholder="Username"
                      label="Username"
                    />

                    <FormInput
                      value={email}
                      error={touched.email && errors.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      autoCapitalize="none"
                      placeholder="example@example.com"
                      label="Email"
                    />

                    <FormInput
                      value={password}
                      error={touched.password && errors.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      autoCapitalize="none"
                      secureTextEntry
                      placeholder="8 Character password"
                      label="Password"
                    />

                    <FormInput
                      value={confirmPassword}
                      error={touched.confirmPassword && errors.confirmPassword}
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      autoCapitalize="none"
                      secureTextEntry
                      placeholder="Confirm password"
                      label="Confirm password"
                    />

                    <View style={{ alignItems: "center" }}>
                      <SubmitBtn
                        submitting={isSubmitting}
                        onPress={handleSubmit}
                        label="CONTINUE"
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={globalStyle.login_here}>Login here!</Text>
                  </TouchableOpacity>
                </>
              );
            }}
          </Formik>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Register_email_screen;

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
  use_telephone: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    left: "65%",
  },
  login_here: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    left: "35%",
    marginTop: "10%",
  },
});
