import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { changeModalStatus, setCurrentUsersIndexes, setPageData } from "../../App/appReducer";
import { getWorkersSA, setWorkers, WorkersT } from "../../pages/WorkersTable/workersTableReducer";
import { WorkersPanelIcon } from "../common/SvgIcons/WorkersIcon";
import { Search } from "../Search/Search";
import { Select } from "../common/Select/Select";
import styled from "styled-components/macro";
import { RootStateT } from "../../App/store/store";
import { calcPagination, getTotalPagesList } from "../../helpers/helpers";
import { Button } from "../common/Button/Button";
import { v1 } from "uuid";

type SelectValT = "5" | "10" | "25" | "all";

export const TableControlPanel = () => {
    const dispatch = useDispatch();
    const [selectedVal, setSelectedVal] = useState<SelectValT>("all");
    const workers = useSelector<RootStateT, Array<WorkersT>>((state) => state.workers.workers);

    const addWorker = () =>
        dispatch(
            changeModalStatus({
                isVisible: true,
                modalType: "add",
                optionalData: {} as WorkersT
            })
        );

    const onSelectChange = (value: SelectValT) => {
        setSelectedVal(value);
        if (value !== "all") {
            const pagesList = getTotalPagesList(value, workers.length, dispatch);
            dispatch(setPageData(pagesList, +value));
            dispatch(setCurrentUsersIndexes([0, +value]));
        } else {
            dispatch(setCurrentUsersIndexes([0]));
            dispatch(setPageData([0], 0));
        }
    };

    return (
        <TablePanelWrap>
            <WorkersPanelIcon icon={"add"} width={"30"} onClick={addWorker} />
            <Search />
            <Select options={["5", "10", "25", "all"]} value={selectedVal} onChangeOption={onSelectChange} />
            <Paginator />
        </TablePanelWrap>
    );
};

export const Paginator = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pagesList = useSelector<RootStateT, Array<number>>((state) => state.app.paginatorData.totalPageCount);
    const usersPerPage = useSelector<RootStateT, number>((state) => state.app.paginatorData.usersPerPage);

    const onPagButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setCurrentPage(+e.currentTarget.value);

        const currentPage = +e.currentTarget.value;

        const lastIndex = usersPerPage * currentPage;
        const firstIndex = lastIndex - usersPerPage;
        dispatch(setCurrentUsersIndexes([firstIndex, lastIndex]));
    };

    return (
        <PaginatorWrap>
            {calcPagination(pagesList, currentPage).map((p) => (
                <Button key={v1()} onClick={onPagButtonClick} value={p}>
                    {p}
                </Button>
            ))}
        </PaginatorWrap>
    );
};

const TablePanelWrap = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    & > * {
        margin-right: 20px;
    }
`;

const PaginatorWrap = styled.div`
    & > button {
        margin-right: 5px;

        &:last-child {
            margin-right: 0;
        }
    }
`;
