import {
  allItems,
  getItem,
  newItem,
  editItem,
  deleteItem,
  createReducer,
  baseUrl,
} from "./actions";

export function getAllItems(sectionId) {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/api/sections/${sectionId}/items`);
    const data = await res.json();

    if (res.ok) {
      dispatch(allItems(data));
    } else {
      if (data.errors) {
        return data.errors;
      }
      return ["Error occured, please try again"];
    }
  };
}

export function getItemById(itemId) {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/api/items/${itemId}`);
    const data = await res.json();

    if (res.ok) {
      dispatch(getItem(data));
    } else {
      if (data.errors) {
        return data.errors;
      }
      return ["Error occured, please try again"];
    }
  };
}

export function createItem(item, sectionId) {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/api/sections/${sectionId}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    const data = await res.json();

    if (res.ok) {
      dispatch(newItem(data));
    } else {
      if (data.errors) {
        return data.errors;
      }
      return ["Error occured, please try again"];
    }
  };
}

export function editItemById(item, itemId) {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/api/items/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    const data = await res.json();

    if (res.ok) {
      dispatch(editItem(data));
    } else {
      if (data.errors) {
        return data.errors;
      }
      return ["Error occured, please try again"];
    }
  };
}

export function deleteItemById(itemId) {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/api/items/${itemId}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (res.ok) {
      dispatch(deleteItem(data));
    } else {
      if (data.errors) {
        return data.errors;
      }
      return ["Error occured, please try again"];
    }
  };
}

export const items = createReducer([], {
  ["ALL_ITEMS"]: (state, action) => {
    return { ...state, itemList: action.itemList };
  },
  ["GET_ITEM"]: (state, action) => {
    return { ...state, item: action.item };
  },
  ["EDIT_ITEM"]: (state, action) => {
    return { ...state, item: action.item };
  },
  ["DELETE_ITEM"]: (state, action) => {
    delete state[action.item];
  },
});
