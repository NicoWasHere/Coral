import React, { useState } from "react"
import { css } from "@emotion/core"
import { navigate } from "gatsby"
import firebase from "gatsby-plugin-firebase"

import Head from "../components/Head"
import Form from "../components/Form"
import Nav from "../components/Nav"

import useUser from "../hooks/useUser"

//a form for users to submit a new question to the database
export default () => {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const user = useUser()

  //updates the database whenver a form is submitted
  const onSubmit = e => {
    e.preventDefault()

    const db = firebase.firestore()
  
    db.collection("questions").add({
      title,
      body,
      author: user.uid,
      timestamp: new Date().getTime()
    })
      .then(ref => {
        navigate(`/question/${ref.id}`)
      })
  }

  //tests to see if the user is logged in. If they are not logged in they can't ask a question
  if(!user?.uid) {
    return (
      <div>
        <p>
          You are not logged in.
        </p>
      </div>
    )
  }
  
  return (
    <>
      <Head title="New Question" />

      <Nav />

      <h1 className="page-heading">Submit a question</h1>

      <p
        css={css`
          margin-bottom: 16px;
        `}
      >
        Other members of the Coral community will try to answer your question.
      </p>
      
      <Form onSubmit={onSubmit} constrainWidth>
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Add some more details..."
          value={body}
          onChange={e => setBody(e.target.value)}
        />

        <input type="submit" value="Submit" />
      </Form>
    </>
  )
}