import React, { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, Button, Image, Text, StyleSheet, View, SafeAreaView, TouchableOpacity, TextInput, Pressable, ScrollView, Keyboard, KeyboardAvoidingView, } from 'react-native';
import { MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import homePage from '../component/homePage';
import lesson from '../component/lesson';


export default function exercise({ navigation: { goBack } }) {
    const scrollViewRef = useRef(null);
    const navigation = useNavigation();
    return (
        <>
        <StatusBar hidden = {false} />
        
        <View style={globalStyle.body}>
        
        <SafeAreaView style={globalStyle.container}>
        <ScrollView 
            contentInsetAdjustmentBehavior="automatic"
            ref={scrollViewRef}
            contentContainerStyle={globalStyle.scrollview}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            showsVerticalScrollIndicator={false}>

            <View style={globalStyle.top}>

                <View style={globalStyle.exitButton1}>
                    <TouchableOpacity onPress = {() => goBack(homePage)}>
                        <Text style = {globalStyle.exitButton2}>
                            <AntDesign name="leftcircleo" size={40} color="black" />
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={globalStyle.settingTitle1}>
                    <Text style={globalStyle.settingTitle2}>Exercise</Text>
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
                                <Text style={globalStyle.textsize}>What is recommended for you today</Text>

                                <TouchableOpacity onPress = {() => navigation.navigate("lesson")}>
                                    <View style={globalStyle.circlebackground}>
                                        <Image source={require('../images/mcq.png')} style={globalStyle.exercise} />
                                        <Text style={globalStyle.languagetitle}>Pick the correct word</Text>
                                        <Text style={globalStyle.languagetitle}>3 points</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <View style={globalStyle.circlebackground}>
                                        <Image source={require('../images/writing.png')} style={globalStyle.exercise} />
                                        <Text style={globalStyle.languagetitle}>Fill in the blanks</Text>
                                        <Text style={globalStyle.languagetitle}>3 points</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <View style={globalStyle.circlebackground}>
                                        <Image source={require('../images/hearing.png')} style={globalStyle.exercise} />
                                        <Text style={globalStyle.languagetitle}>Story</Text>
                                        <Text style={globalStyle.languagetitle}>3 points</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
  
                            <View style={globalStyle.feature}>
                                <Text style={globalStyle.textsize}>Uncompleted exercises</Text>
                                <TouchableOpacity>
                                    <View style={globalStyle.circlebackground}>
                                        <Image source={require('../images/hearing.png')} style={globalStyle.exercise} />
                                        <Text style={globalStyle.languagetitle}>Listen comprehension</Text>
                                        <Text style={globalStyle.languagetitle}>7 points</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <View style={globalStyle.circlebackground}>
                                        <Image source={require('../images/hearing.png')} style={globalStyle.exercise} />
                                        <Text style={globalStyle.languagetitle}>Grocery story</Text>
                                        <Text style={globalStyle.languagetitle}>3 points</Text>
                                    </View>
                                </TouchableOpacity>
                                
                            </View>

                            <View style={globalStyle.feature}>
                                <Text style={globalStyle.textsize}>Completed exercises</Text>
                                <TouchableOpacity>
                                    <View style={globalStyle.circlebackground}>
                                        <Image source={require('../images/writing.png')} style={globalStyle.exercise} />
                                        <Text style={globalStyle.languagetitle}>Introduction</Text>
                                        <Text style={globalStyle.languagetitle}>10 points</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <View style={globalStyle.circlebackground}>
                                        <Image source={require('../images/british.png')} style={globalStyle.exercise} />
                                        <Text style={globalStyle.languagetitle}>English 101</Text>
                                        <Text style={globalStyle.languagetitle}>3 points</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <View style={globalStyle.circlebackground}>
                                        <Image source={require('../images/mcq.png')} style={globalStyle.exercise} />
                                        <Text style={globalStyle.languagetitle}>Grammar 101</Text>
                                        <Text style={globalStyle.languagetitle}>3 points</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>    
            </View>
        </ScrollView>
        </SafeAreaView>

        </View>
    </>   
    );
};

const globalStyle = StyleSheet.create({
    body: {
        backgroundColor: '#A4D3FF',
    },
    container: {
        width: '100%',
    },
    //top of the page
    top: {

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
        top: 28,
        left: 90,
    },
    settingTitle2: {
        fontSize: 25,
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
    scrollview: {
        flexGrow: 1,
        backgroundColor: '#A4D3FF',
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
        zIndex: 10,
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
        height: 75,
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
    exercise: {
        position: "absolute",
        width: 80,
        height: 75,
        left: 0,
        bottom: 0,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
  });
