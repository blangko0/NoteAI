import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getData, storeData } from '../helper/storage';

const ipAdress = "https://noteai.online/action/quiz-generator";

export default function QuizGenerator({ item, gotoQuiz }) {
  const [quiz, setQuiz] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { data, date, description, id, subjectTitle, uid } = item;

  useFocusEffect(
    useCallback(() => {
      const fetchSubject = async () => {
        try {
          const fetching = await getData("third-storage");
           setQuiz(fetching)
           console.log(uid)
        } catch (error) {
          console.error("Error fetching subjects", error);
        }
      };

      fetchSubject();
    }, [uid])
  );

  const fetchingQuiz = async () => {
    


    try {
      const response = await fetch(ipAdress, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // ← likely missing
        },
        body: JSON.stringify({ prompt :data}), // ← wrap `data` appropriately
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server returned error:", errorText);
        throw new Error(`Server error: ${response.status}`);
      }
      const responseData = await response.json();
      console.log("Quiz generated:");
      setQuiz((e)=> storeData("third-storage",[...e,{uid:subjectTitle, quiz:responseData.data }]))
      gotoQuiz({quiz:responseData.data})
    } catch (error) {
      console.error("Failed to generate discussion:", error.message);
      alert("Network or server error occurred.");
    } finally {
      setIsGenerating(false); // ← should be false after fetch
    }
  };

  const generateQuiz = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    const search = quiz.find((e) => e?.uid === subjectTitle);
    if (!search) {
     await fetchingQuiz();
    } else {
      setIsGenerating(false); // reset if quiz already exists
      gotoQuiz(search)
    }
  }
  

  return (
    <TouchableOpacity
      disabled={isGenerating}
      style={styles.tab}
      onPress={generateQuiz}
    >
      {isGenerating ? (
        <ActivityIndicator color={"white"} />
      ) : (
        <Ionicons name="bulb-outline" size={24} color="white" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#2563EB",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  tab_text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold"
  }
});
