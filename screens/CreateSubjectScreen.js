import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { getData, storeData } from '../helper/storage';

const CreateSubjectScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [prev, setPrev] = useState([])
  const [date] = useState(new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }));

  
  useEffect(()=>{
      const fecthSubject = async() =>{
         try {
            const fecthing = await getData("first-storage")
            setPrev(fecthing)
         } catch (error) {          
         } 
      }
      fecthSubject()
  },[])


  





  const handleCreateSubject = () => {
    
    if (!title.trim() || !description.trim()) {
      Alert.alert('Missing Info', 'Please fill out all fields.');
      return;
    }
    const findSameTitle = prev.find((e)=> e.subjectTitle == title)
    if(findSameTitle){
      Alert.alert("Subject Warning", 'Subject Already Exist.');
      return;
    }

    const heroData = {
      subjectTitle:title,
      description:description,
      date:date,
      id: Math.floor(Math.random()* 300) 
    }
    setPrev((e)=> storeData("first-storage", [...e,heroData]))
    Alert.alert('Success', 'Subject created!');
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboardWrapper}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>Create a New Subject</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Subject Title</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. JavaScript for Beginners"
            placeholderTextColor="#6B7280"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Brief overview of the subject"
            placeholderTextColor="#6B7280"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        {title.trim() !== '' && description.trim() !== '' && (
          <View style={styles.previewCard}>
            <Text style={styles.previewTitle}>{title}</Text>
            <View style={styles.previewRow}>
              <Text style={styles.previewDescription}>{description}</Text>
              <Text style={styles.previewDate}>{date}</Text>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleCreateSubject}>
          <Text style={styles.buttonText}>Create Subject</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardWrapper: {
    flex: 1,
    backgroundColor: '#0D0D0D', // deep black
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  contentContainer: {
    paddingBottom: 60,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 32,
  },
  fieldGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E5E7EB',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1F2937', // dark grey
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: '#FFFFFF',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  previewCard: {
    backgroundColor: '#111111',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  previewTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  previewDescription: {
    color: '#D1D5DB',
    fontSize: 14,
    flex: 1,
    paddingRight: 10,
  },
  previewDate: {
    color: '#9CA3AF',
    fontSize: 13,
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 30,
    color: '#D1D5DB',
    marginTop: 6,
    fontFamily: 'MyWideFont',
    marginBottom:29
  },
});

export default CreateSubjectScreen;
