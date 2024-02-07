import { useSignal, signal, useSignalEffect } from "@preact/signals-react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import BuildArea from "./BuildArea"
import { menuId, menuListState } from "../../App"
import { logout } from "../../store/session"
import * as menuActions from "../../store/menu"
import { getAllSections } from "../../store/section"

export default function MenuBuilder() {
  const dispatch = useDispatch()
  const menus = useSelector((state) => state.menus.menuList)
  const loading = useSignal(false)

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

    dispatch(menuActions.createMenu(newMenu)).then(
      (res) => (menuId.value = res.id)
    )
  }

  function handleVis(menu) {
    const vis = menuListState.value[menu.id]?.visible
    if (vis === "visible") {
      menuListState.value[menu.id].visible = "hidden"
    }
    if (vis === "hidden") {
      menuListState.value[menu.id].visible = "visible"
    }
    dispatch(menuActions.editMenuById(menu.id, menuListState.value[menu.id]))
  }

  return (
    <div className="main-container">
      <div className="sidebar-container">
        <h3>MENUS</h3>
        {loading.value && "Loading menus"}
        {!loading.value &&
          Object.values(menuListState.value) &&
          Object.values(menuListState.value)?.map((menu, idx) => {
            return (
              <li key={Math.random()}>
                {menu.title}
                <button
                  onClick={() => {
                    dispatch(getAllSections(menu.id))
                    dispatch(menuActions.getMenuById(menu.id))
                  }}
                >
                  edit
                </button>
                Published
                <input
                  key={Math.random()}
                  type="checkbox"
                  defaultChecked={menu.visible === "visible"}
                  onChange={(e) => handleVis(menu)}
                />
              </li>
            )
          })}
        <button onClick={handleCreate}>New menu</button>
        <button onClick={() => dispatch(logout())}>Log out</button>
      </div>
      <div>
        <BuildArea />
      </div>
    </div>
  )
}
