import React from "react"
import { navigate } from "gatsby"
import { Link } from "gatsby"
import { css } from "@emotion/core"

import SearchBar from "./SearchBar"

import useUser from "../hooks/useUser"

export default ({ noSearch=false, constrainWidth=false, tinted=false }) => {
  const user = useUser()

  return (
    <nav
      css={css`
        display: grid;
        grid-template-columns: max-content minmax(0, 600px)${user ? "1fr repeat(2, max-content)" : ""};
        grid-column-gap: 32px;
        align-items: center;
        margin-bottom: 32px;

        @media (max-width: 800px) {
          display: block;

          .desktop {
            display: none;
          }

          .mobile {
            display: inline;
          }

          .logo {
            margin-bottom: 8px;
          }

          a:not(.logo) {
            display: inline-block;
            margin-right: 16px;
            margin-bottom: 4px;
          }
        }

        .mobile {
          display: none;
        }

        a:not(.logo) {
          color: var(--accent);
          font-weight: 500;
          text-decoration: none;
        }
        
        /* tinted = darker background color */
        ${tinted ? `
          background-color: var(--background-tinted-dark);
          box-shadow: 0 0 0 var(--body-padding) var(--background-tinted-dark);
          margin-bottom: 64px;
        ` : ""}
      `}
      className={constrainWidth ? "constrain-width" : ""}
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
          className="desktop"
        />
      : <div />}

      {user && (
        <>
          <div className="desktop" /> {/* for spacing between search bar and links */}
          <Link to="/search" className="mobile">Search</Link>
          <Link to="/new-question">New Question</Link>
          <Link to="/account">My Account</Link>
        </>
      )}
    </nav>
  )
}