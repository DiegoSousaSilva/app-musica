import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {Audio} from 'expo-av';

const Player = (props) => {

  const handlePlay = async()=>{
    let curFile = props.musicas[props.audioIndex].file;

    let newMusic = props.musicas.filter((val, k)=>{
      if(props.audioIndex==k){
        props.musicas[k].playing = true;
        curFile = props.musicas[k].file;
      }
      else {
        props.musicas[k].playing = false;
      }
      return props.musicas[k];
    })

    try{
       if (props.audio != null){
          props.setPlaying(true);
          props.setMusicas(newMusic);
          await props.audio.playAsync();
       }else {
         let curAudio = new Audio.Sound();
         try{ 
            await curAudio.loadAsync(curFile);
            await curAudio.playAsync();
         }catch(error){}

         props.setAudio(curAudio);
         props.setMusicas(newMusic);
         props.setPlaying(true);
       }
    }catch(error){}

  }

  const handlePause = async()=>{
    if (props.audio != null){
        props.audio.pauseAsync();
    }
    props.setPlaying(false);
  }

  const handleBack = async()=>{
    let newIndex = props.audioIndex -1;
    if(newIndex < 0){
      newIndex = props.musicas.length - 1;
    }
    props.setAudioIndex(newIndex);

    let curFile = props.musicas[newIndex].file;

    //Atualizar Inrterface do app
    let newMusic = props.musicas.filter((val, k)=>{
      if(newIndex==k){
        props.musicas[k].playing = true;
        curFile = props.musicas[k].file;
      }
      else {
        props.musicas[k].playing = false;
      }
      return props.musicas[k];
    })

    //Reroduzir audio
    if (props.audio != null){
      props.audio.unloadAsync();
    }
    let curAudio = new Audio.Sound();
    try{ 
      await curAudio.loadAsync(curFile);
      await curAudio.playAsync();
    }catch(error){}

      props.setAudio(curAudio);
      props.setMusicas(newMusic);
      props.setPlaying(true);
  }

  const handleNext = async()=>{
    let newIndex = props.audioIndex +1;
    if(newIndex >= props.musicas.length ){
      newIndex = 0;
    }
    props.setAudioIndex(newIndex);

    let curFile = props.musicas[newIndex].file;

    //Atualizar Inrterface do app
    let newMusic = props.musicas.filter((val, k)=>{
      if(newIndex==k){
        props.musicas[k].playing = true;
        curFile = props.musicas[k].file;
      }
      else {
        props.musicas[k].playing = false;
      }
      return props.musicas[k];
    })

    //Reroduzir audio
    if (props.audio != null){
      props.audio.unloadAsync();
    }
    let curAudio = new Audio.Sound();
    try{ 
      await curAudio.loadAsync(curFile);
      await curAudio.playAsync();
    }catch(error){}

      props.setAudio(curAudio);
      props.setMusicas(newMusic);
      props.setPlaying(true);
  }

  return (
    <View style={style.player}>
        <TouchableOpacity onPress={()=>handleBack()}  style={{marginRight:20, marginLeft: 20}}>
          <AntDesign name="banckward" size={35} color="#fff" />
        </TouchableOpacity>
        {
          (!props.playing)?
          <TouchableOpacity onPress={()=>handlePlay()} style={{marginRight:20, marginLeft: 20}}>
            <AntDesign name="playcircleo" size={35} color="#fff" />
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={()=>handlePause()} style={{marginRight:20, marginLeft: 20}}>
            <AntDesign name="pausecircleo" size={35} color="#fff" />
          </TouchableOpacity>
        }
        <TouchableOpacity onPress={()=>handleNext()}  style={{marginRight:20, marginLeft: 20}}>
          <AntDesign name="forward" size={35} color="#fff" />
        </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  player:{
    width:'100%',
    height: 100,
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 99,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
})

export default Player;