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
  const menus = useSelector((state) => state.menus.menuList)
  const loading = useSignal(false)
  const seed = useSignal(Math.random()) // try changing visible to its own signal instead

  useEffect(() => dispatch(menuActions.getUserMenus()), [dispatch])

  useEffect(() => {
    menus?.forEach((menu) => {
      menuListState.value = { ...menuListState.value, [menu.id]: menu }
    })
  }, [menus])

  function handleCreate() {
    const newMenu = {
      title: "Menu title",
      price: 10,
      visible: "hidden",
    }

    dispatch(menuActions.createMenu(newMenu)).then((res) => {
      menuListState.value = { ...menuListState.value, [res.id]: newMenu }
      dispatch(getAllSections(res.id))
      dispatch(menuActions.getMenuById(res.id))
    })
  }

  function handleVis(id) {
    const vis = menuListState.value[id]?.visible
    if (vis === "visible") {
      menuListState.value[id].visible = "hidden"
    }
    if (vis === "hidden") {
      menuListState.value[id].visible = "visible"
    }
    dispatch(menuActions.editMenuById(id, menuListState.value[id]))
    seed.value = Math.random()
  }

  return (
    <div className="gen-container">
      <div className="sidebar-container">
        <h3>MENUS</h3>
        {loading.value && "Loading menus"}
        {!loading.value &&
          Object.values(menuListState.value) &&
          Object.values(menuListState.value)?.map((menu, idx) => {
            return (
              <div className="sidebar-item" key={Math.random()}>
                <span className="title">{menu.title}</span>
                <button
                  onClick={() => {
                    dispatch(getAllSections(menu.id))
                    dispatch(menuActions.getMenuById(menu.id))
                  }}
                >
                  edit
                </button>
                <Visible
                  key={seed.value}
                  id={menu.id}
                  vis={menuListState.value[menu.id]?.visible === "visible"}
                  handleVis={handleVis}
                />
              </div>
            )
          })}
        <div className="sidebar-controls">
          <button onClick={handleCreate}>New menu</button>
          <button onClick={() => dispatch(logout())}>Log out</button>
        </div>
      </div>
      <div className="menu-container">
        <Menu />
      </div>
    </div>
  )
}
