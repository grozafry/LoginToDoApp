import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import firebase from 'firebase';
import { FlatList, TextInput } from 'react-native-gesture-handler';

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
            a[Date.now().toString()] = tex
            firebase.database().ref('tasks/Suraj').set(a).then(
               () => {
                   console.log("New note added successfully")
                   //Now refresh again to retreive newly added note in the list
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
                renderItem={({item}) => <Text>{item}</Text>}
                keyExtractor={() => Date.now().toString() + Math.random()} 
                />

            <TextInput placeholder="Enter new note.." onChangeText={(val) => setTex(val)} value={tex}/>
            <Button title="Add Note" onPress={AddNote}/>

        </View>
    )
}

