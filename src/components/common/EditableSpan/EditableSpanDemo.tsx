import React, { useState } from "react";
import EditableSpan from "./EditableSpan";

export const EditableSpanDemo = () => {
    const [text, setText] = useState("Random text");
    const [error, setError] = useState("");
    const [editMode, setEditMode] = useState<boolean>(false);

    const changeText = (newText: string) => {
        setText(newText);
    };

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        if (text === "") {
            setError("The value must not be empty");
        } else {
            setError("");
            setEditMode(false);
        }
    };

    return (
        <EditableSpan
            onChangeText={changeText}
            deactivateEditMode={deactivateEditMode}
            activateEditMode={activateEditMode}
            value={text}
            editMode={editMode}
            error={error}
        />
    );
};
