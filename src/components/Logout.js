import React from "react"
import firebase from "gatsby-plugin-firebase"
import { css } from "@emotion/core"

//a sign out button to log users out of their firebase account
export default () =>{
    const signOut = () =>{
        firebase.auth().signOut()
    }
    return(
        <button
            onClick={signOut}
            css={css`
                border-radius: 4px;
                font-weight: 500;
                background: transparent;
                text-decoration: underline;
            `}
        >
            Log out.
        </button>
    )
}

