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
} from "../../store/features/menusSlice"
import { clearChanges } from "../../store/features/saveSlice"
import "../../sass/main.scss"
import Menu from "./Menu"
import { clearDescs } from "../../store/features/descsSlice"
import Popup from "reactjs-popup"

export default function MenuBuilder() {
  const dispatch = useDispatch()
  const menus = useSelector((state) => state.menusSlice.menuList)
  const selected = useSelector((state) => state.menusSlice.currMenu)
  const loading = useSignal(false)

  useEffect(() => {
    dispatch(fetchUserMenus())
  }, [dispatch])

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
        <div className="sidebar-top">
          <h3>MENUS</h3>
          {loading.value && "Loading menus"}
          <div className="sidebar-items">
            {!loading.value &&
              menus &&
              Object.values(menus)?.map((menu, idx) => {
                return (
                  <div
                    className={
                      menu.id === selected?.id
                        ? "sidebar-item-selected"
                        : "sidebar-item"
                    }
                    key={Math.random()}
                  >
                    <div className="sidebar-title">{menu.title}</div>
                    <div className="sidebar-buttons">
                      <Popup
                        trigger={(open) => (
                          <span
                            className="material-symbols-outlined"
                            onClick={() => handleVis(menu.id)}
                          >
                            {menu.visible === "hidden"
                              ? "visibility_off"
                              : "visibility"}
                          </span>
                        )}
                        position={"right center"}
                        on={"hover"}
                        closeOnDocumentClick
                      >
                        <span>Change visibility</span>
                      </Popup>
                      <span
                        className="material-symbols-outlined"
                        onClick={() => {
                          dispatch(clearChanges())
                          dispatch(clearDescs())
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
            <Popup
              trigger={(open) => (
                <div className="new-menu" onClick={handleCreate}>
                  +
                </div>
              )}
              position={"right center"}
              on={"hover"}
              closeOnDocumentClick
            >
              <span>New menu</span>
            </Popup>
          </div>
        </div>
        <div className="sidebar-controls">
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
