// import './App.css'
import store from './store.ts'
import { Provider } from 'react-redux'
import ChatBox from "./features/chat/ChatBox"
import MessageList from "./features/chat/MessageList"
import FileList from './features/files/FileList.tsx'

import { fetchFileList } from './features/files/fileListSlice.ts'
import { clearChat } from './features/chat/messageListSlice.ts'

export const server = 'http://localhost:8000'

store.dispatch(fetchFileList())

function App() {
  return (
    <Provider store={store}>
      <FileList></FileList>
      <MessageList></MessageList>
      <ChatBox></ChatBox>
      <button onClick={() => store.dispatch(clearChat())}> Clear Chat</button>
    </Provider>
  )
}

export default App
