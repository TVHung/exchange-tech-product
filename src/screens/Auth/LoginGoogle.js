import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import axios from "axios";
import "./auth.scss";
import MetaTag from "../../components/MetaTag";
import Loading from "../../components/Loading";
import { apiLoginGoogleCallback } from "../../constants";
import { Link } from "react-router-dom";
import { setCookie } from "../../utils/cookie";

export default function LoginGoogle() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(true);

  useEffect(() => {
    handleLoginGoogle();
    return () => {
      setIsLoading();
    };
  }, []);

  //check login
  const handleLoginGoogle = async () => {
    setIsLoading(true);
    await axios
      .get(`${apiLoginGoogleCallback}/${window.location.search}`)
      .then((res) => {
        if (res.data.access_token) {
          setLoginSuccess(true);
          setCookie("access_token", res.data.access_token, 3600);
          window.location.href = localStorage.getItem("linkDirect");
        } else {
          setLoginSuccess(false);
        }
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setLoginSuccess(false);
      });
  };

  return (
    <div className="containerLogin">
      <MetaTag
        title="Login"
        description={"Đăng nhập, đăng kí để trao đổi, mua bán sản phẩm"}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          {!loginSuccess && (
            <div className="paperLogin text-center">
              <p>Đăng nhập không thành công, hãy thử lại</p>
              <Link to="/login">
                <p>Quay lại trang đăng nhập</p>
              </Link>
            </div>
          )}
        </Container>
      )}
    </div>
  );
}
