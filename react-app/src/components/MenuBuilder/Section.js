import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useSignal, useSignalEffect } from "@preact/signals-react"
import { getAllItems } from "../../store/item"
import { editSection, deleteSection } from "../../store/features/sectionsSlice"
import Item from "./Item"

export default function Section({ section, tempId }) {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.items.itemList)
  const price = useSignal(null)
  const choiceDesc = useSignal(null)
  const sectionChanges = useSignal(null)

  useEffect(() => {
    if (!section.new) {
      dispatch(getAllItems(section.id))
    }
  }, [section.id, dispatch])

  useEffect(() => {
    sectionChanges.value = section
    price.value = section?.price || ""
    choiceDesc.value = section?.choice_desc || ""
  }, [section])

  function handleAdd() {
    const item = {
      new: true,
      section_id: section.id,
      title: "",
      includes: "",
    }
  }

  let autosave // variable only assigned on field change
  function handleChange() {
    sectionChanges.value = {
      ...sectionChanges.value,
      choice_desc: choiceDesc.value,
      price: price.value,
    }

    clearTimeout(autosave) // reset timer

    autosave = setTimeout(() => {
      dispatch(editSection(sectionChanges.value))
    }, 1000)
  }

  return (
    <>
      <div>
        <div className="delete-section">
          <span
            className="material-symbols-outlined"
            onClick={() => {
              if (window.confirm(`Delete section?`)) {
                dispatch(deleteSection(section.id))
              }
            }}
          >
            delete
          </span>
        </div>
        <div>
          <input
            className="section-header"
            type="text"
            placeholder="Optional description for section (e.g. 'Pick one of the following:')"
            defaultValue={section?.choice_desc}
            onChange={(e) => {
              choiceDesc.value = e.target.value
              handleChange()
            }}
          />
        </div>

        <div className="price">
          {price.value && `(+$`}
          <input
            className={price.value ? "section-price" : "price-empty"}
            placeholder="Optional additional price per person for items in this section"
            type={price.value ? "number" : "text"}
            min={1}
            defaultValue={section?.price}
            onChange={(e) => {
              price.value = e.target.value > 0 ? e.target.value : ""
              handleChange()
            }}
          />
          {price.value && `/person)`}
        </div>
      </div>

      {!items && null}

      {items &&
        items[section?.id]?.map((item, idx) => {
          return (
            <div className="item" key={item.id}>
              <Item item={item} />
            </div>
          )
        })}

      <div className="gen-container">
        <button className="add" onClick={handleAdd}>
          + item
        </button>
      </div>
    </>
  )
}
