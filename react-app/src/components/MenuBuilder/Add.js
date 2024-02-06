import { menuId, newList } from "../../App"
import { useDispatch } from "react-redux"
import { getMenuById } from "../../store/menu"
import * as sectionActions from "../../store/section"
import * as itemActions from "../../store/item"
import * as descActions from "../../store/desc"

export default function Add({ parent, id, type, obj, tooltip }) {
  const dispatch = useDispatch()

  function handleAdd() {
    const list = newList

    switch (type) {
      case "section":
        const section = {
          new: true,
          menu_id: id,
          choice_desc: "",
          price: "",
        }
        console.log(id)
        list.sections.value = { ...list.sections.value, [id]: section }
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
