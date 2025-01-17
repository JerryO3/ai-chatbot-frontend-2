import store from './store.ts'
import { Provider } from 'react-redux'
import MessageList from "./features/chat/MessageList"
import FileList from './features/files/FileList.tsx'

import { fetchFileList } from './features/files/fileListSlice.ts'

import { Box } from '@mui/material';

export const server = 'http://localhost:8000'

store.dispatch(fetchFileList())

function App() {
  return (
    <Provider store={store}>
      <ListWrapperComponent></ListWrapperComponent>
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
        overflow: 'hidden',
      }}
    >
      <Box sx={{flex: 1, height:1}}>
        <FileList></FileList>
      </Box>
      <Box sx={{flex: 6.5, height:1}}>
        <MessageList></MessageList>
      </Box>
  </Box>
  );
};