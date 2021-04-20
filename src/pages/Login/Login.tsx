import React from "react";
import { InputText } from "../../components/common/InputText/InputText";
import { NavLink, Redirect } from "react-router-dom";
import { Button } from "../../components/common/Button/Button";
import { Checkbox } from "../../components/common/Checkbox/Checkbox";
import styled from "styled-components/macro";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { routes } from "../../App/routes/routes";
import { loginSA } from "./loginReducer";
import { RootStateT } from "../../App/store/store";
import { MB } from "../../styles/GlobalStyles";

export type LoginFormT = {
    email: string;
    password: string;
    rememberMe: boolean;
};

export const Login = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector<RootStateT, boolean>((state) => state.login.isLoggedIn);

    const validate = (values: LoginFormT) => {
        const errors: LoginFormT = {} as LoginFormT;
        if (!values.password) {
            errors.password = "Required";
        } else if (values.password.length < 5) {
            errors.password = "Must be 5 characters or more";
        }

        if (!values.email) {
            errors.email = "Required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = "Invalid email address";
        } else if (values.email.length > 50) {
            errors.email = "Your email is too long :-(";
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: "" || "yehor@gmail.com",
            password: "" || "yehor123",
            rememberMe: false
        },
        validate,
        onSubmit: (values) => {
            dispatch(loginSA(values));
        }
    });

    const inputValidation = (fieldType: "password" | "email"): string => {
        return formik.touched[fieldType] && formik.errors[fieldType] ? `${formik.errors[fieldType]}` : "";
    };

    if (isLoggedIn) {
        return <Redirect to={routes.main} />;
    }

    return (
        <>
            <div>
                <FormStyle onSubmit={formik.handleSubmit}>
                    {/*{isFormPending && (*/}
                    {/*    <Overlay>*/}
                    {/*        <span>Loading...</span>*/}
                    {/*    </Overlay>*/}
                    {/*)}*/}
                    <FormTitle>Login</FormTitle>

                    <MB margin={"20px"}>
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
                    </MB>
                    <MB margin={"20px"}>
                        <InputText
                            type={"password"}
                            value={formik.values.password}
                            name={"password"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={"Password"}
                            error={inputValidation("password")}
                        />
                    </MB>

                    <MB margin={"20px"}>
                        <Checkbox checked={formik.values.rememberMe} onChange={formik.handleChange} name={"rememberMe"}>
                            Remember me
                        </Checkbox>
                    </MB>
                    <Button type={"submit"}>Login</Button>
                    <NavLink to={routes.registration}>Registration</NavLink>
                </FormStyle>
            </div>
        </>
    );
};

const FormStyle = styled.form`
    margin: 0 auto;
    padding: 10px 15px;
    width: 30%;
    min-width: 300px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    background-color: ${({ theme }) => theme.color.secondary.light};
    box-shadow: ${({ theme }) => theme.shadow[3]};
`;

export const FormTitle = styled.h3`
    margin-bottom: 20px;
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
