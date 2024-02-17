import { useSignal } from "@preact/signals-react"
import { useEffect } from "react"
import { allLoaded, saveList, newList } from "../../App"

export default function Desc({ desc, tempId, itemTitle }) {
  const body = useSignal(null)
  const descChange = useSignal(null)

  useEffect(() => {
    descChange.value = desc
    body.value = desc?.body
  }, [desc])

  function handleChange() {
    descChange.value = {
      ...descChange.value,
      body: body.value,
    }
    if (desc.new) {
      newList.descs[tempId] = descChange.value
    } else {
      saveList.descs.value = {
        ...saveList.descs.value,
        [desc?.id]: descChange.value,
      }
    }
  }
  return (
    allLoaded.descs.value && (
      <>
        <div>
          <input
            className="desc-body"
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
  )
}
