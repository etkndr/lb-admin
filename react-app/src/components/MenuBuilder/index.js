import { useSignal, signal, useSignalEffect } from "@preact/signals-react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import * as menuActions from "../../store/menu"
import BuildArea from "./BuildArea"
import { menuId } from "../../App"

export default function MenuBuilder() {
  const dispatch = useDispatch()
  const menus = useSelector((state) => state.menus.menuList)
  const loading = useSignal(true)
  const menuState = useSignal({})

  useEffect(() => {
    dispatch(menuActions.getUserMenus()).then(() => (loading.value = false))
  }, [dispatch])

  useEffect(() => {
    menus?.forEach((menu) => {
      menuState.value = { ...menuState.value, [menu.id]: menu }
    })
  }, [menus])

  function handleVis(menu) {
    const vis = menuState.value[menu.id].visible
    if (vis === "visible") {
      menuState.value[menu.id].visible = "hidden"
    }
    if (vis === "hidden") {
      menuState.value[menu.id].visible = "visible"
    }
    dispatch(menuActions.editMenuById(menu.id, menuState.value[menu.id]))
  }

  return (
    <div className="main-container">
      <div className="sidebar-container">
        <h3>MENUS</h3>
        {loading.value && "Loading menus"}
        {!loading.value &&
          menus?.map((menu, idx) => {
            return (
              <li key={idx}>
                {menu.title}
                <button onClick={() => (menuId.value = menu.id)}>edit</button>
                <input
                  key={Math.random()}
                  type="checkbox"
                  defaultChecked={
                    menuState.value[menu.id].visible === "visible"
                  }
                  onChange={(e) => handleVis(menu)}
                />
              </li>
            )
          })}
      </div>
      <div>
        <BuildArea />
      </div>
    </div>
  )
}
