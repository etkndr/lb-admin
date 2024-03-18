import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  menuList: {},
  currMenu: null,
  status: null,
  error: null,
}

export const fetchUserMenus = createAsyncThunk(
  "menus/fetchUserMenus",
  async () => {
    const res = await axios.get(`/api/menus/`)
    return res.data
  }
)

export const createMenu = createAsyncThunk("menus/createMenu", async (menu) => {
  const res = await axios.post(`/api/menus/`, menu)
  return res.data
})

export const editMenu = createAsyncThunk("menus/editMenu", async (menu) => {
  const res = await axios.put(`/api/menus/${menu.id}`, menu)
  return res.data
})

export const deleteMenu = createAsyncThunk("menus/deleteMenu", async (id) => {
  const res = await axios.delete(`/api/menus/${id}`)
  return res.data
})

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
        state.status = "Loading menus"
      })
      .addCase(fetchUserMenus.fulfilled, (state, action) => {
        state.status = "Succeess"
        action.payload.forEach((menu) => {
          state.menuList[menu.id] = menu
        })
      })
      .addCase(fetchUserMenus.rejected, (state, action) => {
        state.status = "Menu load failed"
        state.menuList = {}
        state.error = action.error
      })

      // createMenu
      .addCase(createMenu.fulfilled, (state, action) => {
        const menu = action.payload
        state.menuList[menu.id] = menu
        state.currMenu = menu
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.status = "Menu not added"
        state.error = action.error
      })

      // editMenu
      .addCase(editMenu.fulfilled, (state, action) => {
        const menu = action.payload
        state.menuList[menu.id] = menu
      })
      .addCase(editMenu.rejected, (state, action) => {
        state.status = "Menu not saved"
        state.error = action.error
      })

      // deleteMenu
      .addCase(deleteMenu.fulfilled, (state, action) => {
        const { id } = action.payload
        delete state.menuList[id]
        if (id === state.currMenu?.id) state.currMenu = null
      })
      .addCase(deleteMenu.rejected, (state, action) => {
        state.status = "Delete failed"
        state.error = action.error
      })
  },
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { menuSelected } = menusSlice.actions

// Export the slice reducer as the default export
export default menusSlice.reducer
