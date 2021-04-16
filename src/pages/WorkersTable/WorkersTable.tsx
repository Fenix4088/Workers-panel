import React from "react";
import {Redirect} from "react-router-dom";
import {routes} from "../../App/routes/routes";
import {useSelector} from "react-redux";
import {RootStateT} from "../../App/store/store";

export const WorkersTable = () => {
    const isLoggedIn = useSelector<RootStateT, boolean>(state => state.login.isLoggedIn);

    if (!isLoggedIn) {
        return <Redirect to={routes.login} />;
    }
    return(
        <h1>WorkersTable</h1>
    )
}

