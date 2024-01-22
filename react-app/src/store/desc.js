import {
  allDescs,
  getDesc,
  newDesc,
  editDesc,
  deleteDesc,
  createReducer,
  baseUrl,
} from "./actions";

export function getAllDescs(itemId) {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/api/items/${itemId}/descs`);
    const data = await res.json();

    if (res.ok) {
      dispatch(allDescs(data));
    } else {
      if (data.errors) {
        return data.errors;
      }
      return ["Error occured, please try again"];
    }
  };
}

export function getDescById(descId) {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/api/descs/${descId}`);
    const data = await res.json();

    if (res.ok) {
      dispatch(getDesc(data));
    } else {
      if (data.errors) {
        return data.errors;
      }
      return ["Error occured, please try again"];
    }
  };
}

export function createDesc(desc, itemId) {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/api/items/${itemId}/descs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(desc),
    });
    const data = await res.json();

    if (res.ok) {
      dispatch(newDesc(data));
    } else {
      if (data.errors) {
        return data.errors;
      }
      return ["Error occured, please try again"];
    }
  };
}

export function editDescById(desc, descId) {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/api/descs/${descId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(desc),
    });
    const data = await res.json();

    if (res.ok) {
      dispatch(editDesc(data));
    } else {
      if (data.errors) {
        return data.errors;
      }
      return ["Error occured, please try again"];
    }
  };
}

export function deleteDescById(descId) {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/api/descs/${descId}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (res.ok) {
      dispatch(deleteDesc(data));
    } else {
      if (data.errors) {
        return data.errors;
      }
      return ["Error occured, please try again"];
    }
  };
}

export const descs = createReducer([], {
  ["ALL_DESCS"]: (state, action) => {
    return { ...state, descList: action.descList };
  },
  ["GET_DESC"]: (state, action) => {
    return { ...state, desc: action.desc };
  },
  ["EDIT_DESC"]: (state, action) => {
    return { ...state, desc: action.desc };
  },
  ["DELETE_DESC"]: (state, action) => {
    delete state[action.desc];
  },
});
