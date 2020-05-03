//App.js => HomeScreen.js => Welcome.js
//                       |=> SavedNote.js

/* This function maintains flatlist of tasks stored in tasks.json => ./../tasks.json and those added using AddNoteButton => ./AddNoteButton.js*/

/* importing required modules */
import React, { Component } from 'react'
import {View, TextInput, Alert, Image, StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native'

/*Importing Button Images */
import TaskNotDone from './../assets/task_incomplete.png';   //icon for incomplete task
import TaskDone from './../assets/task_done.png';            //icon for completed task
import Delete_Task from './../assets/delete_task.png';       //icon for delete task
import Edit_Task from './../assets/edit_task.png'            //icon for un-edited task
import Done_Editing from './../assets/Verified_Email.png'     //icon during task being edited

/* This function styles and maintains list of items in Tasks passed via HomeScreen.js
also enables to delete or edit existing items in the tasks list*/

//Start of export
export default class SavedNote extends Component{

    //Initial State
    constructor (props) {
        super()
            this.state = ({
                Task_Status:TaskNotDone,    //image uri variable for task status
                deletedTask:'flex',         // removes deleted tasks from view
                enableEditing:(props.text=='' ? true:false),            //Enables/Disables editing for tasks (a newly created note will be editable) 
                Edit_Status:(props.text=='' ? Done_Editing:Edit_Task),  // image uri handler for editing state of a task
                task:props.text
            })
    }
    
    // This function changes image of edit icon based on edit state of a task
    change_status = () => {
        this.setState({
                'Task_Status':(this.state.Task_Status==TaskNotDone ? TaskDone:TaskNotDone)
            })
        }

    // This function prompts user confirmation if user request deletion of a task
    delete_task = () => {
        if (this.state.task) {
            Alert.alert('Delete?', "Are you sure you want to delete the task " + this.state.task + '?', [{text:'Confirm', onPress: () => this.setState({
                'deletedTask':'none'
            })}, {text:'Deny',}], {cancelable:true} ) 
        } else {
            this.setState({
            'deletedTask':'none'
        })            
        }
    }

    // This function enables editing of a task when edit icon is clicked/touched  
    edit_task = () => {
            this.setState({
                'Edit_Status':(this.state.enableEditing? Edit_Task:Done_Editing),
                'enableEditing': (!this.state.enableEditing),
            })
    }

//Start of render function (handles all styles and events in notes except adding new notes)
    render () {

        //this variable enables to remove tasks when requested to delete
        var mainbox = StyleSheet.flatten([
            styles.maincontainer,{
                display:this.state.deletedTask
            }
        ])

        // var task = this.props.text;    //minimized hussle of entering long variable
        
        //Start return
        return(
            //main Container containing all children items
                <View style={mainbox}>

                    {/* {child} this button allows to change task status [change_status], has a variable image uri Task_Status*/}
                    <View style={styles.taskstatusbox}>
                        <TouchableHighlight onPress={() => this.change_status()} style={styles.taskdone}>
                            <Image source={this.state.Task_Status} style={styles.logo} /> 
                        </TouchableHighlight>
                    </View>

                    {/* {child} this container shows the task, editable/uneditable if allowed through edit icon ->next child element */}
                    <View style={styles.taskbox}>
                        <TextInput editable={this.state.enableEditing} defaultValue={this.state.task} placeholder={''} placeholderTextColor={'black'} onChangeText={(task) => this.setState({task})} />
                    </View>

                    {/* {child} this button allows the task to be modified [edit_task], has a variable image uri Edit_Status */}
                    <TouchableOpacity underlayColor="#000"  style={styles.edittextbox} onPress={ () => this.edit_task()}>
                        <Image source={this.state.Edit_Status} style={styles.logo} />                            
                    </TouchableOpacity>

                    {/* {child} this button allows user to delete a task [delete_task], but not until user confirms in the following confirmation dialog*/}
                    <TouchableOpacity underlayColor="#000"  style={styles.deletetext} onPress={ () => this.delete_task()}>
                        <Image source={Delete_Task} style={styles.logo} />                            
                    </TouchableOpacity>

                </View>
                //End of main Container
        )
        //End of return
    }
    //End of render
}
//End of export

/*Styles (in order of heirarchy)*/
const styles = StyleSheet.create({

    //main container with all child items
    maincontainer: {
        flex:1,
        margin:8,
        shadowOpacity:0.5,
        flexDirection:'row',
        height:45,
        borderRadius:5,
        backgroundColor:'lightgray'
    },

    //box containing task status icon and button
    taskstatusbox: {
        flex:0.7,
        alignItems:'center',
        justifyContent:'center',
        borderRightWidth:0.5
    },

    //button style for task status
    taskdone: {
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:10,
        height:12,
        width:12,
    },

    //box containing task details
    taskbox: {
        justifyContent:'center',
        paddingLeft:5,
        flex:5,
        borderRightWidth:0.5
    },

    //button containing icon for task edit status
    edittextbox: {
        width:36,
        paddingHorizontal:3,
        alignItems:'flex-end',
        justifyContent:'center',
        backgroundColor:'#01796F'
    },

    //button containing icon for task deletion
    deletetext: {
        width:36,
        paddingHorizontal:3,
        alignItems:'flex-end',
        justifyContent:'center',
        borderTopRightRadius:5,
        borderBottomRightRadius:5,
        backgroundColor:'darkred'
    },

    //icon styles for all image
    logo:{
        width:30,
        height:30
    },
})

