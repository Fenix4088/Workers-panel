import React from "react";
import {Redirect} from "react-router-dom";
import {routes} from "../../App/routes/routes";
import {useSelector} from "react-redux";
import {RootStateT} from "../../App/store/store";
import styled from "styled-components/macro";
import {WorkersT} from "./workersTableReducer";

export const WorkersTable = () => {
    const isLoggedIn = useSelector<RootStateT, boolean>(state => state.login.isLoggedIn);
    const workers = useSelector<RootStateT, Array<WorkersT>>(state => state.workers.workers)

    if (!isLoggedIn) {
        return <Redirect to={routes.login} />;
    }
    return(
        <>
            <h1>WorkersTable</h1>
            <TableWrapper>
                <Table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>gender</th>
                        <th>contacts</th>
                        <th>updated</th>
                        <th>salary</th>
                        <th>position</th>
                    </tr>
                    </thead>
                    <tbody>
                    {workers.map((w, i) => {
                        return <tr>
                            <td>{i}</td>
                            <td>{w.fullName}</td>
                            <td>{w.gender}</td>
                            <td>{w.contacts}</td>
                            <td>{w.updatedAt}</td>
                            <td>{w.salary}</td>
                            <td>{w.position}</td>
                        </tr>
                    })}
                    </tbody>
                </Table>
            </TableWrapper>
        </>

    )
}

const TableWrapper = styled.div`
  overflow-x: auto
`;

const Table = styled.table`
    width: 80%;
    border-collapse: collapse;
    border: 1px solid black;
    
`;

