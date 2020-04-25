import React, { useState } from "react"
import { css } from "@emotion/core"

export default ({ onSubmit, value="" }) => {
  const [query, setQuery] = useState(value)

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
        border-radius: 8px;
        overflow: hidden;

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
        `}
      />
    </form>
  )
}