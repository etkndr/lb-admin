import { useSignal } from "@preact/signals-react"
import { useEffect } from "react"
import { allLoaded, saveList, newList } from "../../App"

export default function Desc({ desc }) {
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
      newList.descs.value = {
        ...newList.descs.value,
        [desc?.tempDescId]: descChange.value,
      }
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
