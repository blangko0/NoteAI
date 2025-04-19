import React, { useState } from 'react';
import { View, Button, Text, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import Ionicons from '@expo/vector-icons/Ionicons';

const PickDocument =  ({style,dataPdf,formData}) => {
        const [data , setData] = useState("")


    const getData = async () => {
       const result =  await DocumentPicker.getDocumentAsync({
            type: '*/*',
            copyToCacheDirectory: true,
            multiple: false,
          });

          if (!result.canceled && result.assets && result.assets.length > 0) {
            const file = result.assets[0];
            formData.append("file", {
                uri: file.uri,
                name: file.name,
                type: file.mimeType || 'application/octet-stream',
              });
            
            dataPdf(file)
            
          } else {
            console.log('❌ User canceled document picker', result);
          }
    } 


    return (
        <TouchableOpacity style={style[0]} onPress={()=> getData()}>
            <Ionicons name="add-circle" size={50} color="white" />
            <Text style={style[1]}>PDF/DOC To Text</Text>
        </TouchableOpacity>
    )
  };
  
  export default PickDocument;
  

