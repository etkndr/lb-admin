import { useSignal } from "@preact/signals-react"
import { useEffect } from "react"
import { allLoaded, saveList, newList } from "../../App"
import { useSelector } from "react-redux"

export default function Desc({ itemTitle, descId }) {
  const body = useSignal(null)
  const descChange = useSignal(null)
  const desc = useSelector((state) => state.descsSlice.descList[descId])

  useEffect(() => {
    descChange.value = desc
    body.value = desc?.body
  }, [descId])

  function handleChange() {
    descChange.value = {
      ...descChange.value,
      body: body.value,
    }
  }

  return (
    <>
      <div>
        <input
          className="desc-body"
          type="text"
          placeholder={
            itemTitle
              ? `Description/sub-item for ${itemTitle}`
              : `Description/sub-item`
          }
          defaultValue={body.value}
          onChange={(e) => {
            body.value = e.target.value
            handleChange()
          }}
        />
      </div>
    </>
  )
}
