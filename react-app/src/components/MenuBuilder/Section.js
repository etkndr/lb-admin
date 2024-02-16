import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useSignal, useSignalEffect } from "@preact/signals-react"
import { getAllItems } from "../../store/item"
import { saveList, newList, allLoaded } from "../../App"
import Item from "./Item"
import Add from "./Add"

export default function Section({ section }) {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.items.itemList)
  const price = useSignal(null)
  const choiceDesc = useSignal(null)
  const sectionChange = useSignal(null)

  const newItems = useSignal([])

  useEffect(() => {
    if (!section.new) {
      dispatch(getAllItems(section.id))
    }
  }, [section.id, dispatch])

  useEffect(() => {
    sectionChange.value = section
    price.value = section?.price || ""
    choiceDesc.value = section?.choice_desc || ""
  }, [section])

  function handleChange() {
    sectionChange.value = {
      ...sectionChange.value,
      choice_desc: choiceDesc.value,
      price: price.value,
    }
    if (section.new) {
      newList.sections.value = {
        ...newList.sections.value,
        [section?.tempSectionId]: sectionChange.value,
      }
    } else {
      saveList.sections.value = {
        ...saveList.sections.value,
        [section?.id]: sectionChange.value,
      }
    }
  }

  function handleAdd() {
    const item = {
      new: true,
      section_id: section.id,
      title: "",
      includes: "",
    }
    newItems.value = [...newItems.value, item]
  }

  return (
    <>
      <div>
        <input
          className="section-choice"
          placeholder="Optional description for section (e.g. 'Pick one of the following:'"
          defaultValue={section?.choice_desc}
          onChange={(e) => {
            choiceDesc.value = e.target.value
            handleChange()
          }}
        />
      </div>
      <div>
        {price.value && `(+$`}
        <input
          className="section-price"
          placeholder="Optional additional price per person for items in this section"
          type="number"
          min={1}
          defaultValue={section?.price}
          onChange={(e) => {
            price.value = e.target.value > 0 ? e.target.value : ""
            handleChange()
          }}
        />
        {price.value && `/person)`}
      </div>
      {!items && null}
      {items &&
        items[section?.id]?.map((item, idx) => {
          return (
            <div key={item.id}>
              <Item item={item} />
            </div>
          )
        })}
      {/* {section &&
        newItems[section.id] &&
        newItems[section.id].map((item, idx) => {
          return (
            <div key={idx}>
              <Item item={item} />
            </div>
          )
        })}
      <Add id={section.id} type={"item"} tooltip={"Add item to this section"} /> */}

      {newItems.value.map((item, idx) => {
        return (
          <div key={idx}>
            <Item item={item} />
          </div>
        )
      })}
      <button onClick={handleAdd}>+ item</button>
      <h1>. . .</h1>
    </>
  )
}