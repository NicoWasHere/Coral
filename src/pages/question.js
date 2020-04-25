import React, { useEffect, useState } from "react"
import { css } from "@emotion/core"
import firebase from 'gatsby-plugin-firebase'

import Head from "../components/Head"
import Form from "../components/Form"

import useUser from "../hooks/useUser"

//the template page for a question. Takes in the url as a param
export default ({ location }) => {

  const user = useUser()

  //gets the id form the path
  const id = location.pathname.replace("/question/", "")
  
    const[question,setQuestion]=useState({})
    const[author,setAuthor]=useState("")
    const [notFound, setNotFound] = useState(false)

    const [bestAnswer, setBestAnswer] = useState()

    //gets the question using the id from the path
    useEffect(() => {
        const db = firebase.firestore()
        db.collection('questions').doc(id).get().then(res=>{
            //if the pat is invalid it catches it 
            if(!res.exists) {
              return setNotFound(true)
            }
            //updates the question data from the database
            setQuestion(res.data())
            db.collection('users').doc(res.data().author).get().then(res=>{
                setAuthor(res.data().displayName)
            })

            //gets the best answer to render on the page
            const bestAnswerId = res.data().bestAnswer
            
            //if there is no best answer then it returns without getting the best answer
            if(!bestAnswerId) {
              return 
            }

            //gets the best answer from the answers collection
            db.collection("questions").doc(id).collection("answers").doc(bestAnswerId).get()
              .then(res => {
                setBestAnswer(res.data())
              })
        })
    }, [id])

    const [myAnswers, setMyAnswers] = useState([])

    useEffect(() => {
      // this request does not work without user being loaded
      if(!user) return 

      const db = firebase.firestore()
     
      //gets all of the answers that the user has answered for the question
      db.collection("questions").doc(id).collection("answers").where("author", "==", user.uid).get()
        .then(snapshot => {
          const output = []

          snapshot.forEach(doc => {
            output.push({
              id: doc.id,
              ...doc.data()
            })
          })

          setMyAnswers(output)
        })
    }, [user, id])

    const [answer, setAnswer] = useState("")

    const submitAnswer = e => {
      e.preventDefault()

      const db = firebase.firestore()

      db.collection("questions").doc(id).collection("answers").add({
        author: user.uid,
        body: answer
      })
        .then(() => {
          window.location.reload()
        })
    }

  if(notFound) {
    return (
      <div>
        question not found
      </div>
    )
  }

  return (
    <>
      <Head title={question.title} />
      <h1>
          {question.title}
      </h1>
      <div>
          Asked by {author}
      </div>
      <div
        css={css`
          white-space: pre-wrap;
        `}
      >
          {question.body}
      </div>

      <h2>Answer</h2>
      
      <div>
        <p>
          {bestAnswer?.body ? bestAnswer.body : "No answer yet."}
        </p>
      </div>

      {/* show add answer form only if user is logged in */}
      {user && (
        <>
          <h2>Answer this question</h2>

          <p>
            If your answer is picked, it will be shown as this question's answer. Only one answer will be picked. 
          </p>

          {myAnswers.length > 0 && (
            <>
              <p>
                Your past answers: 
              </p>

              {myAnswers.map(answer => (
                <div key={answer.id}>
                  <p
                    css={css`
                      white-space: pre-wrap;
                    `}
                  >
                    {answer.body}
                  </p>

                  <button
                    onClick={() => {
                      if(window.confirm("Are you sure you'd like to delete this answer?")) {
                        const db = firebase.firestore()

                        db.collection("questions").doc(id).collection("answers").doc(answer.id).delete()
                          .then(() => window.location.reload())
                      }
                    }}
                  >
                    delete
                  </button>
                </div>
              ))}
            </>
          )}

          <Form onSubmit={submitAnswer}>
            <textarea
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              placeholder="Write your answer..."
              required
            />

            <input type="submit" value="Save" />
          </Form>
        </>
      )}
    </>
  )
}