import {Route, Switch} from "react-router-dom";
import {routes} from "../../App/routes/routes";
import {WorkersTable} from "../../pages/WorkersTable/WorkersTable";
import {Login} from "../../pages/Login/Login";
import {Registration} from "../../pages/Registration/Registration";
import {NotFound} from "../../pages/NotFound/NotFound";
import React from "react";

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