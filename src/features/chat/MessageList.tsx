import { useSelector } from "react-redux"
import { messageListSelector } from "./messageListSlice"
import Message from "./Message"

export default function MessageList() {
    const messageList: string[] = useSelector(messageListSelector)
    console.log(messageList)
    return (
        <div>
            {messageList.map(message => <Message text={message}></Message>)}
        </div>
    )
}