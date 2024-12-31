import { Action } from '@reduxjs/toolkit'
import {createSlice, ThunkAction} from '@reduxjs/toolkit'
import store, { RootState } from '../../store'
import { server } from '../../App'
import { createAsyncThunk } from '@reduxjs/toolkit'

const initialState: string[] = getChatHistory()

const messageListSlice = createSlice({
    name: 'messageList',
    initialState,
    reducers: {
        messageSending(state, action) {
            return state.concat(action.payload)
        },
        messageReceived(state, action) {
            return state.concat(action.payload)
        }
    }
})

// note that the state object's fields are added to in configure store
export const messageListSelector: (state:any) => (string[]) = state => {
    localStorage.setItem('chathistory', JSON.stringify(store.getState().messageList))
    return state.messageList
}

export const {messageSending, messageReceived} = messageListSlice.actions

// export function fetchResponse(message: string): ThunkAction<void, RootState, unknown, Action<string>> {
//     return async (dispatch: any, getState: any) => {
//         const response = await getResponse(message)
//         dispatch(messageReceived(response))
//     }
// }

export const fetchResponse = createAsyncThunk(
    'fetchResponse',
    async (message: string) => {
      const data = await getResponse(message)
      const response = data.response
      const sources = data.sources
      store.dispatch(messageReceived(response))
      console.log(sources)
    }
  )

export default messageListSlice

function getChatHistory():string[] {
    if (localStorage.getItem('chathistory')) {
        return (JSON.parse(localStorage.getItem('chathistory')!))
    } else {
        return []
    }
}

export function getResponse(query: string) {
    const obj = {
        "prompt": query,
        "stream": false,
        "use_context": true,
        "include_sources": true}

    return fetch(server + "/submit-query/",
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
        }
    )
    .then(response => response.json())
}
  