import React, {useEffect} from "react";
import {Redirect} from "react-router-dom";
import {routes} from "../../App/routes/routes";
import {useDispatch, useSelector} from "react-redux";
import {RootStateT} from "../../App/store/store";
import styled from "styled-components/macro";
import {deleteWorkersSA, getWorkersSA, WorkersT} from "./workersTableReducer";
import {formatDate} from "../../helpers/helpers";
import {WorkersPanelIcon} from "../../components/common/SvgIcons/WorkersIcon";
import {workersApi} from "../../api/api";

export const WorkersTable = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWorkersSA())
    }, [dispatch])

    const isLoggedIn = useSelector<RootStateT, boolean>(state => state.login.isLoggedIn);
    const workers = useSelector<RootStateT, Array<WorkersT>>(state => state.workers.workers);

    if (!isLoggedIn) {
        return <Redirect to={routes.login}/>;
    }



    return (
        <>
            <h1>WorkersTable</h1>
            <WorkersPanelIcon icon={"add"} width={"30"}/>
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
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {workers.map((w, i) => {
                        const deleteWorker = () => {
                            dispatch(deleteWorkersSA(w._id))
                        }

                        return <TableBodyRow key={w._id}>
                            <TableData>{i}</TableData>
                            <TableData>{w.fullName}</TableData>
                            <TableData>{w.gender}</TableData>
                            <TableData>{w.contacts}</TableData>
                            <TableData>{formatDate(w.updated)}</TableData>
                            <TableData>{w.salary}</TableData>
                            <TableData>{w.position}</TableData>
                            <TableDataUsePanel>
                                <WorkersPanelIcon icon={"delete"} width={"20"} onClick={deleteWorker}/>
                                <WorkersPanelIcon icon={"update"} width={"20"}/>
                            </TableDataUsePanel>
                        </TableBodyRow>
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

const TableBodyRow = styled.tr``
const TableData = styled.td`
  text-align: center;
`

const TableDataUsePanel = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    margin-right: 5px;
    &:last-child {
      margin-right: 0;
    }
  }
`


