import { Button } from "@material-ui/core";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { db } from "../firebase";

const ChatInput = ({ channelName, channelId }) => {
    const inputRef = useRef(null);
    const user = useSelector(state => state.user);

    const sendMessage = e => {
        e.preventDefault();
        if (!channelId) {
            return false;
        }
        addDoc(collection(db, `chatRooms/${channelId}/messages`), {
            message: inputRef.current.value,
            timestamp: serverTimestamp(),
            user: user.displayName,
            userImage: user.photoURL,
        });
        inputRef.current.value = "";
    }

    return (
        <ChatInputContainer>
            <form>
                <input placeholder={`Message #${channelName}`} ref={inputRef} />
                <Button hidden type="submit" onClick={sendMessage}>
                    Send
                </Button>
            </form>
        </ChatInputContainer>
    )
}

export default ChatInput

const ChatInputContainer = styled.div`
    border-radius: 20px;
    > form{
        position: fixed;
        bottom: 30px;
        display: flex;
        justify-content: center;
        width: 85.5%;
    }
    > form > input{
        width: 60%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }
    > form > button{
        display: none;
    }
`;