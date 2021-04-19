import React, { useEffect } from "react";
import "./App.css";
import { Header } from "../components/Header/Header";
import { Main } from "../components/Main/Main";
import { useDispatch, useSelector } from "react-redux";
import { authSA } from "./appReducer";
import { AppContainer } from "../styles/GlobalStyles";
import { RootStateT } from "./store/store";
import { Loader } from "../components/common/Loader/Loader";
import styled from "styled-components/macro";

function App() {
    const dispatch = useDispatch();
    const isAppLoading = useSelector<RootStateT, boolean>((state) => state.app.isAppLoading);
    useEffect(() => {
        dispatch(authSA());
    }, [dispatch]);

    return (
        <>
            {isAppLoading ? (
                <BigLoaderWrap>
                    <Loader size={250} />
                </BigLoaderWrap>
            ) : (
                <>
                    <Header />
                    <AppContainer>
                        <Main />
                    </AppContainer>
                </>
            )}
        </>
    );
}

const BigLoaderWrap = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export default App;
