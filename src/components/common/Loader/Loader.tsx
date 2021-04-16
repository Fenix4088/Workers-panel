import React from "react";
import styled, { keyframes } from "styled-components/macro";

export const Loader = () => {
    return (
        <LoaderContainer>
            <Card/>
        </LoaderContainer>
    );
};

// Styles
const animate = keyframes`
  50% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(180deg);
  }
`;

const LoaderContainer = styled.div`
  perspective: 300px;
  width: 100%;
  height: 100%;
  position: relative;
`;

const Card = styled.div`
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100px;
  height: 150px;
  border-radius: 10px;
  background: ${({theme}) => theme.color.primary.main};
  animation: ${animate} 1.5s infinite;
  box-shadow: ${({theme}) => theme.shadow["2"]};
`;