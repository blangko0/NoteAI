import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { setUp } from './helper/storage';
import { useFonts } from 'expo-font';
import Stack from './Stack';
import { useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import storageJson from "./storage.json"
const loadQuestions = async () => {
  try {
    // Get the path to the document directory
    const uri = FileSystem.documentDirectory + 'storage.json';

    // Read the file as a string
    const fileContents = await FileSystem.readAsStringAsync(uri);

    // Parse the JSON string
    const data = JSON.parse(fileContents);

    // Set the data to state
     console.log(data)
  } catch (e) {
    console.log(" asdas " + FileSystem.documentDirectory)
  }
};

const MyButton = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable disabled={false}
        onPress={()=>console.log("hahahha")}
        style={{
          borderWidth: 2,
          borderColor: "blue",
          padding: 15,
          borderRadius: 10,
          backgroundColor: "lightblue",
        }}
      >
        <Text style={{ fontSize: 40, color: "white" }}>Working</Text>
      </Pressable>
    </View>
  );
};


export default function App() {
  const [fontsLoaded] = useFonts({
    'MyWideFont': require('./fontwide.otf'),
  });

  useEffect(()=>{
    console.log("working")
    loadQuestions()
    setUp("first-storage",[])
    setUp("second-storage",[])
    setUp("third-storage",[])
  },[])



  if(!fontsLoaded){
    return( 
    <View style={styles.container}>
    <MyButton/>
    </View>
  )
  }
  return (

    <NavigationContainer>
      <Stack/>
    </NavigationContainer>
      

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
