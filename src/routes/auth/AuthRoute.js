import React, { useState, useEffect } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./../../redux/actions/userActions";
import { getCookie } from "../../utils/cookie";

export default function AuthRoute({ component: Com, isAuth, ...rest }) {
  const location = useLocation();
  // const dispatch = useDispatch();

  // const [isAuth, setIsAuth] = useState(false);

  // const isAuthenticated = () => {
  //   dispatch(fetchUser());
  // };

  // useEffect(() => {
  //   isAuthenticated();
  // }, []);

  // const isLogin = useSelector((state) => state.user.isLogin);

  // useEffect(() => {
  //   setIsAuth(isLogin);
  //   return () => {};
  // }, [isLogin]);

  return (
    <Route
      {...rest}
      render={(props) => {
        return getCookie("access_token") ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : (
          <Com {...props} />
        );
      }}
    />
  );
}
