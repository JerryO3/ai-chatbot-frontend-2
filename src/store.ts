import { combineSlices, configureStore } from "@reduxjs/toolkit";
import messageListSlice from "./features/chat/messageListSlice";

const rootReducer = combineSlices(messageListSlice)

const store = configureStore({
    reducer: rootReducer
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
})
export type RootState = ReturnType<typeof rootReducer>
export default store