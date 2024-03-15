import { useSignal, signal, useSignalEffect } from "@preact/signals-react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { menuId, menuListState } from "../../App"
import { logout } from "../../store/session"
import { getAllSections } from "../../store/section"
import * as menuActions from "../../store/menu"
import "../../sass/main.scss"
import Menu from "./Menu"
import Visible from "./Visible"

export default function MenuBuilder() {
  const dispatch = useDispatch()
  const menus = useSelector((state) => state.menus)
  const loading = useSignal(false)
  const seed = useSignal(Math.random()) // try changing visible to its own signal instead

  useEffect(() => dispatch(menuActions.getUserMenus()), [dispatch])

  useEffect(() => {
    if (menus) {
      Object.values(menus).forEach((menu) => {
        menuListState.value = { ...menuListState.value, [menu.id]: menu }
      })
    }
  }, [menus])

  function handleCreate() {
    const newMenu = {
      title: "Menu title",
      price: 10,
      visible: "hidden",
    }

    dispatch(menuActions.createMenu(newMenu)).then((res) => {
      menuListState.value = { ...menuListState.value, [res.id]: res }
      dispatch(getAllSections(res.id))
      dispatch(menuActions.getMenuById(res.id))
    })
  }

  function handleDelete(id) {
    dispatch(menuActions.deleteMenuById(id))
  }

  function handleVis(id) {
    const menu = menuListState.value[id]
    const vis = menu?.visible
    if (window.confirm(`Change status of menu '${menu.title}'?`)) {
      if (vis === "visible") {
        menuListState.value[id].visible = "hidden"
      }
      if (vis === "hidden") {
        menuListState.value[id].visible = "visible"
      }
      dispatch(menuActions.editMenuById(id, menuListState.value[id]))
      seed.value = Math.random()
    }
  }

  console.log("MEN", menus)

  return (
    <div className="main-container">
      <div className="sidebar-container">
        <h3>MENUS</h3>
        {loading.value && "Loading menus"}
        {!loading.value &&
          Object.values(menus) &&
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
                  <Visible
                    key={seed.value}
                    id={menu.id}
                    vis={menuListState.value[menu.id]?.visible === "visible"}
                    handleVis={handleVis}
                  />
                  <span
                    className="material-symbols-outlined"
                    onClick={() => {
                      dispatch(getAllSections(menu.id))
                      dispatch(menuActions.getMenuById(menu.id))
                    }}
                  >
                    edit
                  </span>
                  <span
                    className="material-symbols-outlined"
                    onClick={() => {
                      handleDelete(menu.id)
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
