import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { changeModalStatus, setCurrentUsersIndexes, setPageData } from "../../App/appReducer";
import { WorkersT } from "../../pages/WorkersTable/workersTableReducer";
import { WorkersPanelIcon } from "../common/SvgIcons/WorkersIcon";
import { Search } from "../Search/Search";
import { Select } from "../common/Select/Select";
import styled from "styled-components/macro";
import { RootStateT } from "../../App/store/store";
import { getTotalPagesList } from "../../helpers/helpers";
import { Paginator } from "../Paginator/Paginator";

type SelectValT = "5" | "10" | "25" | "all";

export const TableControlPanel = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState<number>(1);
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
            dispatch(setPageData([1], workers.length));
        }

        setCurrentPage(1);
    };

    return (
        <TablePanelWrap>
            <AddUser>
                <WorkersPanelIcon icon={"add"} width={"30"} onClick={addWorker} />
            </AddUser>
            <Search />
            <SelectWrap>
                <Select options={["5", "10", "25", "all"]} value={selectedVal} onChangeOption={onSelectChange} />
            </SelectWrap>
            <Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </TablePanelWrap>
    );
};

const TablePanelWrap = styled.div`
    margin-bottom: 20px;
    display: grid;
    align-items: center;
    grid-template-rows: 1fr;
    grid-template-columns: 5% 20% 30% 45%;
    grid-template-areas: "addUser search select paginator";

    & > * {
        margin-right: 20px;
    }

    @media (max-width: 768px) {
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 25% 25%;
        grid-template-areas:
            "addUser addUser search  search"
            "select select  paginator paginator";
    }

    @media (max-width: 600px) {
        justify-items: stretch;
        //align-items: center;
        grid-template-rows: 1fr 1fr 1fr 1fr;
        grid-template-columns: 100%;
        grid-template-areas:
            "addUser"
            "search"
            "select"
            "paginator";
    }
`;

const AddUser = styled.span`
    grid-area: addUser;
`;

const SelectWrap = styled.span`
    grid-area: select;

`;
