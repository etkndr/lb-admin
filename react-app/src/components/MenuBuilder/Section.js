import Popup from "reactjs-popup"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useSignal, useSignalEffect } from "@preact/signals-react"
import { editSection, deleteSection } from "../../store/features/sectionsSlice"
import { fetchSectionItems, createItem } from "../../store/features/itemsSlice"
import Item from "./Item"

export default function Section({ sectionId }) {
  const dispatch = useDispatch()
  const section = useSelector(
    (state) => state.sectionsSlice.sectionList[sectionId]
  )
  const items = useSelector((state) => state.itemsSlice[sectionId])
  const price = useSignal(null)
  const choiceDesc = useSignal(null)
  const sectionChanges = useSignal(null)

  useEffect(() => {
    dispatch(fetchSectionItems(sectionId))
    sectionChanges.value = section
    price.value = section?.price || ""
    choiceDesc.value = section?.choice_desc || ""
  }, [sectionId, dispatch])

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

  function handleDragEnd(event) {
    const { active, over } = event
    if (active.id !== over.id) {
      setItemList((itemList) => {
        const oldIndex = itemList.indexOf(active.id)
        const newIndex = itemList.indexOf(over.id)

        return arrayMove(itemList, oldIndex, newIndex)
      })
    }
  }

  return (
    <>
      <div>
        <div className="delete-section">
          <Popup
            trigger={(open) => (
              <span
                className="material-symbols-outlined"
                onClick={() => {
                  if (window.confirm(`Delete section?`)) {
                    dispatch(deleteSection(section?.id))
                  }
                }}
              >
                close
              </span>
            )}
            position={"right center"}
            on={"hover"}
            closeOnDocumentClick
          >
            <span>Delete section</span>
          </Popup>
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
        Object.values(items)?.map((item, idx) => {
          return (
            <div className="item" key={item.id}>
              <Item sectionId={section?.id} itemId={item.id} />
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
