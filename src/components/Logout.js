import React from "react"
import firebase from "gatsby-plugin-firebase"

//a sign out button to log users out of their firebase account
export default () =>{
    const signOut = () =>{
        firebase.auth().signOut()
    }
    return(
<button onClick = {signOut}>Log Out</button>
    )
}

