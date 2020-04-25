import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

export default () => {
  return (
    <nav
      css={css`
        display: grid;
        grid-template-columns: max-content minmax(0, 500px);
        grid-column-gap: 32px;
        align-items: center;
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

      {/* search bar */}
      <form
        css={css`
          background-color: white;
          box-shadow: var(--box-shadow-mini);
          border-radius: 8px;
          overflow: hidden;
        `}
      >
        <input
          css={css`
            padding: 12px 16px;
            width: 100%;
            color: var(--text-primary);
            font-weight: 500;

            :focus {
              outline: none;
            }
          `}
          placeholder="Search all questions..."
        />
      </form>
    </nav>
  )
}