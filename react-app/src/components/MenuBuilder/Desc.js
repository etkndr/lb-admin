import Popup from "reactjs-popup"
import { useSignal } from "@preact/signals-react"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { editDesc, deleteDesc } from "../../store/features/descsSlice"

export default function Desc({ itemId, itemTitle, descId }) {
  const dispatch = useDispatch()
  const body = useSignal(null)
  const descChange = useSignal(null)
  const desc = useSelector((state) => state.descsSlice[itemId][descId])

  useEffect(() => {
    descChange.value = desc
    body.value = desc?.body
  }, [descId])

  let autosave // variable only assigned on field change
  function handleChange() {
    descChange.value = {
      ...descChange.value,
      body: body.value,
    }

    clearTimeout(autosave) // reset timer

    autosave = setTimeout(() => {
      dispatch(editDesc(descChange.value))
    }, 1000)
  }

  return (
    <>
      <div className="desc">
        <Popup
          trigger={(open) => (
            <span
              className="material-symbols-outlined"
              onClick={() => dispatch(deleteDesc({ itemId, descId }))}
            >
              close
            </span>
          )}
          position={"right center"}
          on={"hover"}
          closeOnDocumentClick
        >
          <span>Delete description</span>
        </Popup>
        <input
          className="desc-body"
          type="text"
          placeholder={
            itemTitle
              ? `Description/sub-item for ${itemTitle.toUpperCase()}`
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
