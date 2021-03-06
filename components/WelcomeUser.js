//App.js => UserHome.js => Welcome.js

/* This is Welcome header, part of After Login Screen, it staays on top, support styles are mentioned in UserHome.js => ../userpages/UserHome.js */

/* importing required modules */
import React, { Component } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View, Image, StyleSheet, Dimensions } from 'react-native'

/*Importing Button Images */
import Profile_Image from './../assets/Profile_Pic.png'  //sample profile logo
import Settings_User from './../assets/Settings_Icon.png'   //settings icon

var ms = Dimensions.get('window'); //getting screen dimensions

/* This function renders the top header/banner, including handling touches and styles*/

//Starts export
export default class WelcomeUser extends Component {
  
  //Initial State of the function
  constructor() {
    super()
    this.state = {
      profileMenu:'flex',   //
      elevationValue:50,
      goToSettings:false,
    }
  }

  // This functions expands profile icon to profile options if profileMenu:'none', clicking again will undo the changes 
  profile_menu = () => {
      this.setState({
        'profileMenu':(this.state.profileMenu=='flex'?'none':'flex'),
        'elevationValue':(this.state.profileMenu=='flex'? 0:50)
      })
    
  }

  //Start of rendering functions (this part renders all elements of Profile header, handles touches, and styles)
  render() {

    //this varible enables header style be affected by touch events 
    var elevated = StyleSheet.flatten([
      styles.header,{
        elevation:this.state.elevationValue,
      }
    ])

    //this variable enables profile container style be affected by touch events
    var boxContainer = StyleSheet.flatten([
      styles.piccontainer,{
        elevation:this.state.elevationValue,        
      }
    ])

    //this varibles enables visibility of profile option be affected by touch events
    var menuContainter = StyleSheet.flatten([
        styles.seccontainer,{
            display:this.state.profileMenu
        }
    ])

    //Start of return
    return (

      // Contains all elements within visible area of screen
      <SafeAreaView style={styles.maincontainer}>

        {/* this is the main container, it contains profile icon and profile options(profile options hidden by default) is transparent unless requested not to */}
        <View style={elevated}>

          {/* This button enables/disbles extended profile menu and visibility of profile option [profile_menu] */}
          <TouchableOpacity onPress={() => this.profile_menu()} style={boxContainer}>
            <Image source={Profile_Image} style={styles.logo} />
          </TouchableOpacity>

          {/* {child} this container holds profile menu and their attributes including visibility ^profile_menu,
          returns username extracted from Users.json => ./../users.json, passed via App.js -> UserHome.js -> WelcomeUser.js
          the touch events for this buttons haven't been configured yet */}
          <View style={menuContainter}>
            <Text style={styles.welcometext}>Hello {this.props.name}!</Text>

            {/* future - View Profile details and provide option to logout */}
            <TouchableOpacity onPress={()=> this.props.logout()} style={styles.profilebutton}>
                <Text style={styles.profilebuttontext}>Log Out</Text>
            </TouchableOpacity>

            {/* future - app settings for user*/}
            <TouchableOpacity style={styles.settings} onPress={() => {this.setState({'goToSettings':true})}}>
                <Image source={Settings_User} style={styles.logo} />
            </TouchableOpacity>

          </View>
          {/* end of child container */}

        </View>
        {/* End of main container */}

      </SafeAreaView>

    )
    //End of return
  }

  //End of render function
} 
//End of export

/*Styles (in order of heirarchy)*/
const styles = StyleSheet.create({
  maincontainer:{
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
  piccontainer:{
    width:40,
    height:40,
    marginLeft:5,
    borderRadius:20,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
  },
  seccontainer: {
      width:ms.width*9.5/10 - 50,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:"space-between",
  },
  welcometext:{
    marginHorizontal:10,
  },
  profilebutton:{
      justifyContent:'center',
      alignItems:'center',
      height:35,
      borderRadius:2,
      backgroundColor:'lightblue',
  },
  profilebuttontext: {
    paddingHorizontal:10
  },
  settings:{
    elevation:30,
  },
  logo:{
    width:40,
    height:40,
  },
})