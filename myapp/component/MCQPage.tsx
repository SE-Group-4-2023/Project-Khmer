import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import client from "../app/api/client";

const MCQPage = () => {
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
    <View style={styles.container}>
      {currentQuestion && (
        <View>
          {imageError ? (
            <Text>{imageError}</Text>
          ) : (
            <Image
              source={{ uri: currentQuestion.question }}
              style={styles.image}
              onError={handleImageError} // Handle image loading errors
            />
          )}
          <Text style={styles.questionText}>What is the fruit?</Text>
          <TouchableOpacity style={styles.choiceButton} onPress={() => handleSelectAnswer(currentQuestion.choice1)}>
            <Text style={styles.choiceButtonText}>A. {currentQuestion.choice1}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.choiceButton} onPress={() => handleSelectAnswer(currentQuestion.choice2)}>
            <Text style={styles.choiceButtonText}>B. {currentQuestion.choice2}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.choiceButton} onPress={() => handleSelectAnswer(currentQuestion.choice3)}>
            <Text style={styles.choiceButtonText}>C. {currentQuestion.choice3}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.choiceButton} onPress={() => handleSelectAnswer(currentQuestion.choice4)}>
            <Text style={styles.choiceButtonText}>D. {currentQuestion.choice4}</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.nextButton} onPress={fetchRandomQuestion}>
        <Text style={styles.nextButtonText}>Next Question</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  choiceButton: {
    width: '80%',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#3498db',
    alignItems: 'center',
  },
  choiceButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  nextButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#2ecc71',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MCQPage;
