import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, LogBox } from 'react-native';
import {Audio} from 'expo-av';
import {AntDesign} from '@expo/vector-icons';
import Player from './src/components/Player';


export default function App() {

  LogBox.ignoreAllLogs(true);

  const [audioIndex, setAudioIndex] = useState(0);

  const [playing, setPlaying] = useState(false);

  const [audio, setAudio] = useState(null);

  const [musicas, setMusicas] = useState([
    {
      nome: 'Kaen',
      artista: 'Dororo',
      playing: false,
      file: require('./src/midia/Dororo.mp3'),
    },
    {
      nome: 'Black Cat',
      artista: 'Black Clover',
      playing: false,
      file: require('./src/midia/BlackCat.mp3'),
    },
    {
      nome: 'Liar',
      artista: 'One Ok Rock',
      playing: false,
      file: require('./src/midia/Liar.m4a'),
    },
    {
      nome: 'Sasageyo',
      artista: 'Atack on Titan',
      playing: false,
      file: require('./src/midia/Sasageyo.mp3'),
    },
  ]);

  const changeMusic = async (id) =>{
    let curFile = null;
    let newMusic = musicas.filter((val, k)=>{
      if(id==k){
        musicas[k].playing = true;

        curFile = musicas[k].file;
        setPlaying(true);
        setAudioIndex(id);
      }
      else {
        musicas[k].playing = false;
      }
      return musicas[k];
    })

    if(audio != null){
      audio.unloadAsync();
    }

    let curAudio = new Audio.Sound();

    try{
      await curAudio.loadAsync(curFile);
      await curAudio.playAsync();
      
    }catch(error){}

    setAudio(curAudio);
    setMusicas(newMusic);
  }


  return (
    <View style={{flex:1}}>
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
                  <TouchableOpacity style={styles.touchable} onPress={()=>changeMusic(k)}>
                    <Text style={[styles.touchableText, {color: '#1db954'}]}>
                      <AntDesign name="pause" size={15} color='#1db954' />  
                      {" "} {val.nome}
                    </Text>
                    <Text style={[styles.touchableText, {color: '#1db954'}]}>{val.artista}</Text>
                  </TouchableOpacity>
                </View>
              )

            }else{
              return(
                <View style={styles.table}>
                  <TouchableOpacity style={styles.touchable} onPress={()=>changeMusic(k)}>
                    <Text style={styles.touchableText}><AntDesign name="play" size={15} color='#fff'/>  {val.nome}</Text>
                    <Text style={styles.touchableText}>{val.artista}</Text>
                  </TouchableOpacity>
                </View>
              )
            }
          })
        }
        <View style={{paddingBottom:200}}></View>
      </ScrollView>
      <Player 
        playing={playing} 
        setPlaying={setPlaying}
        audioIndex={audioIndex}
        setAudioIndex={setAudioIndex}
        musicas={musicas}
        setMusicas={setMusicas}
        audio={audio}
        setAudio={setAudio}  
      ></Player>
    </View>
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
