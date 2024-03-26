import { useSignal } from "@preact/signals-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editItem, deleteItem } from "../../store/features/itemsSlice"
import { getAllDescs } from "../../store/desc"
import { fetchItemDescs } from "../../store/features/descsSlice"
import Desc from "./Desc"

export default function Item({ sectionId, itemId }) {
  const dispatch = useDispatch()
  const item = useSelector((state) => state.itemsSlice[sectionId][itemId])
  const descs = useSelector((state) => state.descsSlice.descList)
  const title = useSignal(null)
  const includes = useSignal(null)
  const itemChanges = useSignal(null)

  useEffect(() => {
    console.log(itemId)
    dispatch(fetchItemDescs(itemId))
    itemChanges.value = item
    title.value = item?.title || ""
    includes.value = item?.includes || ""
  }, [itemId, dispatch])

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
      dispatch(editItem({ sectionId, item: itemChanges.value }))
    }, 1000)
  }

  return (
    <>
      <div>
        <div className="delete-item">
          <span
            className="material-symbols-outlined"
            onClick={() => {
              if (window.confirm(`Delete item?`)) {
                dispatch(deleteItem({ sectionId, itemId }))
              }
            }}
          >
            close
          </span>
        </div>
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
