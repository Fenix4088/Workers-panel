import { InputText } from "./InputText";
import React, { useState } from "react";

export const InputTextDemo = () => {
    const [text, setText] = useState("");
    const [error, setError] = useState("");

    const changeText = (newText: string) => {
        setText(newText);
    };

    // if the value is empty displays error
    const checkValue = () => {
        if (text === "") {
            setError("The value must not be empty");
        } else {
            if (error !== "") {
                setError("");
            }
        }
    };

    return <InputText onChangeText={changeText} onEnter={checkValue} value={text} error={error} />;
};
