import { useSignal } from "@preact/signals-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editItem } from "../../store/features/itemsSlice"
import { getAllDescs } from "../../store/desc"
import Desc from "./Desc"

export default function Item({ item }) {
  const dispatch = useDispatch()
  const descs = useSelector((state) => state.descs.descList)
  const title = useSignal(null)
  const includes = useSignal(null)
  const itemChanges = useSignal(null)

  useEffect(() => {
    dispatch(getAllDescs(item.id))
    itemChanges.value = item
    title.value = item?.title || ""
    includes.value = item?.includes || ""
  }, [item, dispatch])

  function handleAdd() {
    const desc = {
      new: true,
      item_id: item.id,
      body: "",
    }
  }

  let autosave // variable only assigned on field change
  function handleChange() {
    itemChanges.value = {
      ...itemChanges.value,
      title: title.value,
      includes: includes.value,
    }

    clearTimeout(autosave) // reset timer

    autosave = setTimeout(() => {
      dispatch(
        editItem({ sectionId: item?.section_id, item: itemChanges.value })
      )
    }, 1000)
  }

  return (
    <>
      <div>
        <input
          className="item-title"
          type="text"
          placeholder="Item title"
          defaultValue={item?.title}
          onChange={(e) => {
            title.value = e.target.value
            handleChange()
          }}
        />
      </div>
      <div>
        <input
          className="item-includes"
          type="text"
          placeholder="Optional item sub-heading (e.g. 'Includes rolls')"
          defaultValue={item?.includes}
          onChange={(e) => {
            includes.value = e.target.value
            handleChange()
          }}
        />
      </div>
      {!descs && null}
      {descs &&
        descs[item?.id]?.map((desc, idx) => {
          return (
            <div className="desc" key={desc.id}>
              <Desc desc={desc} />
            </div>
          )
        })}

      <div className="gen-container">
        <button className="add" onClick={handleAdd}>
          + description
        </button>
      </div>
    </>
  )
}
