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
              <div key={`section${section.id}`}>
                {section.choice_desc && (
                  <div key={`section-choice${section.id}`}>
                    <input
                      key={Math.random()}
                      className="section-choice"
                      defaultValue={section.choice_desc}
                      onChange={(e) => (section.choice_desc = e.target.value)}
                      onBlur={() => saveChanges("section", section.id, section)}
                    />
                  </div>
                )}
                <div key={`section-price${section.id}`}>
                  (+$
                  <input
                    key={Math.random()}
                    className="section-price"
                    defaultValue={section.price}
                    onChange={(e) => (section.price = e.target.value)}
                    onBlur={() => saveChanges("section", section.id, section)}
                  />
                  /person)
                </div>
                {section.items?.map((item, idx) => {
                  return (
                    <div key={`item${item.id}`}>
                      <div key={`item-title${item.id}`}>
                        <input
                          key={Math.random()}
                          className="item-title"
                          defaultValue={item.title}
                          onChange={(e) => (item.title = e.target.value)}
                          onBlur={() => saveChanges("item", item.id, item)}
                        />
                      </div>
                      {item.includes && (
                        <div key={`item-includes${item.id}`}>
                          <input
                            key={Math.random()}
                            className="item-includes"
                            defaultValue={item.includes}
                            onChange={(e) => (item.includes = e.target.value)}
                            onBlur={() => saveChanges("item", item.id, item)}
                          />
                        </div>
                      )}
                      {item.descs?.map((desc, idx) => {
                        return (
                          <div key={`desc${desc.id}`}>
                            <input
                              key={Math.random()}
                              className="desc-body"
                              defaultValue={desc.body}
                              onChange={(e) => (desc.body = e.target.value)}
                              onBlur={() => saveChanges("desc", desc.id, desc)}
                            />
                          </div>
                        )
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
