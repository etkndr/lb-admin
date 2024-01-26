import { useSignal } from "@preact/signals-react"
import { useDispatch, useSelector } from "react-redux"
import * as menuActions from "../../store/menu"
import * as sectionActions from "../../store/section"
import * as itemActions from "../../store/item"
import * as descActions from "../../store/desc"
import { useEffect } from "react"

export default function BuildArea() {
  const dispatch = useDispatch()
  const menu = useSelector((state) => state.menus.currMenu)
  const menuState = useSignal(null)
  const saving = useSignal(false)

  useEffect(() => {
    if (menu) {
      menuState.value = menu
    }
  }, [menu])

  function saveChanges(type, id, obj) {
    saving.value = true

    switch (type) {
      case "menu":
        dispatch(menuActions.editMenuById(id, obj)).then(() => {
          setTimeout(() => {
            saving.value = false
          }, 500)
        })
      case "section":
        dispatch(sectionActions.editSectionById(id, obj)).then(() => {
          setTimeout(() => {
            saving.value = false
          }, 500)
        })
      case "item":
        dispatch(itemActions.editItemById(id, obj)).then(() => {
          setTimeout(() => {
            saving.value = false
          }, 500)
        })
      case "desc":
        dispatch(descActions.editDescById(id, obj)).then(() => {
          setTimeout(() => {
            saving.value = false
          }, 500)
        })
      default:
        return
    }
  }

  if (!menu) {
    return null
  }

  return (
    menu && (
      <>
        <h1>{menu?.title}</h1>
        <p>(${menu?.price}/person)</p>
        <div>
          {menu?.sections?.map((section, idx) => {
            return (
              <div key={`${idx}1`}>
                <p>{section.choice_desc}</p>
                <p>(+${section.price}/person)</p>
                {section.items?.map((item, idx) => {
                  return (
                    <div key={`${idx}2`}>
                      <p>{item.title}</p>
                      <p>{item.includes}</p>
                      {item.descs?.map((desc, idx) => {
                        return <div key={`${idx}3`}>{desc.body}</div>
                      })}
                    </div>
                  )
                })}
                <h1>. . .</h1>
              </div>
            )
          })}
        </div>
        {saving.value && "Saving changes.."}
      </>
    )
  )
}
