import React, { useEffect, useRef, useState } from 'react';
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
import Ionicons from '@expo/vector-icons/Ionicons';
import { CameraView, CameraType, useCameraPermissions, useCamera } from 'expo-camera';
import { getData ,storeData} from '../helper/storage';
import { useNavigation } from '@react-navigation/native';
import PickDocument from '../service/pdfReader';
import PickImage from '../service/ImageToText';
import GenerateDiscussion from '../service/generateDiscussion';


// const formulas = [
//   {
//     title: 'Power Rule',
//     latex: '\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)',
//     example: '\\int x^3 \\, dx = \\frac{x^4}{4} + C',
//   },
//   {
//     title: 'Constant Function',
//     latex: '\\int 1 \\, dx = x + C',
//     example: '\\int 1 \\, dx = x + C',
//   },
//   {
//     title: 'Constant Multiple Rule',
//     latex: '\\int a \\cdot f(x) \\, dx = a \\cdot \\int f(x) \\, dx',
//     example: '\\int 5x^2 \\, dx = \\frac{5x^3}{3} + C',
//   },
//   {
//     title: 'Exponential Function',
//     latex: '\\int e^x \\, dx = e^x + C',
//     example: '\\int e^x \\, dx = e^x + C',
//   },
//   {
//     title: 'Logarithmic Rule',
//     latex: '\\int \\frac{1}{x} \\, dx = \\ln |x| + C',
//     example: '\\int \\frac{1}{x} \\, dx = \\ln |x| + C',
//   }
// ];



const CreateTopicScreen = ({route}) => {
  const formData = useRef(new FormData()).current;

  const navigation = useNavigation()
  const [permission, requestPermission] = useCameraPermissions();
  const [title, setTitle] = useState('');
  const [description ,setDescription] = useState("")
  const [topic ,setTopic] = useState("")
  const [prev, setPrev] = useState([])
  const [pdfData, setPdfData] = useState("")
  const [imageData, setImageData] = useState("")
  const [date] = useState(new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }));


  
  
  useEffect(()=>{
      const fecthSubject = async() =>{
         try {
            const fecthing = await getData("second-storage")
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
      data:topic,
      date:date,
      id: Math.random()*100,
      uid:route.params
    }

   setPrev((e)=> storeData("second-storage", [...e,heroData]))
   Alert.alert('Success', 'Subject created!');
    navigation.goBack();
  };






  useEffect(() => {
    const checkPermission = async () => {
      const { status } = await requestPermission();
      console.log("Permission status:", status); // Log the status for debugging
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Camera permission is needed to proceed.');
      }
    };

    if (permission === null) {
      checkPermission(); // Check permission only if it's not already determined
    }
  }, [permission, requestPermission]);





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
        <Text style={styles.subtitle}>Create a New Topic</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Topic Title</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. JavaScript for Beginners"
            placeholderTextColor="#6B7280"
            value={title}
            onChangeText={setTitle}
          />
        </View>


          {/* this where theimg and pdf works */}

        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
             <PickImage style={[styles.box,styles.text]} dataImage={setImageData} formData={formData}/>
            <PickDocument style={[styles.box,styles.text]} dataPdf={setPdfData} formData={formData}/>
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

        {/* Generate discussion */}
        <GenerateDiscussion  button={styles.button} buttonText={styles.buttonText} formData={formData} setTopic={setTopic}/>
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
    padding: 10,
    fontSize: 16,
    color: '#FFFFFF',
  },
  textArea: {
    height: 50,
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
    fontSize: 25,
    color: '#D1D5DB',
    marginTop: 6,
    fontFamily: 'MyWideFont',
    marginBottom:29
  },
  box:{
    backgroundColor:"#1F2937",
    width:150,
    height:150,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20,
    elevation:10,
    shadowColor:"black",
    marginBottom:20
  },
  text:{
    fontSize:20,
    fontWeight:600,
    color:"white"
  }
});

export default CreateTopicScreen;
