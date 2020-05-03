import React, {Component} from 'react'
import {View, FlatList, SafeAreaView, Dimensions, StyleSheet} from 'react-native'
import SavedNote from '../components/SavedNote.js'
import WelcomeUser from '../components/WelcomeUser.js'
import AddNoteButton from '../components/AddNoteButton.js'
import Tasks from '../tasks.json'


var ms = Dimensions.get('window');

export default class TasksList extends Component{
    render () {
        // const blub =this.props.name;
        const id = 'id1'
        const mytask = Tasks[id]   //this is an array [{key:'', contenet:''},{}]
    // console.log(mytask[0])

        return(
            <SafeAreaView style={{flex:1}}>
                <View styles={styles.welcome} >
                    <WelcomeUser name={this.props.name}/>
                </View>
                <View style={{height:ms.height - 125}}>
                {/* <View style={{flex:8.2/10}}> */}
                    <FlatList data={mytask} renderItem={
                        ({item}) => 
                        <SavedNote text={item.content} 
                        keyExtractor={item => item.key} /> } />                
                    <View style={styles.addNote}>
                        <AddNoteButton />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    welcome:{
        flex:1/10,
        position:'absolute',        
    },
    addNote:{
        justifyContent:"flex-end",
        alignItems:'flex-end',
        height:65,
    }
})
