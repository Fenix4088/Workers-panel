import React, { useCallback } from "react";
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

export const ModalWindow: React.FC<ModalWindowPropsT> = React.memo(({ type = "add", ...restProps }) => {
    const dispatch = useDispatch();
    const updatingWorker = useSelector<RootStateT, WorkersT>((state) => state.app.modalStatus.optionalData);

    let initialWorkerData: WorkersT;

    if (type === "add") {
        initialWorkerData = {
            fullName: "",
            contacts: "",
            gender: "male",
            salary: "",
            position: "",
            isLoading: false
        };
    } else {
        initialWorkerData = {
            fullName: updatingWorker.fullName,
            contacts: updatingWorker.contacts,
            gender: updatingWorker.gender,
            salary: updatingWorker.salary,
            position: updatingWorker.position,
            isLoading: false
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

    const closeModalHandler = useCallback(
        () =>
            dispatch(
                changeModalStatus({
                    isVisible: false,
                    optionalData: {} as WorkersT
                })
            ),
        [dispatch]
    );

    return (
        <ModalForm onSubmit={formik.handleSubmit} data-form={"modal"}>
            <IconWrap>
                <WorkersPanelIcon icon={"close"} width={"20"} onClick={closeModalHandler} />
            </IconWrap>
            <ModalTitle>{type === "add" ? "Add new worker" : "Update worker data"}</ModalTitle>
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
});

const ModalForm = styled.form`
    padding: 30px 20px;
    width: 20%;
    min-width: 280px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${({ theme }) => theme.color.secondary.light};
    z-index: 300;
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

const ModalTitle = styled.h3`
  margin-bottom: 10px;
  text-align: center;
`;
