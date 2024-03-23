import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  sectionList: {},
  newList: {},
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

export const createSection = createAsyncThunk(
  "sections/newSection",
  async (id, section) => {
    const res = await axios.post(`/api/menus/${id}/sections`, section)
    return res.data
  }
)

export const editSection = createAsyncThunk(
  "sections/editSection",
  async (id, section) => {
    const res = await axios.put(`/api/sections/${id}`, section)
    return res.data
  }
)

const sectionsSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    sectionChanged(state, action) {
      if (action.payload.new) {
        state.newList[action.payload.id] = action.payload
      } else {
        state.sectionList[action.payload.id] = action.payload
      }
    },
    newSectionCleared(state, action) {
      delete state.newList[action.payload]
    },
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

      // createSection
      .addCase(createSection.fulfilled, (state, action) => {
        const section = action.payload
        state.status = "Success"
        state.sectionList[section.id] = section
      })
      .addCase(createSection.rejected, (state, action) => {
        state.status = "Not created"
        state.error = action.error
        console.log(action.error)
      })

    // editSection
    //   .addCase(editSection.fulfilled, (state, action) => {
    //     const { id } = action.payload
    //     state.sectionList[id] = action.payload
    //   })
    //   .addCase(editSection.rejected, (state, action) => {
    //     state.status = "Not edited"
    //     state.error = action.error
    //     console.log(action.error)
    //   })
  },
})

export const { sectionChanged, newSectionCleared } = sectionsSlice.actions

export default sectionsSlice.reducer