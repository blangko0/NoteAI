import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Home from './screens/HomeScreen';
import CreateSubjectScreen from './screens/CreateSubjectScreen';
import TopicScreen from './screens/TopicScreen';
import CreateTopicScreen from './screens/CreateTopicScreen';
import Cameras from './service/ImageToText';
import ReadScreen from './screens/ReadScreen';

export default function Stack() {
    const Stack = createNativeStackNavigator();


  return (
   <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      <Stack.Screen name="Topic" component={TopicScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="CreateSubject" component={CreateSubjectScreen}   options={{ headerShown: false }}/>
      <Stack.Screen name="CreateTopic" component={CreateTopicScreen}   options={{ headerShown: false }}/>
      <Stack.Screen name="camera" component={Cameras}  options={{ headerShown: false }}/>
      <Stack.Screen name="ReadScreen" component={ReadScreen}  options={{ headerShown: false }}/>
      
      
   </Stack.Navigator>
  )
}
