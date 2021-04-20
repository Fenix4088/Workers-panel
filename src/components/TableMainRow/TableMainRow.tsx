import React, {useCallback} from "react";
import { useDispatch } from "react-redux";
import { changeModalStatus } from "../../App/appReducer";
import { deleteWorkersSA, WorkersT } from "../../pages/WorkersTable/workersTableReducer";
import { formatDate } from "../../helpers/helpers";
import { WorkersPanelIcon } from "../common/SvgIcons/WorkersIcon";
import styled from "styled-components/macro";
import { TableDataLoader } from "../common/Loader/Loaders";

type TableMainRowPropsT = {
    workerData: WorkersT;
    index: number;
};

export const TableMainRow: React.FC<TableMainRowPropsT> = React.memo(({ workerData, index, ...restProps }) => {
    const dispatch = useDispatch();

    const updateWorker = () =>
        dispatch(
            changeModalStatus({
                isVisible: true,
                modalType: "update",
                optionalData: workerData
            })
        );

    const deleteWorker = useCallback(() => {
        workerData._id && dispatch(deleteWorkersSA(workerData._id));
    }, [dispatch, workerData._id]);

    return (
        <TableBodyRow>
            <TableData>{index + 1}</TableData>
            <TableData>{workerData.fullName}</TableData>
            <TableData>{workerData.gender}</TableData>
            <TableData>{workerData.contacts}</TableData>
            <TableData>{workerData.updated && formatDate(workerData.updated)}</TableData>
            <TableData>{workerData.salary}</TableData>
            <TableData>{workerData.position}</TableData>
            <TableDataUsePanel>
                {workerData.isLoading ? (
                    <TableDataLoader />
                ) : (
                    <>
                        <WorkersPanelIcon icon={"delete"} width={"20"} onClick={deleteWorker} />
                        <WorkersPanelIcon icon={"update"} width={"20"} onClick={updateWorker} />
                    </>
                )}
            </TableDataUsePanel>
        </TableBodyRow>
    );
});

const TableBodyRow = styled.tr`
    transition: all 0.2s ease;

    &:nth-child(even) {
        background-color: ${({ theme }) => theme.color.primary.light};
    }

    &:hover {
        background-color: ${({ theme }) => theme.color.secondary.light};
    }
`;
const TableData = styled.td`
    text-align: center;
    padding: 10px 0;
`;

const TableDataUsePanel = styled.td`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;

    & > div {
        margin-right: 5px;

        &:last-child {
            margin-right: 0;
        }
    }
`;
