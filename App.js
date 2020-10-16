import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import {Audio} from 'expo-av';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.header}>
      <Text style={styles.title}>App Musica - Diego Dev</Text>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  header: {
    backgroundColor: '#1db954',
    width: '100%',
    padding: 20,
  },
  title:{
    textAlign:'center',
    color: '#fff',
    fontSize: 20,
  },
});
