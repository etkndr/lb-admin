import { useEffect } from "react"
import { useSignal } from "@preact/signals-react"
import { useDispatch, useSelector } from "react-redux"
import { saveList } from "../../App"
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
    // Dispatches any existing data from saveList
    saving.value = true
    const list = saveList.value
    if (list.menu) {
      const changes = {
        id: menu?.id,
        title: title.value,
        price: price.value,
        visible: menu?.visible,
      }
      dispatch(menuActions.editMenuById(menu?.id, changes))
    }
    if (Object.keys(list.sections).length) {
      for (let sectionId in list.sections) {
        dispatch(
          sectionActions.editSectionById(sectionId, list.sections[sectionId])
        )
      }
    }
    if (Object.keys(list.items).length) {
      for (let itemId in list.items) {
        dispatch(itemActions.editItemById(itemId, list.items[itemId]))
      }
    }
    if (Object.keys(list.descs).length) {
      for (let descId in list.descs) {
        dispatch(descActions.editDescById(descId, list.descs[descId]))
      }
    }
    saveList.value = {
      menu: false,
      sections: {},
      items: {},
      descs: {},
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
        {sections?.map((section, idx) => {
          return (
            <div key={section.id}>
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
