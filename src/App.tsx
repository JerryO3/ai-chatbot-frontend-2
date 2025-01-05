import store from './store.ts'
import { Provider } from 'react-redux'
import MessageList from "./features/chat/MessageList"
import FileList from './features/files/FileList.tsx'

import { fetchFileList } from './features/files/fileListSlice.ts'
import { clearChat } from './features/chat/messageListSlice.ts'

import { Box } from '@mui/material';

export const server = 'http://localhost:8000'

store.dispatch(fetchFileList())

function App() {
  return (
    <Provider store={store}>
      <ListWrapperComponent></ListWrapperComponent>
      <button onClick={() => store.dispatch(clearChat())}> Clear Chat</button>
    </Provider>
  )
}

export default App

const ListWrapperComponent = () => {
  return (
    <Box
      sx={{
        display: 'flex',       // Flexbox layout
        gap: 2,                // Gap between the boxes (spacing)
        maxHeight: visualViewport?.height? visualViewport?.height * 0.95 : 1
      }}
    >
    <FileList></FileList>
    <MessageList></MessageList>
  </Box>
  );
};