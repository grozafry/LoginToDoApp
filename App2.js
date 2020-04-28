import React, {useState} from 'react';
import { Text, View, TextInput, Image, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native';
import Back_Arrow from './assets/240px-Back_Arrow.png';
import Next_Arrow from './assets/240px-Next_Arrow.png';
import View_Eyes from './assets/240px-View_Eyes_white.png';

export default function experimental_login() {
    let [goBack, setGoBack] = useState(false);
    let [emailCheck, setEmailCheck] = useState(false);
    let [passwordCheck, setPasswordCheck] = useState(false);
    let [signUp, setSignUp] = useState(false);
    function login_result() {}
    function success_login() {}
    function failed_login() {}
    return (
        // <SafeAreaView>
            <View style={styles.mainBox}>
                <View style={styles.headerRegion}>
                    <TouchableHighlight activeOpacity={1} underlayColor="#0000CD" style={styles.backNavigation} onPress={()=> {setGoBack(true)}}>
                        <Image style={styles.backThumbs} source={Back_Arrow} />
                    </TouchableHighlight>            
                </View>
                <View style={styles.bodyBox}>
                    <View style={styles.mainLoginBox}>
                        <Text style={styles.headerLogin}>let's get you signed in!</Text>
                        <View style={styles.emailBox}>
                            <TextInput style={styles.inputEmail} placeholder={'sample_email@email.com'} />
                            <TouchableHighlight activeOpacity={1} underlayColor="#0000CD" onPress={ () => {setEmailCheck(true)}} style={styles.emailVerify}>
                                <Image style={styles.buttonThumbs} source={Next_Arrow} />
                            </TouchableHighlight>
                        </View>
                        <View style={styles.passwordBox}>
                            <TextInput secureTextEntry={true} style={styles.inputPassword} placeholderTextColor={'gray'} placeholder={'Input Your Password Here!'}></TextInput>
                            <TouchableHighlight activeOpacity={1} underlayColor="#0000CD" onPress={ () => {setPasswordCheck(true)}} style={styles.passowrdView}>
                                <Image style={styles.passThumbs} source={View_Eyes} />
                            </TouchableHighlight>
                        </View>
                        <TouchableOpacity style={styles.submitButton} underlayColor="#000" onPress={() => alert("Haven't finished this part yet! 😢")}>
                            <Text style={styles.submitButtonText}>login</Text>                            
                        </TouchableOpacity>
                        <View style={styles.signUpBox}>
                            <Text>Don't have any account with us yet?</Text>
                            <TouchableOpacity style={styles.signUpButton} onPress={() => {setSignUp(true)}}>
                                <Text style={styles.signUpButtonText}>sign up!</Text>                                
                            </TouchableOpacity>
                        </View>               
                    </View>
                </View>
                <View style={styles.footerRegion}>
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    mainBox:{
        flex:1,
        backgroundColor:'#C9C9C9'
    },
    headerRegion:{
        paddingHorizontal:10,
        flex:1/10,
        paddingVertical:10,
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    backNavigation:{
        height:35,
        paddingVertical:5,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:17.5,
        borderWidth:0,
        flexDirection:'row',
        backgroundColor:'white'        
    },
    navText:{
        fontFamily:'Candara',
        fontStyle:'italic',
        fontSize:25,
        paddingHorizontal:5
    },
    bodyBox:{
        flex:8.5/10,
        alignItems:"center",
        justifyContent:'center'
    },
    mainLoginBox: {
        width:400,
        height:350,
        backgroundColor:'#747474',
        justifyContent:'space-evenly',
        alignItems:'center',
        borderRadius:10,
    },
    headerLogin:{
        textAlign:'center',
        textAlignVertical:'auto',
        fontStyle:'italic',
        color:'white',
        fontSize:15,
        fontFamily:'Candara'
    },
    emailBox:{
        flexDirection:'row',
        borderRadius:4,
        width:380,
        height:40,
        backgroundColor:'white'
    },
    inputEmail:{
        // borderRadius:4,
        width:345,
        height:40,
        justifyContent:'flex-start',
        paddingHorizontal:10,
        backgroundColor:'white'
    },
    emailVerify:{
        justifyContent:"center",
        alignItems:'center',
        height:35,
        borderRadius:17.5,
        marginTop:2.5,
        marginRight:5
    },
    passwordBox:{
        flexDirection:'row',
        borderRadius:4,
        width:380,
        height:40,
        backgroundColor:'black',     
    },
    inputPassword:{
        paddingHorizontal:10,
        backgroundColor:'black',
        width:345,
        color:'white'         
    },
    passowrdView:{
        justifyContent:"center",
        alignItems:'center',
        width:45,
        borderTopRightRadius:4,
        borderBottomRightRadius:4,
    },
    submitButton:{
        height:25,
        backgroundColor:'darkblue',
        alignItems:'center',
        justifyContent:'center'
    },
    submitButtonText: {
        fontFamily:'Consolas',
        fontSize:16,
        paddingHorizontal:10,
        color:'white'
    },
    signUpBox:{
        backgroundColor:'#C9C9C9',
        flexDirection:'row',
        paddingHorizontal:10,
        height:30,
        justifyContent:"center",
        alignItems:'center',
        borderRadius:3
    },
    signUpButton:{
    },
    signUpButtonText:{
        color:'darkred',
        fontStyle:'italic',
        fontFamily:'Candara',
        paddingLeft:10
    },
    footerRegion:{
        flex:1/20,
        height:30,
        backgroundColor:'steelblue',    
    },
    buttonThumbs:{
        height:35,
        width:35,
    },
    backThumbs: {
        height:35,
        width:35,
        },
    passThumbs: {
        height:30,
        width:30,
        },
})
