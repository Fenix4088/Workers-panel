import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { changeModalStatus, setTotalPadeCount } from "../../App/appReducer";
import { getWorkersSA, WorkersT } from "../../pages/WorkersTable/workersTableReducer";
import { WorkersPanelIcon } from "../common/SvgIcons/WorkersIcon";
import { Search } from "../Search/Search";
import { Select } from "../common/Select/Select";
import styled from "styled-components/macro";
import { RootStateT } from "../../App/store/store";
import {calcPagination, getTotalPagesList} from "../../helpers/helpers";
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

        const pagesList = getTotalPagesList(value, workers.length, dispatch);

        dispatch(setTotalPadeCount(pagesList));
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
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pagesList = useSelector<RootStateT, Array<number>>((state) => state.app.paginatorData.totalPageCount);

    const onPagButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setCurrentPage(+e.currentTarget.value);
    };



    return (
        <PaginatorWrap>
            {
            calcPagination(pagesList, currentPage).map((p) => (
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
