import React from "react";
import {Circles, useLoading} from '@agney/react-loading';
import styled from "styled-components/macro";

type LoaderPropsT = {
    size: number
    color?: string
}

export const Loader = React.memo((props: LoaderPropsT) => {
    const {containerProps, indicatorEl} = useLoading({
        loading: true,
        indicator: <Circles />,
    });

    return (
        <LoaderWrapper {...containerProps} width={props.size} color={props.color ? props.color : "#4579db"}>
            {indicatorEl}
        </LoaderWrapper>
    );
})

const LoaderWrapper = styled.section<{width: number, color: string}>`
    width: ${props => props.width + "px"};
    color: ${props => props.color};
`;