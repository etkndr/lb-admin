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

  useEffect(() => {
    dispatch(getAllDescs(item?.id))
    title.value = item?.title
    includes.value = item?.includes
  }, [item])

  return (
    <>
      <div>
        <input
          className="item-title"
          defaultValue={title?.value}
          onChange={(e) => {
            title.value = e.target.value
            saveList.value.items[item.id] = item
          }}
        />
      </div>
      <div>
        <input
          className="item-includes"
          placeholder="Optional item description (e.g. 'Includes rolls')"
          defaultValue={includes.value}
          onChange={(e) => {
            includes.value = e.target.value
            saveList.value.items[item.id] = item
          }}
        />
      </div>
    </>
  )
}
