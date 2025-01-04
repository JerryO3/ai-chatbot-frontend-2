import { server } from "../../App";
import store from "../../store";
import { fetchFileList, fileListLoaded, fileListLoading } from "./fileListSlice";

/**
 * UploadComponent generates the file-uploading components for FileContainer.
 * It comprises a input that takes in files and a button that uploads the 
 * selected files to the server.
 * @param props.setState is the state-setting function passed by FileContainer
 * to update the docList reactive component to refresh the files ingested on the UI
 * @returns HTML render of the file-uploading components
 */
export function UploadComponent() {

    return (
        <div className='uploadcomponent'>
            <input
                id="pathbox"
                type='file'
                multiple
                className='pathbox'
            >
            </input>
            <div className='buttonholder'>
                <button 
                    className='sendpathbutton'
                    onClick={() => uploadDocuments((document.getElementById("pathbox") as HTMLInputElement))}
                >
                    Upload Files
                </button>
            </div>
        </div>
    )
}

/**
 * Uploads documents to the server conforming to the formdata standard
 * @param fileList represents the HTML file input element containing 
 * the list of files to be uploaded.
 * @param setState is the state-setting function passed by FileContainer
 * to update the docList reactive component to refresh the files ingested on the UI
 */

function uploadDocuments(fileList: HTMLInputElement) {
    if (typeof fileList.files == "undefined" || fileList.files!.length < 1) {
        // guard clause to handle clicking upload files when there are no files
    }
    store.dispatch(fileListLoading())
    Array.from(fileList.files!).forEach(file => 
        {
            // Create a FormData to store the file
            const myData = new FormData();

            // Add file in the FormData
            myData.append("file", file);

            fetch(server + "/upload-document/", {
                // POST request with Fetch API
                method: "POST", 
                // Adding FormData to the request
                body: myData
             }).then(x => {
                store.dispatch(fetchFileList());
                return x
            })
        }
    )
}
