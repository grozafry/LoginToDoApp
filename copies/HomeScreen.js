//App.js => HomeScreen.js

/*This is an after login Component */

/* importing required modules */
import React, {Component} from 'react'
import {View, FlatList, Platform, KeyboardAvoidingView, StyleSheet} from 'react-native'

//Importing functions
import SavedNote from './components/SavedNote'    //Function resposible for maintaining notes (editing, deleting, checking)
import WelcomeUser from './components/WelcomeUser'  //Header for logged in user [View Profile] - incomplete, [settings] - incomplete
import AddNoteButton from './components/AddNoteButton'  //Button to add notes

//imprting list of tasks
import Tasks from './tasks.json'


 /*This is the Home Screen Component - accessible after user inputs correct id and password*/

 //Starts export
export default class HomeScreen extends Component{
    
    //Initializing initial states of the system
    constructor() {
        super()
        this.state={
            count:0, //Initial count of tasks in task.json
        }
    }

    // This function adds a new task with key value (count) and empty content value
    add_newtask = () => {
        this.setState({
            'count':this.state.count + 0.01  //Each time a task is run, count increments by 1
        })

        Tasks['id1'].push({"key":this.state.count, "content":""});   // Pushing new task to list of Tasks
    }    

    /*Beginning of render function*/
    render () {

        const id = 'id1'
        const mytask = Tasks[id]   //this is an array [{key:'', content:''},{}]
    
        //Starts Main function    
        return(

                //Avoid Keyboard Overlap on text input field       
            <KeyboardAvoidingView style={styles.keyboardavoid} behavior={Platform.OS == "ios" ? "padding" : "height"}>

                {/* first Container of children items*/}
                    <View style={styles.firstcontainer}>

                {/* {child} This Box Contains Welcome User Header => ./components/WelcomeUser.js */}
                        <View style={styles.userheader}>

                {/* {sub-child}Passing Name of Logged Inuser to the header */}
                            <WelcomeUser name={this.props.name}/>  
                        </View>

                {/* {child} This gives the list of all tasks in tasks (Tasks variable)
                    this lists is optimised with Flatlist componenet and SavedNotes function => ./component/SavedNote.js
                    included function - [delete notes, edit notes, check notes] */}
                        <View style={styles.flatlistcontainer}>
                            <FlatList showsVerticalScrollIndicator={false}  contentInset= {{bottom: 120}} data={mytask} renderItem={
                                ({item}) => <SavedNote text={item.content} keyExtractor={item => item.index_id.toString()} /> } />
                        </View>
                    </View>

                {/* Second Container Add notes function container => ./components/AddNoteButton.js  */}                    
                    <View style={styles.addnotes}>

                {/* Passing function AddNewTask to the button */}
                        <AddNoteButton onPress={this.add_newtask}/>
                    </View>
            </KeyboardAvoidingView>

        )
        //Main Function Ends Here
    }
    /* End of render function*/

}
//End of export

/*Styles (in order of heirarchy)*/
const styles = StyleSheet.create({

    //Avoid KeyBoard Overlap
    keyboardavoid: {
        flex:1,
        marginTop:10,
        paddingVertical:10,
    },

    //first Container to Include children items
    firstcontainer: {
        flex:1,
    },

    //Header for Logged In Screen
    userheader: {
        height:60,
        backgroundColor:'darkgray'
    },
    flatlistcontainer: {
    },
    addnotes: {
        height:0,
        alignItems:'flex-end',
        justifyContent:'flex-end'
    },
})
