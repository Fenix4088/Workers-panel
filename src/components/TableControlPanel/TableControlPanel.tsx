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

const TablePanelWrap = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    & > * {
        margin-right: 20px;
    }
`;

