import React, { useState } from "react";
import { SliderDataType } from "./ImageSliderDemo";
import { SvgArrowLeft } from "./SvgArrowLeft";
import { SvgArrowRight } from "./SvgArrowRight";
import styled, { StyledComponentProps } from "styled-components/macro";
import { ThemeType } from "../../../styles/theme";

// Component
export const ImageSlider: React.FC<ImageSliderProps> = (props) => {
    // Props
    const { imagesData } = props;

    const [currentSlide, setCurrentSlide] = useState(0);
    const imagesQuantity: number = imagesData.length;

    const nextSlide = () => {
        setCurrentSlide(currentSlide === imagesQuantity - 1 ? 0 : currentSlide + 1);
    };

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? imagesQuantity - 1 : currentSlide - 1);
    };

    const ActiveSlide = (index: number) => {
        return index === currentSlide;
    };

    return (
        <SliderMain>
            <StyledArrowLeft onClick={prevSlide} />
            <StyledArrowRight onClick={nextSlide} />
            {imagesData.map((slide, index) => {
                return (
                    <SlideWrapper key={index} active={ActiveSlide(index)}>
                        {index === currentSlide && <StyledImg src={slide.image} alt={slide.description} />}
                    </SlideWrapper>
                );
            })}
        </SliderMain>
    );
};

// Styles

const SliderMain = styled.div`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    height: 200px;
    width: 75%;
`;

const StyledArrowLeft = styled(SvgArrowLeft)`
    cursor: pointer;
    position: absolute;
    top: 45%;
    left: -15%;
    z-index: 100;
`;

const StyledArrowRight = styled(SvgArrowRight)`
    cursor: pointer;
    position: absolute;
    top: 45%;
    right: -15%;
    z-index: 100;
`;

const SlideWrapper = styled.div<StyledComponentProps<any, ThemeType, { active: boolean }, any>>`
    opacity: ${(props) => (props.active ? 1 : 0)};
    transform: ${(props) => (props.active ? "scale(1.08)" : "")};
    transition-duration: 1s;

    height: inherit;
`;

const StyledImg = styled.img`
    height: inherit;
    width: 100%;

    box-shadow: ${({ theme }) => theme.shadow["1"]};

    user-select: none;
    object-fit: cover;
`;

// Types
type ImageSliderProps = {
    imagesData: SliderDataType;
};
