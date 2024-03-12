import {
  visibleMenus,
  userMenus,
  getMenu,
  newMenu,
  editMenu,
  deleteMenu,
  createReducer,
  baseUrl,
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
    const res = await fetch(`${baseUrl}/api/menus/`)
    const data = await res.json()

    if (res.ok) {
      dispatch(userMenus(data))
    } else {
      if (data.errors) {
        return data.errors
      }
      return ["Error occured, please try again"]
    }
  }
}

export function getMenuById(menuId) {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/api/menus/${menuId}`)
    const data = await res.json()

    if (res.ok) {
      dispatch(getMenu(data))
    } else {
      if (data.errors) {
        return data.errors
      }
      return ["Error occured, please try again"]
    }
  }
}

export function createMenu(menu) {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/api/menus/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(menu),
    })
    const data = await res.json()

    if (res.ok) {
      dispatch(newMenu(data))
      return data
    } else {
      if (data.errors) {
        return data.errors
      }
      return ["Error occured, please try again"]
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
    const res = await fetch(`${baseUrl}/api/menus/${menuId}`, {
      method: "DELETE",
    })
    const data = await res.json()

    if (res.ok) {
      dispatch(deleteMenu(data))
      return data
    } else {
      if (data.errors) {
        return data.errors
      }
      return ["Error occured, please try again"]
    }
  }
}

export const menus = createReducer([], {
  [visibleMenus().type]: (state, action) => {
    return { ...state, menuList: action.menuList }
  },
  [userMenus().type]: (state, action) => {
    const newState = { ...state }
    action.menuList.forEach((menu) => {
      newState[menu.id] = menu
    })
    return newState
  },
  [getMenu(0).type]: (state, action) => {
    return { ...state, currMenu: action.menu }
  },
  [editMenu(0).type]: (state, action) => {
    return { ...state, menu: action.menu }
  },
  [deleteMenu(0).type]: (state, action) => {
    const newState = { ...state }
    console.log(newState)
    return state
  },
})
