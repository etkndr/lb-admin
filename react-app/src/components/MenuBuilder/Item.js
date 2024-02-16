import { useSignal } from "@preact/signals-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { saveList, newList, allLoaded, newDescs } from "../../App"
import { getAllDescs } from "../../store/desc"
import Desc from "./Desc"
import Add from "./Add"

export default function Item({ item }) {
  const dispatch = useDispatch()
  const descs = useSelector((state) => state.descs.descList)
  const title = useSignal(null)
  const includes = useSignal(null)
  const itemChange = useSignal(null)
  const tempId = Object.keys(newList.items).length + 1

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

  function handleChange() {
    itemChange.value = {
      ...itemChange.value,
      title: title.value,
      includes: includes.value,
    }
    if (item.new) {
      newList.items[tempId] = itemChange.value
      console.log(newList.items)
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
            <div key={desc.id}>
              <Desc desc={desc} />
            </div>
          )
        })}
      {item &&
        newDescs[item.id] &&
        newDescs[item.id].map((desc, idx) => {
          return (
            <div key={idx}>
              <Desc desc={desc} itemTitle={item.title} />
            </div>
          )
        })}
      <Add
        id={item.id}
        type={"desc"}
        tooltip={"Add description for this item"}
      />
    </>
  )
}
