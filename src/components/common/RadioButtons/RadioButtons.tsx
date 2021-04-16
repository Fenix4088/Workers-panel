import React, { ChangeEvent, InputHTMLAttributes, DetailedHTMLProps } from "react";
import styled from "styled-components/macro";

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type PropsType = DefaultRadioPropsType & {
    options?: any[];
    onChangeOption?: (option: any) => void;
};

export const RadioButtons: React.FC<PropsType> = ({
    type,
    name,
    options,
    value,
    onChange,
    onChangeOption,
    ...restProps
}) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChangeOption) {
            onChangeOption(e.currentTarget.value);
        }
    };

    const mappedOptions: any[] = options
        ? options.map((o, i) => (
              <RadioContainer key={name + "-" + i}>
                  <span>{o}</span>
                  <input
                      name={name}
                      type={"radio"}
                      value={o}
                      onChange={onChangeCallback}
                      checked={value === o}
                      {...restProps}
                  />
                  <Checkmark className={"checkmark"} />
              </RadioContainer>
          ))
        : [];

    return <>{mappedOptions}</>;
};

const RadioContainer = styled.label`
    // The container
    position: relative;

    display: block;

    padding-left: 25px;
    padding-right: 15px;
    margin-bottom: 12px;

    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    // Hide the browser's default radio button
    & input {
        position: absolute;

        opacity: 0;
        cursor: pointer;
    }

    // On mouse-over, add a background color
    &:hover input ~ .checkmark {
        background-color: ${({ theme }) => theme.color.grey["400"]};
    }

    // When the radio button is checked, add a blue background
    & input:checked ~ .checkmark {
        background-color: ${({ theme }) => theme.color.primary.main};
    }

    // Show the indicator (dot/circle) when checked
    & input:checked ~ .checkmark:after {
        display: block;
    }

    // Style the indicator (dot/circle)
    & .checkmark:after {
        top: 5px;
        left: 5px;

        width: 6px;
        height: 6px;

        border-radius: 50%;
        background: ${({ theme }) => theme.color.white};
    }
`;

const Checkmark = styled.div`
    // Create a custom radio button
    position: absolute;
    bottom: 2px;
    left: 0;

    height: 16px;
    width: 16px;

    background-color: ${({ theme }) => theme.color.grey["400"]};
    border-radius: 50%;

    // Create the indicator (the dot/circle - hidden when not checked)
    &:after {
        content: "";
        position: absolute;
        display: none;
    }
`;
