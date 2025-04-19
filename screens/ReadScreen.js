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

   
function ReadScreen({ route }) {
  const navigation = useNavigation();
  const [isPlaying,setPlaying ] =useState(false)
  const motherData = route.params.data.item
 

  const speak = () => {
    
     if(!isPlaying){
      Speech.speak(motherData.data);      
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
       {motherData.uid == "Math" ?
        <Math formulas={motherData.data}/>
        :
        <TextToSpeech style={styles.text} data={motherData.data}/>
       
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
    backgroundColor: '#111111', // dark grey
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: '#E5E7EB',
    minHeight: 200, // Ensure enough space for text to show
  },
});

export default ReadScreen;
