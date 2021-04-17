import React from "react";
import styled from "styled-components/macro";
import {Button} from "../common/Button/Button";
import {routes} from "../../App/routes/routes";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootStateT} from "../../App/store/store";
import {logoutSA} from "../../pages/Login/loginReducer";

export const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector<RootStateT, boolean>(state => state.login.isLoggedIn);

    const logOutHandler = () => dispatch(logoutSA())

    return (
        <NavBar>
            {
                isLoggedIn
                    ? <Button onClick={logOutHandler}>
                        Logout
                    </Button>
                    : <Button>
                        <NavLink to={routes.login}>Login</NavLink>
                    </Button>
            }
            {
                isLoggedIn || <Button>
                    <NavLink to={routes.registration}>Sing in</NavLink>
                </Button>
            }

        </NavBar>
    )
}

const NavBar = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
  background-color: ${({theme}) => theme.color.secondary.main};

  & > button {
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }
  }
`;