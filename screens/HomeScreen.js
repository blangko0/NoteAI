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




function HomeScreen() {
  const navigation = useNavigation();
  const [subject, setSubject] = useState([])
  const [refresh,setRefresh] = useState(0)

  useFocusEffect(
    useCallback(() => {
      const fetchSubject = async () => {
        try {
          const fetching = await getData("first-storage");
          setSubject(fetching || []); // fallback to empty array
        } catch (error) {
          alert("try again")
        }
      };
  
      fetchSubject();
    }, [])
  );
  

  const createSubject = (data) => {
    navigation.navigate('CreateSubject');
    setRefresh(Math.floor(Math.random)*1000)
  };

  const navigateTopic = (data) =>{
    navigation.navigate("Topic",{data})
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

      <View style={styles.headerContainer}>
        <Text style={styles.title}>A.I NOTES</Text>
        <Text style={styles.subtitle}>Subject List</Text>
      </View>

      {!subject.length ? 
      <Text style={{color:"#3454d1", justifyContent:"center", alignSelf:"center", position:"absolute",top:400}}>No Subject Create Now</Text> :
      
        <FlatList
          data={subject}
          renderItem={(data)=> <SubjectCard list={data} click={navigateTopic}/>}
          keyExtractor={data => data.id}
          showsVerticalScrollIndicator={false}
        />
      }

      <ActionButton click={createSubject}  data={"null"}/>
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
    fontSize: 40,
    color: '#FFFFFF',
    fontFamily: 'MyWideFont',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 20,
    color: '#D1D5DB',
    marginTop: 6,
    fontFamily: 'MyWideFont',
  },
  scrollContainer: {
    paddingBottom: 120,
  },
});

export default HomeScreen;
