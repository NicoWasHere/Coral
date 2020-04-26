import React from "react"
import { css } from "@emotion/core"

import Head from "../components/Head"
import QuestionList from "../components/QuestionList"
import Welcome from "../components/Welcome"
import Nav from "../components/Nav"

import useUser from "../hooks/useUser"

//homepage
export default () => {
  const user = useUser()

  return (
    <>
      <Head title="Home" />

      <Nav tinted />

      {user ? (
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr max-content;
            margin-bottom: 32px;
            align-items: center;
          `}
        >
          <p
            css={css`
              font-size: 18px;
              font-weight: 600;
            `}
          >
            Welcome back, {user.displayName}.
          </p>
        </div>
      ) : (
        <Welcome />
      )}
      <QuestionList/>
    </>
  )
}