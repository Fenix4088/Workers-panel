import React, { FormEvent, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { routes } from "../../App/routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { RootStateT } from "../../App/store/store";
import styled from "styled-components/macro";
import { getWorkersSA, setFilteredWorkers, WorkersT } from "./workersTableReducer";
import { WorkersPanelIcon } from "../../components/common/SvgIcons/WorkersIcon";
import { ModalWindow } from "../../components/Modal/ModalWindow";
import { v1 } from "uuid";
import { changeModalStatus, ModalStatusT } from "../../App/appReducer";
import { TableMainRow } from "../../components/TableMainRow/TableMainRow";
import { InputText } from "../../components/common/InputText/InputText";
import { MB } from "../../styles/GlobalStyles";

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
        <>
            <h1>WorkersTable</h1>
            <TablePanelWrap>
                <WorkersPanelIcon icon={"add"} width={"30"} onClick={addWorker} />
                <Search />
            </TablePanelWrap>

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
                            return <TableMainRow workerData={w} index={i} key={w._id ? w._id : v1()} />;
                        })}
                    </tbody>
                </Table>

                {modalStatus.isVisible && <ModalWindow type={modalStatus.modalType} />}
            </TableWrapper>
        </>
    );
};

export const Search = () => {
    const dispatch = useDispatch();
    const workers = useSelector<RootStateT, Array<WorkersT>>((state) => state.workers.workers);
    const [searchVal, setSearchVal] = useState<string>("");

    const searchWorkers = (e: FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        setSearchVal(value);

        if (!value.trim()) {
            dispatch(getWorkersSA());
        } else {
            const matchedWorkers = workers.filter((w) => w.fullName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
            dispatch(setFilteredWorkers(matchedWorkers));
        }
    };

    return (
        <SearchWrap>
            <SearchIconWrap>
                <WorkersPanelIcon icon={"search"} width={"20"} />
            </SearchIconWrap>
            <InputText value={searchVal} type={"search"} placeholder={"Search by name..."} onInput={searchWorkers} />
        </SearchWrap>
    );
};

const TableWrapper = styled.div`
    overflow-x: auto;
`;

const Table = styled.table`
    width: 80%;
    border-collapse: collapse;
    border: 1px solid black;
`;

const SearchWrap = styled.div`
    width: 20%;
    position: relative;
`;

const SearchIconWrap = styled.div`
    position: absolute;
    top: 50%;
    right: 2%;
    transform: translateY(-50%);
    z-index: 100;
`;

const TablePanelWrap = styled.div`
    display: flex;
    align-items: center;
`;
