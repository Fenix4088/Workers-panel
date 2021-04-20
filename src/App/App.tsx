import React, { useEffect } from "react";
import "./App.css";
import { Header } from "../components/Header/Header";
import { Main } from "../components/Main/Main";
import { useDispatch, useSelector } from "react-redux";
import {authSA, changeModalStatus} from "./appReducer";
import { AppContainer } from "../styles/GlobalStyles";
import { RootStateT } from "./store/store";
import { Loader } from "../components/common/Loader/Loader";
import styled from "styled-components/macro";
import {WorkersT} from "../pages/WorkersTable/workersTableReducer";

function App() {
    const dispatch = useDispatch();
    const isAppLoading = useSelector<RootStateT, boolean>((state) => state.app.isAppLoading);

    const isModalOpen = useSelector<RootStateT, boolean>((state) => state.app.modalStatus.isVisible);
    useEffect(() => {
        dispatch(authSA());
    }, [dispatch]);

    const onOverlayClick = () => {dispatch(changeModalStatus({ isVisible: false, optionalData: {} as WorkersT }))
    }

    return (
        <>
            {isModalOpen && <Overlay onClick={onOverlayClick}/>}
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

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(117, 117, 117, 0.7);
    backdrop-filter: blur(5px);
    z-index: 200;
`;

export default App;
