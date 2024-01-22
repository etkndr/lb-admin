export const baseUrl = "http://localhost:5000"

function makeActionCreator(type, ...argNames) {
  return function (...args) {
    const action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

// MENU ACTIONS
const VISIBLE_MENUS = "VISIBLE_MENUS"
const USER_MENUS = "USER_MENUS"
const GET_MENU = "GET_MENU"
const NEW_MENU = "NEW_MENU"
const EDIT_MENU = "EDIT_MENU"
const DELETE_MENU = "DELETE_MENU"

export const visibleMenus = makeActionCreator(VISIBLE_MENUS, "menuList")
export const userMenus = makeActionCreator(USER_MENUS, "menuList")
export const getMenu = makeActionCreator(GET_MENU, "menu")
export const newMenu = makeActionCreator(NEW_MENU, "menu")
export const editMenu = makeActionCreator(EDIT_MENU, "menu")
export const deleteMenu = makeActionCreator(DELETE_MENU, "delete")

// SECTION ACTIONS
const ALL_SECTIONS = "ALL_SECTIONS"
const GET_SECTION = "GET_SECTION"
const NEW_SECTION = "NEW_SECTION"
const EDIT_SECTION = "EDIT_SECTION"
const DELETE_SECTION = "DELETE_SECTION"

export const allSections = makeActionCreator(ALL_SECTIONS, "sectionList")
export const getSection = makeActionCreator(GET_SECTION, "section")
export const newSection = makeActionCreator(NEW_SECTION, "section")
export const editSection = makeActionCreator(EDIT_SECTION, "section")
export const deleteSection = makeActionCreator(DELETE_SECTION, "delete")

// ITEM ACTIONS
const ALL_ITEMS = "ALL_ITEMS"
const GET_ITEM = "GET_ITEM"
const NEW_ITEM = "NEW_ITEM"
const EDIT_ITEM = "EDIT_ITEM"
const DELETE_ITEM = "DELETE_ITEM"

export const allItems = makeActionCreator(ALL_ITEMS, "itemList")
export const getItem = makeActionCreator(GET_ITEM, "item")
export const newItem = makeActionCreator(NEW_ITEM, "item")
export const editItem = makeActionCreator(EDIT_ITEM, "item")
export const deleteItem = makeActionCreator(DELETE_ITEM, "delete")

// DESC ACTIONS
const ALL_DESCS = "ALL_DESCS"
const GET_DESC = "GET_DESC"
const NEW_DESC = "NEW_DESC"
const EDIT_DESC = "EDIT_DESC"
const DELETE_DESC = "DELETE_DESC"

export const allDescs = makeActionCreator(ALL_DESCS, "descList")
export const getDesc = makeActionCreator(GET_DESC, "desc")
export const newDesc = makeActionCreator(NEW_DESC, "desc")
export const editDesc = makeActionCreator(EDIT_DESC, "desc")
export const deleteDesc = makeActionCreator(DELETE_DESC, "delete")
