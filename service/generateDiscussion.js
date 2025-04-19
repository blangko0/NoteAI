import React, { useState } from 'react';
import { TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ipAdress = "end point";

function GenerateDiscussion({ button, buttonText, formData,setTopic }) {
  const [loading, setLoading] = useState(false);

  async function generateDiscussion() {
    const length = Array.from(formData.keys()).length;
  
    if (length) {
      try {
        setLoading(true); 
        const response = await axios.post(ipAdress, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setTopic(response.data)
      
      } catch (error) {
        console.error("Failed to generate discussion:", error);
      } finally {
        setLoading(false); 
      }
    }else{
      alert("No entry on formdata")
    }
  }

  return (
    <View>
      <TouchableOpacity
        style={button}
        onPress={generateDiscussion}
        disabled={loading} // Disable while loading
      >
        {
          loading ? (
            <Text style={buttonText}>Loading...</Text>
            // Or use ActivityIndicator below if you want a spinner instead
            // <ActivityIndicator color="#fff" />
          ) : (
            <Text style={buttonText}>Create Subject</Text>
          )
        }
      </TouchableOpacity>
    </View>
  );
}

export default GenerateDiscussion;
