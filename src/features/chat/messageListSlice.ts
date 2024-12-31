import {createSlice, createSelector} from '@reduxjs/toolkit'
import store, {RootState} from '../../store'
import { server } from '../../App'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface ChatHistory {
    messageIDs: string[]
    messages: Object
}

export interface MessageInterface {
    key: number
    msg: {
        response: string
        sources: string | null
    }
}

const initialState: ChatHistory = getChatHistory()

const messageListSlice = createSlice({
    name: 'messageList',
    initialState,
    reducers: {
        messageSending(state, action) {
            const new_index = state.messageIDs.length.toString()
            return {
                messageIDs: state.messageIDs.concat(new_index), 
                messages: {
                    ...state.messages, 
                    [new_index]: {
                        message: {response: action.payload, sources: null}
                    }
                }
            }
        },
        messageReceived(state, action) {
            const new_index = state.messageIDs.length.toString()
            return {
                messageIDs: state.messageIDs.concat(new_index), 
                messages: {
                    ...state.messages, 
                    [new_index]: {
                        message: action.payload
                    }
                }
            }
        },
    }
})

// note that the state object's fields are added to in configure store old syntx below:
// export const messageListSelector: (state:any) => (string[]) = state => {
//     localStorage.setItem('chathistory', JSON.stringify(store.getState().messageList))
//     return (state.messageList.messageIDs as string[]).map(ids => state.messageList.messages[ids].message)
// }

// find out how create selector works, especially the bottom function!
export const messageListSelector = createSelector.withTypes<RootState>()(
    [
        (state: RootState) => state.messageList.messageIDs,
        (state: RootState) => state.messageList.messages,
    ],
    (ids, msgs) => {
        localStorage.setItem('chathistory', JSON.stringify(store.getState().messageList))
        return ids.map(id => {
            return {
                key: id,
                msg: (msgs as any)[id].message
            }
        })
    }
)


export const {messageSending, messageReceived} = messageListSlice.actions

export const fetchResponse = createAsyncThunk(
    'fetchResponse',
    async (message: string) => {
      const data = await getResponse(message)
      const response = data.response
      const sources = data.sources
      store.dispatch(messageReceived({response: response, sources: sources}))
    }
  )

export default messageListSlice

function getChatHistory(): ChatHistory {
    if (localStorage.getItem('chathistory')) {
        return (JSON.parse(localStorage.getItem('chathistory')!))
    } else {
        return {messageIDs: [], messages: {}}
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
  