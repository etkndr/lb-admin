import { useSignal } from "@preact/signals-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { saveList } from "../../App"
import { getAllDescs } from "../../store/desc"
import Desc from "./Desc"
import Add from "./Add"

export default function Item({ item }) {
  const dispatch = useDispatch()
  const descs = useSelector((state) => state.descs.descList)
  const title = useSignal(null)
  const includes = useSignal(null)
  const itemChange = useSignal(null)

  useEffect(() => {
    if (item) {
      dispatch(getAllDescs(item?.id))
      itemChange.value = item
    }
  }, [item])

  return (
    <>
      <div>
        <input
          className="item-title"
          defaultValue={item?.title}
          onChange={(e) => {
            title.value = e.target.value
            itemChange.value = { ...itemChange.value, title: title.value }
            saveList.items.value = {
              ...saveList.items.value,
              [item?.id]: itemChange,
            }
          }}
        />
      </div>
      <div>
        <input
          className="item-includes"
          placeholder="Optional item description (e.g. 'Includes rolls')"
          defaultValue={item?.includes}
          onChange={(e) => {
            includes.value = e.target.value
            itemChange.value = { ...itemChange.value, includes: includes.value }
            saveList.items.value = {
              ...saveList.items.value,
              [item?.id]: itemChange,
            }
          }}
        />
      </div>
      {descs &&
        descs[item?.id]?.map((desc, idx) => {
          return (
            <div key={desc.id}>
              <Desc desc={desc} />
            </div>
          )
        })}
    </>
  )
}
