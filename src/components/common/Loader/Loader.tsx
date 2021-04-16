import React from "react";
import {Circles, useLoading} from '@agney/react-loading';
import styled from "styled-components/macro";

export function Loader() {
    const {containerProps, indicatorEl} = useLoading({
        loading: true,
        indicator: <Circles />,
    });

    return (
        <LoaderWrapper {...containerProps}>
            {indicatorEl} {/* renders only while loading */}
        </LoaderWrapper>
    );
}

const LoaderWrapper = styled.section`
    width: 50px;
    color: ${({theme}) => theme.color.primary.main};
`;