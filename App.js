import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button
} from 'react-native';
import users from './users.json';

const App: () => React$Node = () => {

  const [state, setState] = useState({name:'', password:''})
      
  const auth = () => {
    if(users[state.name] && users[state.name]===state.password){
      console.warn("Valid")
    }
    else console.warn("Invalid")
  }  

  return (
    <>
    <View>

    <TextInput placeholder="Username" maxLength={20} 
      onChangeText={(text) => {
        setState({...state, name : text})} } />
    
    <TextInput placeholder="Password" maxLength={20} 
      onChangeText={(text) => {
        setState({...state, password : text})} } />
    
    </View>

    <Button title="submit" onPress={auth} />
    </>
  )
}

export default App;