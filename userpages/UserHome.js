//App.js => UserHome.js

/*This is an after login Component */

/* importing required modules */
import React, {Component} from 'react'
import {View, FlatList, ScrollView ,Platform, KeyboardAvoidingView, StyleSheet} from 'react-native'
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']); 

//Importing functions
import SavedNote from '../components/SavedNote'    //Function resposible for maintaining notes (editing, deleting, checking)
import WelcomeUser from '../components/WelcomeUser'  //Header for logged in user [View Profile] - incomplete, [settings] - incomplete
import AddNoteButton from '../components/AddNoteButton'  //Button to add notes

//imprting list of tasks
import Tasks from '../tasks.json'


 /*This is the User Home Component - accessible after user inputs correct id and password*/

 //Starts export
export default class UserHome extends Component{
    
    //Initializing initial states of the system
    constructor() {
        super()
        this.state={
            taskid:Math.floor(Math.random()*1000), //Initial taskid of tasks in task.json
        }
    }

    // This function adds a new task with random key value (taskid) and empty content value
    add_newtask = () => {
        this.setState({
            'taskid':Math.floor(Math.random()*1000)  //Each time a task is run, taskid increments by 1
        })
        var date = new Date().toLocaleString();

        Tasks[this.props.user.id].push({"key":this.state.taskid, "content":"", "last_updated":date});   // Pushing new task to list of Tasks
        // alert(this.state.taskid)
    }    

    /*Beginning of render function*/
    render () {

        const id = this.props.user.id
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
                            <WelcomeUser user={this.props.user} name={this.props.name} logout={this.props.logout}/>  
                        </View>

                {/* {child} This gives the list of all tasks in tasks (Tasks variable)
                    this lists is optimised with Flatlist componenet and SavedNotes function => ./component/SavedNote.js
                    included function - [delete notes, edit notes, check notes] */}
                        <ScrollView  
                            showsVerticalScrollIndicator={false} style={styles.flatlistcontainer}
                            ref={ref => this.tasklist = ref}
                            onContentSizeChange={() => this.tasklist.scrollToEnd({animated: true})}
                            // onLayout={() => this.tasklist.scrollToEnd({animated: true})}                            
                            >
                            <FlatList showsVerticalScrollIndicator={false}
                                data={mytask} renderItem={({item}) => 
                                <SavedNote task={item} id={item.key} /> }
                                keyExtractor={item => item.key.toString()}
                                    />

                            <View style={styles.extraspace}></View>
                        </ScrollView>
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
        paddingTop:10,
    },

    //first Container to Include children items
    firstcontainer: {
        flex:1,
    },

    //Header for Logged In Screen
    userheader: {
        height:60,
        backgroundColor:'steelblue'
    },
    flatlistcontainer: {
        // flex:1,
        backgroundColor:'transparent',
        // paddingBottom:80
    },
    extraspace:{
        height:70
    },
    addnotes: {
        height:0.0001,
        alignItems:'flex-end',
        justifyContent:'flex-end',
    },
})
