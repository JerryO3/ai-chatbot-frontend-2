import { combineSlices, configureStore } from "@reduxjs/toolkit";
import messageListSlice from "./features/chat/messageListSlice";
import fileListSlice from "./features/files/fileListSlice";

const rootReducer = combineSlices(messageListSlice, fileListSlice)

const store = configureStore({
    reducer: rootReducer
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
})
export type RootState = ReturnType<typeof rootReducer>
export default store