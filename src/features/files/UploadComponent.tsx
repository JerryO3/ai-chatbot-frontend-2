import { server } from "../../App";
import store from "../../store";
import { fetchFileList, fileListLoaded, fileListLoading } from "./fileListSlice";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Input } from "@mui/material";
import Typography from "@mui/material/Typography";

const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files?.length) {
        console.log("Selected files:", files);
    }
};

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
        <Box className='uploadcomponent'>
            <Box sx={{width:250}}>
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                p: 3,
                border: '2px dashed #ccc',
                borderRadius: '12px',
                backgroundColor: '#f9f9f9',
                maxWidth: '400px',
                margin: 'auto',
                textAlign: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                '&:hover': {
                    backgroundColor: '#f1f1f1',
                },
            }}
        >
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                Drag and Drop Your Files Here
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                or click to select files
            </Typography>

            <Button
                variant="contained"
                component="label"
                sx={{
                    textTransform: 'none',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    // p: 1.5,
                    width: 'fit-content',
                }}
            >
                Choose Files
                <input
                    id="pathbox"
                    type="file"
                    hidden
                    multiple
                    onChange={handleFileSelection}
                />
            </Button>
            <div className='buttonholder'>
                    <Button variant="outlined" 
                        className='sendpathbutton'
                        onClick={() => uploadDocuments((document.getElementById("pathbox") as HTMLInputElement))}
                    >
                        Upload Files
                    </Button>
                </div>
        </Box>
            </Box>
        </Box>
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
