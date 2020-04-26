import React, { useState } from "react"
import { css } from "@emotion/core"

export default ({ onSubmit, initialValue="" }) => {
  const [query, setQuery] = useState(initialValue)

  const internalOnSubmit = e => {
    e.preventDefault()

    if(query) {
      onSubmit(query)
    }
  }

  return (
    <form
      css={css`
        background-color: white;
        box-shadow: var(--box-shadow-mini);
        --border-radius: 8px; /* defines border radius in a variable for use by input and button */
        border-radius: var(--border-radius);

        display: grid;
        grid-template-columns: 1fr max-content;
        grid-column-gap: 16px;
      `}
      onSubmit={internalOnSubmit}
    >
      <input
        css={css`
          padding: 12px 16px;
          width: 100%;
          color: var(--text-primary);
          font-weight: 500;
          border-top-left-radius: var(--border-radius);
          border-bottom-left-radius: var(--border-radius);

          :focus {
            outline: none;
          }
        `}
        placeholder="Search all questions..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <input
        type="submit"
        value="Search"
        css={css`
          padding: 0 16px;
          background-color: var(--accent);
          color: white;
          font-weight: 600;
          outline: none;
          cursor: pointer;
          border-top-right-radius: var(--border-radius);
          border-bottom-right-radius: var(--border-radius);
        `}
      />
    </form>
  )
}