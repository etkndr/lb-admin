import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  menuList: [],
  currMenu: null,
}

const fetchMenus = createAsyncThunk("menus/fetchMenus", async () => {})

const menusSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {
    // Give case reducers meaningful past-tense "event"-style names
    menusFetched(state, action) {
      // "Mutating" update syntax thanks to Immer, and no `return` needed
      state.menus.push(action.payload)
    },
  },
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { menusFetched } = menusSlice.actions

// Export the slice reducer as the default export
export default menusSlice.reducer
