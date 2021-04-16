import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import {routes} from "./routes/routes";
import {WorkersTable} from './pages/WorkersTable/WorkersTable';
import {Login} from './pages/Login/Login';
import {Registration} from "./pages/Registration/Registration";
import {NotFound} from './pages/NotFound/NotFound';


function App() {
    return (
        <>
            <Header/>
            <Main/>
        </>

    );
}

export default App;


export const Header = () => {
    return (
        <div>

        </div>
    )
}


export const Main = () => {
    return (
        <main>
            <Switch>
                <Route exact path={routes.main} render={() => <WorkersTable />} />
                <Route exact path={routes.login} render={() => <Login />} />
                <Route exact path={routes.registration} render={() => <Registration />} />
                <Route render={() => <NotFound />} />
            </Switch>
        </main>
    )
}