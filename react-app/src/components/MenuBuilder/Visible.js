import { useSignal } from "@preact/signals-react"
import { useEffect } from "react"

export default function Visible({ id, vis, handleVis }) {
  const visIcon = useSignal()

  useEffect(() => {
    vis
      ? (visIcon.value = (
          <span
            className="material-symbols-outlined"
            onClick={() => handleVis(id)}
          >
            visibility
          </span>
        ))
      : (visIcon.value = (
          <span
            className="material-symbols-outlined"
            onClick={() => handleVis(id)}
          >
            visibility_off
          </span>
        ))
  }, [vis])

  return <div className="publish">{visIcon.value}</div>
}
