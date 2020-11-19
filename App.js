import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends Component{
  constructor(){
    super()
    this.state={
      word:"",
      definition:""
    }
  }
  getWord=async (text)=>{
    var searchText=text.toLowerCase()
    
    var url="https://rupinwhitehatjr.github.io/dictionary/"+searchText+".json"
    
    fetch(url)
    .then((data)=>{
      if(data.status===200){
        var newData=data.json()
        console.log(newData)
        return(newData)


      }
      else{
        return(null)
      }
    })

    .then((response)=>{
      var response=response
      if(response){
        console.log(" = = = = > "+response)
        var wordData=response.definition[0] 
        var definition=wordData.description
        this.setState({
          "word":this.state.word,
          "definition":definition
        })
      }
      else{
        this.setState({
          "word":this.state.word,
          "definition":"Not Found"
        })
      }
    })

  }
  render(){
    return(
      <View>
      <Header
      centerComponent={{text:"Dictionary App",
                        style:{color:"white",fontSize:25,fontWeight:"bold"}}}
      backgroundColor={"red"}
      />

      <Text style={styles.text}>Search for the word you don't know about anywhere with the Dictionary app</Text>

      <TextInput
      style={styles.textInput}
     
      onChangeText={text=>{
        this.setState({
          word:text
        })
      }}
      value={this.state.word}
      />
      <TouchableOpacity style={styles.searchButton}
      onPress={this.getWord(this.state.word)}>

        <Text style={styles.searchButtonText}>Search</Text>

      </TouchableOpacity>

    {/* <Text style={styles.text}>{this.state.word}</Text> */}
      

      </View>
      
        
      
    )
  }
}

const styles=StyleSheet.create({
  textInput:{
    alignSelf:"center",
    alignItems:"center",
    borderWidth:2,
    marginTop:"5%",
    width:250,
    height:30,
    textAlign:"center",
    marginTop:40
  },
  text:{
    fontSize:20,
    marginTop:40,
    alignSelf:"center",
    fontWeight:"bold"
  },
  searchButton:{
    backgroundColor:"orange",
    borderWidth:2,
    borderRadius:20,
    alignSelf:"center",
    alignItems:"center",
    width:150,
    height:25,
    marginTop:40,
    borderColor:"orange"
  },
  searchButtonText:{
    textAlign:"center",
    fontWeight:"bold",
    color:"white",
    alignSelf:"center",
    fontSize:15
  }
})
