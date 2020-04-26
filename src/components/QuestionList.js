import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"
import firebase from 'gatsby-plugin-firebase'


// a component that lists out all questions that have been asked
//sorted by most recent
export default () =>{
    const [questions, setQuestions] = useState([])
    //feteches the question data in realtime to get a list of all questions
    useEffect(() => {
        const db = firebase.firestore()
        const unsubscribe = db.collection("questions").orderBy('timestamp','desc').limit(25).onSnapshot(res=>{
            setQuestions(res.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
        //stops the page from updating when the user is not looking at it
        return () => unsubscribe()
    }, [])

    return(
        <div
            css={css`
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
                grid-column-gap: 32px;
                grid-row-gap: 32px;

                @media (max-width: 400px) {
                    grid-template-columns: 1fr;
                }
            `}
        >
            {questions.map(question => 
                <Link
                    key={question.id}
                    to={`/question/${question.id}`}
                    css={css`
                        text-decoration: none;
                    `}
                >
                    <div
                        css={css`
                            padding: 24px;
                            border-radius: 8px;
                            background-color: white;
                            box-shadow: var(--box-shadow-mini);
                            height: 100%;
                        `}
                    >
                        <p
                            css={css`
                                font-size: 20px;
                                font-weight: 700;
                                letter-spacing: -.5px;
                                color: var(--text-primary);
                                line-height: 1.3;
                            `}
                        >
                            {question.title}
                        </p>
                    </div>
                </Link>
            )}
        </div>
    )
}