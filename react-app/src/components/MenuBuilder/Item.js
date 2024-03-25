import { useSignal } from "@preact/signals-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { saveList, newList, allLoaded } from "../../App"
import { getAllDescs } from "../../store/desc"
import Desc from "./Desc"

export default function Item({ itemId }) {
  const dispatch = useDispatch()
  const item = useSelector((state) => state.itemsSlice.itemList[itemId])
  const descs = useSelector((state) => state.descs.descList)
  const title = useSignal(null)
  const includes = useSignal(null)
  const itemChange = useSignal(null)

  useEffect(() => {
    dispatch(getAllDescs(itemId))
    itemChange.value = item
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

  function handleChange() {
    itemChange.value = {
      ...itemChange.value,
      title: title.value,
      includes: includes.value,
    }
  }

  console.log(item)

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
