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
    return res.data
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

export const deleteDesc = createAsyncThunk("descs/deleteDesc", async (id) => {
  const res = await axios.delete(`/api/descs/${id}`)
  return { message: res.data, id }
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
        state.status = "Succeess"
        action.payload.forEach((desc) => {
          state.descList[desc.id] = desc
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
        state.descList[desc.id] = desc
      })
      .addCase(createDesc.rejected, (state, action) => {
        state.status = "Not created"
        state.error = action.error
        console.log(action.error)
      })

      // editDesc
      .addCase(editDesc.fulfilled, (state, action) => {
        state.descList[action.payload.id] = action.payload
      })
      .addCase(editDesc.rejected, (state, action) => {
        state.status = "Not edited"
        state.error = action.error
        console.log(action.error)
      })

      // deleteDesc
      .addCase(deleteDesc.fulfilled, (state, action) => {
        delete state.descList[action.payload.id]
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
