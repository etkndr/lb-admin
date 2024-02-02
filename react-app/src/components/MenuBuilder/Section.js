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
  const sectionChange = useSignal(null)

  useEffect(() => {
    if (section) {
      dispatch(getAllItems(section?.id))
      price.value = section?.price
      sectionChange.value = section
    }
  }, [section])

  return (
    <>
      <div>
        <input
          className="section-choice"
          placeholder="Optional description for section (e.g. 'Pick one of the following:'"
          defaultValue={section?.choice_desc}
          onChange={(e) => {
            choiceDesc.value = e.target.value
            sectionChange.value = {
              ...sectionChange.value,
              choice_desc: choiceDesc.value,
            }
            saveList.sections.value = {
              ...saveList.sections.value,
              [section?.id]: sectionChange,
            }
          }}
        />
      </div>
      <div>
        {price.value && `(+$`}
        <input
          className="section-price"
          placeholder="Optional additional price per person for items in this section"
          type="number"
          min={0.25}
          defaultValue={section?.price}
          onChange={(e) => {
            price.value = e.target.value > 0 ? e.target.value : false
            sectionChange.value = {
              ...sectionChange.value,
              price: price.value,
            }
            saveList.sections.value = {
              ...saveList.sections.value,
              [section?.id]: sectionChange,
            }
          }}
        />
        {price.value && `/person)`}
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
