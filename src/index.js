import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import Loading from "./components/Loading";

ReactDOM.render(
  <Provider store={store}>
    <React.Suspense fallback={<Loading />}>
      <App />
    </React.Suspense>
  </Provider>,
  document.getElementById("root")
);
