import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  descList: {},
  status: null,
  error: null,
}

export const fetchItemDescs = createAsyncThunk(
  "descs/fetchItemDescs",
  async (id) => {
    const res = await axios.get(`/api/items/${id}/descs`)
    return { data: res.data, itemId: id }
  }
)

export const createDesc = createAsyncThunk("descs/newDesc", async (desc) => {
  const res = await axios.post(`/api/items/${desc.item_id}/descs`, desc)
  return res.data
})

export const editDesc = createAsyncThunk("descs/editDesc", async (desc) => {
  const res = await axios.put(`/api/descs/${desc.id}`, desc)
  return res.data
})

export const deleteDesc = createAsyncThunk("descs/deleteDesc", async (data) => {
  const { itemId, descId } = data
  const res = await axios.delete(`/api/descs/${descId}`)
  return { message: res.data, itemId, descId }
})

const descsSlice = createSlice({
  name: "descs",
  initialState,
  reducers: {
    clearDescs(state, action) {
      state.descList = {}
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchItemDescs
      .addCase(fetchItemDescs.pending, (state, action) => {
        state.status = "Loading descs"
      })
      .addCase(fetchItemDescs.fulfilled, (state, action) => {
        const { data, itemId } = action.payload
        state.status = "Succeess"
        if (!state[itemId]) {
          state[itemId] = {}
        }
        data.forEach((desc) => {
          state[itemId][desc.id] = desc
        })
      })
      .addCase(fetchItemDescs.rejected, (state, action) => {
        state.status = "Desc load failed"
        state.descList = {}
        state.error = action.error
      })

      // createDesc
      .addCase(createDesc.fulfilled, (state, action) => {
        const desc = action.payload
        state.status = "Success"
        state[desc.item_id][desc.id] = desc
      })
      .addCase(createDesc.rejected, (state, action) => {
        state.status = "Not created"
        state.error = action.error
        console.log(action.error)
      })

      // editDesc
      .addCase(editDesc.fulfilled, (state, action) => {
        const desc = action.payload
        state[desc.item_id][desc.id] = action.payload
      })
      .addCase(editDesc.rejected, (state, action) => {
        state.status = "Not edited"
        state.error = action.error
        console.log(action.error)
      })

      // deleteDesc
      .addCase(deleteDesc.fulfilled, (state, action) => {
        const { itemId, descId } = action.payload
        delete state[itemId][descId]
      })
      .addCase(deleteDesc.rejected, (state, action) => {
        state.status = "Not deleted"
        state.error = action.error
        console.log(action.error)
      })
  },
})

export const { clearDescs } = descsSlice.actions

export default descsSlice.reducer
