import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';
import {Audio} from 'expo-av';
import {AntDesign} from '@expo/vector-icons';

export default function App() {

  const [audio, setAudio] = useState(null);

  const [musicas, setMusicas] = useState([
    {
      nome: 'Kaen',
      artista: 'Dororo',
      playing: false,
      file: '',
    },
    {
      nome: 'Ohayo Sekai, God Morning World',
      artista: 'Dr. Stone',
      playing: false,
      file: '',
    },
    {
      nome: 'Inferno',
      artista: 'Fire Force',
      playing: false,
      file: '',
    },
    {
      nome: 'Liar',
      artista: 'One Ok Rock',
      playing: false,
      file: '',
    },
    {
      nome: 'Sasageyo',
      artista: 'Atack on Titan',
      playing: false,
      file: '',
    },
  ]);

  const changeMusic = (id)=>{
    let newMusic = musicas.filter((val, k)=>{
      if(id==k){
        musicas[k].playing = true;
      }
      else {
        musicas[k].playing = false;
      }
      return musicas[k];
    })
    setMusicas(newMusic);
  }


  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden />

      <View style={styles.header}>
        <Text style={styles.title}>App Musica - Diego Dev</Text>
      </View>

      <View style={styles.table}>
        <Text style={styles.tableText}>Música</Text>
        <Text style={styles.tableText}>Artísta</Text>
      </View>

      {
        musicas.map((val, k)=>{
          if(val.playing){
            return(
              <View style={styles.table}>
                <TouchableOpacity style={styles.touchable} onPress={()=>{changeMusic(k)}}>
                  <Text style={[styles.touchableText, {color: '#1db954'}]}>
                    <AntDesign name="play" size={15} color='#1db954' />  
                    {" "} {val.nome}
                  </Text>
                  <Text style={[styles.touchableText, {color: '#1db954'}]}>{val.artista}</Text>
                </TouchableOpacity>
              </View>
            )

          }else{
            return(
              <View style={styles.table}>
                <TouchableOpacity style={styles.touchable} onPress={()=>{changeMusic(k)}}>
                  <Text style={styles.touchableText}><AntDesign name="play" size={15} color='#fff'/>  {val.nome}</Text>
                  <Text style={styles.touchableText}>{val.artista}</Text>
                </TouchableOpacity>
              </View>
            )
          }
        })
      }
      
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
  table: {
    flexDirection: "row",
    padding: 20,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  tableText: {
    width: '50%',
    color: 'rgb(200,200,200)',
  },
  touchable: {
    width: '100%',
    flexDirection: 'row',
  },
  touchableText: {
    width: '50%',
    color: '#fff',
  },
});
