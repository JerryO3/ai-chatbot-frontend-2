import store from "../../store";
import { fetchResponse, messageSending } from "./messageListSlice";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';

export default function ChatBox() {
    return (
        <Box>
            <Card variant="outlined"
                sx={{
                  display: 'flex',       // Flexbox layout
                  gap: 1,                // Gap between the boxes (spacing)
                }}
              >
                <Box sx={{width: 0.95}}>
                    <TextField
                        sx={{
                            "& fieldset": { border: 'none' },
                          }}
                    id="textarea"
                    placeholder="MultiLine with rows: 2 and rowsMax: 4"
                    multiline
                    InputProps={{
                        style: {
                          fontSize: 14, // Adjust font size here
                        },
                      }}
                    rows={4}
                    maxRows={4}
                    fullWidth
                    />
                </Box>
            <Button variant="contained"onClick={() => {
                store.dispatch(messageSending((document.getElementById('textarea') as HTMLInputElement).value))
                store.dispatch(fetchResponse((document.getElementById('textarea') as HTMLInputElement).value))
                }}>Send</Button>
            </Card>
        </Box>
    )
}