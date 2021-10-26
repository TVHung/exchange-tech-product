import "./App.css";
import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import Login from "./screens/Login";
import Navigation from "./components/Navigation";
import Home from "./screens/Home";
import Error from "./screens/Error";
import { Fragment } from "react";
import Dashboard from "./screens/Dashboard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Footer from "./components/Footer";
toast.configure();

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = (boolean) => {
        setIsAuthenticated(boolean);
    };

    async function isAuth() {
        // try {
        //     //kiem tra xem token co hop le khong
        //     const response = await fetch("http://localhost:5000/isVerify", {
        //         method: "GET",
        //         headers: { token: localStorage.token },
        //     });
        //     const partRes = await response.json();
        //     partRes = true
        //         ? setIsAuthenticated(true)
        //         : setIsAuthenticated(false);
        //     console.log(partRes);
        // } catch (error) {
        //     console.error(error.message);
        // }
        // try {
        //     axios
        //         .get("http://localhost:5000/isVerify", {
        //             headers: {
        //                 token: localStorage.token,
        //             },
        //         })
        //         .then((res) => {
        //             const verify = res.data;
        //             verify = true
        //                 ? setIsAuthenticated(true)
        //                 : setIsAuthenticated(false);
        //         })
        //         .catch((error) => console.log(error));
        // } catch (error) {
        //     console.error(error.message);
        // }
    }

    useEffect(() => {
        isAuth();
    });

    return (
        <Fragment>
            <Router>
                {isAuthenticated ? (
                    <Navigation
                        isAuthenticated={isAuthenticated}
                        setAuth={setAuth}
                    />
                ) : null}
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={(props) =>
                            isAuthenticated ? (
                                <Home {...props} setAuth={setAuth} />
                            ) : (
                                <Redirect to="/login" />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/dashboard"
                        render={(props) =>
                            isAuthenticated ? (
                                <Dashboard {...props} setAuth={setAuth} />
                            ) : (
                                <Redirect to="/Login" />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/login"
                        render={(props) => (
                            <Login {...props} setAuth={setAuth} />
                        )}
                    />
                    <Route path="/:someString" component={Error} />
                </Switch>
                {isAuthenticated ? <Footer /> : null}
            </Router>
        </Fragment>
    );
}

export default App;
