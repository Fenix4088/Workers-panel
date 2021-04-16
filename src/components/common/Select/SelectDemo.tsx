import { Select } from "./Select";
import React, { useState } from "react";

export const SelectDemo = () => {
    const arr = ["One", "Two", "Three"];
    const [value, onChangeOption] = useState(arr[1]);

    return <Select options={arr} value={value} onChangeOption={onChangeOption} />;
};
