import { useState, useEffect } from "react"
import { navigate } from "gatsby"
import firebase from "gatsby-plugin-firebase"

//a hook that will update whenever the user logs in or out
export default () => {
  const [user, setUser] = useState()

  useEffect(() => {
    //returns the status whenever a user logs in or out from firebase
    firebase.auth().onAuthStateChanged(firebaseUser => {
      setUser(firebaseUser)

      //forces the user to populate their account
      if(firebaseUser && !firebaseUser.displayName) {
        return navigate("/account")
      }
    })
  }, [])

  return user
}