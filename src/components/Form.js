import React from "react"
import { css } from "@emotion/core"

//a basic component that allows all forms to be styled the same way
export default ({ constrainWidth=false, smallSubmit=false, className, onSubmit, children }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={className} // enables us to use the `css` prop on the <Form> element and have it applied to this <form>
      css={css`
        ${constrainWidth === true ? `
          max-width: 640px;
        ` : ""}
      
        input, textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid var(--border);
          border-radius: 4px;
          margin-bottom: 16px;
          color: var(--text-primary);
        }

        textarea {
          min-height: 200px;
          resize: vertical;
          line-height: 1.5;
        }

        input::placeholder, textarea::placeholder {
          color: var(--text-tertiary);
        }

        input:focus, textarea:focus {
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

        input[type="submit"].focus-visible {
          outline: 1px dotted var(--accent);
          outline-offset: 2px;
        }

        label {
          font-weight: 500;
          margin-bottom: 4px;
          display: block;
        }

        ${smallSubmit ? `
          /* switch to grid layout in order to right-align submit button */
          display: grid;

          input[type="submit"] {
            width: max-content;
            margin-right: 0;
            margin-left: auto;
            align-self: end;
          }
        ` : ""}
      `}
    >
      {children}
    </form>
  )
}