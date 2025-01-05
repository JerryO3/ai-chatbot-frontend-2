import { useSelector } from "react-redux"
import { messageListSelector } from "./messageListSlice"
import Message from "./Message"
import { MessageInterface } from "./messageListSlice"

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import ChatBox from "./ChatBox";

export default function MessageList() {
    const messageList: Object[] = useSelector(messageListSelector)
    
    return (
        <Box>
            <Card variant="outlined" sx={{ maxHeight: 0.9, overflowY: 'scroll' }}>
                {messageList.map(message => 
                <Message 
                key={(message as MessageInterface).key} 
                response={(message as MessageInterface).msg.response}
                source={(message as MessageInterface).msg.sources}
                ></Message>)}
            </Card>
            <ChatBox></ChatBox>
        </Box>
    )
}