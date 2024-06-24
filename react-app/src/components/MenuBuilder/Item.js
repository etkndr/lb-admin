import Popup from "reactjs-popup"
import { useSignal } from "@preact/signals-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editItem, deleteItem } from "../../store/features/itemsSlice"
import { fetchItemDescs, createDesc } from "../../store/features/descsSlice"
import Desc from "./Desc"

export default function Item({ sectionId, itemId }) {
  const dispatch = useDispatch()
  const item = useSelector((state) => state.itemsSlice[sectionId][itemId])
  const descs = useSelector((state) => state.descsSlice[itemId])
  const title = useSignal(null)
  const includes = useSignal(null)
  const itemChanges = useSignal(null)

  useEffect(() => {
    dispatch(fetchItemDescs(itemId))
    itemChanges.value = item
    title.value = item?.title || ""
    includes.value = item?.includes || ""
  }, [itemId, dispatch])

  function handleAdd() {
    const desc = {
      item_id: itemId,
      body: "New description",
    }

    dispatch(createDesc(desc))
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
          <Popup
            trigger={(open) => (
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
            )}
            position={"right center"}
            on={"hover"}
            closeOnDocumentClick
          >
            <span>Delete item</span>
          </Popup>
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
        Object.values(descs)?.map((desc, idx) => {
          return (
            <div className="desc" key={desc.id}>
              <Desc itemId={itemId} itemTitle={item.title} descId={desc.id} />
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
