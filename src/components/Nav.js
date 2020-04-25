import React from "react"
import { navigate } from "gatsby"
import { Link } from "gatsby"
import { css } from "@emotion/core"

import SearchBar from "../components/SearchBar"

export default ({ noSearch=false }) => {
  return (
    <nav
      css={css`
        display: grid;
        grid-template-columns: max-content minmax(0, 600px);
        grid-column-gap: 32px;
        align-items: center;
        margin-bottom: 32px;
      `}
    >
      {/* logo in top left corner */}
      <Link
        to="/"
        css={css`
          color: var(--text-primary);
          font-weight: 700;
          font-size: 20px;
          display: block;
          text-decoration-color: var(--accent);
        `}
      >
        Coral
      </Link>

      {!noSearch && 
        <SearchBar
          onSubmit={query => navigate(`/search?q=${encodeURIComponent(query)}`)}
        />
      }
    </nav>
  )
}