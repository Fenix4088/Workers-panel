import {Loader} from "./Loader";
import React from "react";
import styled from "styled-components/macro";

export const TableLoader = () => {
    return(
        <LoaderWrapper>
            <td>
                <Loader size={200} />
            </td>
        </LoaderWrapper>
    )
}


export const TableDataLoader = () => {
    return (
        <TableItemLoader>
            <Loader size={25} color={"#dbb145"} />
        </TableItemLoader>
    );
};

const TableItemLoader = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-10%);
`;


const LoaderWrapper = styled.tr`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;