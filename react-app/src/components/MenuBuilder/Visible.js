import { useSignal } from "@preact/signals-react"
import { useEffect } from "react"

export default function Visible({ id, vis, handleVis }) {
  const visIcon = useSignal()

  useEffect(() => {
    vis
      ? (visIcon.value = (
          <span className="material-symbols-outlined">visibility</span>
        ))
      : (visIcon.value = (
          <span className="material-symbols-outlined">visibility_off</span>
        ))
  }, [vis])

  return (
    <div className="publish" onClick={() => handleVis(id)}>
      {visIcon.value}
    </div>
  )
}
