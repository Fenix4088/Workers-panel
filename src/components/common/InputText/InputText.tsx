import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent } from "react";
import styled, { StyledComponentProps } from "styled-components/macro";

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & {
    // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void;
    onEnter?: () => void;
    error?: string;
};

export const InputText: React.FC<SuperInputTextPropsType> = ({
    type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
    onChange,
    onChangeText,
    onKeyPress,
    onEnter,
    error,

    ...restProps // все остальные пропсы попадут в объект restProps
}) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && // если есть пропс onChange
            onChange(e); // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value);
    };

    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        e.key === "Enter" && // если нажата кнопка Enter
            onEnter && // и есть пропс onEnter
            onEnter(); // то вызвать его
    };

    return (
        <InputTextWrapper>
            <StyledInput
                type={type}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
            />
            <StyledError>{error && <span>{error}</span>}</StyledError>
        </InputTextWrapper>
    );
};

const InputTextWrapper = styled.div`
    position: relative;

    width: 100%;
`;

const StyledInput = styled.input<StyledComponentProps<any, any, any, any>>`
    // Общие стили инпута

    padding: 1rem 0.5rem;
    margin-bottom: 20px;

    height: 20px;
    width: 100%;

    font-size: ${({ theme }) => theme.font.size.default};
    font-family: ${({ theme }) => theme.font.family.default};

    border: 1px solid rgb(109, 109, 109);
`;
// Стили контейнера с ошибкой
const StyledError = styled.div`
    position: absolute;
    bottom: 1px;

    // Стили текста ошибки
    & > span {
        font-size: ${({ theme }) => theme.font.size.s1};
        color: red;
    }
`;
