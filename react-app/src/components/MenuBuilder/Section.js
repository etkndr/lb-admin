import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useSignal } from "@preact/signals-react"
import { getAllItems } from "../../store/item"
import { saveList } from "../../App"
import Item from "./Item"
import Add from "./Add"

export default function Section({ section }) {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.items.itemList)
  const price = useSignal(null)
  const choiceDesc = useSignal(null)

  useEffect(() => {
    dispatch(getAllItems(section?.id))
    price.value = section?.price
    choiceDesc.value = section?.choice_desc
  }, [section])

  return (
    <>
      <div key={`section${section.id}`}>
        {!choiceDesc.value && (
          <Add
            id={section.id}
            type={"section-choice"}
            obj={section}
            tooltip={"Add description for section, e.g. 'Pick one'"}
          />
        )}
        {choiceDesc.value && (
          <div key={`section-choice${section.id}`}>
            <input
              key={Math.random()}
              className="section-choice"
              defaultValue={choiceDesc.value}
              onChange={(e) => {
                choiceDesc.value = e.target.value
                saveList.value.sections[section.id] = section
              }}
            />
          </div>
        )}
        {!price.value && (
          <Add
            id={section.id}
            type={"section-price"}
            obj={section}
            tooltip={"Add extra price per person for this section"}
          />
        )}
        {price.value && (
          <div key={`section-price${section?.id}`}>
            (+$
            <input
              key={Math.random()}
              className="section-price"
              defaultValue={price.value}
              onChange={(e) => {
                price.value = e.target.value > 0 ? e.target.value : ""
                saveList.value.sections[section.id] = section
              }}
            />
            /person)
          </div>
        )}
      </div>
      {items?.map((item, idx) => {
        return (
          <div key={item.id}>
            <Item item={item} />
          </div>
        )
      })}
      <Add id={section.id} type={"item"} tooltip={"Add item to this section"} />
      <h1>. . .</h1>
    </>
  )
}
