import { useDispatch, useSelector } from "react-redux";
import { RootStateT } from "../../App/store/store";
import { getWorkersSA, setFilteredWorkers, WorkersT } from "../../pages/WorkersTable/workersTableReducer";
import React, { FormEvent, useState } from "react";
import { WorkersPanelIcon } from "../common/SvgIcons/WorkersIcon";
import { InputText } from "../common/InputText/InputText";
import styled from "styled-components/macro";

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
            <SearchInputWrap>
                <SearchIconWrap>
                    <WorkersPanelIcon icon={"search"} width={"20"} />
                </SearchIconWrap>
                <InputText value={searchVal} type={"search"} placeholder={"Search by name..."} onInput={searchWorkers} />
            </SearchInputWrap>
        </SearchWrap>
    );
};

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

const SearchInputWrap = styled.div`
  position: relative;
    min-width: 200px;
`;


