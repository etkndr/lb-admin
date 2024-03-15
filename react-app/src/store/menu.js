import {
  visibleMenus,
  userMenus,
  getMenu,
  newMenu,
  editMenu,
  deleteMenu,
  createReducer,
  baseUrl,
  GET_MENU,
  VISIBLE_MENUS,
  NEW_MENU,
  EDIT_MENU,
  USER_MENUS,
  DELETE_MENU,
} from "./actions"

export function getVisibleMenus() {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/api/menus/visible`)
    const data = await res.json()
    if (res.ok) {
      dispatch(visibleMenus(data))
    } else {
      if (data.errors) {
        return data.errors
      }
      return ["Error occured, please try again"]
    }
  }
}

export function getUserMenus() {
  return async (dispatch) => {
    try {
      const res = await fetch(`${baseUrl}/api/menus/`)
      const data = await res.json()
      dispatch({
        type: USER_MENUS,
        payload: data,
      })
      return data
    } catch (err) {
      console.log(err)
    }
  }
}

export function getMenuById(menuId) {
  return async (dispatch) => {
    try {
      const res = await fetch(`${baseUrl}/api/menus/${menuId}`)
      const data = await res.json()

      dispatch({
        type: GET_MENU,
        payload: data,
      })
      return data
    } catch (err) {
      console.log(err)
    }
  }
}

export function createMenu(menu) {
  return async (dispatch) => {
    try {
      const res = await fetch(`${baseUrl}/api/menus/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menu),
      })
      const data = await res.json()
      dispatch({
        type: NEW_MENU,
        payload: data,
      })
      return data
    } catch (err) {
      console.log(err)
    }
  }
}

export function editMenuById(menuId, menu) {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/api/menus/${menuId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(menu),
    })
    const data = await res.json()

    if (res.ok) {
      dispatch(editMenu(data))
    } else {
      if (data.errors) {
        return data.errors
      }
      return ["Error occured, please try again"]
    }
  }
}

export function deleteMenuById(menuId) {
  return async (dispatch) => {
    //   const res = await fetch(`${baseUrl}/api/menus/${menuId}`, {
    //     method: "DELETE",
    //   })
    //   const data = await res.json()

    //   if (res.ok) {
    //     dispatch(deleteMenu(data))
    //     return data
    //   } else {
    //     if (data.errors) {
    //       return data.errors
    //     }
    //     return ["Error occured, please try again"]
    //   }
    // }
    try {
      await fetch(`${baseUrl}/api/menus/${menuId}`, {
        method: "DELETE",
      })

      dispatch({
        type: DELETE_MENU,
        payload: menuId,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = {}

export function menus(menus = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case USER_MENUS:
      const obj = Object.fromEntries(payload.map((menu) => [menu.id, menu]))
      return { ...menus, ...obj }
    case NEW_MENU:
      return { ...menus, [payload.id]: payload }
    case GET_MENU:
      return { ...payload }
    case DELETE_MENU:
      delete menus[payload]
      console.log(payload)
      return { ...menus }
    default:
      return menus
  }
}

// export const menus = createReducer([], {
//   // [visibleMenus().type]: (state, action) => {
//   //   return { ...state, menuList: action.menuList }
//   // },
//   [userMenus().type]: (state, action) => {
//     return action.menuList
//   },
//   // [getMenu(0).type]: (state, action) => {
//   //   return { ...state, currMenu: action.menu }
//   // },
//   // [editMenu(0).type]: (state, action) => {
//   //   return { ...state, menu: action.menu }
//   // },
//   [deleteMenu(0).type]: (state, action) => {
//     console.log(state)
//     return state.filter(({ id }) => id !== action.payload.id)
//   },
// })
