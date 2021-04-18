import React, { useEffect } from "react";
import "./App.css";
import { Header } from "../components/Header/Header";
import { Main } from "../components/Main/Main";
import { useDispatch } from "react-redux";
import { authSA } from "./appReducer";
import { AppContainer } from "../styles/GlobalStyles";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(authSA());
    }, [dispatch]);

    return (
        <>
            <Header />
            <AppContainer>
                <Main />
            </AppContainer>
        </>
    );
}

export default App;
