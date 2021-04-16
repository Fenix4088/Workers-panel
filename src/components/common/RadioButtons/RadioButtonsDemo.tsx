import { RadioButtons } from "./RadioButtons";
import React, { useState } from "react";

export const RadioButtonsDemo = () => {
    const arr = ["One", "Two", "Three"];
    const [value, onChangeOption] = useState(arr[0]);

    return <RadioButtons options={arr} value={value} onChangeOption={onChangeOption} />;
};
