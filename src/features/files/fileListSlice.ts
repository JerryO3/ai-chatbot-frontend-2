import {createSlice, createSelector} from '@reduxjs/toolkit'
import store, {RootState} from '../../store'
import { server } from '../../App'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface FileListInterface {
    isLoading: boolean
    file_list: Object
}

const initialState: FileListInterface = {isLoading: false, file_list: {}}

const fileListSlice = createSlice({
    name: 'fileList',
    initialState,
    reducers: create => ({
        // write action creators here to form the reducer
        // each element creates a function that takes in a payload for you
        fileListLoaded: create.reducer<Object>((state, action) => {
            state.file_list = action.payload
            state.isLoading = false
        }),
        fileListLoading: create.reducer((state) => {
            state.isLoading = true
        }),
    })
})

export const fileListNamesSelector = createSelector.withTypes<RootState>()(
    [
        (state: RootState) => state.fileList.file_list
    ],
    (file_list) => Object.keys(file_list)
)

export const fileListIdsSelector = createSelector.withTypes<RootState>()(
    [
        (state: RootState) => state.fileList.file_list
    ],
    (file_list) => Object.values(file_list).reduce((acc:string[], curr:string) => acc.concat(curr))
)

export const fileListSelector:(state: RootState) => (Object) = state => state.fileList.file_list

export const fileListLoadingSelector:(state: RootState) => (boolean) = state => state.fileList.isLoading

export const {fileListLoaded, fileListLoading} = fileListSlice.actions

export const fetchFileList = createAsyncThunk(
    'fetchFileList',
    async () => {
        const data = await getFileList()
        store.dispatch(fileListLoaded(data))
    }
)

async function getFileList() {
    return fetch(server + "/get-file-list/", {method: "GET"})
    .then(response => response.json())
    .then(x => {console.log(x); return x})
    .then(json => json['file_list'])
}

export default fileListSlice