import { menuId, newList, newSections, newItems, newDescs } from "../../App"
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
        const tempSectionId = newList.sections.value
          ? Object.keys(newList.sections.value).length + 1
          : 1

        const section = {
          new: true,
          tempSectionId,
          menu_id: id,
          choice_desc: "",
          price: "",
        }
        if (!newSections[id]) {
          newSections[id] = [section]
        } else {
          newSections[id].push(section)
        }
        break
      case "item":
        const tempItemId = newList.items.value
          ? Object.keys(newList.items.value).length + 1
          : 1
        const item = {
          new: true,
          tempItemId,
          section_id: id,
          title: "",
          includes: "",
        }
        if (!newItems[id]) {
          newItems[id] = [item]
        } else {
          newItems[id].push(item)
        }
        break
      case "desc":
        const tempDescId = newList.descs.value
          ? Object.keys(newList.descs.value).length + 1
          : 1
        const desc = {
          new: true,
          tempDescId,
          item_id: id,
          body: "",
        }
        if (!newDescs[id]) {
          newDescs[id] = [desc]
        } else {
          newDescs[id].push(desc)
        }
        break
      default:
        return
    }
    console.log(newSections, newItems, newDescs)
  }

  return (
    <>
      <button onClick={handleAdd}>+{type}</button>
    </>
  )
}