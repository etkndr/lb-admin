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
export const saveList = signal({
  menu: false,
  sections: {},
  items: {},
  descs: {},
})

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
