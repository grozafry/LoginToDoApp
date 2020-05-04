//App.js => HomeScreen.js => Welcome.js
//                       |=> SavedNote.js

/* This function maintains flatlist of tasks stored in tasks.json => ./../tasks.json and those added using AddNoteButton => ./AddNoteButton.js*/

/* importing required modules */
import React, { Component } from 'react'
import {View, TextInput, Text, Alert, Image, StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native'

/*Importing Button Images */
import TaskNotDone from './../assets/Task_Incomplete.png';   //icon for incomplete task
import TaskDone from './../assets/Task_Done.png';            //icon for completed task
import Delete_Task from './../assets/Delete_Task.png';       //icon for delete task
import Edit_Task from './../assets/Edit_Task.png'            //icon for un-edited task
import Done_Editing from './../assets/Edit_Done.png'     //icon during task being edited
import Details_Icon from './../assets/Details_Icon.png'

/* This function styles and maintains list of items in Tasks passed via HomeScreen.js
also enables to delete or edit existing items in the tasks list*/

//Start of export
export default class SavedNote extends Component{

    //Initial State
    constructor (props) {
        super()
            this.state = ({
                Task_Status:TaskNotDone,                                //image uri variable for task status
                Edit_Status:(props.task.content=='' ? Done_Editing:Edit_Task),  // image uri handler for editing state of a task

                enableEditing:(props.task.content==''),            //Enables/Disables editing for tasks (a newly created note will be editable) 
                markDoneDisable:(props.task.content==''),          //adds abiility to prevent marking empty notes as done
                deleteDisable:false,

                deletedTask:'flex',                                     // removes deleted tasks from view
                backColor:(props.task.content==''? '#98817B':'lightgray'),      // 
                backColorTaskBox:(props.task.content=='transparent'? 'lightblue':''),
                borderLine:(props.task.content==''? 1:0),
                task:props.task.content,                                        //temporararily stores task details passed from HomeScreen.js => ./../HomeScreen.js
            })
    }
    
    // This function changes image of edit icon based on edit state of a task
    change_status = () => {
        this.setState({
                'Task_Status':(this.state.Task_Status==TaskNotDone ? TaskDone:TaskNotDone),
                'backColor': (this.state.Task_Status==TaskNotDone ? 'skyblue':'lightgray'),
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
                'markDoneDisable': (this.state.task=='' || !this.state.enableEditing),
                'Edit_Status': (this.state.enableEditing? Edit_Task:Done_Editing),
                'enableEditing': (!this.state.enableEditing),
                'backColorTaskBox': (this.state.enableEditing ? 'transparent':'lightblue'),
                'borderLine': (this.state.enableEditing ? 0:1),
                'deleteDisable': !this.state.enableEditing,
                'backColor': (this.state.task==''? '#E23D28':'lightgray'),
            })
    }

    task_details = () => {
        var id = this.props.task.key;
        var task = (this.state.task=='' ? '🤷🏿‍♂️':this.state.task);
        if (this.props.task.last_updated) {
            var du = this.props.task.last_updated
        } else {
            var du = 'No previous history'
        }
        Alert.alert('Task Details', 'Task id - ' + id + '\n' + 'Task - ' + task + '\n' + 'Last Modified - ' + du);
    }

//Start of render function (handles all styles and events in notes except adding new notes)
    render () {

        //this variable enables to remove tasks when requested to delete
        var mainbox = StyleSheet.flatten([
            styles.maincontainer,{
                display:this.state.deletedTask,
                backgroundColor:this.state.backColor
            }
        ])

        var inputtask = StyleSheet.flatten([
            styles.taskbox, {
                backgroundColor:this.state.backColorTaskBox,
                borderWidth:this.state.borderLine,
            }
        ])

        //Start return
        return(
            //main Container containing all children items
                <View style={mainbox}>

                    {/* {child} this button allows to change task status [change_status], has a variable image uri Task_Status*/}
                    <View style={styles.taskstatusbox}>
                        <TouchableHighlight disabled={this.state.markDoneDisable} onPress={() => this.change_status()} style={styles.taskdone}>
                            <Image source={this.state.Task_Status} style={styles.logo} /> 
                        </TouchableHighlight>
                    </View>

                    <View style={styles.infobox}>
                        <TouchableHighlight underlayColor='#7C0A02' onPress={() => this.task_details()} style={styles.detailsbutton}>
                            <Image source={Details_Icon}style={styles.logo} />
                        </TouchableHighlight>
                    </View>

                    {/* {child} this container shows the task, editable/uneditable if allowed through edit icon ->next child element */}
                    <View style={inputtask}>
                        <TextInput editable={this.state.enableEditing} defaultValue={this.state.task} placeholder={''} placeholderTextColor={'black'} onChangeText={(task) => this.setState({task})} />
                    </View>

                    {/* {child} this button allows the task to be modified [edit_task], has a variable image uri Edit_Status */}
                    <TouchableOpacity underlayColor="#000"  style={styles.edittextbox} onPress={ () => this.edit_task()}>
                        <Image source={this.state.Edit_Status} style={styles.logo} />                            
                    </TouchableOpacity>

                    {/* {child} this button allows user to delete a task [delete_task], but not until user confirms in the following confirmation dialog*/}
                    <TouchableOpacity disabled={this.state.deleteDisable} underlayColor="#000"  style={styles.deletetext} onPress={ () => this.delete_task()}>
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
        marginVertical:8,
        marginHorizontal:2,
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
        borderRightWidth:0.5,
    },

    //button style for task status
    taskdone: {
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:10,
        height:12,
        width:12,
    },
    infobox: {
        width:30,
        height:45,
        alignItems:'center',
        justifyContent:"center",
    },
    detailsbutton:{
        justifyContent:'center',
        alignItems:'center',
        width:23,
        height:23,
        borderRadius:11.5,
    },

    //box containing input task element so task details
    taskbox: {
        justifyContent:'center',
        paddingLeft:5,
        flex:5,
        borderRightWidth:0.5,
        borderRadius:5,
    },

    //button containing icon for task edit status
    edittextbox: {
        width:36,
        paddingHorizontal:3,
        alignItems:'flex-end',
        justifyContent:'center',
        // backgroundColor:'#01796F'
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

