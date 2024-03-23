import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  menu: {},
  sections: [],
  newSections: [],
  items: [],
  newItems: [],
  descs: [],
  newDescs: [],
}

export const commitSave = createAsyncThunk("save/commitSave", async (list) => {
  const { menu, sections, newSections } = list
})

const saveSlice = createSlice({
  name: "save",
  initialState,
  reducers: {
    clearChanges(state, action) {
      state.menu = {}
      state.sections = []
      state.newSections = []
      state.items = []
      state.newItems = []
      state.descs = []
      state.newDescs = []
    },
    menuChanged(state, action) {
      state.menu = action.payload
    },
    sectionChanged(state, action) {
      const section = action.payload
      if (section.new) {
        state.newSections.push(section)
      } else {
        state.sections.push(action.payload)
      }
    },
  },
})

export const { clearChanges, menuChanged, sectionChanged } = saveSlice.actions

export default saveSlice.reducer
