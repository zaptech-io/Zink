import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Resource = () => {
  const {id}  = useLocalSearchParams()

  return (
    <View>
      <Text>Resource {id}</Text>
    </View>
  )
}

export default Resource
