import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import {HashRouter} from 'react-router-dom';
import {store} from "./App/store/store";
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import {theme} from "./styles/theme";
import { GlobalStyles } from './styles/GlobalStyles';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
            <GlobalStyles />
            <HashRouter>
                <App/>
            </HashRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
