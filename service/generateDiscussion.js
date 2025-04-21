import React, { useState } from 'react';
import { TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';

const ipAdress = "https://noteai.online/action/pdf-converter";

function GenerateDiscussion({ button, buttonText, formData, setTopic, handleCreateSubject, topic }) {
  const [loading, setLoading] = useState(false);

  async function generateDiscussion() {
    setLoading(true);
    const length = Array.from(formData.keys()).length;
    console.log([...formData.entries()]); // For debugging
    console.log("it have data")
    if (length) {
      try {
        const response = await fetch(ipAdress, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Server returned error:", errorText);
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        setTopic(data);
      } catch (error) {
        alert("Network or server error occurred.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("No entry on formdata");
    }

   setLoading(false); // This should remain until you restore the try-catch logic
  }

  return (
    <View>
      {loading ? (
        <View style={{backgroundColor:"blue",borderRadius:10,alignItems:"center",padding:20}}>
          <ActivityIndicator size="large" color="#E50914" />
          <Text style={[buttonText,{letterSpacing:10}]}>Loading...</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={button}
          onPress={!topic.discussion?.length ? generateDiscussion :  () => handleCreateSubject()}
          disabled={loading}
        >
          <Text style={buttonText}>{!topic.discussion?.length ? "Generate Discussion" : "Save Now"}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default GenerateDiscussion;
