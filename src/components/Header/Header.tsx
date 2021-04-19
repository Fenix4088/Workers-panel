import React from "react";
import styled from "styled-components/macro";
import {Button} from "../common/Button/Button";
import {routes} from "../../App/routes/routes";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootStateT} from "../../App/store/store";
import {logoutSA} from "../../pages/Login/loginReducer";
import {AppContainer} from "../../styles/GlobalStyles";
import {WorkersPanelIcon} from "../common/SvgIcons/WorkersIcon";
import {AuthUserDataT} from "../../App/appReducer";

export const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector<RootStateT, boolean>((state) => state.login.isLoggedIn);
    const authUserData = useSelector<RootStateT, AuthUserDataT>((state) => state.app.authUserData);

    const logOutHandler = () => dispatch(logoutSA());

    return (
        <NavBarWrap>
            <AppContainer>
                <NavBar>
                    {isLoggedIn ? (
                        <>
                            <UserInfoWrap>
                                <WorkersPanelIcon icon={"user"} width={"20"}/>
                                <div>{authUserData.email}</div>
                            </UserInfoWrap>
                            <Button onClick={logOutHandler}>Logout</Button>
                        </>
                    ) : (
                        <NavLink to={routes.login}>
                            <Button>Login</Button>
                        </NavLink>
                    )}
                    {isLoggedIn || (
                        <NavLink to={routes.registration}>
                            <Button>Sing in</Button>
                        </NavLink>
                    )}
                </NavBar>
            </AppContainer>
        </NavBarWrap>
    );
};

const NavBarWrap = styled.div`
  background-color: ${({theme}) => theme.color.secondary.main};
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 50px;

  & > a {
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const UserInfoWrap = styled.div`
  margin-right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div:first-child {
    margin-right: 10px;
  }
`;
