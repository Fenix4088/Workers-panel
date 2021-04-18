import React from "react";
import styled from "styled-components/macro";
import {InputText} from "../common/InputText/InputText";
import {RadioButtons} from "../common/RadioButtons/RadioButtons";
import {Button} from "../common/Button/Button";
import {WorkersPanelIcon} from "../common/SvgIcons/WorkersIcon";
import {Field, useFormik} from "formik";
import {loginSA} from "../../pages/Login/loginReducer";

export const ModalWindow = () => {

    const formik = useFormik({
        initialValues: {
            name: "",
            contacts: "",
            gender: "",
            salary: "",
            position: "",
        },
        // validate,
        onSubmit: (values) => {
            console.log(values)
        }
    });

    return (
        <ModalForm onSubmit={formik.handleSubmit}>
            <IconWrap>
                <WorkersPanelIcon icon={"close"} width={"20"}/>
            </IconWrap>
            <h3>Add new worker</h3>
            <InputText
                type={"name"}
                value={formik.values.name}
                id={"name"}
                name={"name"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={"Full name"}
            />
                <RadioWrap role="group" aria-labelledby="my-radio-group">
                    <RadioButtons options={["male", "female"]} onChange={formik.handleChange} value={"male"}/>
                </RadioWrap>

            <InputText
                type={"contacts"}
                value={formik.values.contacts}
                id={"contacts"}
                name={"contacts"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={"Contacts"}
            />
            <InputText
                type={"salary"}
                value={formik.values.salary}
                id={"salary"}
                name={"salary"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={"Salary"}
            />
            <InputText
                type={"position"}
                value={formik.values.position}
                id={"position"}
                name={"position"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={"Position"}
            />
            <Button type={"submit"}>Add</Button>
        </ModalForm>
    )
}

const ModalForm = styled.form`
  padding: 20px;
  width: 20%;
  min-width: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid red;
  background-color: ${({theme}) => theme.color.secondary.light}
`

const RadioWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const IconWrap = styled.div`
  position: absolute;
  right: 5%;
  top: 1%;
`;