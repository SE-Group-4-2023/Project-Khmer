import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const SubmitBtn = ({label, onPress, submitting}) => {
  return (
    <TouchableOpacity onPress = {onPress} style = {styles.continue}>
        <Text style = {styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  )
}

export default SubmitBtn;

const styles = StyleSheet.create({
    continue: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 15,
        width: 150,
        top: -10,
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
})