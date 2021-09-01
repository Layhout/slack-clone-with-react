import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Spinner from "react-spinkit";
import styled from "styled-components";
import Chat from "./components/Chat";
import Header from "./components/Header";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import { auth } from "./firebase";

function App() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        dispatch({ type: "LOG_USER_IN", data: { displayName: user.displayName, photoURL: user.photoURL } });
        setLoading(false);
      } else {
        setLoading(false);
      }
    })
  }, [dispatch])

  return (
    <div className="App">
      {loading && <LoadingScreen />}
      {!user ? <Login /> : <BrowserRouter>
        <Header />
        <AppBody>
          <Sidebar />
          <Switch>
            <Route path="/" exact>
              <Chat />
            </Route>
          </Switch>
        </AppBody>
      </BrowserRouter>}
    </div>
  );
}

export default App;

const LoadingScreen = () => {
  return (
    <AppLoading>
      <AppLoadingContents>
        <img src="https://luna1.co/dc739c.png" alt="" />
        <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
      </AppLoadingContents>
    </AppLoading>
  )
}

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
  > img{
    width: 200px;
    padding: 20px;
    margin-bottom: 50px
  }
`;
