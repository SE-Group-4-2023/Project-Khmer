import React, { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, Button, Image, Text, StyleSheet, View, SafeAreaView, TouchableOpacity, TextInput, Pressable, ScrollView, Keyboard, KeyboardAvoidingView, } from 'react-native';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import ListOfExercise from './ListOfExercise';

export default function Homepage({ navigation: goBack }) {
    const scrollViewRef = useRef(null);
    const navigation = useNavigation();
    return (
        <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={globalStyle.container}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        showsVerticalScrollIndicator={false}>

        <SafeAreaView style={globalStyle.container}>
            <StatusBar hidden = {false} />

            <View style={globalStyle.top}>

                <View style={globalStyle.exitButton1}>
                    <TouchableOpacity>
                        <Text style = {globalStyle.exitButton2}>
                            <Entypo name="menu" size={40} color="black" />
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={globalStyle.settingTitle1}>
                    <Text style={globalStyle.settingTitle2}>What do you want to learn?</Text>
                </View>

                <View style={globalStyle.avatarContainer}>
                    <TouchableOpacity>
                        <View style={globalStyle.circle}></View>
                        <Image source={require('../images/profile.jpg')} style={globalStyle.avatar} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={globalStyle.main}>
                <View style={globalStyle.points}>
                    <View style={globalStyle.infocircle}></View>
                    <Text style={globalStyle.textsize}>points</Text>

                </View>

                <View style={globalStyle.feature}>
                    <Text style={globalStyle.textsize}>Featured Language</Text>

                    <TouchableOpacity onPress = {() => navigation.navigate("ListOfExercise")}>
                        <View style={globalStyle.circlebackground}>
                            <Image source={require('../images/british.png')} style={globalStyle.flag} />
                            <Text style={globalStyle.languagetitle}>English</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={globalStyle.circlebackground}> 
                            <Image source={require('../images/french.png')} style={globalStyle.flag} />
                            <Text style={globalStyle.languagetitle}>French</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={globalStyle.circlebackground}> 
                            <Image source={require('../images/cambodia.png')} style={globalStyle.flag} /> 
                            <Text style={globalStyle.languagetitle}>Khmer</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={globalStyle.feature}>
                    <Text style={globalStyle.textsize}>Other Language</Text>

                    <TouchableOpacity>
                        <View style={globalStyle.circlebackground}> 
                            <Image source={require('../images/thai.png')} style={globalStyle.flag} />     
                            <Text style={globalStyle.languagetitle}>Thai</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={globalStyle.circlebackground}> 
                        <Image source={require('../images/spain.png')} style={globalStyle.flag} /> 
                            <Text style={globalStyle.languagetitle}>Spanish</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={globalStyle.circlebackground}>  
                        <Image source={require('../images/germany.png')} style={globalStyle.flag} /> 
                            <Text style={globalStyle.languagetitle}>Mandarin</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={globalStyle.circlebackground}> 
                        <Image source={require('../images/india.png')} style={globalStyle.flag} /> 
                            <Text style={globalStyle.languagetitle}>Hindi</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={globalStyle.circlebackground}> 
                            <Image source={require('../images/russia.png')} style={globalStyle.flag} /> 
                            <Text style={globalStyle.languagetitle}>Russian</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={globalStyle.circlebackground}>  
                            <Image source={require('../images/germany.png')} style={globalStyle.flag} /> 
                            <Text style={globalStyle.languagetitle}>German</Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity>
                        <View style={globalStyle.circlebackground}>
                            <Image source={require('../images/italy.png')} style={globalStyle.flag} />   
                            <Text style={globalStyle.languagetitle}>Italian</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
        </ScrollView>
    );
};

const globalStyle = StyleSheet.create({
    container: {
      flex: 1,
    //   paddingHorizontal: 30,
      backgroundColor: '#A4D3FF',
    },

    //top of the page
    top: {
        alignItems: 'flex-end',
        zIndex: 10,   
    },
    exitButton1: {
        position: 'absolute',
        top: 25,
        left: 30,
    },
    exitButton2: {
        fontSize: 28,
        color: 'black',
        fontWeight: 'bold',
    },
    settingTitle1: {
        position: 'absolute',
        top: 32,
        left: 90,
    },
    settingTitle2: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    avatarContainer: {
        position: 'absolute',
        top: 15,
        left: 100,
    },
    avatar: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 70,
        top: 10,
        left: 255,
    },
    circle: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 70,
        backgroundColor: '#05D800',
        zIndex: 0,
        top: 5,
        left: 250,
    },

    //main middle page
    main: {

    },
    points: {
        position: 'relative',
        top: 50,
        left: 100,
    },
    textsize: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    infocircle: {
        position: "relative",
        top: 37,
        left: -60,
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#fffff',
        zIndex: 0,
    },
    feature: {
        position: "relative",
        top: 90,
        left: 40,
    },
    circlebackground: {
        position: "relative",
        backgroundColor: '#ffffff',
        width: 352,
        height: 47,
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    languagetitle: {
        left: 90,
        bottom: 0,
        fontSize: 19,
        color: 'black',
        
    },
    flag: {
        position: "absolute",
        width: 80,
        height: 46,
        left: 0,
        bottom: 1,
        borderRadius: 10,
    },

    //rest 
    img: {
      height: 152,
      width: 152,
      position: 'absolute',
      bottom: 250,
      left: '15%',
    },
    login: {
      position: 'absolute',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 15,
      width: 150,
      left: '15%',
      top: 200,
    },
    buttonText: {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
      margin: 30,
    },
    forget_password: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
      position: 'absolute',
      left: '60%',
    },
    new_here: {
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      position: 'absolute',
      top: 200,
      left: '17%',
    },
  });
