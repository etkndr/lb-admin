import { useSignal } from "@preact/signals-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { saveList, newList, allLoaded } from "../../App"
import { getAllDescs } from "../../store/desc"
import Desc from "./Desc"
import Add from "./Add"

export default function Item({ item, tempId }) {
  const dispatch = useDispatch()
  const descs = useSelector((state) => state.descs.descList)
  const title = useSignal(null)
  const includes = useSignal(null)
  const itemChange = useSignal(null)

  const newDescs = useSignal([])

  useEffect(() => {
    if (!item.new) {
      dispatch(getAllDescs(item?.id)).then((res) => {
        allLoaded.descs.value = true
      })
    }
  }, [item.id, dispatch])

  useEffect(() => {
    itemChange.value = item
    title.value = item?.title || ""
    includes.value = item?.includes || ""
  }, [item])

  function handleAdd() {
    const desc = {
      new: true,
      item_id: item.id,
      body: "",
    }

    newDescs.value = [...newDescs.value, desc]
  }

  function handleChange() {
    itemChange.value = {
      ...itemChange.value,
      title: title.value,
      includes: includes.value,
    }
    if (item.new) {
      newList.items[tempId] = itemChange.value
    } else {
      saveList.items.value = {
        ...saveList.items.value,
        [item?.id]: itemChange.value,
      }
    }
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
      {newDescs.value.map((desc, idx) => {
        return (
          <div className="desc" key={idx}>
            <Desc desc={desc} tempId={idx} itemTitle={item.title} />
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
