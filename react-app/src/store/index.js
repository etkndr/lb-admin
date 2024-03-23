import { configureStore } from "@reduxjs/toolkit"
import session from "./session"
import { descs } from "./desc"
import { items } from "./item"
import { sections } from "./section"
import menusSlice from "./features/menus"
import sectionsSlice from "./features/sectionsSlice"
import saveSlice from "./features/saveSlice"

export const store = configureStore({
  reducer: {
    session,
    sections,
    items,
    descs,
    menusSlice,
    sectionsSlice,
    saveSlice,
  },
})
