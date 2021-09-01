import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Header = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    return (
        <HeaderContainer>
            <HeaderLeft>
                <HeaderAvatar src={user.photoURL} onClick={() => { signOut(auth); dispatch({ type: "LOG_USER_OUT" }) }} />
                <AccessTimeIcon />
            </HeaderLeft>
            <HeaderSearch>
                <SearchIcon />
                <input placeholder="Search..." />
            </HeaderSearch>
            <HeaderRight>
                <HelpOutlineIcon />
            </HeaderRight>
        </HeaderContainer>
    )
}

export default Header

const HeaderContainer = styled.div`
    display: flex;
    position: fixed;
    width:100%;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    background-color: var(--slack-color);
    color: white;
`;

const HeaderLeft = styled.div`
    flex: 0.3;
    display: flex;
    align-items: center;
    margin-left: 20px;
    > .MuiSvgIcon-root{
        margin-left: auto;
        margin-right: 30px;
    }
`;

const HeaderAvatar = styled(Avatar)`
    cursor: pointer;
    :hover{
        opacity: 0.8;
    }
`;

const HeaderSearch = styled.div`
    flex: 0.4;
    border-radius: 6px;
    background-color: #421f44;
    text-align: center;
    display: flex;
    padding: 0 50px;
    color: grey;
    border: 1px solid grey;
    > input{
        background-color: transparent;
        border: none;
        text-align: center;
        min-width: 30vw;
        outline: 0;
        color: white;
        flex: 1;
    }
`;

const HeaderRight = styled.div`
    flex: 0.3;
    display: flex;
    justify-content: flex-end;
    > .MuiSvgIcon-root{
        margin-right: 20px; 
    }
`;