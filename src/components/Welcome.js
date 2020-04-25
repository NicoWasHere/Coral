import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

export default () => {
  return (
    <div
      css={css`
        background-color: var(--background-tinted);
        padding: 24px;
        border: 1px solid var(--border);
        border-radius: 8px;
        margin-bottom: 32px;

        strong, p {
          margin-bottom: 16px;
          display: block;
        }

        p:last-of-type {
          margin-bottom: 0;
        }

        strong {
          font-weight: 600;
          color: var(--text-primary);
        }

        a {
          color: var(--accent);
          text-decoration: none;
          font-weight: 500;
        }
      `}
    >
      <strong>
        Welcome to Coral
      </strong>

      <p>
        This is a LexHack project by Nico Anderberg and Ben Borgers. There should be more information here about what Coral is, but that'll come later.
      </p>

      <p>
        To submit questions and answer them, <Link to="/signup/">create an account</Link> or <Link to="/signin/">log back in</Link>.
      </p>
    </div>
  )
}