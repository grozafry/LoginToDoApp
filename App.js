//App.js

/* This is first screen - Login Screen */

/* importing required modules */
import React, {useState} from 'react';
import { Text, View, TextInput, Platform, Image, KeyboardAvoidingView, Dimensions, TouchableOpacity,SafeAreaView, TouchableHighlight, StyleSheet } from 'react-native';

/*Importing Button Images */
import Back_Arrow from './assets/Back_Arrow.png';
import Userid_Check from './assets/Userid_Check.png';
import Show_Pass from './assets/Show_Pass.png';
import Hide_Pass from './assets/Hide_Pass.png';
import Verified_Userid from './assets/Verified_Userid.png';

/* Importing functions*/
import UserHome from './userpages/UserHome';

/* Importing list of users*/
import Users from './users.json'

/*Main Function */
export default function UserLogin() {

    /*List of Messages */
    var messages = ["seems you're not registered with us!", "Please enter a userid  first!", "Too Many Failed attempts, Please Try Again in "]
    
    /*   Unused Variables for future Usage*
    let [goBack, setGoBack] = useState(false);
    let [signUp, setSignUp] = useState(false);
    */

    /*List of State Variables*/
    let [count, setCount] = useState(0);     //Counter for unauthorised login attempt
    let [result, setResult] = useState('');    //login attempt messages [if needed]
    let [useridCheckResult, setUseridCheckResult] = useState(Userid_Check);    // Image URI source for userid check
    let [disableUserid, setDisableUserid] = useState(false);     //disables userid input if counter exceeds
    let [useridCheck, setUseridCheck] = useState(true);    // Checks if Userid is registered or not
    let [passwordView, setPasswordView] = useState(false);    //set whether to show the password
    let [passBoxVisibility, setPassBoxVisibility] = useState('none');    //enables password box in case userid is registered
    let [registeredUserid, setRegisteredUserid] = useState('none');     //Enables visibility of login messages if needed.
    let [viewPassword, setViewPassword] = useState(Hide_Pass);     // Image URI source for Password View
    let [goHome, setGoHome] = useState(false); // Goes to Home Screen if true
    let [userid, setUserId] = useState('');

    var pass = '';  //clears exisiting password if userid is changed
    var x;  //extracts key from JSON


    const [useridEntered, setUseridEntered] = useState('');  //Takes Input for userid
    const [passwordEntered, setPasswordEntered] = useState('');   //Takes Input for password
    const [b, setB] = useState(5);  //for timer in case of repeated failed attempts

/* verifying userid */
    function userid_check() {
        var z = 0;
        if (useridEntered!='') {
            for (x in Users) {
                if (Users[x].id==useridEntered) {
                        setUserId([x]);                
                        setRegisteredUserid('none');
                        setPassBoxVisibility('flex');
                        setUseridCheckResult(Verified_Userid);
                        setUseridCheck(false);
                        setCount(0);
                        setB(5);
                        z = 1;
            } }
            if (z==0) {
                setRegisteredUserid('flex');
                setCount(count + 1);
                setResult(messages[0])
                setPassBoxVisibility('none');
                setUseridCheckResult(Userid_Check);
            }
        } else {
            setResult(messages[1]);
            setCount(count + 1);
            setRegisteredUserid('flex');
            setUseridCheckResult(Userid_Check);
        }

        if (count > 2) {
            setUseridCheck(false);
            setDisableUserid(true);
            var timeout_1 = setTimeout(setUseridCheck, b*1000, true);
            var timeout_2 = setTimeout(setDisableUserid, b*1000, false);
            var timeout_3 = setTimeout(setResult, b*1000, '');
            setB(b*2);
            var timeout_4 = setTimeout(setCount, b*1000, 0);
            setResult(messages[2] + b + '\xa0seconds!');        
        }
    }

/*End of Userid verification*/

/* Password Verification */
    function login_attempt() {
        // alert(userid)
        if (passwordEntered==Users[userid].pwd) {            
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
                <UserHome logout={reset_fields} user={Users[userid]} name={userid}/>
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

/* reset passoword fields and hide password box (Invoked when userid is changed)*/    
    function reset_fields() {
        setPasswordEntered('');
        // pass.clear();
        setPassBoxVisibility('none');
        setUseridCheckResult(Userid_Check);
        setUseridCheck(true);
        setResult('');
        setGoHome(false);
    }

/*Main Return function */    
    return (
        //Main Container
        <KeyboardAvoidingView style={styles.mainbox} behavior={Platform.OS == "ios" ? "padding" : "height"}>

                {/*Header region (contains back button)*/}
            <View style={styles.headerregion}>
            
            {/*Button to go back to unsigned home screen []*/}
                <TouchableHighlight activeOpacity={1} underlayColor="#0070bb" style={styles.backnavigation} onPress={()=> alert('Still Working on this one 😢!')}>
                    <Image style={styles.buttonthumbs} source={Back_Arrow} />
                </TouchableHighlight>            
            </View>

            {/*Body (Contain all login elements)*/}
            <View style={styles.bodybox}>
                <View style={styles.mainloginbox}>

            {/*Heading Text*/}
                <View style={styles.headerlogin}>
                    <Text style={styles.headerlogintext}>let's get you signed in!</Text>
                </View>    

            {/*Userid Main Box*/}
                    <View style={styles.useridbox}> 

            {/*Userid Input (can be disabled)*/}
                        <TextInput disabled={disableUserid} style={styles.inputuserid} placeholder={'Please enter your user id...'}
                                onChangeText={useridEntered=>setUseridEntered(useridEntered)}
                                onChange={reset_fields}
                                defaultValue={useridEntered} />

            {/*Userid check button [userid_check] (with disable and variable image uri)*/}
                        <TouchableHighlight activeOpacity={1}
                            disabled={!useridCheck}
                            underlayColor="#0070bb" onPress={userid_check} style={styles.useridverify}>
                                <Image style={styles.buttonthumbs} source={useridCheckResult} />
                        </TouchableHighlight>
                    </View>

            {/*Text returning error messages in userid verification*/}
                    <Text style={{color:'darkred', fontStyle:'italic', display:registeredUserid, marginVertical:10}}>{result}</Text>
            
            {/*(Container used for hiding passwordBox until userid is verified)*/}
                    <View style={{display:passBoxVisibility}}>
            
            {/*Flexbox for password*/}
                        <View style={styles.passwordbox}>

            {/*Password Input Box*/}
                            <TextInput secureTextEntry={!passwordView} style={styles.inputpassword} placeholderTextColor={'gray'}
                                    placeholder={'Input Your Password Here!'}
                                    onChangeText={passwordEntered => setPasswordEntered(passwordEntered)}
                                    defaultValue={passwordEntered}
                                    ref={input => { pass = input }}
                                    />

            {/*Button for viewing password [password_visibility] (has a variable image uri)*/}
                            <TouchableHighlight activeOpacity={1} underlayColor={'#747474'} onPress={password_visibility} style={styles.passwordview}>
                                <Image style={styles.buttonthumbs} source={viewPassword} />
                            </TouchableHighlight>
                        </View>
                    </View>

            {/*Button to submit password [login_attempt] (shares the visibility criteria same as password box)*/}
                    <View style={{display:passBoxVisibility}}>
                        <TouchableOpacity style={styles.submitbutton} underlayColor="#000" onPress={login_attempt}>
                            <Text style={styles.submitbuttontext}>login</Text>                            
                        </TouchableOpacity>
                    </View>
            {/*Button for signing up if the user is not registered and is interested []*/}
                    <View style={styles.signupbox}>
                        <Text>Don't have any account with us yet?</Text>
                        <TouchableOpacity style={styles.signupbutton} onPress={() => alert('Still working on this one 😢!')}>
                            <Text style={styles.signupbuttontext}>sign up!</Text>                                
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/*End of Main Login Box*/}
            
            {/*Footer Region(isn't developed yet)*/} 
            <View style={styles.footerregion}></View>
            {/*End of footer region*/}
        
        </KeyboardAvoidingView>
        //End of Main Container
    );
    /*End of Main return function*/
}
//End of Main Function

/*Styles (in order of heirarchy)*/
const styles = StyleSheet.create({

    //full container

    mainbox:{
        flex:1,
        marginTop:25
    },

    //top bar

    headerregion:{
        flex:1/20,
        marginTop:5,
        marginHorizontal:5,
    },

    //Navigate Back button

    backnavigation:{
        height:35,
        width:35,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:17.5,
        // shadowOpacity:0.8,
        // shadowRadius:4,
        // shadowOffset:{height:0.5},
        backgroundColor:'white',
    },

    //Navtext [if added]

    navtext:{
        fontStyle:'italic',
        fontSize:25,
        paddingHorizontal:5,
    },

    //main body [contains login box]

    bodybox:{
        flex:9.25/10,
        alignItems:"center",
        justifyContent:'flex-start',
        marginTop:50,
    },

    //login box [contains login elements]

    mainloginbox: {
        width:Dimensions.get('window').width*8/9,
        minHeight:230,
        backgroundColor:'#747474',
        justifyContent:'space-between',
        alignItems:'center',
        borderRadius:10,
        shadowOpacity:1,
        shadowRadius:28,
        shadowOffset:{width:15, height:15},        
        paddingVertical:10,
    },

    //login heading
    headerlogin:{
        marginVertical:10,
        backgroundColor:'#367588',
        padding:7,
        borderRadius:5,
        shadowRadius:5,
        shadowOpacity:0.8,
    },

    headerlogintext:{
        textAlign:'center',
        textAlignVertical:'auto',
        fontWeight:'500',
        fontStyle:'italic',
        color:'black',
        fontSize:20,        
    },

    //Userid input container main

    useridbox:{
        marginVertical:10,
        borderRadius:4,
        flexDirection:'row',
        width:Dimensions.get('window').width*7.5/9,
        backgroundColor:'white',
        height:40,
        shadowOpacity:1, 
        shadowRadius:20,
        shadowOffset:{height:5, width:15},       
        alignContent:'center',
        justifyContent:'center'
    },

    //input for userid

    inputuserid:{
        borderRadius:4,
        borderRightWidth:0.5,
        borderStyle:'dashed',
        width:Dimensions.get('window').width*7.5/9 - 45,
        paddingHorizontal:10,
        justifyContent:'flex-start',
    },

    //button for userid verification

    useridverify:{
        marginVertical:2.5,
        marginHorizontal: 5,   
        height:35,
        width:35,
        borderRadius:17.5,
    },

    //Password input container main

    passwordbox:{
        marginVertical:10,
        flexDirection:'row',
        borderRadius:4,
        width:Dimensions.get('window').width*7.5/9,
        backgroundColor:'gray',
        shadowOpacity:1, 
        shadowRadius:20,
        shadowOffset:{height:5, width:15},        
    },

    //input for password

    inputpassword:{
        paddingHorizontal:10,
        backgroundColor:'black',
        width:Dimensions.get('window').width*7.5/9 - 45,
        color:'white',
        borderTopLeftRadius:4,
        borderBottomLeftRadius:4,       
    },

    //button for password view

    passwordview:{
        justifyContent:"center",
        alignItems:'center',
        width:45,
        borderTopRightRadius:4,
        borderBottomRightRadius:4,
    },

    //button for credential submission

    submitbutton:{
        marginVertical:10,
        height:25,
        backgroundColor:'darkblue',
        alignItems:'center',
        justifyContent:'center',
        shadowOpacity:1, 
        shadowRadius:10,
        shadowOffset:{height:6, width:7},
        
    },

    //text style for submit button

    submitbuttontext: {
        fontSize:16,
        paddingHorizontal:10,
        color:'white',
    },

    //Signup container main

    signupbox:{
        marginVertical:10,
        backgroundColor:'#C9C9C9',
        // flexDirection:'row',
        paddingHorizontal:10,
        // height:30,
        justifyContent:"center",
        alignItems:'center',
        borderRadius:3,
        shadowOpacity:1,
        shadowRadius:10,
        shadowOffset:{height:-1,width:8},        
    },

    //styles for signup button

    signupbutton:{
        marginVertical:5
    },

    //text style for signup button

    signupbuttontext:{
        color:'darkred',
        fontStyle:'italic',
        paddingLeft:10,
        textDecorationStyle:"dashed"
    },

    //footer region

    footerregion:{
        flex:1/40,
        height:25,
        backgroundColor:'steelblue',    
    },

    //Thumbnail for buttons
    
    buttonthumbs:{
        height:35,
        width:35,
    },
})