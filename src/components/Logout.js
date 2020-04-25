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
                background-color: var(--accent);
                padding: 6px 12px;
                border-radius: 4px;
                color: white;
                font-weight: 600;
                font-size: 14px;
            `}
        >
            Log out
        </button>
    )
}

