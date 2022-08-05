import React, { useState, useEffect } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./../../redux/actions/userActions";
import { getCookie } from "../../utils/cookie";
import { apiGetUserProfile, headers } from "../../constants";
import axios from "axios";

export default function PrivateRoute({ component: Com, isAuth, ...rest }) {
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={(props) => {
        return getCookie("access_token") ? (
          <Com {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}
