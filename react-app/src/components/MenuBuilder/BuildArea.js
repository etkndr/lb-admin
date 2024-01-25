// import { useSignalEffect } from "@preact/signals-react"
import { useDispatch, useSelector } from "react-redux"

export default function BuildArea() {
  const menu = useSelector((state) => state.menus.menu)

  return (
    <>
      <div>{menu?.title}</div>
      <div>
        {menu?.sections?.map((section, idx) => {
          return (
            <div key={`${idx}1`}>
              <p>${section.price}/person</p>
              <p>{section.choice_desc}</p>
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
            </div>
          )
        })}
      </div>
    </>
  )
}
