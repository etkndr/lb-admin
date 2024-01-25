import { useSignal } from "@preact/signals-react"
import { useSelector } from "react-redux"

export default function BuildArea() {
  const menu = useSelector((state) => state.menus.currMenu)

  return (
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
    </>
  )
}
