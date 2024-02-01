import { saveList } from "../../App"
import Desc from "./Desc"
import Add from "./Add"

export default function Item({ item }) {
  return (
    <>
      <div key={`item${item.id}`}>
        <div key={`item-title${item.id}`}>
          <input
            key={Math.random()}
            className="item-title"
            defaultValue={item.title}
            onChange={(e) => {
              item.title = e.target.value
              saveList.value.items[item.id] = item
            }}
          />
        </div>
        {!item.includes && (
          <Add
            parent={item.section_id}
            id={item.id}
            type={"item-edit"}
            obj={item}
            tooltip={"Add info about what is included with this item"}
          />
        )}
        {item.includes && (
          <div key={`item-includes${item.id}`}>
            <input
              key={Math.random()}
              className="item-includes"
              defaultValue={item.includes}
              onChange={(e) => {
                item.includes = e.target.value
                saveList.value.items[item.id] = item
              }}
            />
          </div>
        )}
      </div>
    </>
  )
}
