// import './App.css'
import store from './store.ts'
import { Provider } from 'react-redux'
import ChatBox from "./features/chat/ChatBox"
import MessageList from "./features/chat/MessageList"
import FileList from './features/files/FileList.tsx'

export const server = 'http://localhost:8000'

function App() {
  return (
    <Provider store={store}>
      <FileList></FileList>
      <MessageList></MessageList>
      <ChatBox></ChatBox>
    </Provider>
  )
}

export default App
