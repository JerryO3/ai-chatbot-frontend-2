import File, { deleteHelper } from "./File"
import { fileListLoadingSelector, fileListNamesSelector, fileListIdsSelector, fetchFileList } from "./fileListSlice"
import { useSelector } from "react-redux"
import { UploadComponent } from "./UploadComponent"
import { fileListLoading } from "./fileListSlice"
import { clearChat } from "../chat/messageListSlice"
import store from "../../store"

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

import '../../styles.css'

function FileList() {
    const fileList: string[] = useSelector(fileListNamesSelector)
    const isFileListLoading: boolean = useSelector(fileListLoadingSelector)

    return (
        <Box sx={{height: visualViewport?.height? visualViewport?.height * 0.9 : 1}}>
            <Card variant="outlined" className="scrollable" sx={{ height: 0.95, overflowY: 'scroll' }}>
            {fileList.map(fname => <File key={fname} name={fname}></File>)}
            </Card>
            <Box sx={{position: 'fixed', width: 0.85, bottom: 1}}>
                <UploadComponent></UploadComponent>
                <Button onClick={deleteAll}>Delete All Files</Button>
                <Button onClick={() => store.dispatch(clearChat())}> Clear Chat</Button>
            </Box>
        </Box>
    )
}

function deleteAll() {
    store.dispatch(fileListLoading())
    const promiseArray = fileListIdsSelector(store.getState()).map((x: string) => deleteHelper(x))
    return Promise.all(promiseArray).then(x => {
        store.dispatch(fetchFileList());
        return x
    })
}

export default FileList