import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  itemList: {},
  status: null,
  error: null,
}

export const fetchMenuItems = createAsyncThunk(
  "items/fetchMenuItems",
  async (id) => {
    const res = await axios.get(`/api/menus/${id}/items`)
    return res.data
  }
)

export const createItem = createAsyncThunk(
  "items/newItem",
  async (item) => {
    const res = await axios.post(
      `/api/menus/${item.menu_id}/items`,
      item
    )
    return res.data
  }
)

export const editItem = createAsyncThunk(
  "items/editItem",
  async (item) => {
    const res = await axios.put(`/api/items/${item.id}`, item)
    return res.data
  }
)

export const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async (id) => {
    const res = await axios.delete(`/api/items/${id}`)
    return { message: res.data, id }
  }
)

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchMenuItems
      .addCase(fetchMenuItems.pending, (state, action) => {
        state.status = "Loading items"
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.status = "Succeess"
        state.itemList = {}
        action.payload.forEach((item) => {
          state.itemList[item.id] = item
        })
      })
      .addCase(fetchMenuitems.rejected, (state, action) => {
        state.status = "item load failed"
        state.itemList = {}
        state.error = action.error
      })

      // createItem
      .addCase(createItem.fulfilled, (state, action) => {
        const item = action.payload
        state.status = "Success"
        state.itemList[item.id] = item
      })
      .addCase(createItem.rejected, (state, action) => {
        state.status = "Not created"
        state.error = action.error
        console.log(action.error)
      })

      // editItem
      .addCase(editItem.fulfilled, (state, action) => {
        state.itemList[action.payload.id] = action.payload
      })
      .addCase(editItem.rejected, (state, action) => {
        state.status = "Not edited"
        state.error = action.error
        console.log(action.error)
      })

      // deleteItem
      .addCase(deleteItem.fulfilled, (state, action) => {
        delete state.itemList[action.payload.id]
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.status = "Not deleted"
        state.error = action.error
        console.log(action.error)
      })
  },
})

export default itemsSlice.reducer
