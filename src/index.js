import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Auth from "./Authentication/auth";
import "./index.scss";
import Loader from "./shade/Loaders/Loaders";
import { AuthContextProvider } from "./Store/Auth-context";
import history from "./history";
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AuthContextProvider><App /></AuthContextProvider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
