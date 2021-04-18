import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { routes } from "../../App/routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { RootStateT } from "../../App/store/store";
import styled from "styled-components/macro";
import { getWorkersSA, WorkersT } from "./workersTableReducer";
import { WorkersPanelIcon } from "../../components/common/SvgIcons/WorkersIcon";
import { ModalWindow } from "../../components/Modal/ModalWindow";
import { v1 } from "uuid";
import { changeModalStatus, ModalStatusT } from "../../App/appReducer";
import { TableMainRow } from "../../components/TableMainRow/TableMainRow";
import { Search } from "../../components/Search/Search";

export const WorkersTable = () => {
    const dispatch = useDispatch();
    const modalStatus = useSelector<RootStateT, ModalStatusT>((state) => state.app.modalStatus);

    useEffect(() => {
        dispatch(getWorkersSA());
    }, [dispatch]);

    const isLoggedIn = useSelector<RootStateT, boolean>((state) => state.login.isLoggedIn);
    const workers = useSelector<RootStateT, Array<WorkersT>>((state) => state.workers.workers);

    if (!isLoggedIn) {
        return <Redirect to={routes.login} />;
    }

    const addWorker = () =>
        dispatch(
            changeModalStatus({
                isVisible: true,
                modalType: "add",
                optionalData: {} as WorkersT
            })
        );

    return (
        <MainTable>
            <TableTitle>Workers Table</TableTitle>

            <TablePanelWrap>
                <WorkersPanelIcon icon={"add"} width={"30"} onClick={addWorker} />
                <Search />
            </TablePanelWrap>

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
                        {workers.map((w, i) => {
                            return <TableMainRow workerData={w} index={i} key={w._id ? w._id : v1()} />;
                        })}
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
    border: 1px solid black;
`;

const TablePanelWrap = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    & > * {
        margin-right: 20px;
    }
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
