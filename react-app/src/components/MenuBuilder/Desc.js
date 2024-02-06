import { useSignal } from "@preact/signals-react"
import { useEffect } from "react"
import { allLoaded, saveList } from "../../App"

export default function Desc({ desc }) {
  const body = useSignal(null)

  useEffect(() => {
    body.value = desc?.body
  }, [desc])

  return (
    allLoaded.descs.value && (
      <>
        <div>
          <input
            className="desc-body"
            defaultValue={body.value}
            onChange={(e) => {
              body.value = e.target.value
              saveList.value.descs[desc.id] = desc
            }}
          />
        </div>
      </>
    )
  )
}
