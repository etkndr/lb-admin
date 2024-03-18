import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { baseUrl } from "../actions"

const initialState = {
  menuList: {},
  currMenu: null,
  status: null,
  error: null,
}

export const fetchUserMenus = createAsyncThunk(
  "menus/fetchUserMenus",
  async () => {
    const res = await axios.get(`${baseUrl}/api/menus/`)
    return res.data
  }
)

export const deleteFromMenuList = createAsyncThunk(
  "menus/deleteFromMenuList",
  async (id) => {
    const res = await axios.delete(`${baseUrl}/api/menus/${id}`)
    return res.data
  }
)

const menusSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {
    menuSelected(state, action) {
      state.currMenu = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUserMenus
      .addCase(fetchUserMenus.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchUserMenus.fulfilled, (state, action) => {
        state.status = "succeeded"
        action.payload.forEach((menu) => {
          state.menuList[menu.id] = menu
        })
      })
      .addCase(fetchUserMenus.rejected, (state, action) => {
        state.status = "failed"
        state.menus = []
        state.error = action.error
      })

      // deleteFromMenuList
      .addCase(deleteFromMenuList.fulfilled, (state, action) => {
        const { id } = action.payload
        delete state.menuList[id]
      })
      .addCase(deleteFromMenuList.rejected, (state, action) => {
        state.status = "delete failed"
        state.error = action.error
      })
  },
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { menuSelected } = menusSlice.actions

// Export the slice reducer as the default export
export default menusSlice.reducer
