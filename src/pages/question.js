import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"
import firebase from 'gatsby-plugin-firebase'

import Head from "../components/Head"
import Form from "../components/Form"
import Nav from "../components/Nav"
import FileUpload from "../components/FileUpload"

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
    const [bestAnswerAuthor, setBestAnswerAuthor] = useState()

    const [isModerator,setIsModerator] = useState(false)
    

    //gets the question using the id from the path
    useEffect(() => {
        if(!id) return setNotFound(true)
      
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
                if(!res.exists) return // best answer has been deleted
                
                setBestAnswer(res.data())

                const authorId = res.data().author

                db.collection("users").doc(authorId).get()
                  .then(res => setBestAnswerAuthor(res.data()))
              })
        })

    }, [id])

    const [myAnswers, setMyAnswers] = useState([])

    useEffect(() => {
      // this request does not work without user being loaded
      if(!user) return 

      if(!id) return setNotFound(true)

      const db = firebase.firestore()
     
      db.collection('moderators').doc(user.uid).get().then(snapshot =>{
        setIsModerator(snapshot.exists)
      })

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

    const [allAnswers,setAllAnswers] = useState([])

    useEffect(()=>{

      if(isModerator){
        const db = firebase.firestore()
        db.collection("questions").doc(id).collection("answers").get()
        .then(snapshot => {
          const output = []
          snapshot.forEach(doc => {
            output.push({
              id: doc.id,
              ...doc.data()
            })})
          setAllAnswers(output)
        })
      }
    },[isModerator,id])

    const [answer, setAnswer] = useState("")

    const submitAnswer = e => {
      e.preventDefault()
      setShouldUpload(true)

    }

    const uploadAnswer = (image) =>{
      const db = firebase.firestore()
      let data = {
        author: user.uid,
        body: answer
      }
      if(image!=="None"){
        data.image = image
      }
      db.collection("questions").doc(id).collection("answers").add(data)
        .then(() => {
          window.location.reload()
        })

    }


  const [shouldUpload, setShouldUpload] = useState(false)


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

      <Nav tinted />
      
      <main
        className="constrain-width"
        css={css`
          img {
            display: block;
            margin-top: 24px;
            max-width: 100%;
            max-height: calc(100vh - 300px);
          }
        `}
      >
        <div
          css={css`
            margin-bottom: 48px;
          `}
        >
          <h1
            css={css`
              font-size: 32px;
              font-weight: 700;
              letter-spacing: -0.3px;
              line-height: 1.3;
              color: var(--text-primary);
              margin-bottom: 8px;
            `}
          >
              {question.title}
          </h1>

          <p
            css={css`
              font-weight: 600;
              margin-bottom: 16px;
            `}
          >
              Asked by {author}
          </p>
          <p
            css={css`
              white-space: pre-wrap;
              line-height: 1.5;
              max-width: 512px;
            `}
          >
              {question.body}
          </p>

          {question.image?<img src = {question.image} alt="" />:""}
        </div>

        <h2
          css={css`
            font-size: 18px;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 4px;
            line-height: 1.4;
          `}
        >
          Answer{bestAnswerAuthor ? `ed by ${bestAnswerAuthor.displayName}` : ""}
          {/* ^ that's galaxy brain right there */}
        </h2>
        
        <div>
          <p
            css={css`
              white-space: pre-wrap;
              line-height: 1.5;
              max-width: 512px;
            `}
          >
            {bestAnswer?.body ? bestAnswer.body : "No answer yet."}
          </p>
          {bestAnswer?.image ? <img src = {bestAnswer.image} alt=""/>:""}
        </div>

        {/* spacer div */}
        <div
          css={css`
            margin-bottom: 48px;
          `}
        />

        <h2
          css={css`
            font-size: 18px;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 4px;
            line-height: 1.4;
          `}
        >
          Answer this question
        </h2>

        {!user && (
          <p
            css={css`
              line-height: 1.4;
              font-weight: 500;

              a {
                color: var(--accent);
                text-decoration: none;
                font-weight: 500;
              }
            `}
          >
            <Link to="/signup/">Create an account</Link> or <Link to="/signin/">sign in</Link> to Coral in order to contribute an answer.
          </p>
        )}

        {/* show add answer form only if user is logged in */}
        {user && (
          <>
            <p>
              If your answer is picked, it will be shown as this question's answer. Only one answer will be picked. 
            </p>

            <div
              css={css`
                margin-bottom: 16px;
              `}
            />

            <Form
              onSubmit={submitAnswer}
              smallSubmit
              css={css`
                /* move save button closer to textarea */
                textarea {
                  margin-bottom: 0;
                }

                input[type="submit"] {
                  margin-top: 8px;
                }
              `}
            >
              <textarea
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                placeholder="Write your answer..."
                required
              />

              <div
                css={css`
                  margin-bottom: 16px;
                `}
              />

              <FileUpload address="question" doUpload={shouldUpload} uploadComplete={uploadAnswer}  />

              <input type="submit" value="Submit answer" />
            </Form>

            {isModerator?
            <>
            <h2
                  css={css`
                    font-size: 18px;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin-bottom: 16px;
                    line-height: 1.4;
                  `}
                >
                  All Answers
                </h2>
                <div
                  css={css`
                    display: grid;
                    grid-auto-rows: max-content;
                    grid-row-gap: 16px;
                  `}
                >
                  {allAnswers.map(answer => (
                    <div
                      key={answer.id}
                      css={css`
                        border: 1px solid var(--border);
                        padding: 16px;
                        border-radius: 8px;
                      `}
                    >
                      <p
                        css={css`
                          white-space: pre-wrap;
                          line-height: 1.5;
                          max-width: 512px;
                        `}
                      >
                        {answer.body}
                      </p>
                      
                      {answer.image? <img src = {answer.image} alt=""/>:""}

                      <button
                        css={css`
                          background-color: var(--text-secondary);
                          color: white;
                          padding: 3px 8px;
                          border-radius: 4px;
                          margin-top: 16px;
                          cursor: pointer;
                          font-size: 14px;
                          font-weight: 500;
                        `}
                        onClick={() => {
                          if(window.confirm("Are you sure you'd like to delete this answer?")) {
                            const db = firebase.firestore()

                            db.collection("questions").doc(id).collection("answers").doc(answer.id).delete()
                              .then(() => window.location.reload())
                          }
                        }}
                      >
                        Delete this answer
                      </button>
                      <button
                        css={css`
                          background-color: #d4af37;
                          color: white;
                          padding: 3px 8px;
                          border-radius: 4px;
                          margin-top: 16px;
                          cursor: pointer;
                          font-size: 14px;
                          font-weight: 500;
                          margin-left: 16px;
                        `}
                        onClick={() => {
                          if(window.confirm("Are you sure you want to make this the best answer?")) {
                            const db = firebase.firestore()

                            db.collection("questions").doc(id).update({
                              bestAnswer:answer.id
                            })
                              .then(() => window.location.reload())
                          }
                        }}
                      >
                        Make best answer
                      </button>
                    </div>
                  ))}
                </div>
              </>
            :""}

            {myAnswers.length > 0 && (
              <>
                <h2
                  css={css`
                    font-size: 18px;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin-bottom: 16px;
                    line-height: 1.4;
                  `}
                >
                  Your past answers: 
                </h2>

                <div
                  css={css`
                    display: grid;
                    grid-auto-rows: max-content;
                    grid-row-gap: 16px;
                  `}
                >
                  {myAnswers.map(answer => (
                    <div
                      key={answer.id}
                      css={css`
                        border: 1px solid var(--border);
                        padding: 16px;
                        border-radius: 8px;
                      `}
                    >
                      <p
                        css={css`
                          white-space: pre-wrap;
                          line-height: 1.5;
                          max-width: 512px;
                        `}
                      >
                        {answer.body}
                      </p>
                      
                      {answer.image? <img src = {answer.image} alt=""/>:""}

                      <button
                        css={css`
                          background-color: var(--text-secondary);
                          color: white;
                          padding: 3px 8px;
                          border-radius: 4px;
                          margin-top: 16px;
                          cursor: pointer;
                          font-size: 14px;
                          font-weight: 500;
                        `}
                        onClick={() => {
                          if(window.confirm("Are you sure you'd like to delete this answer?")) {
                            const db = firebase.firestore()

                            db.collection("questions").doc(id).collection("answers").doc(answer.id).delete()
                              .then(() => window.location.reload())
                          }
                        }}
                      >
                        Delete this answer
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </main>
    </>
  )
}