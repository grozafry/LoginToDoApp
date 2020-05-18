import React from "react"
import {View} from "react-native"
import { NativeRouter, Switch, Route } from "react-router-native"

import LLogin from './LLogin.js'
import SSignUp from './SSignUp.js' 


export default function App() {
    return(
        <NativeRouter>
            <View>
                <Switch>
                    <Route exact path = "/LLogin" component = {LLogin} />
                    <Route exact path = "/" component = {SSignUp} />
                </Switch>
            </View>
        </NativeRouter>
    )

}