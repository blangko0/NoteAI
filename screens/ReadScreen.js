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
const thingToSay = `
Discussion: The Importance of English Grammar in Effective Communication

Introduction:

English grammar is the foundation of effective communication in both written and spoken forms. It is a system of rules that governs the structure of words, phrases, clauses, and sentences. Without grammar, conveying clear and meaningful ideas becomes difficult. Whether used in academic writing, professional emails, or casual conversations, proper grammar ensures that a message is understood as intended. In this discussion, we will explore the significance of English grammar, its impact on communication, and the common challenges learners face when trying to master it.

Body:

First and foremost, grammar provides structure to language. It allows us to arrange words in a logical and organized manner. For example, the sentence “The cat chased the mouse” follows a subject-verb-object pattern, which makes it easy to understand. However, if we say “Chased the cat the mouse,” the meaning becomes unclear due to incorrect word order. Grammar rules guide us in using tenses, articles, punctuation, and sentence structure properly, all of which are essential for clarity.

Secondly, good grammar enhances credibility. In professional settings, well-written communication reflects intelligence, attention to detail, and respect for the reader. A resume or job application with grammatical errors might leave a negative impression, even if the candidate is highly qualified. Similarly, in academic contexts, grammar mistakes can affect the quality of essays, research papers, and presentations.

Moreover, mastering English grammar helps non-native speakers improve their fluency and confidence. When learners understand how sentences are formed, they can express their thoughts more accurately and engage in deeper conversations. It also helps in preparing for standardized tests like IELTS or TOEFL, where grammar is a key component of the writing and speaking sections.

However, learning grammar can be challenging. The English language has many irregularities and exceptions to its rules. For instance, the plural of “child” is “children” and not “childs.” Verb tenses like present perfect or past continuous can also confuse learners. Despite these difficulties, consistent practice, reading, and exposure to the language can gradually build a strong grammatical foundation.

Conclusion:

In conclusion, English grammar plays a critical role in effective communication. It brings clarity, precision, and professionalism to the way we express our thoughts. While learning grammar may be challenging at times, its benefits in both academic and real-world contexts are undeniable. By understanding and applying grammar rules, individuals can significantly enhance their ability to communicate, connect, and succeed in various fields. Therefore, grammar should be viewed not as a burden, but as a valuable tool for expression and understanding.
   `;
   
function ReadScreen({ route }) {
  const navigation = useNavigation();
  const [isPlaying,setPlaying ] =useState(false)
  const motherData = route.params.data.item
  console.log(motherData)

  const speak = () => {
     if(!isPlaying){
      Speech.speak(thingToSay);      
      setPlaying(true)
    }else{
      Speech.stop()
      setPlaying(false)
    }

  };

  const createTopic = () => {
    navigation.navigate('CreateTopic');
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
       {motherData.uid == "math" ?
        <Math formulas={motherData.data}/>
        :
        <Text style={styles.text}>{thingToSay}</Text>
       
       }
      </ScrollView>

      <ActionButton click={createTopic} />
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
    backgroundColor: '#1F2937', // dark grey
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: '#FFFFFF',
    minHeight: 200, // Ensure enough space for text to show
  },
});

export default ReadScreen;
