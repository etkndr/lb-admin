import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import * as menuActions from "../../store/menu"

export default function BuildArea({ menuId }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user)

  //   useEffect(() => {
  //     dispatch(menuActions.getUserMenus())
  //   }, [])

  return (
    <>
      <div>{menuId}</div>
      <div>text</div>
    </>
  )
}
