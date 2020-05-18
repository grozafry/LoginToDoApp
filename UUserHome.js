import React, { useState } from "react"
import {View, Text, Button, FlatList, TextInput, AsyncStorage, ScrollView} from "react-native"
//import Users from './users.json';


export default function LLogin({id, objj}){
    const [text, setText] = useState('')
   
    const [main, setMain] = useState(objj)
    
    
    //const [temp, setTemp] = useState(true)
   /* const createNote = async() => {
        const newVal = {
            pwd: objj.pwd,
            tasks: [...objj.tasks, text]
        }

        console.log(newVal)
        AsyncStorage.setItem(id, JSON.stringify( newVal ) )
      //  const my = temp ? false:true
      //  setTemp(my)
        await AsyncStorage.getItem(id).then( my => {
            console.log(my)
            
        }
        )
        
        console.log("note added")
*/


    
    return(
        <View style={{top:20}}>
            <Text>This is the UserHome page {id}</Text>
            
            <FlatList
                                data={main.tasks} renderItem={({item}) => 
                                <Text>{item}</Text> }
                                keyExtractor={item => Date.now().toString()}
                                    />
                                    
                        
            
            <TextInput placeholder={"Enter a new note"} onChangeText={ (val) => { 
                setText(val)
                
            } } />
            <Button title="Save" onPress={ () => { 
                const a = [text]
                AsyncStorage.getItem(id).then(jj => a.concat(jj.tasks))
                
                const neww = {
                    pwd: main.pwd,
                    tasks: a
                }
                AsyncStorage.setItem(id, JSON.stringify(neww) )
                setMain(neww)
                console.log(main)

                }
            }
              />
        </View>
    )
}