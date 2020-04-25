import React, { useState, useEffect } from "react"
import firebase from "gatsby-plugin-firebase"

import Head from "../components/Head"
import Form from "../components/Form"
import Logout from "../components/Logout"
import Nav from "../components/Nav"

import useUser from "../hooks/useUser"

//a page that allows users to update their information
export default () => {
  const [YOG, setYOG] = useState("")
  const [bio, setBio] = useState("")
  const [displayName, setDisplayName] = useState("")

  const user = useUser()

  useEffect(() => {
    if(!user) return // no user loaded yet, so user.uid will not exist

    const db = firebase.firestore()

    //gets the current user data
    db.collection("users").doc(user.uid).get()
      .then(doc => {
        const data = doc.data()
        setYOG(data?.YOG || "")
        setBio(data?.bio || "")
        setDisplayName(data?.displayName || "")
      })
  }, [user])

  const onSubmit = (e) => {
    e.preventDefault()

    const db = firebase.firestore()

    //updates the database with the data the user entered
    db.collection("users").doc(user.uid).set({
      YOG,
      bio,
      displayName
    }, { merge: true })
      .then(() => {
        alert("Saved!") //delet >:(
      })

    user.updateProfile({ //updates the account data (different than database)
        displayName
    })
  }

  return (
    <>
      <Head title="Account" />

      <Nav />

      <h1 className="page-heading">Account Settings</h1>

      {(user && !user.displayName) && (
        <p>
          What's your name?
        </p>
      )}

      <Form onSubmit={onSubmit} constrainWidth>
        <input
          placeholder="Display name"
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          required
        />

        <textarea
          placeholder="Bio"
          value={bio}
          onChange={e => setBio(e.target.value)}
        />

        <input
          placeholder="Year of graduation"
          type = "number"
          value={YOG}
          onChange={e => setYOG(e.target.value)}
        />

        <input type="submit" value="Save" />
      </Form>
      
      <Logout />
    </>
  )
}