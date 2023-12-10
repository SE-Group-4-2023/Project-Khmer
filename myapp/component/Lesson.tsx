import React, { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StatusBar, Button, Image, Text, StyleSheet, View, SafeAreaView, TouchableOpacity, TextInput, Pressable, ScrollView, Keyboard, KeyboardAvoidingView, } from 'react-native';
import { MaterialCommunityIcons, Entypo, AntDesign, Ionicons } from '@expo/vector-icons';
import homePage from './HomePage';
import listOfExercise from './ListOfExercise';
import axios from 'axios';
import client from "../app/api/client";
// import profile from '../example/profile';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const home = 'homepage';
const listOfExercises = 'Exercise';
const userProfile = 'profile';

const Lesson = ({ navigation: { goBack } }) => {
    const scrollViewRef = useRef(null);
    const navigation = useNavigation();
    // const Tab = createBottomTabNavigator();

    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [userAnswer, setUserAnswer] = useState(null);
    const [imageError, setImageError] = useState(null);
  
    useEffect(() => {
      fetchRandomQuestion();
    }, []);
  
    const fetchRandomQuestion = async () => {
      try {
        const response = await client.get('/question');
        const question = response.data;
  
        setCurrentQuestion(question);
        setUserAnswer(null);
        setImageError(null); // Reset image error state
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };
  
    const handleSelectAnswer = (answer) => {
      setUserAnswer(answer);
      alert(answer === currentQuestion.answer ? 'Correct!' : 'Incorrect');
    };
  
    const handleImageError = () => {
      setImageError('Error loading image');
    };
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
                        <Image source={require('../images/profile.jpg')} style={globalStyle.avatar} />
                    </TouchableOpacity>
                </View>          
            </View>

            <SafeAreaView style={globalStyle.safeview}>
            <StatusBar hidden = {false} />
                    <View style={globalStyle.main}>
                    {currentQuestion && (
                        <View>
                            
                            <View style={globalStyle.feature}>
                                <View style={globalStyle.question}>
                                    <Text style={globalStyle.textsize}>Question 1: What is this called in english?</Text>
                                </View>                           
                            </View>
                            <View style={globalStyle.feature}>
                                {imageError ? (
                                    <Text>{imageError}</Text>
                                ) : (
                                <Image
                                source={{ uri: currentQuestion.question }}
                                style={globalStyle.exerciseImg}
                                onError={handleImageError} // Handle image loading errors
                                />
                                )}
                            </View>

                            <View style={globalStyle.feature}>
                                <View style={globalStyle.mcq}>
                                    <View style={globalStyle.choice1}>
                                        <TouchableOpacity style={globalStyle.circlebackground1} onPress={() => handleSelectAnswer(currentQuestion.choice1)}>
                                            <View>
                                                <Text style={globalStyle.choiceText}>A. {currentQuestion.choice1}</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={globalStyle.circlebackground3} onPress={() => handleSelectAnswer(currentQuestion.choice3)}>
                                            <View>
                                                <Text style={globalStyle.choiceText}>C. {currentQuestion.choice3}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={globalStyle.choice2}>
                                        <TouchableOpacity style={globalStyle.circlebackground2} onPress={() => handleSelectAnswer(currentQuestion.choice2)}>
                                            <View>
                                                <Text style={globalStyle.choiceText}>B. {currentQuestion.choice2}</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={globalStyle.circlebackground4} onPress={() => handleSelectAnswer(currentQuestion.choice4)}>
                                            <View>
                                                <Text style={globalStyle.choiceText}>D. {currentQuestion.choice4}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                    <TouchableOpacity style={globalStyle.nextButton} onPress={fetchRandomQuestion}>
                        <Text style={globalStyle.nextButtonText}>Next Question</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaView>
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
    nextButton: {
        margin: 100,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#BF40BF',
        alignItems: 'center', // Center items horizontally
        justifyContent: 'center',
      },
      nextButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
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
        width: 300,
        height: 300,
        right: 0,
        resizeMode: 'contatin',
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

export default Lesson;