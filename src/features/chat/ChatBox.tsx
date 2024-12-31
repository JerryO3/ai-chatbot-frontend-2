import store from "../../store";
import { fetchResponse, messageSending } from "./messageListSlice";

export default function ChatBox() {
    return (
        <>
            <textarea id="textarea"></textarea>
            <button onClick={() => {
                store.dispatch(messageSending((document.getElementById('textarea') as HTMLInputElement).value))
                store.dispatch(fetchResponse((document.getElementById('textarea') as HTMLInputElement).value))
                }}>Send</button>
        </>
    )
}