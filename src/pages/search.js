import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

import Head from "../components/Head"
import Nav from "../components/Nav"
import SearchBar from "../components/SearchBar"

import useSearch from "../hooks/useSearch"

export default ({ location }) => {
  const queryStringQuery = decodeURIComponent(location.search.replace("?q=", ""))

  const [query, setQuery] = useState(queryStringQuery)

  const results = useSearch(query)

  const searchFor = term => {
    setQuery(term)
  }

  useEffect(() => {
    searchFor(query)
  }, [])

  return (
    <>
      <Head title="Search" />

      <Nav noSearch />

      <SearchBar
        value={query}
        onSubmit={query => searchFor(query)}
      />

      {/* spacer between search bar and results list */}
      <div
        css={css`
          margin-bottom: 24px;
        `}
      />

      <div
        css={css`
          display: grid;
          grid-auto-rows: max-content;
          grid-row-gap: 16px;
        `}
      >
        {results.length === 0 && (
          <p
            css={css`
              font-weight: 500;
            `}
          >
            No results found.
          </p>
        )}

        {results.map(result => (
          <Link
            to={`/question/${result.id}`}
            key={result.id}
            css={css`
              text-decoration: none;
            `}
          >
            <div
              css={css`
                padding: 16px;
                background-color: white;
                border-radius: 8px;
              `}
            >
              <p
                css={css`
                  font-weight: 500;
                  color: var(--text-primary);
                `}
              >
                {result.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}