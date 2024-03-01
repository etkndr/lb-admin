import { useSignal } from "@preact/signals-react"
import { useEffect } from "react"

export default function Visible({ id, vis, handleVis }) {
  const visIcon = useSignal()

  useEffect(() => {
    vis
      ? (visIcon.value = (
          <span class="material-symbols-outlined">visibility</span>
        ))
      : (visIcon.value = (
          <span class="material-symbols-outlined">visibility_off</span>
        ))
  }, [vis])

  return (
    <>
      <span className="publish">
        <input
          key={Math.random()}
          type="checkbox"
          defaultChecked={vis}
          onChange={(e) => handleVis(id)}
        />
        {visIcon.value}
      </span>
    </>
  )
}
