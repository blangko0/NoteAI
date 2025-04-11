import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, Alert } from 'react-native';
import { CameraView } from 'expo-camera';
import * as FileSystem from 'expo-file-system'; // For file system access to read the image as base64

export default function Camera({ navigation }) {
  const [photo, setPhoto] = useState(null);
  const [ocrResult, setOcrResult] = useState(null); // Store OCR result
  const cameraRef = useRef(null);
  const [text, setText] = useState("");

  useEffect(() => {
    console.log(text); // Log OCR result whenever `text` state changes
  }, [text]);

  // Handle picture capture
  const takePicture = async () => {
    try {
      if (cameraRef.current) {
        const data = await cameraRef.current.takePictureAsync();
        console.log('Image URI:', data.uri);

        // Convert the image to base64
        const base64Image = await FileSystem.readAsStringAsync(data.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        setPhoto(base64Image); // Set base64 image to state
      }
    } catch (error) {
      console.log('Error capturing photo: ', error);
    }
  };

  // Handle OCR result from WebView
  
  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        ref={cameraRef}
        facing="back"
        mode="picture"
      />

      <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
        <Text style={styles.text}>Capture</Text>
      </TouchableOpacity>

      {photo && (
        <View style={styles.photoContainer}>
          <Image source={{ uri: `data:image/jpeg;base64,${photo}` }} style={styles.photo} />
        </View>
      )}
        
    </View>
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  captureButton: {
    position: 'absolute',
    bottom: 50,
    left: '40%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 50,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  photoContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  ocrResultContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#1F2937',
    padding: 10,
    borderRadius: 14,
  },
  ocrResult: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
});
