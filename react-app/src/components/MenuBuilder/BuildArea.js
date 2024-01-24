import { useSignalEffect } from "@preact/signals-react"
import { useDispatch, useSelector } from "react-redux"
import * as menuActions from "../../store/menu"
import { menuId } from "."

export default function BuildArea() {
  const dispatch = useDispatch()
  const menu = useSelector((state) => state.menus.menu)

  useSignalEffect(() => {
    if (menuId.value) {
      dispatch(menuActions.getMenuById(menuId.value))
    }
  })

  return (
    <>
      <div>{menu?.title}</div>
      <div>
        {menu?.sections?.map((section, idx) => {
          return (
            <>
              <div key={`${idx}1`}>{section.choice_desc}</div>
              <div key={`${idx}2`}>${section.price}/person</div>
              {/* {section.items?.map((item, idx) => {
                return (
                  <>
                    <div key={`${idx}3`}>{item.title}</div>
                    <div key={`${idx}4`}>{item.includes}</div>
                    {item.descs?.map((desc, idx) => {
                      return (
                        <>
                          <div key={`${idx}5`}>{desc.body}</div>
                        </>
                      )
                    })}
                  </>
                )
              })} */}
            </>
          )
        })}
      </div>
    </>
  )
}
