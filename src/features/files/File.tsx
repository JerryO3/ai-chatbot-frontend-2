import { Box, Button, Card, Typography } from "@mui/material";
import { server } from "../../App";
import store from "../../store";
import { fileListSelector, fileListLoading, fetchFileList } from "./fileListSlice";

function File(props:{name:string}) {
    return (
        <Box sx={{padding:1}}>
            <Card sx={{display:'flex'}}>
                <Box sx={{flex: 3}}>
                <Typography variant="body2" sx={{padding:1}}>
                    {props.name}
                </Typography>
                </Box>
                <Button sx={{flex: 1}} onClick={() => {deleteDocument((fileListSelector(store.getState()) as any)[props.name])}}>delete</Button>
            </Card>
        </Box>
    )
}

async function deleteDocument(doc_id: Array<string>) {
    store.dispatch(fileListLoading())
    const promiseArray = doc_id.map((x: string) => deleteHelper(x))
    return Promise.all(promiseArray).then(x => {
        store.dispatch(fetchFileList());
        return x
    })
}

export async function deleteHelper(doc_id: string) {
    const obj = {"doc_id": doc_id}
    fetch(server + "/delete/",
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
        }
    )
    .then(response => response.json())
    .catch(error => console.error(error));
}

export default File