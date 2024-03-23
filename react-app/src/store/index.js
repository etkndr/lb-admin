import { configureStore } from "@reduxjs/toolkit"
import session from "./session"
import { descs } from "./desc"
import { items } from "./item"
import { sections } from "./section"
import menusSlice from "./features/menusSlice"

export const store = configureStore({
  reducer: { session, sections, items, descs, menusSlice },
})
