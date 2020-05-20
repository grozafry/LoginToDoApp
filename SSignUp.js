<<<<<<< HEAD
import React, {useState} from "react"
import {View, Button, TextInput, Text, AsyncStorage} from "react-native"
//import users from './users.json';

export default function SignUp({history}){

    const [state, setState] = useState({name:'', password:''})
      
    const AddNewUser = () => {
        AsyncStorage.setItem(state.name, JSON.stringify({pwd:state.password, tasks:[] }) )
        alert("Sign Up successful. Please login again")
    }

    return (
        <>
        <View style={{top:20}}>
            <Text>This is Sign Up page</Text>
    
        <TextInput placeholder="Username" maxLength={20} 
          onChangeText={(text) => {
            setState({...state, name : text})} } />
        
        <TextInput placeholder="Password" maxLength={20} 
          onChangeText={(text) => {
            setState({...state, password : text})} } />
        
        
    
        <Button title="Sign Up" onPress={AddNewUser} />
        <Button title="Go to Login" onPress={() => history.push("/LLogin")} />
        </View>
        </>
      )
=======
import React, {useState} from "react"
import {View, Button, TextInput, Text, AsyncStorage} from "react-native"
//import users from './users.json';

export default function SignUp({history}){

    const [state, setState] = useState({name:'', password:''})
      
    const AddNewUser = () => {
        AsyncStorage.setItem(state.name, JSON.stringify({pwd:state.password, tasks:[] }) )
        alert("Sign Up successful. Please login again")
    }

    return (
        <>
        <View style={{top:20}}>
            <Text>This is Sign Up page</Text>
    
        <TextInput placeholder="Username" maxLength={20} 
          onChangeText={(text) => {
            setState({...state, name : text})} } />
        
        <TextInput placeholder="Password" maxLength={20} 
          onChangeText={(text) => {
            setState({...state, password : text})} } />
        
        
    
        <Button title="Sign Up" onPress={AddNewUser} />
        <Button title="Go to Login" onPress={() => history.push("/LLogin")} />
        </View>
        </>
      )
>>>>>>> f4b65fe815122a0ee05c5698af14bedec1b20abd
}