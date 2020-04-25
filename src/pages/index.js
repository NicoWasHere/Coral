import React from "react"

import Head from "../components/Head"
import Logout from "../components/Logout"
import QuestionList from "../components/QuestionList"
import Welcome from "../components/Welcome"
import Nav from "../components/Nav"

import useUser from "../hooks/useUser"
import useSearch from "../hooks/useSearch"

//homepage
export default () => {
  const user = useUser()

  return (
    <>
      <Head title="Home" />

      <Nav />

      {user ? (
        <>
          <div>Hello, {user.displayName}</div>
          <Logout />
        </>
      ) : (
        <Welcome />
      )}
      <QuestionList/>
    </>
  )
}