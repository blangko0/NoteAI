import React from 'react'
import { View,Text } from 'react-native'

function TextToSpeech({style,data}) {
  return (
    <View>
        <Text style={style}>{data}</Text>
    </View>
  )
}

export default TextToSpeech
