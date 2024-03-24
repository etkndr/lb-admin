import { useSignal } from "@preact/signals-react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { logout } from "../../store/session"
import {
  fetchUserMenus,
  menuSelected,
  createMenu,
  deleteMenu,
  editMenu,
} from "../../store/features/menus"
import { clearChanges } from "../../store/features/saveSlice"
import "../../sass/main.scss"
import Menu from "./Menu"

export default function MenuBuilder() {
  const dispatch = useDispatch()
  const menus = useSelector((state) => state.menusSlice.menuList)
  const loading = useSignal(false)

  useEffect(() => dispatch(fetchUserMenus()), [dispatch])

  function handleCreate() {
    const newMenu = {
      title: "Menu title",
      price: 10,
      visible: "hidden",
    }

    dispatch(createMenu(newMenu))
  }

  function handleVis(id) {
    const menu = { ...menus[id] }
    menu.visible === "hidden"
      ? (menu.visible = "visible")
      : (menu.visible = "hidden")

    dispatch(editMenu(menu))
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
                      dispatch(clearChanges())
                      dispatch(menuSelected(menu))
                    }}
                  >
                    edit
                  </span>
                  <span
                    className="material-symbols-outlined"
                    onClick={() => {
                      if (window.confirm(`Delete menu '${menu.title}'?`)) {
                        dispatch(deleteMenu(menu.id))
                      }
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
