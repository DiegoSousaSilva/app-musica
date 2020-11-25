import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, LogBox } from 'react-native';
import {Audio} from 'expo-av';
import {AntDesign} from '@expo/vector-icons';
import Player from './src/components/Player';


export default function App() {

  //LogBox.ignoreAllLogs(true);

  const [audioIndex, setAudioIndex] = useState(0);

  const [playing, setPlaying] = useState(false);

  const [audio, setAudio] = useState(null);

  const [musicas, setMusicas] = useState([
    {
      nome: 'The Day',
      artista: 'Boku no hero academia',
      playing: false,
      file: require('./src/midia/bokunohero.m4a'),
    },
    {
      nome: 'Baton Road',
      artista: 'Boruto',
      playing: false,
      file: require('./src/midia/boruto.m4a'),
    },
    {
      nome: 'Brave Heart',
      artista: 'Digimon',
      playing: false,
      file: require('./src/midia/braveheart.m4a'),
    },
    {
      nome: 'Sorriso Resplandescente',
      artista: 'Dragon Ball GT',
      playing: false,
      file: require('./src/midia/dbgtcoracaodecrianca.m4a'),
    },
    {
      nome: 'Limit Break X Survivor',
      artista: 'Dragon Ball Super',
      playing: false,
      file: require('./src/midia/dbs2.m4a'),
    },
    {
      nome: 'Cha La Head Cha La',
      artista: 'Dragon Ball Z',
      playing: false,
      file: require('./src/midia/dbzchalaheadchala.m4a'),
    },
    {
      nome: 'We Gotta Power (Temos a força)',
      artista: 'Dragon Ball Z',
      playing: false,
      file: require('./src/midia/dragonballz.m4a'),
    },
    {
      nome: 'Coações Que Querem Se Encontrar',
      artista: 'Inuyasha',
      playing: false,
      file: require('./src/midia/inuyashaend4.m4a'),
    },    
    {
      nome: 'Mudar o Mundo',
      artista: 'Inuyasha',
      playing: false,
      file: require('./src/midia/inuyashamudaromundo.m4a'),
    },
    {
      nome: 'Pout Porre - Jiraya Winspector Sharivan  ',
      artista: 'Desconhecido',
      playing: false,
      file: require('./src/midia/jirayawinspectorsharivan.m4a'),
    },
    {
      nome: 'Netsujou No Spectrum',
      artista: 'Nanatsu No Taizai',
      playing: false,
      file: require('./src/midia/nanatsunotaizai.m4a'),
    },
    {
      nome: 'Sorriso Resplandescente',
      artista: 'Dragon Ball GT',
      playing: false,
      file: require('./src/midia/dbgtcoracaodecrianca.m4a'),
    },
    {
      nome: 'Limit Break X Survivor',
      artista: 'Dragon Ball Super',
      playing: false,
      file: require('./src/midia/dbs2.m4a'),
    },
    {
      nome: 'Haruka Kanata',
      artista: 'Naruto',
      playing: false,
      file: require('./src/midia/naruto.m4a'),
    },
    {
      nome: 'Niwaka Ame Nimo Makezu',
      artista: 'Naruto Shipudden',
      playing: false,
      file: require('./src/midia/narutoop13.m4a'),
    },
    {
      nome: 'Temos Que Pegar',
      artista: 'Pokemon',
      playing: false,
      file: require('./src/midia/pokemon.m4a'),
    },
    {
      nome: 'Pegasus Fantasy',
      artista: 'Cavaleiros Do Zodiaco',
      playing: false,
      file: require('./src/midia/saintseiya.m4a'),
    },
    {
      nome: 'Soldier Dream',
      artista: 'Cavaleiros Do Zodiaco',
      playing: false,
      file: require('./src/midia/soldierdream.m4a'),
    },
    {
      nome: 'Unravel',
      artista: 'Tokyo Ghoul',
      playing: false,
      file: require('./src/midia/tokyoghoulunravel.m4a'),
    },
    {
      nome: 'Sorriso Contagiante',
      artista: 'Yu Yu Hakusho',
      playing: false,
      file: require('./src/midia/yuyuhakusho.m4a'),
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
                <View key={k} style={styles.table}>
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
                <View key={k} style={styles.table}>
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
