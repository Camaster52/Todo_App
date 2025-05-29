import { createRoot } from "react-dom/client";
import React from "react";
import Router from "./router";
import "./style/style.css"


const app = createRoot(document.querySelector("#root"))
app.render(
    <React.StrictMode>
        <Router/>
    </React.StrictMode>
)