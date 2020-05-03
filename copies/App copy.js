/* importing required modules */
import React, {useState} from 'react';
import { Text, View, TextInput, Platform, Image, KeyboardAvoidingView, Dimensions, TouchableOpacity,SafeAreaView, TouchableHighlight, StyleSheet } from 'react-native';

/*Importing Button Images */
import Back_Arrow from './assets/240px-Back_Arrow.png';
import Email_Check from './assets/240px-Email_Check.png';
import Show_Pass from './assets/240px-Show_Pass.png';
import Hide_Pass from './assets/240px-Hide_Pass.png';
import Verified_Email from './assets/Verified_Email.png';
import Home_Screen from '../Main';
import users from '../users.json'

/*Main Function */
export default function experimental_login() {
    /*List of Messages */
    var messages = ["seems you're not registered with us!", "Please enter an email address first!", "Too Many Failed attempts, Please Try Again in "]
    
    /*   Unused Variables for future Usage*
    let [goBack, setGoBack] = useState(false);
    let [t, setT] = useState(performance.now()/1000);
    let [signUp, setSignUp] = useState(false);
    */

    /*List of State Variables*/
    let [count, setCount] = useState(0);     //Counter for unauthorised login attempt
    let [result, setResult] = useState('');    //login attempt messages [if needed]
    let [emailCheckResult, setEmailCheckResult] = useState(Email_Check);    // Image URI source for email check
    let [disableEmail, setDisableEmail] = useState(false);     //disables email inpyut if counter exceeds
    let [emailCheck, setEmailCheck] = useState(true);    // Checks if Email is registered or not
    let [passwordView, setPasswordView] = useState(false);    //set whether to show the password
    let [passBoxVisibility, setPassBoxVisibility] = useState('none');    //enables password box in case email is registered
    let [registeredEmail, setRegisteredEmail] = useState('none');     //Enables visibility of login messages if needed.
    let [viewPassword, setViewPassword] = useState(Hide_Pass);     // Image URI source for Password View
    let [goHome, setGoHome] = useState(false); // Goes to Home Screen if true
    let [userid, setUserId] = useState('');

    var pass = '';  //clears exisiting password if email is changed
    var x;


    const [emailEntered, setEmailEntered] = useState('');  //Takes Input for email
    const [passwordEntered, setPasswordEntered] = useState('');   //Takes Input for password
    const [b, setB] = useState(5);

/* verifying email */
    function email_check() {
        if (emailEntered!='') {
            // setGoHome(true);
            if (users[emailEntered]){
                for (x in users) {
                    if (x==emailEntered) {
                        setUserId([x]);
                        // alert(userid)
                    }
                }
                setRegisteredEmail('none');
                setPassBoxVisibility('flex');
                setEmailCheckResult(Verified_Email);
                setEmailCheck(false);
                setCount(0);
                setB(5);
            } else {
                setRegisteredEmail('flex');
                setCount(count + 1);
                setResult(messages[0])
                setPassBoxVisibility('none');
                setEmailCheckResult(Email_Check);
            }
        } else {
            setResult(messages[1]);
            setCount(count + 1);
            setRegisteredEmail('flex');
            setEmailCheckResult(Email_Check);
        }

        if (count > 2) {
            setEmailCheck(false);
            setDisableEmail(true);
            var timeout_1 = setTimeout(setEmailCheck, b*1000, true);
            var timeout_2 = setTimeout(setDisableEmail, b*1000, false);
            var timeout_3 = setTimeout(setResult, b*1000, '');
            setB(b*2);
            var timeout_4 = setTimeout(setCount, b*1000, 0);
            setResult(messages[2] + b + '\xa0seconds!');        
        }
    }

/*End of Email verification*/

/* Password Verification */
    function login_attempt() {
        if (users[emailEntered]===passwordEntered) {            
            setGoHome(true);
        } else {    
            alert('Nope!');
        }
    }
/*End of Password Verification */

/*Sample Home Screen */
    if (goHome) {
        // alert(userid)
        return (
            <View style={{flex:1}}>
                <Home_Screen name={userid}/>
            </View>
        );
    }
/*End of Home Screen function */

/* Password visibility setting */
    function password_visibility() {
        if (passwordView) {
            setPasswordView(false);
            setViewPassword(Hide_Pass);
        } else {
            setPasswordView(true);
            setViewPassword(Show_Pass);
        }
    }

/* reset passoword fields and hide password box (Invoked when email is changed)*/    
    function reset_fields() {
        setPasswordEntered('');
        pass.clear();
        setPassBoxVisibility('none');
        setEmailCheckResult(Email_Check);
        setEmailCheck(true);
        setResult('');
    }

/*Main Return function */    
    return (
        //Main Container
        // <View >
            <KeyboardAvoidingView style={styles.mainBox} behavior={Platform.OS == "ios" ? "padding" : "height"}>

                    {/*Header region (contains back button)*/}
                    <View style={styles.headerRegion}>
                    
                    {/*Button to go back to unsigned home screen []*/}
                        <TouchableHighlight activeOpacity={1} underlayColor="#0000CD" style={styles.backNavigation} onPress={()=> alert('Still Working on this one 😢!')}>
                            <Image style={styles.buttonThumbs} source={Back_Arrow} />
                        </TouchableHighlight>            
                    </View>

                    {/*Body (Contain all login elements)*/}
                    <View style={styles.bodyBox}>
                        <View style={styles.mainLoginBox}>

                    {/*Heading Text*/}
                            <Text style={styles.headerLogin}>let's get you signed in!</Text>

                    {/*Email Main Box*/}
                            <View style={styles.emailBox}> 

                    {/*Email Input (can be disabled)*/}
                                <TextInput disabled={disableEmail} style={styles.inputEmail} placeholder={'sample_email@email.com'}
                                        onChangeText={emailEntered=>setEmailEntered(emailEntered)}
                                        onChange={reset_fields}
                                        defaultValue={emailEntered} />

                    {/*Email check button [email_check] (with disable and variable image uri)*/}
                                <TouchableHighlight activeOpacity={1}
                                    disabled={!emailCheck}
                                    underlayColor="#0000CD" onPress={email_check} style={styles.emailVerify}>
                                        <Image style={styles.buttonThumbs} source={emailCheckResult} />
                                </TouchableHighlight>
                            </View>

                    {/*Text returning error messages in email verification*/}
                            <Text style={{color:'darkred', fontStyle:'italic', display:registeredEmail}}>{result}</Text>
                    
                    {/*(Container used for hiding passwordBox until email is verified)*/}
                            <View style={{display:passBoxVisibility}}>
                    
                    {/*Flexbox for password*/}
                                <View style={styles.passwordBox}>

                    {/*Password Input Box*/}
                                    <TextInput secureTextEntry={!passwordView} style={styles.inputPassword} placeholderTextColor={'gray'}
                                            placeholder={'Input Your Password Here!'}
                                            onChangeText={passwordEntered => setPasswordEntered(passwordEntered)}
                                            defaultValue={passwordEntered}
                                            ref={input => { pass = input }}
                                            />

                    {/*Button for viewing password [password_visibility] (has a variable image uri)*/}
                                    <TouchableHighlight activeOpacity={1} underlayColor={'#747474'} onPress={password_visibility} style={styles.passowrdView}>
                                        <Image style={styles.buttonThumbs} source={viewPassword} />
                                    </TouchableHighlight>
                                </View>
                            </View>

                    {/*Button to submit password [login_attempt] (shares the visibility criteria same as password box)*/}
                            <View style={{display:passBoxVisibility}}>
                                <TouchableOpacity style={styles.submitButton} underlayColor="#000" onPress={login_attempt}>
                                    <Text style={styles.submitButtonText}>login</Text>                            
                                </TouchableOpacity>
                            </View>
                    {/*Button for signing up if the user is not registered and is interested []*/}
                            <View style={styles.signUpBox}>
                                <Text>Don't have any account with us yet?</Text>
                                <TouchableOpacity style={styles.signUpButton} onPress={() => alert('Still working on this one 😢!')}>
                                    <Text style={styles.signUpButtonText}>sign up!</Text>                                
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                    {/*End of Main Login Box*/}
                    
                    {/*Footer Region(isn't developed yet)*/} 
                    <View style={styles.footerRegion}>
                    </View>
                    {/*End of footer region*/}
                
            </KeyboardAvoidingView>
        // </View>
        //End of Main Container
    );
    /*End of Main return function*/
}
//End of Main Function

