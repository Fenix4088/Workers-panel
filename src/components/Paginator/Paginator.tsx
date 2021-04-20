import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { RootStateT } from "../../App/store/store";
import { setCurrentUsersIndexes } from "../../App/appReducer";
import { calcPagination } from "../../helpers/helpers";
import { Button } from "../common/Button/Button";
import { v1 } from "uuid";
import styled from "styled-components/macro";

export const Paginator = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pagesList = useSelector<RootStateT, Array<number>>((state) => state.app.paginatorData.totalPageCount);
    const usersPerPage = useSelector<RootStateT, number>((state) => state.app.paginatorData.usersPerPage);

    const onPagButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // debugger;
        setCurrentPage(+e.currentTarget.value);

        const currentPage = +e.currentTarget.value;

        const lastIndex = usersPerPage * currentPage;
        const firstIndex = lastIndex - usersPerPage;
        if(lastIndex!== 0) {
            dispatch(setCurrentUsersIndexes([firstIndex, lastIndex]));

        }
    };

    return (
        <PaginatorWrap>
            {calcPagination(pagesList, currentPage).map((p) => {
                if (p !== "...") {
                    return (
                        <Button
                            key={v1()}
                            onClick={onPagButtonClick}
                            value={p}
                            style={{ backgroundColor: p === currentPage ? "#dbb145" : "" }}
                        >
                            {p}
                        </Button>
                    );
                }
                return (
                    <Button key={v1()} value={p} style={{ cursor: "auto" }}>
                        {p}
                    </Button>
                );
            })}
        </PaginatorWrap>
    );
};

const PaginatorWrap = styled.div`
    & > button {
        margin-right: 5px;

        &:last-child {
            margin-right: 0;
        }
    }
`;
