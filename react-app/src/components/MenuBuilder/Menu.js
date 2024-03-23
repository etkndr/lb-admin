import { useEffect } from "react"
import { useSignal } from "@preact/signals-react"
import { useDispatch, useSelector } from "react-redux"
import { saveList, newList } from "../../App"
import * as menuActions from "../../store/menu"
import * as sectionActions from "../../store/section"
import * as itemActions from "../../store/item"
import * as descActions from "../../store/desc"
import { editMenu } from "../../store/features/menus"
import {
  fetchMenuSections,
  createSection,
  sectionChanged,
  newSectionCleared,
} from "../../store/features/sectionsSlice"
import Section from "./Section"
import Unsaved from "./Unsaved"

export default function Menu() {
  const dispatch = useDispatch()
  const menu = useSelector((state) => state.menusSlice.currMenu)
  const sections = useSelector((state) => state.sectionsSlice.sectionList)
  const newSections = useSelector((state) => state.sectionsSlice.newList)
  const title = useSignal(null)
  const price = useSignal(null)
  const saving = useSignal(false)

  useEffect(() => {
    title.value = menu?.title
    price.value = menu?.price

    if (menu) dispatch(fetchMenuSections(menu.id))
  }, [menu?.id, dispatch])

  function handleAdd() {
    const section = {
      id: Object.keys(newSections).length + 1,
      new: true,
      menu_id: menu.id,
      choice_desc: "",
      price: "",
    }
    dispatch(sectionChanged(section))
  }

  function handleSave() {
    saving.value = true // Used for displaying "Saving..." text

    for (let section of Object.values(newSections)) {
      dispatch(createSection(menu.id, section)).then(() => {
        dispatch(newSectionCleared(section.id))
      })
    }

    // // Check for data in  and send PUT requests
    // if (.menu.value) {
    //   const changes = {
    //     id: menu?.id,
    //     title: title.value,
    //     price: price.value,
    //     visible: menu?.visible,
    //   }
    //   dispatch(editMenu(changes))
    // }
    // if (saveList.sections.value) {
    //   for (let sectionId in saveList.sections.value) {
    //     dispatch(
    //       sectionActions.editSectionById(
    //         sectionId,
    //         saveList.sections.value[sectionId]
    //       )
    //     )
    //   }
    // }
    // if (saveList.items.value) {
    //   for (let itemId in saveList.items.value) {
    //     dispatch(itemActions.editItemById(itemId, saveList.items.value[itemId]))
    //   }
    // }
    // if (saveList.descs.value) {
    //   for (let descId in saveList.descs.value) {
    //     dispatch(descActions.editDescById(descId, saveList.descs.value[descId]))
    //   }
    // }

    // saveList.menu.value = false
    // saveList.sections.value = null
    // saveList.items.value = null
    // saveList.descs.value = null

    // // Check for data in newList and send POST requests
    // if (Object.keys(newList.sections)) {
    //   for (let sectionId in newList.sections) {
    //     const section = newList.sections[sectionId]
    //     dispatch(createSection(menu?.id, section))
    //   }
    // }

    // if (Object.keys(newList.items)) {
    //   for (let itemId in newList.items) {
    //     const item = newList.items[itemId]
    //     dispatch(itemActions.createItem(item.section_id, item))
    //   }
    // }

    // if (Object.keys(newList.descs)) {
    //   for (let descId in newList.descs) {
    //     const desc = newList.descs[descId]
    //     dispatch(descActions.createDesc(desc.item_id, desc))
    //   }
    // }

    // newList.sections = {}
    // newList.items = {}
    // newList.descs = {}

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
      <div className="save" onClick={handleSave}>
        {!saving.value && (
          <span className="material-symbols-outlined">save</span>
        )}
        {saving.value && (
          <span className="material-symbols-outlined">check_circle</span>
        )}
      </div>
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
            Object.values(sections)?.map((section, idx) => {
              return (
                <div className="gen-container" key={`container${section.id}`}>
                  <div className="section" key={section.id}>
                    <Section section={section} />
                  </div>
                  {/* <button className="add" onClick={handleAdd}>
                  + section
                </button> */}
                </div>
              )
            })}

          {newSections &&
            Object.values(newSections)?.map((section, idx) => {
              return (
                <div className="gen-container" key={`container${section.id}`}>
                  <div className="section" key={idx}>
                    <Section section={section} tempId={idx} />
                  </div>
                  {/* <button className="add" onClick={handleAdd}>
                + section
              </button> */}
                </div>
              )
            })}
          <div className="gen-container">
            <button className="add" onClick={handleAdd}>
              + section
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
