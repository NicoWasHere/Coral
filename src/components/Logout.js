import React from "react"
import firebase from "gatsby-plugin-firebase"
import { css } from "@emotion/core"
import { navigate } from "gatsby"

//a sign out button to log users out of their firebase account
export default () =>{
    const signOut = () =>{
        firebase.auth().signOut()
        navigate('/')

    }
    return(
        <button
            onClick={signOut}
            css={css`
                font-weight: 500;
                background: transparent;
                text-decoration: underline;
            `}
        >
            Log me out.
        </button>
    )
}

