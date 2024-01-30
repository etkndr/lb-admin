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
    const state = menuState.value

    switch (type) {
      case "section-edit":
        obj.choice_desc = "Pick one"
        list.sections[id] = obj
        dispatch(sectionActions.editSectionById(id, obj)).then(() =>
          dispatch(getMenuById(menuId))
        )
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
