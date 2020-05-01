import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

export default function SavedNote(props){
    return(
        <View style={{ margin:10,  flexDirection:'row' }}>
            <Text style={{borderWidth:2,padding:8,backgroundColor:'#61dafb',flex:4, fontSize:20}}>
                {props.text}
            </Text>
            <TouchableOpacity underlayColor="#000"  style={{padding:8, borderWidth:2, marginLeft:5, flex:1}} onPress={ () => console.log('niggi')}>
                <Text style={{fontSize:20}}>Delete</Text>                            
            </TouchableOpacity>
        </View>
    )
}

