import { useEffect } from "react"
import { useSignal } from "@preact/signals-react"
import { useDispatch, useSelector } from "react-redux"
import { menuListState, menuState } from "../../App"
import * as menuActions from "../../store/menu"
import * as sectionActions from "../../store/section"
import * as itemActions from "../../store/item"
import * as descActions from "../../store/desc"

export default function BuildArea() {
  const dispatch = useDispatch()
  const menu = useSelector((state) => state.menus.currMenu)
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
        break
      case "section":
        dispatch(sectionActions.editSectionById(id, obj)).then(() => {
          setTimeout(() => {
            saving.value = false
          }, 500)
        })
        break
      case "item":
        dispatch(itemActions.editItemById(id, obj)).then(() => {
          setTimeout(() => {
            saving.value = false
          }, 500)
        })
        break
      case "desc":
        dispatch(descActions.editDescById(id, obj)).then(() => {
          setTimeout(() => {
            saving.value = false
          }, 500)
        })
      default:
        break
    }
    setTimeout(() => {
      dispatch(menuActions.getUserMenus())
    }, 500)
  }

  if (!menu) {
    return null
  }

  return (
    menu &&
    menuState.value && (
      <>
        <div>
          <input
            key={Math.random()}
            className="menu-title"
            defaultValue={menuState.value?.title}
            onChange={(e) => (menuState.value.title = e.target.value)}
            onBlur={() => saveChanges("menu", menu.id, menuState.value)}
          />
        </div>
        <div>
          ($
          <input
            key={Math.random()}
            type="number"
            className="menu-price"
            defaultValue={menuState.value?.price}
            onChange={(e) => (menuState.value.price = e.target.value)}
            onBlur={() => saveChanges("menu", menu.id, menuState.value)}
          />
          /person)
        </div>
        <div>
          {menuState.value?.sections?.map((section, idx) => {
            return (
              <div key={`section-${section.id}`}>
                {section.choice_desc && (
                  <div>
                    <input
                      key={Math.random()}
                      className="choice-desc"
                      defaultValue={section.choice_desc}
                      onChange={(e) => (section.choice_desc = e.target.value)}
                      onBlur={() => saveChanges("section", section.id, section)}
                    />
                  </div>
                )}
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
