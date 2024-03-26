import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  status: null,
  error: null,
}

export const fetchSectionItems = createAsyncThunk(
  "items/fetchSectionItems",
  async (sectionId) => {
    const res = await axios.get(`/api/sections/${sectionId}/items`)
    return { data: res.data, sectionId }
  }
)

export const createItem = createAsyncThunk("items/newItem", async (data) => {
  const { sectionId, item } = data
  const res = await axios.post(`/api/sections/${sectionId}/items`, item)
  return { item: res.data, sectionId }
})

export const editItem = createAsyncThunk("items/editItem", async (data) => {
  const { sectionId, item } = data
  console.log(data)
  const res = await axios.put(`/api/items/${item.id}`, item)
  return { item: res.data, sectionId }
})

export const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async (sectionId, id) => {
    const res = await axios.delete(`/api/items/${id}`)
    return { message: res.data, id, sectionId }
  }
)

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchSectionItems
      .addCase(fetchSectionItems.pending, (state, action) => {
        state.status = "Loading items"
      })
      .addCase(fetchSectionItems.fulfilled, (state, action) => {
        state.status = "Succeess"
        const { sectionId, data } = action.payload

        if (!state[sectionId]) {
          state[sectionId] = {}
          data.forEach((item) => {
            state[sectionId][item.id] = item
          })
        }
      })
      .addCase(fetchSectionItems.rejected, (state, action) => {
        state.status = "item load failed"
        state.itemList = {}
        state.error = action.error
      })

      // createItem
      .addCase(createItem.fulfilled, (state, action) => {
        const { item, sectionId } = action.payload
        state.status = "Success"
        state[sectionId][item.id] = item
      })
      .addCase(createItem.rejected, (state, action) => {
        state.status = "Not created"
        state.error = action.error
        console.log(state.error)
      })

      // editItem
      .addCase(editItem.fulfilled, (state, action) => {
        const { item, sectionId } = action.payload
        state[sectionId][item.id] = item
      })
      .addCase(editItem.rejected, (state, action) => {
        state.status = "Not edited"
        state.error = action.error
        console.log(action.error)
      })

      // deleteItem
      .addCase(deleteItem.fulfilled, (state, action) => {
        const { sectionId, itemId } = action.payload
        delete state[sectionId][itemId]
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.status = "Not deleted"
        state.error = action.error
        console.log(action.error)
      })
  },
})

export default itemsSlice.reducer
