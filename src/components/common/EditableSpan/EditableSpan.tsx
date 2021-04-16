import React, { DetailedHTMLProps, InputHTMLAttributes, HTMLAttributes } from "react";
import { InputText } from "../InputText/InputText";
import { SvgPen } from "./SvgPen";
import styled, { StyledComponentProps } from "styled-components/macro";

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
// тип пропсов обычного спана
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperEditableSpanType = DefaultInputPropsType & {
    // и + ещё пропсы которых нет в стандартном инпуте
    value: string;
    onChangeText: (value: string) => void;
    editMode: boolean;
    deactivateEditMode: () => void;
    activateEditMode: () => void;
    error?: string;

    spanProps?: DefaultSpanPropsType; // пропсы для спана
};

const SuperEditableSpan: React.FC<SuperEditableSpanType> = (props) => {
    const {
        value,
        onChangeText,
        editMode,
        deactivateEditMode,
        activateEditMode,
        error,
        autoFocus, // Ignore autoFocus
        onBlur,
        spanProps,

        ...restProps
    } = props;

    const { children, className, ...restSpanProps } = spanProps || {};

    return (
        <>
            {editMode ? (
                <EditModeInput
                    autoFocus // autoFocus is always true
                    onChangeText={onChangeText}
                    onBlur={deactivateEditMode}
                    onEnter={deactivateEditMode}
                    error={error}
                    value={value}
                    {...restProps} // The rest of the props include value
                />
            ) : (
                <EditMOdeOff>
                    <StyledSpan onDoubleClick={activateEditMode} {...restSpanProps}>
                        {value}
                    </StyledSpan>
                    <StyledSvgPen onClick={activateEditMode} className={"StyledSvgPen"} />
                </EditMOdeOff>
            )}
        </>
    );
};

const EditModeInput = styled(InputText)<StyledComponentProps<any, any, any, any>>`
    //margin: 0;
    padding: 0;

    height: 20px;

    border: none;
    border-radius: 0;

    border-bottom: 1px solid ${({ theme }) => theme.color.grey["400"]};

    box-shadow: none;
    outline: none;

    line-height: 0;
`;

const EditMOdeOff = styled.div<StyledComponentProps<any, any, any, any>>`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    margin-bottom: 20px;

    width: 100%;
    height: 20px;
`;

const StyledSpan = styled.span<StyledComponentProps<any, any, any, any>>`
    padding-right: 10px;

    &:hover ~ .StyledSvgPen {
        fill: ${({ theme }) => theme.color.grey["500"]};
    }
`;

const StyledSvgPen = styled(SvgPen)<StyledComponentProps<any, any, any, any>>`
    fill: transparent;
    &:hover {
        fill: ${({ theme }) => theme.color.primary.main};
        cursor: pointer;
    }
`;

export default SuperEditableSpan;
