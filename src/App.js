import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./screens/Auth/login";
import Register from "./screens/Auth/register";
import Navigation from "./components/Navigation";
import Home from "./screens/Home";
import Error from "./screens/Error";
import Dashboard from "./screens/admin/Dashboard";
import Footer from "./components/Footer";
import Chat from "./screens/Chat";
import CreatePost from "./screens/CreatePost";
import EditPost from "./screens/EditPost";
import Search from "./screens/Search";
import PreviewPost from "./screens/CreatePost/PreviewPost";
import Detail from "./screens/Detail";
import Profile from "./screens/Profile";
import { Fragment } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./routes/auth/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./redux/actions/userActions";
import { getCookie } from "./utils/cookie";
import ScrollUp from "./components/ScrollUp";
import "./utils/loader";
toast.configure();

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
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/dashboard"
            render={(props) => {
              <Dashboard />;
            }}
          />
          <Route exact path="/search" render={(props) => <Search />} />
          {/* <Route exact path="/create-post" render={(props) => <CreatePost />} /> */}
          {/* <Route
            exact
            path="/create-post/preview"
            render={(props) => <PreviewPost />}
          /> */}
          <PrivateRoute path="/chat" exact component={Chat} isAuth={isAuth} />
          <PrivateRoute
            path="/create-post"
            exact
            component={CreatePost}
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
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/detail/:id" render={(props) => <Detail />} />
          <PrivateRoute
            path="/profile"
            exact
            component={Profile}
            isAuth={isAuth}
          />
          <Route path="/:someString" component={Error} />
        </Switch>
        <Footer />
      </Router>
    </Fragment>
  );
}

export default App;
