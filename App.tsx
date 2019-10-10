import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Container from './src/App'

export default function App() {
  return <Container />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})