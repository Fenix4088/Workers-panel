import React from "react";
import {Circles, useLoading} from '@agney/react-loading';
import styled from "styled-components/macro";

type LoaderPropsT = {
    size: number
    color?: string
}

export function Loader(props: LoaderPropsT) {
    const {containerProps, indicatorEl} = useLoading({
        loading: true,
        indicator: <Circles />,
    });

    return (
        <LoaderWrapper {...containerProps} width={props.size} color={props.color ? props.color : ""}>
            {indicatorEl}
        </LoaderWrapper>
    );
}

const LoaderWrapper = styled.section<{width: number, color: string}>`
    width: ${props => props.width + "px"};
    color: ${({theme}) => theme.color.primary.main};
`;