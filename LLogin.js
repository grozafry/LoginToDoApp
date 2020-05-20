import React, {useState} from "react"
import {View, Button, TextInput, AsyncStorage, Text} from "react-native"
import Users from './users.json';
import UUserHome from './UUserHome.js'

export default function LLogin({history}){

    const [state, setState] = useState({name:'', password:''})
    const [goUUserHome, setGoUUserHome] = useState(false)

    const auth = () => {
        AsyncStorage.getItem(state.name).then(obj => {
          objj = JSON.parse(obj)
          if(objj.pwd === state.password){
            setGoUUserHome(true)             
          }
          else console.warn("Invalid")
      })
        }

    if (goUUserHome){
      return(
        <View>
          <UUserHome id={state.name} objj={objj} />
        </View>
      )
    } 

    return (
        <>
        <View style={{top:20}}>
    
        <TextInput placeholder="Username" maxLength={20} 
          onChangeText={(text) => {
            setState({...state, name : text})} } />
        
        <TextInput placeholder="Password" maxLength={20} 
          onChangeText={(text) => {
            setState({...state, password : text})} } />
        
        
    
        <Button title="Login" onPress={auth} />
        <Button title="Go to Sign Up" onPress={() => history.push("/")} />

        <Text>{Users["Id1"].pwd}</Text>
        </View>
        </>
      )
}