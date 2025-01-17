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
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column', // Arrange children vertically
                height: '100vh',        // Full viewport height
                justifyContent: 'flex-end'
            }}
            >
            {/* Scrollable Box - 75% height */}
            <Box
                className="scrollable"
                sx={{
                overflowY: 'auto',     // Scroll when content overflows
                flexGrow: 100
                }}
            >
                {messageList.map((message) => (
                <Message
                    key={(message as MessageInterface).key}
                    response={(message as MessageInterface).msg.response}
                    source={(message as MessageInterface).msg.sources}
                />
                ))}
            </Box>

            {/* ChatBox - 25% height */}
            <Box
                sx={{
                flex: 1,               // 1 part of the total height (25%)
                display: 'flex',
                justifyContent: 'flex-end', // Center content horizontally
                alignItems: 'end',    // Center content vertically if needed
                }}
            >
                <ChatBox />
            </Box>
        </Box>
    )
}