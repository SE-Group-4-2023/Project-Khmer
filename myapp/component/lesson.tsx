import React, { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StatusBar, Button, Image, Text, StyleSheet, View, SafeAreaView, TouchableOpacity, TextInput, Pressable, ScrollView, Keyboard, KeyboardAvoidingView, } from 'react-native';
import { MaterialCommunityIcons, Entypo, AntDesign, Ionicons } from '@expo/vector-icons';
import homePage from '../component/homePage';
import listOfExercise from '../component/listOfExercise';
// import profile from '../example/profile';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const home = 'homepage';
const listOfExercises = 'Exercise';
const userProfile = 'profile';

export default function lesson({ navigation: { goBack } }) {
    const scrollViewRef = useRef(null);
    const navigation = useNavigation();
    // const Tab = createBottomTabNavigator();
    return (
        <>
        <SafeAreaView style={globalStyle.container}>
        
            <View style={globalStyle.top}>

                <View style={globalStyle.exitButton1}>
                    <TouchableOpacity onPress = {() => goBack(listOfExercise)}>
                        <Text style = {globalStyle.exitButton2}>
                            <AntDesign name="leftcircleo" size={40} color="black" />
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={globalStyle.settingTitle1}>
                    <Text style={globalStyle.settingTitle2}>English</Text>
                </View>

                <View style={globalStyle.avatarContainer}>
                    <TouchableOpacity>
                        <View style={globalStyle.circle}></View>
                        <Image source={require('../pic/profile.jpg')} style={globalStyle.avatar} />
                    </TouchableOpacity>
                </View>          
            </View>

            <SafeAreaView style={globalStyle.safeview}>
            <StatusBar hidden = {false} />
                    <View style={globalStyle.main}>

                        <View style={globalStyle.feature}>
                            <View style={globalStyle.question}>
                                <Text style={globalStyle.textsize}>Question 1: What is this called in english?</Text>
                            </View>                           
                        </View>

                        <View style={globalStyle.feature}>
                            <Image source={require('../pic/exercise/mushroom.png')} style={globalStyle.exerciseImg} />
                        </View>

                        <View style={globalStyle.feature}>
                            <View style={globalStyle.mcq}>
                                <View style={globalStyle.choice1}>
                                    <TouchableOpacity style={globalStyle.circlebackground1}>
                                        <View>
                                            <Text style={globalStyle.choiceText}>Accorns</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={globalStyle.circlebackground3}>
                                        <View>
                                            <Text style={globalStyle.choiceText}>Peanuts</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={globalStyle.choice2}>
                                    <TouchableOpacity style={globalStyle.circlebackground2}>
                                        <View>
                                            <Text style={globalStyle.choiceText}>Mushroom</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={globalStyle.circlebackground4}>
                                        <View>
                                            <Text style={globalStyle.choiceText}>Hamster</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        
                    </View>
            </SafeAreaView>
        </SafeAreaView>
              
            {/* <NavigationContainer>
                <Tab.Navigator 
                    initialRouteName={home}
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({focused, color, size}) => {
                            let iconName;
                            let rn = route.name;

                            if (rn === home) {
                                iconName = focused ? 'home' : 'home-outline';
                            } else if (rn === listOfExercises) {
                                iconName = focused ? 'list' : 'list-outline';
                            } else if (rn === userProfile) { 
                                iconName = focused ? 'person-circle' : 'person-circle-outline';
                            }
                            
                            return <Ionicons name={iconName} size={size} color={color} />
                        }
                    })}>

                    <Tab.Screen name={home} component={homepage} />
                    <Tab.Screen name={listOfExercises} component={exercise} />
                    <Tab.Screen name={userProfile} component={profile} />

                </Tab.Navigator>
            </NavigationContainer> */}
      </>
    );
};

const globalStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A4D3FF', 
    },
    safeview: {
        flex: 1,
        
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
        left: 160,
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
        flex: 1,
        position: "relative",
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
    feature: {
        position: "relative",
        top: 90,
        left: 40,
    },
    exerciseImg: {
        position: "relative",
        width: 350,
        height: 250,
        right: 0,
    },
    question: {
        width: 350,
        marginBottom: 15,
    },

    //circle choice
    mcq: {
        justifyContent: 'center',
        alignContent: 'center',
        right: 15,
        marginTop: 15,
    },
    circlebackground1: {
        position: "relative",
        backgroundColor: '#ffffff',
        width: 170,
        height: 120,
        borderTopLeftRadius: 10,
        padding: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circlebackground2: {
        position: "relative",
        backgroundColor: '#ffffff',
        width: 170,
        height: 120,
        borderBottomLeftRadius: 10,
        padding: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circlebackground3: {
        position: "relative",
        backgroundColor: '#ffffff',
        width: 170,
        height: 120,
        borderTopRightRadius: 10,
        padding: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circlebackground4: {
        position: "relative",
        backgroundColor: '#ffffff',
        width: 170,
        height: 120,
        borderBottomRightRadius: 10,
        padding: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    choice1: {
        flexDirection: 'row',
    },
    choice2: {
        flexDirection: 'row',
    },
    choiceText: {
        fontSize: 25,
        color: 'black',
        fontWeight: 'bold',
    },
  });
