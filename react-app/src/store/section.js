import {
  allSections,
  getSection,
  newSection,
  editSection,
  deleteSection,
  createReducer,
  baseUrl,
} from "./actions"

export function getAllSections(menuId) {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/api/menus/${menuId}/sections`)
    const data = await res.json()

    if (res.ok) {
      dispatch(allSections(data))
    } else {
      if (data.errors) {
        return data.errors
      }
      return ["Error occured, please try again"]
    }
  }
}

export function getSectionById(sectionId) {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/api/sections/${sectionId}`)
    const data = await res.json()

    if (res.ok) {
      dispatch(getSection(data))
    } else {
      if (data.errors) {
        return data.errors
      }
      return ["Error occured, please try again"]
    }
  }
}

export function createSection(menuId, section) {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/api/menus/${menuId}/sections`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(section),
    })
    const data = await res.json()

    if (res.ok) {
      dispatch(newSection(data))
    } else {
      if (data.errors) {
        return data.errors
      }
      return ["Error occured, please try again"]
    }
  }
}

export function editSectionById(sectionId, section) {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/api/sections/${sectionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(section),
    })
    const data = await res.json()

    if (res.ok) {
      dispatch(editSection(data))
    } else {
      if (data.errors) {
        return data.errors
      }
      return ["Error occured, please try again"]
    }
  }
}

export function deleteSectionById(sectionId) {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/api/sections/${sectionId}`, {
      method: "DELETE",
    })
    const data = await res.json()

    if (res.ok) {
      dispatch(deleteSection(data))
    } else {
      if (data.errors) {
        return data.errors
      }
      return ["Error occured, please try again"]
    }
  }
}

export const sections = createReducer([], {
  [allSections().type]: (state, action) => {
    return { ...state, sectionList: action.sectionList }
  },
  [getSection().type]: (state, action) => {
    return { ...state, section: action.section }
  },
  [editSection().type]: (state, action) => {
    return { ...state, section: action.section }
  },
  [deleteSection().type]: (state, action) => {
    delete state[action.section]
  },
})
