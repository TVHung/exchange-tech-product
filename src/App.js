import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./screens/Auth/login";
import Register from "./screens/Auth/register";
import Navigation from "./components/Navigation";
import Home from "./screens/Home";
import Error from "./screens/Error";
import Footer from "./components/Footer";
import Chat from "./screens/Chat";
import CreatePost from "./screens/CreatePost";
import EditPost from "./screens/EditPost";
import Search from "./screens/Search";
import PreviewPost from "./screens/CreatePost/PreviewPost";
import Detail from "./screens/Detail";
import Profile from "./screens/Profile";
import { Fragment } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./routes/auth/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./redux/actions/userActions";
import { getCookie } from "./utils/cookie";
import ScrollUp from "./components/ScrollUp";
import "./utils/loader";
import PostManager from "./screens/PostManager";
import AuthRoute from "./routes/auth/AuthRoute";
import ProfileUser from "./screens/ProfileUser";
import { toast } from "react-toastify";
import ResetPassword from "./screens/Auth/ResetPassword";
import FormResetPassword from "./screens/Auth/FormResetPassword";
import LoginGoogle from "./screens/Auth/LoginGoogle";
toast.configure();

const HeaderComponent = React.lazy(() => import("./components/Navigation"));
const FooterComponent = React.lazy(() => import("./components/Footer"));
const LoginPage = React.lazy(() => import("./screens/Auth/login"));
const RegisterPage = React.lazy(() => import("./screens/Auth/register"));
const SearchPage = React.lazy(() => import("./screens/Search"));
const HomePage = React.lazy(() => import("./screens/Home"));
const ResetPasswordPage = React.lazy(() =>
  import("./screens/Auth/ResetPassword")
);
const FormResetPasswordPage = React.lazy(() =>
  import("./screens/Auth/FormResetPassword")
);
const LoginGooglePage = React.lazy(() => import("./screens/Auth/LoginGoogle"));
const ChatPage = React.lazy(() => import("./screens/Chat"));
const PostManagerPage = React.lazy(() => import("./screens/PostManager"));
const CreatePostPage = React.lazy(() => import("./screens/CreatePost"));
const EditPostPage = React.lazy(() => import("./screens/EditPost"));
const PreviewPostPage = React.lazy(() =>
  import("./screens/CreatePost/PreviewPost")
);
const ErrorPage = React.lazy(() => import("./screens/Error"));
const DetailPage = React.lazy(() => import("./screens/Detail"));
const ProfilePage = React.lazy(() => import("./screens/Profile"));
const UserProfilePage = React.lazy(() => import("./screens/ProfileUser"));

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = () => {
    dispatch(fetchUser());
  };
  useEffect(() => {
    if (getCookie("access_token") !== "") isAuthenticated();
  }, []);
  const isLogin = useSelector((state) => state.user.isLogin);
  useEffect(() => {
    setIsAuth(isLogin);
    return () => {};
  }, [isLogin]);

  return (
    <Fragment>
      <Router>
        <ScrollUp />
        <HeaderComponent />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={SearchPage} />
          <Route
            exact
            path="/reset-password"
            render={(props) => <ResetPassword />}
          />
          <Route
            exact
            path="/request-reset-password"
            render={(props) => <FormResetPassword />}
          />
          <Route exact path="/login-google" component={LoginGooglePage} />
          <PrivateRoute
            path="/chat"
            exact
            component={ChatPage}
            isAuth={isAuth}
          />
          <PrivateRoute
            path="/chat/:id"
            exact
            component={ChatPage}
            isAuth={isAuth}
          />
          <PrivateRoute
            path="/post-manager"
            exact
            component={PostManagerPage}
            isAuth={isAuth}
          />
          <PrivateRoute
            path="/create-post"
            exact
            component={CreatePostPage}
            isAuth={isAuth}
          />
          <PrivateRoute
            path="/edit-post/:id"
            exact
            component={EditPost}
            isAuth={isAuth}
          />
          <PrivateRoute
            path="/create-post/preview"
            exact
            component={PreviewPost}
            isAuth={isAuth}
          />
          <AuthRoute exact path="/login" component={LoginPage} />
          <AuthRoute exact path="/register" component={RegisterPage} />
          <Route
            exact
            path="/detail/:id"
            render={(props) => <Detail isAuth={isAuth} />}
          />
          <Route exact path="/profile/:id" render={(props) => <Profile />} />
          <PrivateRoute
            path="/profile"
            exact
            component={ProfileUser}
            isAuth={isAuth}
          />
          <Route path="/:someString" component={ErrorPage} />
        </Switch>
        <FooterComponent />
      </Router>
    </Fragment>
  );
}

export default App;
