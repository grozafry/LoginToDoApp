import React, {useState, useEffect} from 'react';
import {View, Text, Button, FlatList, TextInput} from 'react-native';
import firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import { } from 'react-native-gesture-handler';


const MButton = ({val, tasks, config}) => {
    
    function getKeyByValue(object, value) { 
        return Object.keys(object).find(key => object[key] === value); 
    }

    return(
        <View>
        <Button title="Delete" onPress={
            () => {
                tkey = getKeyByValue(tasks, val)

                if (!firebase.apps.length) {
                    firebase.initializeApp(config);
                 }
                 let c = 'tasks/Suraj/' + tkey
                 firebase.database().ref(c).remove(() => console.log('Successfully deleted!')).catch((error) => console.log(error))
        


            }
        } />
        </View>
    )
}

export default function Main(){
  //  id = "Suraj"        //Main function will receive this id from login page
    const config = {
            apiKey: "AIzaSyAFEMaJVj5rP4A47Cj7Um0tDvFXIE18x50",
            authDomain: "todoapp-d36e1.firebaseapp.com",
            databaseURL: "https://todoapp-d36e1.firebaseio.com",
            projectId: "todoapp-d36e1",
            storageBucket: "todoapp-d36e1.appspot.com",
            messagingSenderId: "681764421889",
            appId: "1:681764421889:web:5b8cafd780510b59f59b00",
            measurementId: "G-9589RJQ51R"
          };
          if (!firebase.apps.length) {
            firebase.initializeApp(config);
         }
  /*  firebase.database().ref('tasks/Suraj').set(
        ["Drink more water", "Tie your shows", "Do a back-flip"]
    ).then(
        () => console.log("Done bitch!")
    ).catch(
        error => console.log(error)
    )
    */
   
    const [tasks, setTasks] = useState([])
    const [tex, setTex] = useState('')
   // const [keey, setKeey] = useState('')
    
   
    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
         }

         firebase.database().ref('tasks/Suraj').once('value', (data) => {
            
            setTasks( data.toJSON() )
        } )

    }, []);

    const refre = () => {
        
          if (!firebase.apps.length) {
            firebase.initializeApp(config);
         }

         firebase.database().ref('tasks/Suraj').once('value', (data) => {
            
            setTasks( data.toJSON() )
        } )

    }

    const AddNote = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
         }

         firebase.database().ref('tasks/Suraj').once('value', (data) => {
            
            let a = data.toJSON()
           // mylen = Object.keys(a).length
           // a[mylen*100000000 + Math.floor(Math.random() * 10000)] = tex
            let mykey = Date.now().toString() 
            a[mykey] = tex
            firebase.database().ref('tasks/Suraj').set(a).then(
               () => {
                   console.log("New note added successfully")
                   //Now refresh again to retrieve newly added note in the list
                   refre()
                   //Reset value of textInput
                   setTex('')
            }
            ).catch(
                (error) => {
                    console.log("Couldn't add note - ")
                    console.log(error) 
                
            }
            )
        } )

       
    }

    console.log("haha")
    console.log(tasks)
    
    
    return(
        <View style={{paddingTop:20}}>
            <Text>
                Hi Suraj !  
            </Text>

            

            <Button title="Refresh" onPress={refre} />
            
            <FlatList 
                data={Object.values(tasks)}
                renderItem={
                    ({item}) =>  ( 
                        <View style={{ flexDirection:'row'}}> 
                            <Text style={{flex:3}} >{item}</Text> 
                           {/* <MButton style={{flex:1}} onPress={() => console.log("Delete pressed!")} val={item} tasks={tasks} config={config} />  */}
                            <TouchableOpacity style={{flex:1}} onPress={
                                () => {

                                    function getKeyByValue(object, value) { 
                                        return Object.keys(object).find(key => object[key] === value); 
                                    }

                                    tkey = getKeyByValue(tasks, item)
                    
                                    if (!firebase.apps.length) {
                                        firebase.initializeApp(config);
                                     }
                                     let c = 'tasks/Suraj/' + tkey
                                     firebase.database().ref(c).remove(() => console.log('Successfully deleted!')).catch((error) => console.log(error))
                            
                                     refre()
                                }
                            }>
                                <Text>Delete</Text>
                            </TouchableOpacity>
                        </View> 
                    ) 
                }
                keyExtractor={() => Date.now().toString() + Math.random()} 
                />

            <TextInput placeholder="Enter new note.." onChangeText={(val) => setTex(val)} value={tex}/>
            <Button title="Add Note" onPress={AddNote}/>

        </View>
    )
}