const styles = StyleSheet.create({

    //full container

    mainBox:{
        flex:1,
        backgroundColor:'#C9C9C9',
        // marginTop:15,
    },

    //top bar

    headerRegion:{
        flex:1/20,
        marginTop:20,
        paddingVertical:10,
        justifyContent:'center',
        alignItems:'center',
    },

    //Navigate Back

    backNavigation:{
        height:35,
        width:35,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:17.5,
        borderWidth:0,
        shadowOffset:{width:0, height:0},
        shadowRadius:17.5,
        shadowOpacity:1, 
    },

    //Navtext [if added]

    navText:{
        fontStyle:'italic',
        fontSize:25,
        paddingHorizontal:5,
    },

    //main body [contains login box]

    bodyBox:{
        flex:9.25/10,
        alignItems:"center",
        justifyContent:'flex-start',
        marginTop:50,
    },

    //login box [contains login elements]

    mainLoginBox: {
        width:Dimensions.get('window').width*8/9,
        height:Dimensions.get('window').height*4/9,
        backgroundColor:'#747474',
        justifyContent:'space-between',
        alignItems:'center',
        borderRadius:10,
        shadowOffset:{width:-20,height:-20},
        shadowOpacity:1,
        shadowRadius:80,
        shadowColor:'#000000',
        paddingVertical:10,
    },

    //login heading

    headerLogin:{
        textAlign:'center',
        textAlignVertical:'auto',
        fontStyle:'italic',
        color:'white',
        fontSize:20,
        paddingHorizontal:15,
        borderRadius:3,
        shadowOffset:{width:-2,height:-2},
        shadowOpacity:1,
        shadowRadius:8,
        shadowColor:'#000000',
    },

    //Email input container main

    emailBox:{
        borderRadius:4,
        flexDirection:'row',
        width:Dimensions.get('window').width*7.5/9,
        backgroundColor:'white',
        height:40,
        shadowOffset:{width:-2,height:-2},
        shadowOpacity:1,
        shadowRadius:8,
        shadowColor:'#000000',
        alignContent:'center',
        justifyContent:'center'
    },

    //input for email

    inputEmail:{
        width:Dimensions.get('window').width*7.3/9 - 35,
        height:40,
        paddingHorizontal:10,
        backgroundColor:'white',
    },

    //button for email verification

    emailVerify:{
        justifyContent:"center",
        alignItems:'center',
        marginTop:2.5,
        height:35,
        width:35,
        borderRadius:17.5,
    },

    //Password input container main

    passwordBox:{
        flexDirection:'row',
        borderRadius:4,
        width:Dimensions.get('window').width*7.5/9,
        height:40,
        backgroundColor:'#747474',
        shadowOffset:{width:-2,height:-2},
        shadowOpacity:1,
        shadowRadius:8,
        shadowColor:'#000000',
    },

    //input for password

    inputPassword:{
        paddingHorizontal:10,
        backgroundColor:'black',
        width:Dimensions.get('window').width*7.5/9 - 45,
        color:'white',       
    },

    //button for password view

    passowrdView:{
        justifyContent:"center",
        alignItems:'center',
        // paddingHorizontal:2,
        width:45,
        // marginRight:2.5,
        borderTopRightRadius:4,
        borderBottomRightRadius:4,
    },

    //button for credential submission

    submitButton:{
        height:25,
        backgroundColor:'darkblue',
        alignItems:'center',
        justifyContent:'center',
        shadowOffset:{width:-2,height:-2},
        shadowOpacity:1,
        shadowRadius:8,
        shadowColor:'#000000',
    },

    //text style for submit button

    submitButtonText: {
        fontSize:16,
        paddingHorizontal:10,
        color:'white',
    },

    //Signup container main

    signUpBox:{
        backgroundColor:'#C9C9C9',
        flexDirection:'row',
        paddingHorizontal:10,
        height:30,
        justifyContent:"center",
        alignItems:'center',
        borderRadius:3,
        shadowOffset:{width:-2,height:-2},
        shadowOpacity:1,
        shadowRadius:8,
        shadowColor:'#000000',
    },

    //styles for signup button

    signUpButton:{
    },

    //text style for signup button

    signUpButtonText:{
        color:'darkred',
        fontStyle:'italic',
        paddingLeft:10,
    },

    //footer region

    footerRegion:{
        flex:1/40,
        height:25,
        backgroundColor:'steelblue',    
    },

    //Thumbnail for buttons
    
    buttonThumbs:{
        height:35,
        width:35,
    },
})
