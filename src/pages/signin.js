import React, { useEffect } from "react"
import { navigate } from "gatsby"
import firebase from "gatsby-plugin-firebase"


import Head from "../components/Head"
import AuthPage from "../components/AuthPage"

import useUser from "../hooks/useUser"

export default () => {

  const user = useUser()
  //redirects if the user is already signed in
  if(user){navigate('/')}

  const onSubmit = (email, password) => {
    // Firebase auth sign in
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res=>{
        navigate("/")
      })
      .catch(e => {
        alert(e.message)
      })
  }
  
  return (
    <>
      <Head title="Sign in" />

      <AuthPage
        heading="Welcome back"
        submit="Sign in"
        bottom={{text:"Don't have an account? Create one",url:"/signup"}}
        onSubmit={onSubmit}
      />
    </>
  )
}