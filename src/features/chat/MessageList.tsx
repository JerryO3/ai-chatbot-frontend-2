import { useSelector } from "react-redux"
import { messageListSelector } from "./messageListSlice"
import Message from "./Message"
import { MessageInterface } from "./messageListSlice"

export default function MessageList() {
    const messageList: Object[] = useSelector(messageListSelector)
    
    return (
        <div>
            {messageList.map(message => <Message key={(message as MessageInterface).key} text={(message as MessageInterface).msg}></Message>)}
        </div>
    )
}