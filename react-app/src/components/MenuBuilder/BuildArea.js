import { useEffect } from "react"
import { useSignal } from "@preact/signals-react"
import { useDispatch, useSelector } from "react-redux"
import { menuState, saveList } from "../../App"
import * as menuActions from "../../store/menu"
import * as sectionActions from "../../store/section"
import * as itemActions from "../../store/item"
import * as descActions from "../../store/desc"
import Add from "./Add"
import Section from "./Section"

export default function BuildArea() {
  const dispatch = useDispatch()
  const menu = useSelector((state) => state.menus.currMenu)
  const sections = useSelector((state) => state.sections.sectionList)
  const saving = useSignal(false)

  useEffect(() => {
    // Sets menuState to current menu when menu changes
    if (menu) {
      menuState.value = menu
    }
  }, [menu])

  function saveChanges() {
    // Dispatches any existing data from saveList
    saving.value = true
    const list = saveList.value
    const state = menuState.value

    if (list.menu) {
      dispatch(menuActions.editMenuById(state.id, state))
    }
    if (Object.keys(list.sections).length) {
      for (let sectionId in list.sections) {
        dispatch(
          sectionActions.editSectionById(sectionId, list.sections[sectionId])
        )
      }
    }
    if (Object.keys(list.items).length) {
      for (let itemId in list.items) {
        dispatch(itemActions.editItemById(itemId, list.items[itemId]))
      }
    }
    if (Object.keys(list.descs).length) {
      for (let descId in list.descs) {
        dispatch(descActions.editDescById(descId, list.descs[descId]))
      }
    }

    saveList.value = {
      menu: false,
      sections: {},
      items: {},
      descs: {},
    }

    setTimeout(() => {
      saving.value = false
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
            onChange={(e) => {
              menuState.value.title = e.target.value
              saveList.value.menu = true
            }}
          />
        </div>
        <div>
          ($
          <input
            key={Math.random()}
            type="number"
            className="menu-price"
            defaultValue={menuState.value?.price}
            onChange={(e) => {
              menuState.value.price = e.target.value
              saveList.value.menu = true
            }}
          />
          /person)
        </div>
        <div>
          {Object.values(menuState.value.sections)?.map((section, idx) => {
            return (
              <div key={section.id}>
                <Section section={section} />
              </div>
            )
          })}
          <Add
            id={menuState.value.id}
            type={"section"}
            tooltip={"Create a new section"}
          />
        </div>
        <button onClick={saveChanges}>save</button>
        {saving.value && "Saving changes.."}
      </>
    )
  )
}

// {Object.values(menuState.value?.sections)?.map((section, idx) => {
//   return (
//     <div key={`section${section.id}`}>
//       {!section.choice_desc && (
//         <Add
//           id={section.id}
//           type={"section-choice"}
//           obj={section}
//           tooltip={"Add description for section, e.g. 'Pick one'"}
//         />
//       )}
//       {section.choice_desc && (
//         <div key={`section-choice${section.id}`}>
//           <input
//             key={Math.random()}
//             className="section-choice"
//             defaultValue={section.choice_desc}
//             onChange={(e) => {
//               section.choice_desc = e.target.value
//               saveList.value.sections[section.id] = section
//             }}
//           />
//         </div>
//       )}
//       {!section.price && (
//         <Add
//           id={section.id}
//           type={"section-price"}
//           obj={section}
//           tooltip={"Add extra price per person for this section"}
//         />
//       )}
//       {section.price && (
//         <div key={`section-price${section.id}`}>
//           (+$
//           <input
//             key={Math.random()}
//             className="section-price"
//             defaultValue={section.price}
//             onChange={(e) => {
//               section.price = e.target.value > 0 ? e.target.value : ""
//               saveList.value.sections[section.id] = section
//             }}
//           />
//           /person)
//         </div>
//       )}
//       {Object.values(section.items)?.map((item, idx) => {
//         return (
//           <div key={`item${item.id}`}>
//             <div key={`item-title${item.id}`}>
//               <input
//                 key={Math.random()}
//                 className="item-title"
//                 defaultValue={item.title}
//                 onChange={(e) => {
//                   item.title = e.target.value
//                   saveList.value.items[item.id] = item
//                 }}
//               />
//             </div>
//             {!item.includes && (
//               <Add
//                 parent={item.section_id}
//                 id={item.id}
//                 type={"item-edit"}
//                 obj={item}
//                 tooltip={
//                   "Add info about what is included with this item"
//                 }
//               />
//             )}
//             {item.includes && (
//               <div key={`item-includes${item.id}`}>
//                 <input
//                   key={Math.random()}
//                   className="item-includes"
//                   defaultValue={item.includes}
//                   onChange={(e) => {
//                     item.includes = e.target.value
//                     saveList.value.items[item.id] = item
//                   }}
//                 />
//               </div>
//             )}
//             {Object.values(item.descs)?.map((desc, idx) => {
//               return (
//                 <div key={`desc${desc.id}`}>
//                   <input
//                     key={Math.random()}
//                     className="desc-body"
//                     defaultValue={desc.body}
//                     onChange={(e) => {
//                       desc.body = e.target.value
//                       saveList.value.descs[desc.id] = desc
//                     }}
//                   />
//                 </div>
//               )
//             })}
//             <Add
//               id={item.id}
//               type={"desc"}
//               tooltip={"Add description for this item"}
//             />
//           </div>
//         )
//       })}
//       <Add
//         id={section.id}
//         type={"item"}
//         tooltip={"Add item to this section"}
//       />
//       <h1>. . .</h1>
//     </div>
//   )
// })}
