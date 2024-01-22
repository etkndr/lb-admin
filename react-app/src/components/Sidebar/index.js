import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import * as menuActions from "../../store/menu"

export default function Sidebar() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user)
  const menus = useSelector((state) => state.menus.menuList)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(menuActions.getUserMenus()).then(() => setLoading(false))
  }, [])

  if (loading) {
    return "Loading menus"
  }

  return (
    <>
      <h3>MENUS</h3>
      {menus?.map((menu, idx) => {
        return <li key={idx}>{menu.title}</li>
      })}
    </>
  )
}
