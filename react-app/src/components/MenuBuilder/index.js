import BuildArea from "./BuildArea"
import Sidebar from "../Sidebar"

export default function MenuBuilder() {
  return (
    <>
      <div>
        <Sidebar />
      </div>
      <div>
        <BuildArea />
      </div>
    </>
  )
}
