import { configureStore } from "@reduxjs/toolkit"
import session from "./session"
import { descs } from "./desc"
import { items } from "./item"
import { sections } from "./section"
import menusSlice from "./features/menusSlice"
import sectionsSlice from "./features/sectionsSlice"
import itemsSlice from "./features/itemsSlice"
import descsSlice from "./features/descsSlice"
import saveSlice from "./features/saveSlice"

export const store = configureStore({
  reducer: {
    session,
    descs,
    menusSlice,
    sectionsSlice,
    itemsSlice,
    descsSlice,
    saveSlice,
  },
})
