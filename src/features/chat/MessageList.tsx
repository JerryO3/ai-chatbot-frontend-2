import { useSelector } from "react-redux"
import { messageListSelector } from "./messageListSlice"
import Message from "./Message"
import { MessageInterface } from "./messageListSlice"

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import ChatBox from "./ChatBox";

import '../../styles.css'

export default function MessageList() {
    const messageList: Object[] = useSelector(messageListSelector)
    
    return (
        <Box sx={{height: visualViewport?.height? visualViewport?.height * 0.9 : 1, width:1}}>
            <Card variant="outlined" className="scrollable" sx={{ height: 0.85, overflowY: 'scroll' }}>
                {messageList.map(message => 
                <Message 
                key={(message as MessageInterface).key} 
                response={(message as MessageInterface).msg.response}
                source={(message as MessageInterface).msg.sources}
                ></Message>)}
            </Card>
            <Box sx={{position: 'fixed', width: 0.85, bottom: 1}}>
                <ChatBox></ChatBox>
            </Box>
        </Box>
    )
}