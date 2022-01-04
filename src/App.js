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
import Profile from "./screens/Profile";
import { ProfileEdit } from "./components/ProfileComponent";
import { Fragment } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
toast.configure();

function App() {
  useEffect(() => {});

  return (
    <Fragment>
      <Router>
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
          <Route exact path="/chat" render={(props) => <Chat />} />
          <Route exact path="/create-post" render={(props) => <CreatePost />} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" render={(props) => <Profile />} />
          <Route
            exact
            path="/profile/edit"
            render={(props) => <ProfileEdit />}
          />
          <Route path="/:someString" component={Error} />
        </Switch>
        <Footer />
      </Router>
    </Fragment>
  );
}

export default App;
