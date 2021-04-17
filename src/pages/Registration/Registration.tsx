import React from "react";
import {useFormik} from "formik";
import {Button} from "../../components/common/Button/Button";
import styled from "styled-components";
import {InputText} from "../../components/common/InputText/InputText";
import {useDispatch, useSelector} from "react-redux";
import {authApi} from "../../api/api";
import {RootStateT} from "../../App/store/store";
import {Redirect} from "react-router-dom";
import {routes} from "../../App/routes/routes";
import {registrationSA} from "./registrationReducer";

export type RegistrationFormT = {
    email: string;
    password: string | undefined;
    confirmPassword: string;
};

export const Registration = () => {
    const dispatch = useDispatch();
    const isRegistered = useSelector<RootStateT, boolean>(state => state.registration.isRegistered)

    const validate = (values: RegistrationFormT) => {
        const errors: RegistrationFormT = {} as RegistrationFormT;
        if (!values.password) {
            errors.password = "password required";
        } else if (values.password.length < 5) {
            errors.password = "Must be more than 5 characters";
        } else if (!values.confirmPassword) {
            errors.confirmPassword = "confirm your password";
        } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "The password and confirm password fields do not match";
        }
        if (!values.email) {
            errors.email = "email required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = "Invalid email address";
        } else if (values.email.length > 50) {
            errors.email = "email is too long";
        }

        return errors;
    };
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: ""
        },
        validate,
        onSubmit: (values) => {
            const {email, password} = values;
            dispatch(registrationSA({email, password}))
        }
    });
    const inputValidation = (fieldType: "password" | "email" | "confirmPassword"): string => {
        return formik.touched[fieldType] && formik.errors[fieldType] ? `${formik.errors[fieldType]}` : "";
    };


    if (isRegistered) {
        return <Redirect to={routes.login} />;
    }

    return (
        <>
            <>
                <div>
                    <StyledForm onSubmit={formik.handleSubmit}>
                        {/*{isPending && (*/}
                        {/*    <Overlay>*/}
                        {/*        <span>Loading...</span>*/}
                        {/*    </Overlay>*/}
                        {/*)}*/}
                        <span>Sing up</span>

                        <InputText
                            type={"email"}
                            value={formik.values.email}
                            id={"email"}
                            name={"email"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={"Email"}
                            error={inputValidation("email")}
                        />
                        <InputText
                            type={"password"}
                            value={formik.values.password}
                            name={"password"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={"Password"}
                            error={inputValidation("password")}
                        />
                        <InputText
                            type={"password"}
                            value={formik.values.confirmPassword}
                            name={"confirmPassword"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={"confirm password"}
                            error={inputValidation("confirmPassword")}
                        />

                        {/*{registrationError && <div>{registrationError}</div>}*/}
                        <Button type={"submit"}>Submit</Button>
                    </StyledForm>
                </div>
            </>
        </>
    );
};

const StyledForm = styled.form`
    margin: 0 auto;
    padding: 10px 15px;
    width: 50%;
    min-width: 300px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    border: 1px solid red;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #267fd457;
    backdrop-filter: blur(5px);
    z-index: 10;
    & > span {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -100%);
    }
`;