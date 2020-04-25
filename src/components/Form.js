import React from "react"
import { css } from "@emotion/core"

//a basic component that allows all forms to be styled the same way
export default props => {
  return (
    <form
      {...props}
      css={css`
        input {
          width: 100%;
          padding: 8px;
          border: 1px solid var(--border);
          border-radius: 4px;
          margin-bottom: 16px;
          color: var(--text-primary);
        }

        input::placeholder {
          color: var(--text-secondary);
        }

        input:focus {
          outline: none;
          border-color: var(--border-focus);
          box-shadow: 0 0 0 3px var(--input-shadow);
        }

        input[type="submit"] {
          background-color: var(--accent);
          border-color: var(--accent);
          font-weight: 600;
          color: white;
          margin-top: 16px;
          cursor: pointer;
        }

        input[type="submit"]:focus {
          box-shadow: none;
        }

        label {
          font-weight: 500;
          margin-bottom: 4px;
          display: block;
        }
      `}
    >
      {props.children}
    </form>
  )
}