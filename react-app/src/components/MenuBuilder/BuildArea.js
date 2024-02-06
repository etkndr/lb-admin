import { useEffect } from "react"
import { useSignal } from "@preact/signals-react"
import { useDispatch, useSelector } from "react-redux"
import { saveList, newList } from "../../App"
import * as menuActions from "../../store/menu"
import * as sectionActions from "../../store/section"
import * as itemActions from "../../store/item"
import * as descActions from "../../store/desc"
import Add from "./Add"
import Section from "./Section"

export default function BuildArea() {
  const dispatch = useDispatch()
  const menu = useSelector((state) => state.menus.currMenu)
  const sections = useSelector((state) => state.sections.sectionList)

  const title = useSignal(null)
  const price = useSignal(null)
  const saving = useSignal(false)

  useEffect(() => {
    if (menu) {
      dispatch(sectionActions.getAllSections(menu?.id))
    }
    title.value = menu?.title
    price.value = menu?.price
  }, [menu])

  function saveChanges() {
    saving.value = true // Used for displaying "Saving..." text

    // Check for data in saveList and send PUT requests
    if (saveList.menu.value) {
      const changes = {
        id: menu?.id,
        title: title.value,
        price: price.value,
        visible: menu?.visible,
      }
      dispatch(menuActions.editMenuById(menu?.id, changes))
    }
    if (saveList.sections.value) {
      for (let sectionId in saveList.sections.value) {
        dispatch(
          sectionActions.editSectionById(
            sectionId,
            saveList.sections.value[sectionId]
          )
        )
      }
    }
    if (saveList.items.value) {
      for (let itemId in saveList.items.value) {
        dispatch(itemActions.editItemById(itemId, saveList.items.value[itemId]))
      }
    }
    if (saveList.descs.value) {
      for (let descId in saveList.descs.value) {
        dispatch(descActions.editDescById(descId, saveList.descs.value[descId]))
      }
    }

    saveList.menu.value = false
    saveList.sections.value = null
    saveList.items.value = null
    saveList.descs.value = null

    // Check for data in newList and send POST requests
    if (newList.sections.value) {
      console.log(newList.sections.value)
    }

    setTimeout(() => {
      saving.value = false
      dispatch(menuActions.getUserMenus())
    }, 500)
  }

  if (!menu) {
    return null
  }

  return (
    <>
      <div>
        <input
          className="menu-title"
          placeholder="Menu title"
          defaultValue={title.value}
          onChange={(e) => {
            title.value = e.target.value
            saveList.value.menu = true
          }}
        />
      </div>
      <div>
        {price.value && `($`}
        <input
          key={Math.random()}
          placeholder="Price per person"
          type="number"
          min={1}
          className="menu-price"
          defaultValue={price.value}
          onChange={(e) => {
            price.value = e.target.value
            saveList.value.menu = true
          }}
        />
        {price.value && `/person)`}
      </div>
      <div>
        {sections &&
          sections[menu?.id]?.map((section, idx) => {
            return (
              <div key={section.id}>
                <Section section={section} />
              </div>
            )
          })}
        {newList.sections.value &&
          Object.values(newList.sections.value)?.map((section, idx) => {
            return (
              <div key={idx}>
                <Section section={section} />
              </div>
            )
          })}
        <Add id={menu?.id} type={"section"} tooltip={"Create a new section"} />
      </div>
      <button onClick={saveChanges}>save</button>
      {saving.value && "Saving changes.."}
    </>
  )
}
