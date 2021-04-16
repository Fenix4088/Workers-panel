import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from "react";
import styled, {StyledComponentProps} from "styled-components/macro";

type DefaultSelectPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: any[] | undefined
    onChangeOption?: (option: any) => void
}

export const Select: React.FC<SuperSelectPropsType> = (
    {
        options, onChangeOption,
        value,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChangeOption) {
            onChangeOption(e.currentTarget.value)
        }
    }

    const mappedOptions: any[] | undefined = options ? options.map(option => {
        return (
            <React.Fragment key={option}>
                <StyledInput onChange={onChangeCallback}
                             name="test" type="radio"
                             id={option}
                             value={option}
                             checked={value === option}
                             {...restProps}
                />
                <Option className={"option"} htmlFor={option}>{option}</Option>
            </React.Fragment>
        )
    }) : undefined;

return (
        <SelectWrapper tabIndex={1}>
            {mappedOptions}
</SelectWrapper>
)
    ;
}

// Styles
const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;

  width: 250px;
  height: 40px;
  outline: none;

  cursor: pointer;

  

  &:focus {
    box-shadow: none;
    
    & .option {
      position: relative;

      pointer-events: all;
    }
  }
`

const Option = styled.label`
  display: flex;
  align-items: center;

  box-sizing: border-box;
  position: absolute;
  top: 0;
  z-index: 1;

  width: 100%;

  padding: 0 30px 0 10px;

  min-height: 40px;

  background: ${({theme}) => theme.color.grey["200"]};
  color: ${({theme}) => theme.color.black};
  border: none;
  border-top: ${({theme}) => theme.color.primary.light} solid 1px;

  pointer-events: none;
  order: 2;
  transition: background .4s ease-in-out;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    color: ${({theme}) => theme.color.white};
    background: ${({theme}) => theme.color.primary.main};
  }
`

const StyledInput = styled.input<StyledComponentProps<any, any, any, any>>`
  position: absolute;
  left: -99999px;
  
  opacity: 0;

  // Active value
  &:checked + label {
    order: 1;
    position: relative;
    z-index: 2;

    background: ${({theme}) => theme.color.grey["200"]};
    border-top: none;

    &:hover {
      color: ${({theme}) => theme.color.white};
      background: ${({theme}) => theme.color.primary.main};
    }
  }

  // Arrow
  &:checked + label:after {
    content: '';
    
    position: absolute;
    right: 15px;
    top: calc(50% - 2.5px);
    z-index: 3;

    width: 0;
    height: 0;

    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid white;
    pointer-events: none;
  }

  // Square containing the arrow
  &:checked + label:before {
    content: '';
    
    position: absolute;
    right: 0;

    height: 40px;
    width: 40px;

    background: ${({theme}) => theme.color.primary.main};
  }
`