import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { routes } from "../../App/routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { RootStateT } from "../../App/store/store";
import styled from "styled-components/macro";
import { getWorkersSA, WorkersT } from "./workersTableReducer";
import { ModalWindow } from "../../components/Modal/ModalWindow";
import { v1 } from "uuid";
import { ModalStatusT } from "../../App/appReducer";
import { TableMainRow } from "../../components/TableMainRow/TableMainRow";
import { TableLoader } from "../../components/common/Loader/Loaders";
import { TableControlPanel } from "../../components/TableControlPanel/TableControlPanel";

export const WorkersTable = () => {
    const dispatch = useDispatch();

    const modalStatus = useSelector<RootStateT, ModalStatusT>((state) => state.app.modalStatus);

    useEffect(() => {
        dispatch(getWorkersSA());
    }, [dispatch]);

    const isLoggedIn = useSelector<RootStateT, boolean>((state) => state.login.isLoggedIn);
    const [fI, lI] = useSelector<RootStateT, Array<number>>((state) => state.app.paginatorData.currentUsersIndexes);
    const currentWorkers = useSelector<RootStateT, Array<WorkersT>>((state) => state.workers.workers.slice(fI, lI));
    const isTableLoading = useSelector<RootStateT, boolean>((state) => state.workers.isTableLoading);

    if (!isLoggedIn) {
        return <Redirect to={routes.login} />;
    }

    return (
        <MainTable>
            <TableTitle>Workers Table</TableTitle>
            <TableControlPanel />
            <TableWrapper>
                <Table>
                    <thead>
                        <TableHeaderRow>
                            <th>#</th>
                            <th>Full Name</th>
                            <th>gender</th>
                            <th>contacts</th>
                            <th>updated</th>
                            <th>salary</th>
                            <th>position</th>
                            <th></th>
                        </TableHeaderRow>
                    </thead>
                    <tbody>
                        {isTableLoading ? (
                            <TableLoader />
                        ) : (
                            currentWorkers.map((w, i) => {
                                return <TableMainRow workerData={w} index={i} key={w._id} />;
                            })
                        )}
                    </tbody>
                </Table>
                {modalStatus.isVisible && <ModalWindow type={modalStatus.modalType} />}
            </TableWrapper>
        </MainTable>
    );
};

const MainTable = styled.div``;

const TableWrapper = styled.div`
    overflow-x: auto;
`;

const Table = styled.table`
    width: 100%;
    margin: 0 auto;
    border-collapse: collapse;
    box-shadow: ${({ theme }) => theme.shadow[5]};
    border: 1px solid rgba(146, 141, 141, 0.7);
`;

const TableTitle = styled.h1`
    margin-bottom: 20px;
    text-align: center;
`;

const TableHeaderRow = styled.tr`
    background-color: ${({ theme }) => theme.color.secondary.main};

    & > th {
        padding: 20px;
    }
`;
