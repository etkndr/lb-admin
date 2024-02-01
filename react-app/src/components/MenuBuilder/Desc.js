import { saveList } from "../../App"

export default function Desc({ desc }) {
  return (
    <>
      <div key={`desc${desc.id}`}>
        <input
          key={Math.random()}
          className="desc-body"
          defaultValue={desc.body}
          onChange={(e) => {
            desc.body = e.target.value
            saveList.value.descs[desc.id] = desc
          }}
        />
      </div>
    </>
  )
}
