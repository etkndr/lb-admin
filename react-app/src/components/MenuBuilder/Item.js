import { useSignal } from "@preact/signals-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { saveList, allLoaded } from "../../App"
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
    dispatch(getAllDescs(item?.id)).then((res) => {
      console.log(res, descs)
      allLoaded.descs.value = true
    })
    itemChange.value = item
  }, [item, dispatch])

  console.log(descs)

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
            itemChange.value = {
              ...itemChange.value,
              includes: includes.value,
            }
            saveList.items.value = {
              ...saveList.items.value,
              [item?.id]: itemChange,
            }
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
    </>
  )
}
