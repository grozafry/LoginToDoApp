/* This is Welcome header, part of After Login Screen, it staays on top, support styles are mentioned in Main.js => ./../Main.js*/

/* Importing Modules*/
import React, { Component } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View, Image, StyleSheet, Dimensions } from 'react-native'

/* Importing icons*/
import Profile_Image from './../assets/profile_pic.png'
import Settings from './../assets/settings.png'

var ms = Dimensions.get('window'); //getting screen dimensions

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      profileMenu:'none',
      shadowValue:0,
      backColor:'transparent',
    }
  }
  remo = () => {
    if (this.state.profileMenu=='none') {
      this.setState({
        'profileMenu':'flex',
        'shadowValue': 2,
        'backColor':'lightblue'

      })
    } else {
      this.setState({
        'profileMenu':'none',
        'shadowValue':0,
        'backColor':'transparent'
      })        
    }
    
  }

  render() {
    var shadowed = StyleSheet.flatten([
      styles.header,{
        elevation:this.state.shadowValue,
        backgroundColor:this.state.backColor
      }
    ])
    var boxContainer = StyleSheet.flatten([
      styles.picContainer,{
        elevation:this.state.shadowValue,        
      }
    ])
    var menuContainter = StyleSheet.flatten([
        styles.secContainer,{
            display:this.state.profileMenu
        }
    ])
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={shadowed}>
          <TouchableOpacity onPress={() => this.remo()} style={boxContainer}>
            <Image source={Profile_Image} style={styles.logo} />
          </TouchableOpacity>
          <View style={menuContainter}>
            <Text style={styles.welcometext}>Hello {this.props.name}!</Text>
            <TouchableOpacity style={styles.profileButton}>
                <Text style={{paddingHorizontal:10}}>View Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settings}>
                <Image source={Settings} style={styles.logo} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }
} 

const styles = StyleSheet.create({
  mainContainer:{
    marginVertical:5,
    flex:1,
    alignItems:'center',
    backgroundColor:'transparent',
  },
  header: {
    width:ms.width*9.5/10,
    height:50,
    borderRadius:25,
    flexDirection:'row',
    alignItems:'center'
  },
  picContainer:{
    width:40,
    height:40,
    marginLeft:5,
    borderRadius:20,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
  },
  logo:{
    width:40,
    height:40,
  },
  secContainer: {
      width:ms.width*9.5/10 - 50,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:"space-between",
  },
  welcometext:{
    marginHorizontal:10,
  },
  profileButton:{
      justifyContent:'center',
      alignItems:'center',
      height:35,
      elevation:0.5,
      borderRadius:2,
      backgroundColor:'lightblue',
  },
  settings:{
    elevation:1,
  },
})