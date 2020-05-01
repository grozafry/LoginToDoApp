import React, {Component} from 'react'
import {View, Text, FlatList} from 'react-native'
import SavedNote from './components/SavedNote.js'
import WelcomeUser from './components/WelcomeUser.js'
import AddNoteButton from './components/AddNoteButton.js'
import Tasks from './tasks.json'

export default function TasksList(){
    const id = 'id1'
    const mytask = Tasks[id]   //this is an array [{key:'', contenet:''},{}]
   // console.log(mytask[0])

    return(
        <View>
            <WelcomeUser />
            <View style={{height:'80%'}}>

            <FlatList data={mytask} renderItem={
                ({item}) => 
                <SavedNote text={item.content} 
                keyExtractor={item => item.key} /> } />    
              
               
            </View>
            <AddNoteButton />
        </View>
    )
}
