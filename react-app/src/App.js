import React, { useState, useEffect } from "react"
import { signal, useSignalEffect } from "@preact/signals-react"
import { useDispatch, useSelector } from "react-redux"
import { Route, Switch } from "react-router-dom"
import LoginFormPage from "./components/LoginFormPage"
import { authenticate } from "./store/session"
import { getMenuById } from "./store/menu"
import Navigation from "./components/Navigation"
import MenuBuilder from "./components/MenuBuilder"

export const menuId = signal(null)
export const menuState = signal(null)
export const menuListState = signal({})

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const user = useSelector((state) => state.session.user)

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
      {isLoaded && !user && <LoginFormPage />}
      {isLoaded && user && <MenuBuilder />}
    </>
  )
}

export default App
