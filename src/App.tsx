// import './App.css'
import store from './store.ts'
import { Provider } from 'react-redux'
import ChatBox from "./features/chat/ChatBox"
import MessageList from "./features/chat/MessageList"

export const server = 'http://localhost:8000'

function App() {
  return (
    <Provider store={store}>
      <MessageList></MessageList>
      <ChatBox></ChatBox>
    </Provider>
  )
}

export default App
