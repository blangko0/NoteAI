import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  FlatList,
} from 'react-native';
import ActionButton from '../components/ActionButton';
import SubjectCard from '../components/SubjectCard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getData } from '../helper/storage';



function TopicScreen({route}) {
  const navigation = useNavigation();
  const [topic , setTopic] = useState([])
  const [refresh,setRefresh] = useState(0)
  
  useFocusEffect(
    useCallback(() => {
      const fetchSubject = async () => {
        try {
          const fetchedData = await getData("second-storage");
          if (!fetchedData) return setTopic([]);
  
          const filteredTopics = fetchedData.filter(
            (item) => item.uid == route.params.data.item.subjectTitle
          );
  
          setTopic(filteredTopics);
        } catch (error) {
          alert("Error fetching topics:", error);
        }
      };
  
      fetchSubject();
    }, [route.params.data.item.subjectTitle])
  );
  
  





  const createTopic = (data) => {
    navigation.navigate('CreateTopic',route.params.data.item.subjectTitle);
    setRefresh(Math.floor(Math.random)*1000)
  };

  const navigateReadScreen = (data) =>{
    navigation.navigate("ReadScreen",{data})
  }



  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

      <View style={styles.headerContainer}>
        <Text style={styles.title}>{route.params.data.item.subjectTitle}</Text>
        <Text style={styles.subtitle}>Topic List</Text>
      </View>

         {!topic.length ? 
             <Text style={{color:"#3454d1", justifyContent:"center", alignSelf:"center", position:"absolute",top:400,fontSize:20}}>No Topic Create New Topic</Text> :
             
               <FlatList
                 data={topic}
                 renderItem={(data)=> <SubjectCard list={data} click={navigateReadScreen}/>}
                 keyExtractor={data => data.id}
                 showsVerticalScrollIndicator={false}
               />
             }

      <ActionButton click={createTopic} data={route.params.data.item.subjectTitle} />
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
    fontSize: 15,
    color: '#D1D5DB',
    marginTop: 6,
    fontFamily: 'MyWideFont',
  },
  scrollContainer: {
    paddingBottom: 120,
  },
});

export default TopicScreen;
