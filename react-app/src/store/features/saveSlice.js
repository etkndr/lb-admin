import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  editList: {
    menu: {},
    sections: {},
    items: {},
    descs: {},
  },
  createList: {
    sections: {},
    items: {},
    descs: {},
  },
}

const saveSlice = createSlice({
  name: "save",
  initialState,
  reducers: {
    menuEdited(state, action) {
      state.editList.menu = action.payload
    },
    sectionEdited(state, action) {
      state.editList.sections[action.payload.id] = action.payload
    },
    sectionCreated(state, action) {
      const list = state.createList.sections
      const len = Object.keys(list).length()
      list[len] = action.payload
    },
  },
})

export default saveSlice.reducer
