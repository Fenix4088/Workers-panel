import { Checkbox } from "./Checkbox";
import React, { useState } from "react";

export const CheckboxDemo = () => {
    const [boolean, setBoolean] = useState(false);

    const changeCheckboxStatus = () => {
        setBoolean(!boolean);
    };

    return (
        <Checkbox onChange={changeCheckboxStatus} checked={boolean}>
            Checkbox text
        </Checkbox>
    );
};
