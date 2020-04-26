import React, { useState } from "react"
import { css, Global } from "@emotion/core"
import { Link } from "gatsby"

import Form from "../components/Form"

// Abstracted component for sign in and sign up pages. 
// prop `onSubmit` runs when the form submits 
export default ({ heading, submit, bottom, onSubmit }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const internalOnSubmit = e => {
    e.preventDefault()
    onSubmit(email, password)
  }

  return (
    <>
      <Global
        styles={css`
          body {
            /* visually centers body contents */
            min-height: calc(85vh - calc(2 * var(--body-padding)));
            display: grid;
            place-items: center center;
          }
        `}
      />
      <Link to={'/'} css={css`color: var(--text-primary);
          font-weight: 700;
          font-size: 30px;
          display: block;
          text-decoration: none;
          text-align:center;
          margin-bottom: 16px;
          `}>
            <span role="img" aria-label="" css={css`
              font-size: inherit;
            `}>
              🐠
            </span> Coral
          </Link>
      <div
        css={css`
          background-color: white;
          padding: 32px;
          border-radius: 8px;
          width: 550px;

          @media (max-width: 600px) {
            width: 100%;
          }

          box-shadow: var(--box-shadow);
        `}
      >
        <h1
          css={css`
            font-size: 24px;
            font-weight: 700;
            text-align: center;
            color: var(--text-primary);
            letter-spacing: -.5px;
            margin-bottom: 32px;
          `}
        >
          {heading}
        </h1>

        <Form onSubmit={internalOnSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="carole@bigcatrescue.org"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password'"
            placeholder={"•".repeat(12)}
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            />

          <input type="submit" value={submit} />
        </Form>
      </div>
      <p css = {css`
      text-align:center;
      margin-top:15px
      `}><Link to={bottom.url}>{bottom.text}</Link></p>
    </>
  )
}