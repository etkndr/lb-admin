import { useSignal } from "@preact/signals-react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import * as menuActions from "../../store/menu"
import BuildArea from "./BuildArea"
import { menuId } from "../../App"

export default function MenuBuilder() {
  const dispatch = useDispatch()
  const menus = useSelector((state) => state.menus.menuList)
  const loading = useSignal(true)

  useEffect(() => {
    dispatch(menuActions.getUserMenus()).then(() => (loading.value = false))
  }, [dispatch])

  function handleVis(menu, vis) {
    const menuEdit = { ...menu }
    if (!vis) {
      menuEdit.visible = "hidden"
    }
    if (vis) {
      menuEdit.visible = "visible"
    }
    dispatch(menuActions.editMenuById(menu.id, menuEdit))
    console.log(vis)
  }

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
              <input
                type="checkbox"
                checked={menu.visible === "visible" ? true : false}
                onChange={(e) => handleVis(menu, e.target.checked)}
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
