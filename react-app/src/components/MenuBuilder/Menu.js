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
} from "../../store/features/sectionsSlice"
import Section from "./Section"
import Unsaved from "./Unsaved"

export default function Menu() {
  const dispatch = useDispatch()
  const menu = useSelector((state) => state.menusSlice.currMenu)
  const sections = useSelector((state) => state.sectionsSlice.sectionList)
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
      menu_id: menu.id,
      choice_desc: "",
      price: "",
    }
    dispatch(createSection(section))
  }

  function handleSave() {
    saving.value = true // Used for displaying "Saving..." text

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
                    <Section section={section.id} />
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
