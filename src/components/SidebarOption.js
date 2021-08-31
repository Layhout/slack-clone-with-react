import { addDoc, collection } from "firebase/firestore";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { db } from "../firebase";

const SidebarOption = ({ Icon, title, addChannelOption, id }) => {
    const dispatch = useDispatch();


    const addChannel = () => {
        const channelName = prompt("Please enter the channel name");
        if (channelName) {
            addDoc(collection(db, "chatRooms"), { name: channelName });
        }
    }

    const selectChannel = () => {
        dispatch({ type: "ENTER_ROOM", data: id });
    }

    return (
        <SidebarOptionContainer onClick={addChannelOption ? addChannel : selectChannel} >
            {Icon && <Icon style={{ marginRight: "10px" }} />}
            {Icon ? <h3>{title}</h3> : <SidebarOptionChannel>
                <span>#</span> {title}
            </SidebarOptionChannel>}
        </SidebarOptionContainer>
    )
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
    display: flex;
    font-size: 12px;
    align-items: center;
    padding: 10px 10px;
    cursor: pointer;
    :hover{
        opacity: 0.9;
        background-color: #340e36;
    }
    > h3{
        font-weight: 500;
    }
    > h3 > span{
        padding: 8px;
    }
`;

const SidebarOptionChannel = styled.h3`
    padding: 10px 0;
    font-weight: 300;
`;