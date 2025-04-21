import AsyncStorage from '@react-native-async-storage/async-storage';


const setUp = async (key,value) => {
  try {
   
    const isStorageExits = await AsyncStorage.getItem(key);
    if(isStorageExits){
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    }
  } catch (e) {
    // saving error
  }
};


const storeData = async (key,value) => {
  
  try {
    if(value){
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    }
  } catch (e) {
    // saving error
  }
};



const getData = async (key,value) => {
  try {
    const isStorageExits = await AsyncStorage.getItem(key);
    return JSON.parse(isStorageExits)
  } catch (e) {
    // saving error
  }
};



export {setUp , storeData, getData}

