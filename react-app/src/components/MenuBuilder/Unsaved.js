import { useSignal } from "@preact/signals-react"
import { saveList, newList } from "../../App"

export default function Unsaved({ saving }) {
  const unsaved = useSignal(false)

  setInterval(() => {
    if (saving.value) {
      unsaved.value = false
    } else if (
      saveList.menu.value ||
      saveList.sections.value ||
      saveList.items.value ||
      saveList.descs.value ||
      Object.keys(newList.sections) ||
      Object.keys(newList.items) ||
      Object.keys(newList.descs)
    ) {
      unsaved.value = true
    } else {
      unsaved.value = false
    }
  }, 3000)

  return <>{unsaved.value && "Unsaved changes"}</>
}
