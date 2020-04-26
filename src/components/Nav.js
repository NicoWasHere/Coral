import React from "react"
import { navigate } from "gatsby"
import { Link } from "gatsby"
import { css } from "@emotion/core"

import SearchBar from "./SearchBar"

import useUser from "../hooks/useUser"

export default ({ noSearch=false }) => {
  const user = useUser()

  return (
    <nav
      css={css`
        display: grid;
        grid-template-columns: max-content minmax(0, 600px)${user ? "1fr repeat(2, max-content)" : ""};
        grid-column-gap: 32px;
        align-items: center;
        margin-bottom: 32px;

        a:not(.logo) {
          color: var(--accent);
          font-weight: 500;
          display: block;
        }
      `}
    >
      {/* logo in top left corner */}
      <Link
        to="/"
        css={css`
          font-size: 20px;
          display: block;
          text-decoration: none;

          * {
            font-size: inherit;
          }
        `}
        className="logo"
      >
        <span role="img" aria-label="">🐠</span>
        {" "}
        <span
          css={css`
            text-decoration: underline;
            text-decoration-color: var(--accent);
            font-weight: 700;
            color: var(--text-primary);
          `}
        >
         Coral
       </span>
      </Link>

      {!noSearch ?
        <SearchBar
          onSubmit={query => navigate(`/search?q=${encodeURIComponent(query)}`)}
        />
      : <div />}

      {user && (
        <>
          <div /> {/* for spacing between search bar and links */}
          <Link to="/new-question">New Question</Link>
          <Link to="/account">My Account</Link>
        </>
      )}
    </nav>
  )
}