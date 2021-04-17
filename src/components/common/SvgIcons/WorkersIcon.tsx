import React, {HTMLAttributes} from "react";
import {DetailedHTMLProps} from "react";
import styled from "styled-components/macro";

type WorkersPanelIconT = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    icon: "add" | "update" | "delete"
    width: "10" | "20" | "30" | "40" | "50" | "60" | "70" | "80" | "90" | "100"
}

export const WorkersPanelIcon = (props: WorkersPanelIconT) => {
    const {icon, width, ...restProps} = props;
    let finalIcon;

    switch (icon) {
        case "add":
            finalIcon = <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-plus"
                             className="svg-inline--fa fa-user-plus fa-w-20" role="img"
                             xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 640 512" width={width}>
                <path fill="#12b110"
                      d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
            </svg>
            break;
        case "update":
            finalIcon = <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen"
                             className="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512" width={width}>
                <path fill="#ec9c0a"
                      d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path>
            </svg>
            break
        case "delete":
            finalIcon = <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-minus"
                             className="svg-inline--fa fa-user-minus fa-w-20" role="img"
                             xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 640 512" width={width}>
                <path fill="#ec0a0a"
                      d="M624 208H432c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h192c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
            </svg>;
            break;
        default:
            throw new Error("Please choose icon type => \"add\" | \"update\" | \"delete\"");
    }

    return (
        <IconWrapper
            {...restProps}>
            {finalIcon}
        </IconWrapper>
    )
}

const IconWrapper = styled.div<any>`
    cursor: pointer;
`