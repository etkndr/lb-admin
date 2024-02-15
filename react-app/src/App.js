import React, { useState, useEffect } from "react"
import { signal, useSignalEffect } from "@preact/signals-react"
import { useDispatch, useSelector } from "react-redux"
import LoginFormPage from "./components/LoginFormPage"
import { authenticate } from "./store/session"
import { getMenuById } from "./store/menu"
import MenuBuilder from "./components/MenuBuilder"

export const menuId = signal(null)
export const menuState = signal(null)
export const menuListState = signal({})
export const allLoaded = {
  // Check if sections, items, and descs have been fetched
  sections: signal(false),
  items: signal(false),
  descs: signal(false),
}
export const newList = {
  // List of data for POST requests
  sections: signal(null),
  items: signal(null),
  descs: signal(null),
}
export const saveList = {
  // List of data for PUT requests
  menu: signal(false),
  sections: signal(null),
  items: signal(null),
  descs: signal(null),
}

export let newSections = {}
export let newItems = {}
export let newDescs = {}

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const user = useSelector((state) => state.session.user)

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true))
  }, [dispatch])

  return (
    <>
      {isLoaded && !user && <LoginFormPage />}
      {isLoaded && user && <MenuBuilder />}
    </>
  )
}

export default App
