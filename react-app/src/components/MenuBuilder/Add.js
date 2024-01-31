import { menuId, menuState, saveList } from "../../App"
import { useDispatch } from "react-redux"
import { getMenuById } from "../../store/menu"
import * as sectionActions from "../../store/section"
import * as itemActions from "../../store/item"
import * as descActions from "../../store/desc"

export default function Add({ parent, id, type, obj, tooltip }) {
  const dispatch = useDispatch()

  function handleAdd() {
    const list = saveList.value

    switch (type) {
      case "section-choice":
        obj.choice_desc = "Pick one"
        list.sections[id] = obj
        menuState.value = { ...menuState.value, ["sections".id]: obj }
        break
      case "section-price":
        obj.price = 1
        list.sections[id] = obj
        menuState.value = { ...menuState.value, ["sections".id]: obj }
        break
      case "item-edit":
        obj.includes = "Includes..."
        list.items[id] = obj
        menuState.value = {
          ...menuState.value,
          [menuState.value.sections[parent].items[id]]: obj,
        }
      default:
        return
    }
  }

  return (
    <>
      <button onClick={handleAdd}>+</button>
    </>
  )
}
