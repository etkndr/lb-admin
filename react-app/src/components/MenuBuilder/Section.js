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
    if (section?.price) {
      price.value = section?.price
    }
    if (section?.choice_desc) {
      choiceDesc.valu = section?.choice_desc
    }
  }, [section])

  return (
    <>
      <div>
        <input
          className="section-choice"
          placeholder="Optional description for section (e.g. 'Pick one of the following:'"
          defaultValue={choiceDesc.value}
          onChange={(e) => {
            choiceDesc.value = e.target.value
            saveList.value.sections[section.id] = section
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
          defaultValue={price.value}
          onChange={(e) => {
            price.value = e.target.value > 0 ? e.target.value : false
            saveList.value.sections[section.id] = section
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
