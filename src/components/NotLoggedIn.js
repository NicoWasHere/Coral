import React from "react"
import { Link } from "gatsby"
import { css,Global } from "@emotion/core"

import Head from "../components/Head"

export default () =>{
    return(
    <>
    <Head title="Not signed in" />
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

          span {
            font-size: inherit;
          }
          `}>
            <span role="img" aria-label="">🐠</span> Coral</Link>
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
        >You are not signed in to Coral</h1>
        <div
        css={css`
          display:flex;
          flex-direction: column;
          text-align: center;
          a {
            align-self:center;
            width: 80%;
            padding: 8px;
            border: 1px solid var(--border);
            border-radius: 4px;
            margin-bottom: 16px;
            color: var(--text-primary);
            background-color: var(--accent);
            border-color: var(--accent);
            font-weight: 600;
            color: white;
            margin-top: 16px;
            cursor: pointer;
            text-decoration:none;
          }
  
          a:focus {
            box-shadow: none;
          }
        `}
        >
        <Link to ={'/signin'}>Sign in</Link>
        <Link to ={'/signup'}>Create an account</Link>
        <Link to ={'/'}>Go to the homepage</Link>
        </div>
    </div>
    </>
    )
}