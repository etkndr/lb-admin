import { menuId, newList } from "../../App"
import { useDispatch } from "react-redux"
import { getMenuById } from "../../store/menu"
import * as sectionActions from "../../store/section"
import * as itemActions from "../../store/item"
import * as descActions from "../../store/desc"

export default function Add({ parent, id, type, obj, tooltip }) {
  const dispatch = useDispatch()

  function handleAdd() {
    switch (type) {
      case "section":
        const tempId = newList.sections.value
          ? Object.keys(newList.sections.value).length + 1
          : 1

        const section = {
          new: true,
          tempId,
          menu_id: id,
          choice_desc: "",
          price: "",
        }
        newList.sections.value = {
          ...newList.sections.value,
          [tempId]: section,
        }
        break
      case "section-price":
        break
      case "item-edit":
        break
      case "item":
        break
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
