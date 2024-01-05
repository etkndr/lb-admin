import {
  allMenus,
  getMenu,
  newMenu,
  editMenu,
  deleteMenu,
  createReducer,
} from "./actions";

export function getAllMenus() {
  return async (dispatch) => {
    const res = await fetch(`/api/menus/`);
    const data = await res.json();

    if (res.ok) {
      dispatch(allMenus(data));
    } else {
      if (data.errors) {
        return data.errors;
      }
      return ["Error occured, please try again"];
    }
  };
}

export function getMenuById(menuId) {
  return async (dispatch) => {
    const res = await fetch(`/api/menus/${menuId}`);
    const data = await res.json();

    if (res.ok) {
      dispatch(getMenu(data));
    } else {
      if (data.errors) {
        return data.errors;
      }
      return ["Error occured, please try again"];
    }
  };
}

export const menus = createReducer([], {
  ["ALL_MENUS"]: (state, action) => {
    return { ...state, menuList: action.menuList };
  },
  ["GET_MENU"]: (state, action) => {
    return { ...state, menu: action.menu };
  },
});
