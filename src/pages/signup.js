import React from "react"
import { navigate } from "gatsby"
import firebase from "gatsby-plugin-firebase"

import Head from "../components/Head"
import AuthPage from "../components/AuthPage"

import useUser from "../hooks/useUser"

export default () => {

  const user = useUser()
  //redirects if the user is already signed in
  if(user){navigate('/')}

  // makes a new account with Firebase auth
  const onSubmit = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res=>{
        navigate("/")
      })
      .catch(e => {
        alert(e.message)
      })
  }

  return (
    <>
      <Head title="Sign up" />

      <AuthPage
        heading="Create a free account"
        submit="Sign up"
        bottom={{text:"Already have an account? Sign in",url:"/signin"}}
        onSubmit={onSubmit}
      />
    </>
  )
}