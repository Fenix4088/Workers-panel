import React from "react";
import styled from "styled-components/macro";
import { InputText } from "../common/InputText/InputText";
import { RadioButtons } from "../common/RadioButtons/RadioButtons";
import { Button } from "../common/Button/Button";
import { WorkersPanelIcon } from "../common/SvgIcons/WorkersIcon";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootStateT } from "../../App/store/store";
import { changeModalStatus } from "../../App/appReducer";
import { addWorkersSA, updateWorkerSA, WorkersT } from "../../pages/WorkersTable/workersTableReducer";
import { MB } from "../../styles/GlobalStyles";

type ModalWindowPropsT = {
    type?: "add" | "update";
};

export const ModalWindow: React.FC<ModalWindowPropsT> = ({ type = "add", ...restProps }) => {
    const dispatch = useDispatch();
    const updatingWorker = useSelector<RootStateT, WorkersT>((state) => state.app.modalStatus.optionalData);
    let initialWorkerData: WorkersT;

    if (type === "add") {
        initialWorkerData = {
            fullName: "",
            contacts: "",
            gender: "male",
            salary: "",
            position: ""
        };
    } else {
        initialWorkerData = {
            fullName: updatingWorker.fullName,
            contacts: updatingWorker.contacts,
            gender: updatingWorker.gender,
            salary: updatingWorker.salary,
            position: updatingWorker.position
        };
    }

    const formik = useFormik({
        initialValues: initialWorkerData,
        onSubmit: (values) => {
            if (type === "add") {
                dispatch(addWorkersSA(values));
            } else {
                dispatch(updateWorkerSA({ ...updatingWorker, ...values }));
            }

            dispatch(changeModalStatus({ isVisible: false, optionalData: {} as WorkersT }));
        }
    });

    const closeModalHandler = () => dispatch(changeModalStatus({ isVisible: false, optionalData: {} as WorkersT }));

    return (
        <ModalForm onSubmit={formik.handleSubmit}>
            <IconWrap>
                <WorkersPanelIcon icon={"close"} width={"20"} onClick={closeModalHandler} />
            </IconWrap>
            <h3>{type === "add" ? "Add new worker" : "Update worker data"}</h3>
            <MB margin={"20px"}>
                <InputText
                    type={"name"}
                    value={formik.values.fullName}
                    id={"fullName"}
                    name={"fullName"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={"Full name"}
                />
            </MB>

            <RadioWrap role="group" aria-labelledby="my-radio-group">
                <RadioButtons
                    options={["male", "female"]}
                    onChange={formik.handleChange}
                    value={formik.initialValues.gender}
                />
            </RadioWrap>

            <MB margin={"20px"}>
                <InputText
                    type={"contacts"}
                    value={formik.values.contacts}
                    id={"contacts"}
                    name={"contacts"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={"Contacts"}
                />
            </MB>
            <MB margin={"20px"}>
                <InputText
                    type={"salary"}
                    value={formik.values.salary}
                    id={"salary"}
                    name={"salary"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={"Salary"}
                />
            </MB>
            <MB margin={"20px"}>
                <InputText
                    type={"position"}
                    value={formik.values.position}
                    id={"position"}
                    name={"position"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={"Position"}
                />
            </MB>

            <Button type={"submit"}>{type === "add" ? "Add" : "Update"}</Button>
        </ModalForm>
    );
};

const ModalForm = styled.form`
    padding: 20px;
    width: 20%;
    min-width: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid red;
    background-color: ${({ theme }) => theme.color.secondary.light};
`;

const RadioWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const IconWrap = styled.div`
    position: absolute;
    right: 5%;
    top: 1%;
`;
