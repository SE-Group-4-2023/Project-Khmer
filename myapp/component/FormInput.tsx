import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const FormInput = (props) => {
  const { placeholder, label, error } = props;
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <Text style={{ left: 11, top: 10, fontSize: 18, color: "white" }}>
          {label}
        </Text>
        {error ? (
          <Text style={{ top: -20, fontSize: 14, color: "white" }}>
            {error}
          </Text>
        ) : null}
      </View>
      <TextInput {...props} placeholder={placeholder} style={styles.input} />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    top: -30,
    borderWidth: 1,
    margin: 10,
    width: 250,
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
});

export default FormInput;
