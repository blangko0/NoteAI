import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

const quizData = [
  {
    questionWord: 'lOADINNG',
    question: 'lOADINNG',
    options: ['lOADINNG', 'lOADINNG', 'lOADINNG', 'lOADINNG'],
    correctAnswer: 'lOADINNG',
  },
];

export default function QuizScreen({route}) {
   const navigation = useNavigation();
  const quiz = route.params
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState({ right: 0, wrong: 0 });
  const [disabled, setDisabled]=useState(false)
  const [qa,setQA]=useState([])
  const currentQuestion = qa[questionIndex] ?qa[questionIndex] : quizData[questionIndex] ;

  useEffect(()=>{
    setQA(quiz?.quiz)
    setDisabled(false)
  },[])


  const createTwoButtonAlert = () =>
    Alert.alert('✅ Quiz Finished', 'Do you wanted to try again', [
      {
        text: 'Cancel',
        onPress: () =>{
          setQuestionIndex(0);
          navigation.popToTop();
          setScore({ right: 0, wrong: 0 });
        
        },
        style: 'cancel',
      },
      {text: 'OK', onPress: () => {
      setQuestionIndex(0);
      setScore({ right: 0, wrong: 0 })}},
    ]);



  const handleAnswer = (answer) => {
    setDisabled(true)
    const isCorrect = answer === currentQuestion.correctAnswer;
    setScore(prev => ({
      right: prev.right + (isCorrect ? 1 : 0),
      wrong: prev.wrong + (!isCorrect ? 1 : 0),
    }));

    const next = questionIndex + 1;
    console.log(next)
    if (next < qa.length) {
      setTimeout(() => {
        setDisabled(false)
        setQuestionIndex(next)

      }, 400);
    } else {
    createTwoButtonAlert()
    }
  };

  return (
    <View style={styles.container}>
    <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>✅ Right: {score.right}</Text>
        <Text style={styles.scoreText}>❌ Wrong: {score.wrong}</Text>
      </View>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Text style={styles.questionWord}>{currentQuestion.qa}</Text>
      <Text style={styles.question}>{currentQuestion.question}</Text>

      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            disabled={disabled}
            style={styles.button}
            onPress={() => handleAnswer(index)}
          >
            <Text style={styles.buttonText}>
              {String.fromCharCode(65 + index)}. {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingVertical: 48,
    justifyContent: 'flex-start',
  },
  questionWord: {
    fontSize: 18,
    color: '#888',
    fontWeight: '500',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  question: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 40,
    lineHeight: 32,
  },
  optionsContainer: {
    gap: 18,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 0.5,
  },
  scoreContainer: {
    borderTopWidth: 1,
    borderTopColor: '#222',
    paddingTop: 24,
    alignItems: 'center',
    flexDirection:"row",
    justifyContent:"space-between",
    padiing:20,
    marginBottom:10
  },
  scoreText: {
    fontSize: 16,
    color: '#aaa',
    fontWeight: '500',
    marginVertical: 2,
  },
});
