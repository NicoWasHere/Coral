import React from "react"
import { navigate } from "gatsby"
import firebase from "gatsby-plugin-firebase"

import Head from "../components/Head"
import AuthPage from "../components/AuthPage"

export default () => {

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
        onSubmit={onSubmit}
      />
    </>
  )
}