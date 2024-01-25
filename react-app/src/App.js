import React, { useState, useEffect } from "react"
import { signal, useSignalEffect } from "@preact/signals-react"
import { useDispatch } from "react-redux"
import { Route, Switch } from "react-router-dom"
import LoginFormPage from "./components/LoginFormPage"
import { authenticate } from "./store/session"
import { getMenuById } from "./store/menu"
import Navigation from "./components/Navigation"
import MenuBuilder from "./components/MenuBuilder"

export const menuId = signal(null)

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true))
  }, [dispatch])

  useSignalEffect(() => {
    if (menuId.value) {
      dispatch(getMenuById(menuId.value))
    }
  })

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/">
            <MenuBuilder />
          </Route>
        </Switch>
      )}
    </>
  )
}

export default App
