import React from "react";
import { useDispatch } from "react-redux";
import { changeModalStatus } from "../../App/appReducer";
import { deleteWorkersSA, WorkersT } from "../../pages/WorkersTable/workersTableReducer";
import { formatDate } from "../../helpers/helpers";
import { WorkersPanelIcon } from "../common/SvgIcons/WorkersIcon";
import styled from "styled-components/macro";

type TableMainRowPropsT = {
    workerData: WorkersT;
    index: number;
};

export const TableMainRow: React.FC<TableMainRowPropsT> = ({ workerData, index, ...restProps }) => {
    const dispatch = useDispatch();

    const updateWorker = () => {
        dispatch(changeModalStatus({ isVisible: true, modalType: "update", optionalData: workerData }));
    };

    const deleteWorker = () => {
        workerData._id && dispatch(deleteWorkersSA(workerData._id));
    };

    return (
        <TableBodyRow>
            <TableData>{index}</TableData>
            <TableData>{workerData.fullName}</TableData>
            <TableData>{workerData.gender}</TableData>
            <TableData>{workerData.contacts}</TableData>
            <TableData>{workerData.updated && formatDate(workerData.updated)}</TableData>
            <TableData>{workerData.salary}</TableData>
            <TableData>{workerData.position}</TableData>
            <TableDataUsePanel>
                <WorkersPanelIcon icon={"delete"} width={"20"} onClick={deleteWorker} />
                <WorkersPanelIcon icon={"update"} width={"20"} onClick={updateWorker} />
            </TableDataUsePanel>
        </TableBodyRow>
    );
};

const TableBodyRow = styled.tr``;
const TableData = styled.td`
    text-align: center;
`;

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
`;
