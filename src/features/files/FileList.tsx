import File, { deleteHelper } from "./File"
import { fileListLoadingSelector, fileListNamesSelector, fileListIdsSelector, fetchFileList } from "./fileListSlice"
import { useSelector } from "react-redux"
import { UploadComponent } from "./UploadComponent"
import { fileListLoading } from "./fileListSlice"
import store from "../../store"

function FileList() {
    const fileList: string[] = useSelector(fileListNamesSelector)
    const isFileListLoading: boolean = useSelector(fileListLoadingSelector)

    return (
        <div>
            {fileList.map(fname => <File key={fname} name={fname}></File>)}
            <button onClick={deleteAll}>Delete All</button>
            <UploadComponent></UploadComponent>
        </div>
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