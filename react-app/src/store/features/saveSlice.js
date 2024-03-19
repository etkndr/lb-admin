import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  menu: {},
  sections: [],
  newSections: [],
  items: {},
  descs: {},
}

const saveSlice = createSlice({
  name: "save",
  initialState,
  reducers: {
    clearChanges(state, action) {
      state.newSections = []
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
