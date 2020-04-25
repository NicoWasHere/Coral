import React from "react"
import { css, Global } from "@emotion/core"
import { Helmet } from "react-helmet-async"

//a <head> component that controls the title and icon
//allows for a custom title variable as well
export default ({ title }) => {
  return (
    <>
      <Helmet>
        <title>{title || ""} - Coral</title>
        <link rel="icon" href="https://emojicdn.elk.sh/🐠" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Helmet>

      <Global
        styles={css`
          :root {
            --accent: hsl(4deg 95% 70%);

            --text-primary: hsl(208deg 39% 10%);
            --text-secondary: hsl(208deg 10% 40%);
            --text-tertiary: hsl(208deg, 10%, 60%);

            --border: hsl(208deg, 20%, 85%);
            --border-focus: hsl(208deg, 50%, 70%);
            --input-shadow: hsl(208deg, 80%, 95%); /* small shadow surrounding an input when it's focused */

            --background: hsl(208deg, 39%, 97%);
            --background-tinted: hsl(208deg, 50%, 95%);
            
            /* tons of overlapping box shadows so they look buttery smooth */
            --box-shadow:
              1px 2.8px 2.2px rgba(0, 0, 0, 0.008),
              2px 6.7px 5.3px rgba(0, 0, 0, 0.012),
              4px 12.5px 10px rgba(0, 0, 0, 0.015),
              8px 22.3px 17.9px rgba(0, 0, 0, 0.018),
              16px 41.8px 33.4px rgba(0, 0, 0, 0.022),
              32px 100px 80px rgba(0, 0, 0, 0.03);
            --box-shadow-mini:
            0.3px 0.3px 0.2px rgba(0, 0, 0, 0.006),
            0.6px 0.8px 0.5px rgba(0, 0, 0, 0.008),
            1.2px 1.5px 0.9px rgba(0, 0, 0, 0.01),
            2.4px 2.7px 1.6px rgba(0, 0, 0, 0.012),
            4.8px 5px 2.9px rgba(0, 0, 0, 0.014),
            9.6px 12px 7px rgba(0, 0, 0, 0.02);

            --body-padding: 32px;

            @media(max-width: 600px) {
              --body-padding: 16px;
            }
          }

          * {
            font-family: "Inter", sans-serif;
            color: var(--text-secondary);
            font-size: 16px;
            font-weight: 400;
            margin: 0;
            padding: 0;
            -webkit-appearance: none;
            border: none;
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          body {
            padding: var(--body-padding);
            background-color: var(--background);
          }

          ::selection {
            background-color: var(--border);
            color: var(--text-primary);
          }

          .page-heading {
            font-size: 24px;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 24px;
          }
        `}
      />
    </>
  )
}