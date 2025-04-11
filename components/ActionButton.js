import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";

export default function ActionButton({click,data}) {
  return (
        <TouchableOpacity style={styles.tab} onPress={()=> click(data)}>
            <Text style={styles.tab_text}>
                +
            </Text>
        </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
    tab:{
        position:"absolute",
        bottom:30,
        right:30,
        backgroundColor:"#2563EB",
        width:60,
        height:60,
        borderRadius:30,
        alignItems:"center",
        justifyContent:"center",
        shadowColor:"#000",
        shadowOpacity:0.15 ,
        shadowRadius:6,
        elevation:5,       
    },
    tab_text:{
        color:"white",
        fontSize:30,
        fontWeight:"bold"
    }
  });
  