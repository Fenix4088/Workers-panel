import React from "react";
import styled from "styled-components/macro";
import {InputText} from "../common/InputText/InputText";
import {RadioButtons} from "../common/RadioButtons/RadioButtons";
import {Button} from "../common/Button/Button";
import {WorkersPanelIcon} from "../common/SvgIcons/WorkersIcon";

export const ModalWindow = () => {
    return (
        <ModalWrap>
            <IconWrap>
                <WorkersPanelIcon icon={"close"} width={"20"}/>
            </IconWrap>
            <h3>Add new worker</h3>
            <InputText
                type={"email"}
                value={""}
                id={"email"}
                name={"email"}
                /*onChange={formik.handleChange}
                onBlur={formik.handleBlur}*/
                placeholder={"Full name"}
            />
            <RadioWrap>
                <RadioButtons options={["male", "female"]}/>
            </RadioWrap>

            <InputText
                type={"email"}
                value={""}
                id={"email"}
                name={"email"}
                /*onChange={formik.handleChange}
                onBlur={formik.handleBlur}*/
                placeholder={"Contacts"}
            />
            <InputText
            type={"email"}
            value={""}
            id={"email"}
            name={"email"}
            /*onChange={formik.handleChange}
            onBlur={formik.handleBlur}*/
            placeholder={"Salary"}
        /> <InputText
            type={"email"}
            value={""}
            id={"email"}
            name={"email"}
            /*onChange={formik.handleChange}
            onBlur={formik.handleBlur}*/
            placeholder={"Position"}
        />
            <Button type={"submit"}>Add</Button>
        </ModalWrap>
    )
}

const ModalWrap = styled.form`
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