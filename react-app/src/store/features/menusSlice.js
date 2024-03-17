import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { baseUrl } from "../actions"

const initialState = {
  menuList: [],
  currMenu: null,
  error: null,
}

export const fetchUserMenus = createAsyncThunk(
  "menus/fetchUserMenus",
  async () => {
    const res = await axios.get(`${baseUrl}/api/menus/`)
    return res.data
  }
)

const menusSlice = createSlice({
  name: "menus",
  initialState,
  // reducers: {
  //   // Give case reducers meaningful past-tense "event"-style names
  //   menusFetched(state, action) {
  //     // "Mutating" update syntax thanks to Immer, and no `return` needed
  //     state.menus.push(action.payload)
  //   },
  // },
  extraReducers: (builder) => {
    // Use `extraReducers` to handle actions that were generated
    // _outside_ of the slice, such as thunks or in other slices
    builder
      .addCase(fetchUserMenus.pending, (state, action) => {
        state.status = "loading"
      })
      // Pass the generated action creators to `.addCase()`
      .addCase(fetchUserMenus.fulfilled, (state, action) => {
        // Same "mutating" update syntax thanks to Immer
        state.status = "succeeded"
        state.menuList = action.payload
      })
      .addCase(fetchUserMenus.rejected, (state, action) => {
        state.status = "failed"
        state.menus = []
        state.error = action.error
      })
  },
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
// export const { menusFetched } = menusSlice.actions

// Export the slice reducer as the default export
export default menusSlice.reducer
