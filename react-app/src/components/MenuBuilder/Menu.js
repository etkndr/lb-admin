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
import Unsaved from "./Unsaved"

export default function Menu() {
  const dispatch = useDispatch()
  const menu = useSelector((state) => state.menus.currMenu)
  const sections = useSelector((state) => state.sections.sectionList)

  const title = useSignal(null)
  const price = useSignal(null)
  const saving = useSignal(false)

  const newSections = useSignal([])

  useEffect(() => {
    title.value = menu?.title
    price.value = menu?.price
  }, [menu, dispatch])

  function handleAdd() {
    const section = {
      new: true,
      menu_id: menu.id,
      choice_desc: "",
      price: "",
    }
    newSections.value = [...newSections.value, section]
  }

  function handleSave() {
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
    if (Object.keys(newList.sections)) {
      for (let sectionId in newList.sections) {
        const section = newList.sections[sectionId]
        dispatch(sectionActions.createSection(menu?.id, section))
      }
    }

    if (Object.keys(newList.items)) {
      for (let itemId in newList.items) {
        const item = newList.items[itemId]
        dispatch(itemActions.createItem(item.section_id, item))
      }
    }

    if (Object.keys(newList.descs)) {
      for (let descId in newList.descs) {
        const desc = newList.descs[descId]
        console.log(desc)
        dispatch(descActions.createDesc(desc.item_id, desc))
      }
    }

    newList.sections = {}
    newList.items = {}
    newList.descs = {}

    setTimeout(() => {
      saving.value = false
      dispatch(menuActions.getUserMenus())
    }, 500)
  }

  if (!menu) {
    return null
  }

  return (
    <div className="menu">
      <div className="menu-header">
        <input
          className="menu-title"
          type="text"
          placeholder="Menu title"
          defaultValue={title.value}
          onChange={(e) => {
            title.value = e.target.value
            saveList.menu.value = true
          }}
        />

        <div className="price">
          {price.value && `($`}
          <input
            placeholder="Price per person"
            type="number"
            min={1}
            className="menu-price"
            defaultValue={price.value}
            onChange={(e) => {
              price.value = e.target.value
              saveList.menu.value = true
            }}
          />
          {price.value && `/person)`}
        </div>
      </div>

      <div>
        {!sections && null}
        {sections &&
          sections[menu?.id]?.map((section, idx) => {
            return (
              <div key={`container${section.id}`}>
                <div className="section" key={section.id}>
                  <Section section={section} />
                </div>
                <button className="add-section" onClick={handleAdd}>
                  + section
                </button>
              </div>
            )
          })}

        {newSections.value.map((section, idx) => {
          return (
            <div key={`container${section.id}`}>
              <div className="section" key={idx}>
                <Section section={section} tempId={idx} />
                <button className="add-section" onClick={handleAdd}>
                  + section
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <Unsaved saving={saving.value} />

      <button onClick={handleSave}>save</button>
      {saving.value && "Saving changes.."}
    </div>
  )
}