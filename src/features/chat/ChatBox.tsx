import store from "../../store";
import { fetchResponse, messageSending } from "./messageListSlice";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';

export default function ChatBox() {
    return (
            <Card
                variant="outlined"
                sx={{
                    display: 'flex',       // Flexbox layout
                    flexWrap: 'wrap',      // Allow wrapping
                    gap: 1,                // Gap between the elements
                    width: 1,              // Full width
                    padding: 1,             // Add padding for better aesthetics
                    // justifyContent: 'flex-end'
                }}
            >
                <TextField
                    sx={{
                        "& fieldset": { border: 'none' },
                        }}
                id="textarea"
                placeholder="Ask me anything!"
                multiline
                InputProps={{
                    style: {
                        fontSize: 14, // Adjust font size here
                    },
                    }}
                fullWidth
                />
                <Button variant="contained"onClick={() => {
                    store.dispatch(messageSending((document.getElementById('textarea') as HTMLInputElement).value))
                    store.dispatch(fetchResponse((document.getElementById('textarea') as HTMLInputElement).value))
                    }}>Send</Button>
            </Card>
    )
}