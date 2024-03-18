import { useSignal, signal, useSignalEffect } from "@preact/signals-react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { menuId, menuListState } from "../../App"
import { logout } from "../../store/session"
import { getAllSections } from "../../store/section"
import * as menuActions from "../../store/menu"
import {
  fetchUserMenus,
  menuSelected,
  createMenu,
  deleteMenu,
  editMenu,
} from "../../store/features/menusSlice"
import "../../sass/main.scss"
import Menu from "./Menu"
import Visible from "./Visible"

export default function MenuBuilder() {
  const dispatch = useDispatch()
  const menus = useSelector((state) => state.menusSlice.menuList)
  const menu = useSelector((state) => state.menusSlice.currMenu)
  const status = useSelector((state) => state.menusSlice.status)
  const loading = useSignal(false)
  const seed = useSignal(Math.random()) // try changing visible to its own signal instead

  useEffect(() => dispatch(fetchUserMenus()), [dispatch])

  function handleCreate() {
    const newMenu = {
      title: "Menu title",
      price: 10,
      visible: "hidden",
    }

    dispatch(createMenu(newMenu)).then((res) => menuSelected(res))
  }

  function handleVis(id) {
    const menu = { ...menus[id] }
    menu.visible === "hidden"
      ? (menu.visible = "visible")
      : (menu.visible = "hidden")
    if (window.confirm(`Change visibility of menu '${menu.title}'?`)) {
      dispatch(editMenu(menu))
    }
  }

  return (
    <div className="main-container">
      <div className="sidebar-container">
        <h3>MENUS</h3>
        {loading.value && "Loading menus"}
        {!loading.value &&
          menus &&
          Object.values(menus)?.map((menu, idx) => {
            return (
              <div
                className={
                  idx !== Object.values(menus).length - 1
                    ? "sidebar-item"
                    : "sidebar-item-last"
                }
                key={Math.random()}
              >
                <div className="sidebar-title">{menu.title}</div>
                <div className="sidebar-buttons">
                  <span
                    className="material-symbols-outlined"
                    onClick={() => handleVis(menu.id)}
                  >
                    {menu.visible === "hidden"
                      ? "visibility_off"
                      : "visibility"}
                  </span>
                  <span
                    className="material-symbols-outlined"
                    onClick={() => {
                      dispatch(getAllSections(menu.id))
                      dispatch(menuSelected(menu))
                    }}
                  >
                    edit
                  </span>
                  <span
                    className="material-symbols-outlined"
                    onClick={() => {
                      dispatch(deleteMenu(menu.id))
                    }}
                  >
                    delete
                  </span>
                </div>
              </div>
            )
          })}
        <div className="sidebar-controls">
          <button onClick={handleCreate}>New menu</button>
          <div className="logout" onClick={() => dispatch(logout())}>
            Log out
          </div>
        </div>
      </div>
      <div className="menu-container">
        <Menu />
      </div>
    </div>
  )
}
