import { signal, effect, useSignal } from "@preact/signals-react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import * as menuActions from "../../store/menu"
import BuildArea from "./BuildArea"
import { menuId } from "../../App"

export default function MenuBuilder({ menu }) {
  const dispatch = useDispatch()
  const menus = useSelector((state) => state.menus.menuList)
  const loading = useSignal(true)

  useEffect(() => {
    dispatch(menuActions.getUserMenus()).then(() => (loading.value = false))
  }, [dispatch])

  return (
    <div className="main-container">
      <div className="sidebar-container">
        <h3>MENUS</h3>
        {loading.value && "Loading menus"}
        {menus?.map((menu, idx) => {
          return (
            <li key={idx}>
              {menu.title}
              <button onClick={() => (menuId.value = menu.id)}>edit</button>
            </li>
          )
        })}
      </div>
      <div>
        <BuildArea menu={menu} />
      </div>
    </div>
  )
}
