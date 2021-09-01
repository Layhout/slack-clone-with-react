import styled from "styled-components";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined"
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined"
import { useSelector } from "react-redux";
import ChatInput from "./ChatInput";
import { useEffect } from "react";
import { collection, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import Message from "./Message";
import { useRef } from "react";

const Chat = () => {
    const roomId = useSelector(state => state.roomId);
    const [roomName, setRoomName] = useState(null);
    const [roomMessages, setRoomMessages] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (roomId) {
            getDoc(doc(db, "chatRooms", roomId)).then(d => setRoomName(d.data().name));
            onSnapshot(query(collection(db, `chatRooms/${roomId}/messages`), orderBy("timestamp")), (snap => {
                setRoomMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
            }));
        }
    }, [roomId])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [roomMessages])

    return (
        roomId && <ChatContainer>
            <Header>
                <HeaderLeft>
                    <h4>
                        <strong>#{roomName}</strong>
                    </h4>
                    <StarBorderOutlinedIcon />
                </HeaderLeft>
                <HeaderRight>
                    <p>
                        <InfoOutlinedIcon /> Details
                    </p>
                </HeaderRight>
            </Header>
            <ChatMessages>
                {roomMessages.map(rm => (
                    <Message key={rm.id} message={rm.message} timestamp={rm.timestamp} user={rm.user} userImage={rm.userImage} />
                ))}
                <div ref={scrollRef} style={{ height: "100px" }}></div>
            </ChatMessages>
            <ChatInput channelId={roomId} channelName={roomName} />
        </ChatContainer>
    )
}

export default Chat

const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overFlow-y: scroll;
    margin-top: 60px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding:20px;
    border-bottom: 1px solid lightgrey;
    position: fixed;
    top: 60px;
    background-color: white;
    width: 85.5%;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    > h4{
        display: flex;
        text-transform: lowercase;
        margin-right: 10px;
    }
    > h4 > .MuiSvgIcon-root{
        margin-left: 10px;
        font-size: 18px;
    }
`;

const HeaderRight = styled.div`
    > p{
        display: flex;
        align-items: center;
        font-size: 14px;
    }
    > p > .MuiSvgIcon-root{
        margin-right: 5px !important;
        font-size: 16px;
    }
`;

const ChatMessages = styled.div`
    margin-top: 60px;
`;