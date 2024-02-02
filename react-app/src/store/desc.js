import {
  allDescs,
  getDesc,
  newDesc,
  editDesc,
  deleteDesc,
  createReducer,
  baseUrl,
} from "./actions"

export function getAllDescs(itemId) {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/api/items/${itemId}/descs`)
    const data = await res.json()

    if (res.ok) {
      dispatch(allDescs(data))
      return data
    } else {
      if (data.errors) {
        return data.errors
      }
      return ["Error occured, please try again"]
    }
  }
}

export function getDescById(descId) {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/api/descs/${descId}`)
    const data = await res.json()

    if (res.ok) {
      dispatch(getDesc(data))
    } else {
      if (data.errors) {
        return data.errors
      }
      return ["Error occured, please try again"]
    }
  }
}

export function createDesc(itemId, desc) {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/api/items/${itemId}/descs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(desc),
    })
    const data = await res.json()

    if (res.ok) {
      dispatch(newDesc(data))
    } else {
      if (data.errors) {
        return data.errors
      }
      return ["Error occured, please try again"]
    }
  }
}

export function editDescById(descId, desc) {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/api/descs/${descId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(desc),
    })
    const data = await res.json()

    if (res.ok) {
      dispatch(editDesc(data))
    } else {
      if (data.errors) {
        return data.errors
      }
      return ["Error occured, please try again"]
    }
  }
}

export function deleteDescById(descId) {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/api/descs/${descId}`, {
      method: "DELETE",
    })
    const data = await res.json()

    if (res.ok) {
      dispatch(deleteDesc(data))
    } else {
      if (data.errors) {
        return data.errors
      }
      return ["Error occured, please try again"]
    }
  }
}

const descObj = {}

export const descs = createReducer([], {
  [allDescs(0).type]: (state, action) => {
    let itemId = action.descList[0]?.item_id
    if (itemId) {
      descObj[itemId] = action.descList
    }
    return { ...state, descList: descObj }
  },
  [getDesc(0).type]: (state, action) => {
    return { ...state, desc: action.desc }
  },
  [editDesc(0).type]: (state, action) => {
    return { ...state, desc: action.desc }
  },
  [deleteDesc(0).type]: (state, action) => {
    delete state[action.desc]
  },
})
