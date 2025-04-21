import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ActionButton from '../components/ActionButton';
import { useNavigation } from '@react-navigation/native';
import { getData } from '../helper/storage';
import * as Speech from 'expo-speech';
import Math from '../components/Math';
import Ionicons from '@expo/vector-icons/Ionicons';
import TextToSpeech from '../service/textToSpeech';
import QuizGenerator from '../service/quizGenerator';

   
function ReadScreen({ route }) {
  const navigation = useNavigation();
  const [isPlaying,setPlaying ] =useState(false)
  const [speechQueue, setSpeechQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const motherData = route.params.data.item
 


  const chunkText = (text, maxLength = 200) => {
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
    const chunks = [];
    let chunk = "";
  
    for (let sentence of sentences) {
      if ((chunk + sentence).length < maxLength) {
        chunk += sentence;
      } else {
        if (chunk) chunks.push(chunk.trim());
        chunk = sentence;
      }
    }
  
    if (chunk) chunks.push(chunk.trim());
    return chunks;
  };

  


const playChunks = async (chunks, index = 0) => {
  if (index >= chunks.length) {
    setPlaying(false);
    setCurrentIndex(0);
    return;
  }

  setCurrentIndex(index);
  Speech.speak(chunks[index], {
    onDone: () => {
      playChunks(chunks, index + 1);
    },
    onStopped: () => {
      setPlaying(false);
      setCurrentIndex(0);
    },
  });
};

const speak = () => {
  if (!isPlaying) {
    const chunks = chunkText(motherData.data);
    setSpeechQueue(chunks);
    setPlaying(true);
    playChunks(chunks);
  } else {
    Speech.stop();
    setPlaying(false);
    setCurrentIndex(0);
  }
};

  const gotoQuiz = (quiz) => {
    navigation.navigate('QuizScreen',quiz);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

      <View style={styles.headerContainer}>
        <Text style={styles.title}>{motherData.subjectTitle}</Text>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <Text style={styles.subtitle}>{motherData.date}</Text>
        <TouchableOpacity onPress={()=> speak()}>
           <Ionicons name={!isPlaying ? "play" :"pause-sharp"}  size={20} color="#2563EB" />
        </TouchableOpacity>
        </View>

      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
       {motherData.uid == "Math" ?
        <Math formulas={motherData.data}/>
        :
        <TextToSpeech style={styles.text} data={motherData.data}/>
       
       }
      </ScrollView>

      <QuizGenerator item={motherData} gotoQuiz={gotoQuiz}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  headerContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'MyWideFont',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 10,
    color: '#D1D5DB',
    marginTop: 6,
    fontFamily: 'MyWideFont',
  },
  scrollContainer: {
    paddingBottom: 120,
  },
  text: {
    backgroundColor: '#111111', // dark grey
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: '#E5E7EB',
    minHeight: 200, // Ensure enough space for text to show
  },
});

export default ReadScreen;
