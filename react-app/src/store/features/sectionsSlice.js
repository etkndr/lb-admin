import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  sectionList: {},
  status: null,
  error: null,
}

export const fetchMenuSections = createAsyncThunk(
  "sections/fetchMenuSections",
  async (id) => {
    const res = await axios.get(`/api/menus/${id}/sections`)
    return res.data
  }
)

const sectionsSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    //   menuSelected(state, action) {
    //     state.currMenu = action.payload
    //   },
  },
  extraReducers: (builder) => {
    builder
      // fetchMenuSections
      .addCase(fetchMenuSections.pending, (state, action) => {
        state.status = "Loading sections"
      })
      .addCase(fetchMenuSections.fulfilled, (state, action) => {
        state.status = "Succeess"
        state.sectionList = {}
        action.payload.forEach((section) => {
          state.sectionList[section.id] = section
        })
      })
      .addCase(fetchMenuSections.rejected, (state, action) => {
        state.status = "Section load failed"
        state.sectionList = {}
        state.error = action.error
      })
  },
})

export default sectionsSlice.reducer
