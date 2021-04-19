import React from "react";
import {Circles, useLoading} from '@agney/react-loading';
import styled from "styled-components/macro";

type LoaderPropsT = {
    size: number
}

export function Loader(props: LoaderPropsT) {
    const {containerProps, indicatorEl} = useLoading({
        loading: true,
        indicator: <Circles />,
    });

    return (
        <LoaderWrapper {...containerProps} width={props.size}>
            {indicatorEl} {/* renders only while loading */}
        </LoaderWrapper>
    );
}

const LoaderWrapper = styled.section<{width: number}>`
    width: ${props => props.width + "px"};
    color: ${({theme}) => theme.color.primary.main};
`;