import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

export default function SavedNote(){
    return(
        <View style={{flexDirection:'row'}}>
            <View style={{flex:4}}></View>
            <TouchableOpacity underlayColor="#000"  style={{backgroundColor:'#00ee00', padding:8, borderWidth:2, flex:1}} onPress={ () => console.log('niggi')}>
                <Text>New Note</Text>                            
            </TouchableOpacity>
            <View style={{flex:1}}></View>
        </View>
    )
}

