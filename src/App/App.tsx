import React, {useEffect} from 'react';
import './App.css';
import { Header } from '../components/Header/Header';
import { Main } from '../components/Main/Main';
import {useDispatch} from "react-redux";
import {authSA} from "./appReducer";


function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(authSA())
    }, [dispatch])

    return (
        <>
            <Header/>
            <Main/>
        </>

    );
}

export default App;



