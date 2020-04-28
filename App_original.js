import React, {useState} from 'react';
import { Text, View, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Back_Arrow from './assets/240px-Back_Arrow.png';
import Next_Arrow from './assets/240px-Next_Arrow.png';
import View_Eyes from './assets/240px-View_Eyes.png';

export default function experimental_login() {
    let [emailCheck, setEmailCheck] = useState(false);
    function login_result() {}
    function success_login() {}
    function failed_login() {}
    return (
        // <SafeAreaView>
            <View style={styles.mainBox}>
                <View style={styles.headerRegion}>
                    <TouchableOpacity style={styles.backNavigation}>
                        <Image style={styles.buttonThumbs} source={Back_Arrow} />
                        {/* <Text style={styles.navText}>go back</Text> */}
                    </TouchableOpacity>            
                </View>
                <View style={styles.bodyBox}>
                    <View style={styles.mainLoginBox}>
                        <Text style={styles.headerLogin}>let's get you signed in!</Text>
                        <View style={styles.emailBox}>
                            <TextInput style={styles.inputEmail} placeholder={'sample_email@email.com'} />
                            <TouchableOpacity style={styles.emailVerify}>
                                <Image style={styles.buttonThumbs} source={Next_Arrow} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.passwordBox}>
                            <TextInput style={styles.inputPassword} placeholderTextColor={'gray'} placeholder={'Input Your Password Here!'}></TextInput>
                            <TouchableOpacity style={styles.passowrdView}>
                                <Image style={styles.buttonThumbs} source={View_Eyes} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>login</Text>                            
                        </TouchableOpacity>
                        <View style={styles.signUpBox}>
                            <Text>Don't have any account with us yet?</Text>
                            <TouchableOpacity style={styles.signUpButton}>
                                <Text style={styles.signUpButtonText}>sign up!</Text>                                
                            </TouchableOpacity>
                        </View>               
                    </View>
                </View>
                <View style={styles.footerRegion}>
                </View>
            </View>
        // {/* </SafeAreaView> */}
    );
}

const styles = StyleSheet.create({
    mainBox:{
        flex:1,
        backgroundColor:'#C9C9C9'
    },
    headerRegion:{
        flex:1/10,
        paddingVertical:10
    },
    backNavigation:{
        width:40,
        height:40,
        // backgroundColor:'#747474',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:10,
        borderRadius:5,
        borderWidth:0,
        paddingHorizontal:10,
    },
    navText:{
        fontFamily:'Candara',
        fontStyle:'italic',
        fontSize:18,
        paddingHorizontal:10
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
        backgroundColor:'lightblue'
    },
    inputEmail:{
        // borderRadius:4,
        width:330,
        height:40,
        justifyContent:'flex-start',
        paddingHorizontal:10,
        backgroundColor:'white'
    },
    emailVerify:{
        justifyContent:"center",
        alignItems:'center',
        paddingHorizontal:10
    },
    passwordBox:{
        flexDirection:'row',
        borderRadius:4,
        width:380,
        height:40,
        backgroundColor:'lightblue'        
    },
    inputPassword:{
        paddingHorizontal:10,
        backgroundColor:'black',
        width:330               
    },
    passowrdView:{
        justifyContent:"center",
        alignItems:'center',
        paddingHorizontal:10
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
})
